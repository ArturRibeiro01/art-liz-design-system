import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))
const packageNames = ['tokens', 'react', 'create-app']

function run(command, arguments_, cwd, { capture = false } = {}) {
  return execFileSync(command, arguments_, {
    cwd,
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
  })
}

function packPackage(packageName, outputDirectory) {
  const packageDirectory = resolve(repositoryRoot, 'packages', packageName)
  const output = run(
    'npm',
    ['pack', '--json', '--pack-destination', outputDirectory],
    packageDirectory,
    { capture: true },
  )
  const [packedPackage] = JSON.parse(output)
  const manifest = JSON.parse(readFileSync(resolve(packageDirectory, 'package.json'), 'utf8'))

  const packedFiles = new Set(packedPackage.files.map(({ path }) => path))
  const manifestPaths = [
    manifest.main,
    manifest.types,
    ...Object.values(manifest.exports?.['.'] ?? {}),
    ...Object.values(manifest.bin ?? {}),
  ].filter(Boolean)
  for (const path of manifestPaths) {
    assert.ok(
      packedFiles.has(path.replace(/^\.\//, '')),
      `${packageName}: ${path} ausente do tarball`,
    )
  }
  assert.ok(
    packageName === 'create-app' || [...packedFiles].every((path) => !path.startsWith('src/')),
    `${packageName}: fontes foram incluídas no tarball`,
  )

  return {
    manifest,
    tarballPath: join(outputDirectory, packedPackage.filename),
  }
}

const temporaryRoot = await mkdtemp(join(tmpdir(), 'art-liz-release-verify-'))

try {
  const packDirectory = join(temporaryRoot, 'packs')
  const consumerDirectory = join(temporaryRoot, 'consumer')
  await mkdir(packDirectory)
  await mkdir(consumerDirectory)

  const packedPackages = Object.fromEntries(
    packageNames.map((packageName) => [packageName, packPackage(packageName, packDirectory)]),
  )
  const reactManifest = packedPackages.react.manifest
  assert.equal(
    reactManifest.dependencies['@art-liz/tokens'],
    packedPackages.tokens.manifest.version,
    'React deve depender da mesma versão dos tokens empacotados',
  )
  for (const peer of ['react', 'react-dom', '@emotion/react', '@emotion/styled']) {
    assert.ok(reactManifest.peerDependencies[peer], `peer dependency ausente: ${peer}`)
  }
  assert.ok(packedPackages['create-app'].manifest.bin['create-app'])

  const consumerManifest = {
    name: 'art-liz-release-smoke-test',
    version: '1.0.0',
    private: true,
    type: 'module',
  }
  await writeFile(
    join(consumerDirectory, 'package.json'),
    `${JSON.stringify(consumerManifest, null, 2)}\n`,
  )

  run(
    'npm',
    [
      'install',
      '--no-save',
      '--package-lock=false',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      packedPackages.tokens.tarballPath,
      packedPackages.react.tarballPath,
      packedPackages['create-app'].tarballPath,
      'react@^19.2.8',
      'react-dom@^19.2.8',
      '@emotion/react@^11.14.0',
      '@emotion/styled@^11.14.1',
      '@types/react@^19.2.18',
      '@types/react-dom@^19.2.7',
      'typescript@~6.0.2',
    ],
    consumerDirectory,
  )

  run(
    process.execPath,
    [
      '--input-type=module',
      '--eval',
      "import { Box, Button, Container, Text } from '@art-liz/react'; import { colors, typography } from '@art-liz/tokens'; if (![Box, Button, Container, Text].every((component) => typeof component === 'function') || !colors.primary[600] || !typography.textStyles.h1) process.exit(1)",
    ],
    consumerDirectory,
  )

  const generatedDirectory = join(consumerDirectory, 'generated-app')
  run(
    process.execPath,
    [
      resolve(consumerDirectory, 'node_modules/@art-liz/create-app/bin/create-app.js'),
      generatedDirectory,
      '--no-install',
      '--no-git',
    ],
    consumerDirectory,
  )
  assert.ok(await readFile(resolve(generatedDirectory, 'src/main.tsx'), 'utf8'))
  assert.ok(await readFile(resolve(generatedDirectory, '.gitignore'), 'utf8'))

  const generatedManifestPath = resolve(generatedDirectory, 'package.json')
  const generatedManifest = JSON.parse(await readFile(generatedManifestPath, 'utf8'))
  generatedManifest.dependencies['@art-liz/react'] = `file:${packedPackages.react.tarballPath}`
  generatedManifest.dependencies['@art-liz/tokens'] = `file:${packedPackages.tokens.tarballPath}`
  await writeFile(generatedManifestPath, `${JSON.stringify(generatedManifest, null, 2)}\n`)

  run('npm', ['install', '--no-audit', '--no-fund'], generatedDirectory)
  run('npm', ['run', 'typecheck'], generatedDirectory)
  run('npm', ['test'], generatedDirectory)
  run('npm', ['run', 'lint'], generatedDirectory)
  run('npm', ['run', 'build'], generatedDirectory)

  await writeFile(
    join(consumerDirectory, 'consumer.tsx'),
    `import { Box, Button, Container, Text } from '@art-liz/react'\nimport type { TextFontFamily } from '@art-liz/react'\nimport { colors, typography } from '@art-liz/tokens'\n\nconst fontFamily: TextFontFamily = typography.fontFamilies.mono\n\nexport const Consumer = () => (\n  <Container background="neutral.50" maxWidth="md" padding={4}>\n    <Box background="white" padding={4}>\n      <Text as="a" color="primary.600" fontFamily={fontFamily} href="/docs" variant="h1">Docs</Text>\n      <Button>Continue</Button>\n      <span>{colors.primary[600]}</span>\n    </Box>\n  </Container>\n)\n`,
  )

  run(
    process.execPath,
    [
      resolve(consumerDirectory, 'node_modules/typescript/bin/tsc'),
      '--noEmit',
      '--strict',
      '--skipLibCheck',
      '--module',
      'ESNext',
      '--moduleResolution',
      'Bundler',
      '--jsx',
      'react-jsx',
      '--target',
      'ES2023',
      'consumer.tsx',
    ],
    consumerDirectory,
  )

  console.log('Artefatos npm de tokens e React instalados e consumidos em ambiente limpo.')
} finally {
  await rm(temporaryRoot, { force: true, recursive: true })
}
