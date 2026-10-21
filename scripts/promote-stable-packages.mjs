import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { setTimeout } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'

const packageDirectories = ['packages/tokens', 'packages/react', 'packages/create-app']

function runNpm(args) {
  return execFileSync('npm', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
    timeout: 30_000,
  })
}

export async function promoteStablePackages(
  packages,
  { run = runNpm, sleep = setTimeout, log = console.log, attempts = 12, delayMs = 10_000 } = {},
) {
  // Check every version before changing any dist-tag. npm publish can finish
  // before the registry reads used by npm view expose the new version.
  for (const { name, version } of packages) {
    const spec = `${name}@${version}`
    let lastError
    for (let attempt = 1; attempt <= attempts; attempt++) {
      log(`Checking ${spec} (${attempt}/${attempts})...`)
      try {
        const found = run([
          'view',
          spec,
          'version',
          '--prefer-online',
          '--fetch-retries=0',
          '--fetch-timeout=15000',
        ]).trim()
        if (found !== version)
          throw new Error(`Expected ${version}, received ${found || '(empty)'}.`)
        lastError = undefined
        break
      } catch (error) {
        lastError = error
        if (attempt < attempts) {
          log(`${spec} is not available yet. Retrying in ${delayMs / 1000}s.`)
          await sleep(delayMs)
        }
      }
    }
    if (lastError) {
      throw new Error(
        `${spec} was not confirmed after ${attempts} attempts. No dist-tags were changed by this step.`,
        { cause: lastError },
      )
    }
  }

  for (const { name, version } of packages) {
    log(`Promoting ${name}@${version} to latest...`)
    log(run(['dist-tag', 'add', `${name}@${version}`, 'latest']).trim())
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const packages = packageDirectories.map((directory) =>
    JSON.parse(readFileSync(new URL(`../${directory}/package.json`, import.meta.url), 'utf8')),
  )
  await promoteStablePackages(packages)
}
