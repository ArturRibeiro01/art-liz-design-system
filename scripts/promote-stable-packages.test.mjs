import assert from 'node:assert/strict'
import test from 'node:test'
import { promoteStablePackages } from './promote-stable-packages.mjs'

const packages = [
  { name: '@art-liz/tokens', version: '0.2.0' },
  { name: '@art-liz/react', version: '1.1.0' },
  { name: '@art-liz/create-app', version: '0.3.1' },
]

function setup(probe = () => {}, promote = () => {}) {
  const calls = []
  const waits = []
  return {
    calls,
    waits,
    options: {
      attempts: 3,
      delayMs: 10,
      log() {},
      async sleep(ms) {
        waits.push(ms)
      },
      run(args) {
        calls.push(args)
        if (args[0] === 'view') {
          const pkg = packages.find(({ name, version }) => `${name}@${version}` === args[1])
          return probe(pkg, calls) ?? `${pkg.version}\n`
        }
        promote(args)
        return '+latest\n'
      },
    },
  }
}

test('checks every exact version online before promoting any package', async () => {
  const { calls, waits, options } = setup()
  await promoteStablePackages(packages, options)
  assert.deepEqual(waits, [])
  assert.deepEqual(
    calls.slice(0, 3),
    packages.map(({ name, version }) => [
      'view',
      `${name}@${version}`,
      'version',
      '--prefer-online',
      '--fetch-retries=0',
      '--fetch-timeout=15000',
    ]),
  )
  assert.deepEqual(
    calls.slice(3),
    packages.map(({ name, version }) => ['dist-tag', 'add', `${name}@${version}`, 'latest']),
  )
})

test('waits for a newly published CLI instead of failing after a transient lookup error', async () => {
  let cliReads = 0
  const { calls, waits, options } = setup(({ name }) => {
    if (name === '@art-liz/create-app' && ++cliReads < 3) throw new Error('npm E404')
  })
  await promoteStablePackages(packages, options)
  assert.deepEqual(waits, [10, 10])
  assert.equal(calls.filter(([command]) => command === 'dist-tag').length, 3)
  assert.ok(calls.slice(0, 5).every(([command]) => command === 'view'))
})

for (const value of ['', '0.3.0\n']) {
  test(`rejects a successful lookup with ${value ? 'a different version' : 'empty output'}`, async () => {
    const { calls, waits, options } = setup(({ name }) =>
      name === '@art-liz/create-app' ? value : undefined,
    )
    await assert.rejects(promoteStablePackages(packages, options), /No dist-tags were changed/)
    assert.deepEqual(waits, [10, 10])
    assert.ok(calls.every(([command]) => command === 'view'))
  })
}

test('preserves the lookup error and changes no tags when the retry limit is reached', async () => {
  const error = new Error('npm registry unavailable')
  const { calls, options } = setup(({ name }) => {
    if (name === '@art-liz/create-app') throw error
  })
  await assert.rejects(promoteStablePackages(packages, options), (result) => {
    assert.match(result.message, /@art-liz\/create-app@0.3.1.*3 attempts/)
    assert.equal(result.cause, error)
    return true
  })
  assert.equal(calls.length, 5)
  assert.ok(calls.every(([command]) => command === 'view'))
})

test('fails immediately on a promotion error without proceeding to the next tag', async () => {
  const { calls, waits, options } = setup(undefined, () => {
    throw new Error('npm E403')
  })
  await assert.rejects(promoteStablePackages(packages, options), /npm E403/)
  assert.deepEqual(waits, [])
  assert.equal(calls.filter(([command]) => command === 'dist-tag').length, 1)
})
