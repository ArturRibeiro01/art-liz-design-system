import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const generatorPath = resolve(fileURLToPath(new URL('../bin/create-app.js', import.meta.url)))

test('copies a complete project template and applies its directory name', async () => {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), 'art-liz-create-app-'))
  const projectDirectory = join(temporaryDirectory, 'My New App')

  try {
    const result = spawnSync(
      process.execPath,
      [generatorPath, projectDirectory, '--no-install', '--no-git'],
      { encoding: 'utf8' },
    )

    assert.equal(result.status, 0, result.stderr)

    const manifest = JSON.parse(await readFile(join(projectDirectory, 'package.json'), 'utf8'))
    assert.equal(manifest.name, 'my-new-app')
    assert.equal(manifest.dependencies['@art-liz/react'], 'latest')
    assert.equal(manifest.dependencies['@emotion/react'], '^11.14.0')
    assert.equal(manifest.dependencies['@emotion/styled'], '^11.14.1')
    assert.ok(manifest.dependencies['react-router-dom'])
    assert.ok(manifest.dependencies.zustand)
    assert.ok(manifest.dependencies['@tanstack/react-query'])
    assert.ok(manifest.devDependencies.vitest)
    assert.ok(manifest.devDependencies.husky)
    assert.ok(manifest.devDependencies['lint-staged'])

    const files = await readdir(projectDirectory)
    assert.ok(files.includes('src'))
    assert.ok(files.includes('.husky'))
    assert.ok(files.includes('.gitignore'))
    assert.ok(files.includes('vite.config.ts'))
    assert.ok(files.includes('README.md'))
    assert.match(await readFile(join(projectDirectory, '.gitignore'), 'utf8'), /node_modules/)

    const entrypoint = await readFile(join(projectDirectory, 'src', 'main.tsx'), 'utf8')
    assert.match(entrypoint, /createRoot/)
    assert.match(entrypoint, /from '\.\/App'/)
    assert.match(entrypoint, /import '\.\/index\.css'/)

    const appSource = await readFile(join(projectDirectory, 'src', 'App.tsx'), 'utf8')
    assert.match(appSource, /colors\.white/)
    assert.match(appSource, /colors\.neutral\[900\]/)
    assert.match(appSource, /typography\.fontFamilies\.component/)
  } finally {
    await rm(temporaryDirectory, { force: true, recursive: true })
  }
})

test('uses beta versions when requested', async () => {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), 'art-liz-create-app-beta-'))
  const projectDirectory = join(temporaryDirectory, 'beta-app')

  try {
    const result = spawnSync(
      process.execPath,
      [generatorPath, projectDirectory, '--tag', 'beta', '--no-install', '--no-git'],
      { encoding: 'utf8' },
    )

    assert.equal(result.status, 0, result.stderr)

    const manifest = JSON.parse(await readFile(join(projectDirectory, 'package.json'), 'utf8'))
    assert.equal(manifest.dependencies['@art-liz/react'], 'beta')
    assert.equal(manifest.dependencies['@art-liz/tokens'], 'beta')
  } finally {
    await rm(temporaryDirectory, { force: true, recursive: true })
  }
})

test('does not overwrite a non-empty destination', async () => {
  const temporaryDirectory = await mkdtemp(join(tmpdir(), 'art-liz-create-app-existing-'))
  const projectDirectory = join(temporaryDirectory, 'existing-app')
  await mkdir(projectDirectory)
  await writeFile(join(projectDirectory, 'keep.txt'), 'preserve')

  try {
    const result = spawnSync(
      process.execPath,
      [generatorPath, projectDirectory, '--no-install', '--no-git'],
      { encoding: 'utf8' },
    )

    assert.notEqual(result.status, 0)
    assert.match(result.stderr, /não está vazio/)
    assert.equal(await readFile(join(projectDirectory, 'keep.txt'), 'utf8'), 'preserve')
  } finally {
    await rm(temporaryDirectory, { force: true, recursive: true })
  }
})
