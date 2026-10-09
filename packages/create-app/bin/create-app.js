#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { access, cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { basename, dirname, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const templateRoot = resolve(packageRoot, 'template')
const allowedTags = new Set(['latest', 'beta'])

function parseArguments(args) {
  const options = { help: false, install: true, initializeGit: true, tag: 'latest' }
  const positionalArguments = []

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index]

    if (argument === '--help' || argument === '-h') {
      options.help = true
    } else if (argument === '--no-install') {
      options.install = false
    } else if (argument === '--no-git') {
      options.initializeGit = false
    } else if (argument === '--tag') {
      index += 1
      options.tag = args[index]
    } else if (argument.startsWith('--tag=')) {
      options.tag = argument.slice('--tag='.length)
    } else if (argument.startsWith('-')) {
      throw new Error(`Opção desconhecida: ${argument}`)
    } else {
      positionalArguments.push(argument)
    }
  }

  if (positionalArguments.length > 1) {
    throw new Error('Informe apenas um diretório para o novo projeto.')
  }
  if (!allowedTags.has(options.tag)) {
    throw new Error(`Tag inválida: ${options.tag}. Use latest ou beta.`)
  }

  return { ...options, target: positionalArguments[0] }
}

async function promptForTarget() {
  const interface_ = createInterface({ input: process.stdin, output: process.stdout })

  try {
    const answer = await interface_.question('Diretório do projeto [art-liz-app]: ')
    return answer.trim() || 'art-liz-app'
  } finally {
    interface_.close()
  }
}

function projectPackageName(projectDirectory) {
  const packageName = basename(projectDirectory)
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^[._-]+|[._-]+$/g, '')

  if (!packageName) {
    throw new Error('O nome do diretório não produz um nome de pacote npm válido.')
  }

  return packageName
}

async function ensureEmptyDirectory(projectDirectory) {
  try {
    await access(projectDirectory)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }

    await mkdir(projectDirectory, { recursive: true })
    return
  }

  if ((await readdir(projectDirectory)).length > 0) {
    throw new Error(`O diretório não está vazio: ${projectDirectory}`)
  }
}

async function copyTemplate(projectDirectory, tag) {
  for (const entry of await readdir(templateRoot)) {
    const outputName = entry === 'gitignore.template' ? '.gitignore' : entry
    await cp(resolve(templateRoot, entry), resolve(projectDirectory, outputName), {
      recursive: true,
    })
  }

  const manifestPath = resolve(projectDirectory, 'package.json')
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))
  manifest.name = projectPackageName(projectDirectory)
  manifest.dependencies['@art-liz/react'] = tag
  manifest.dependencies['@art-liz/tokens'] = tag
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
}

function runCommand(command, args, workingDirectory) {
  const result = spawnSync(command, args, {
    cwd: workingDirectory,
    stdio: 'inherit',
  })

  if (result.error) {
    throw result.error
  }
  if (result.status !== 0) {
    throw new Error(`${command} terminou com código ${result.status ?? 'desconhecido'}.`)
  }
}

async function main(args = process.argv.slice(2)) {
  const options = parseArguments(args)

  if (options.help) {
    console.log(
      'Uso: npm create @art-liz/app@latest [diretório] [--tag latest|beta] [--no-install] [--no-git]',
    )
    return
  }

  const target = options.target ?? (await promptForTarget())
  const projectDirectory = resolve(process.cwd(), target)

  if (projectDirectory === process.cwd()) {
    throw new Error('Escolha um diretório novo; o gerador não escreve na pasta atual.')
  }

  await ensureEmptyDirectory(projectDirectory)
  await copyTemplate(projectDirectory, options.tag)

  if (options.initializeGit) {
    runCommand('git', ['init'], projectDirectory)
  }
  if (options.install) {
    const npmCliPath = process.env.npm_execpath
    if (npmCliPath) {
      runCommand(process.execPath, [npmCliPath, 'install'], projectDirectory)
    } else {
      runCommand('npm', ['install'], projectDirectory)
    }
  }

  console.log(`Projeto criado em ${projectDirectory}`)
  if (!options.install) {
    console.log('Execute npm install para instalar as dependências.')
  }
  console.log('Execute npm run dev para iniciar a aplicação.')
}

main().catch((error) => {
  console.error(`Não foi possível criar o projeto: ${error.message}`)
  process.exitCode = 1
})
