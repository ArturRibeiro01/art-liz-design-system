import assert from 'node:assert/strict'
import test from 'node:test'
import { enableReleaseAutomerge, validateReleasePullRequest } from './release-automerge.mjs'

const repository = 'ArturRibeiro01/art-liz-design-system'
const sha = 'a'.repeat(40)
const files = [
  { filename: '.changeset/example-release.md', status: 'removed' },
  { filename: 'packages/create-app/package.json', status: 'modified' },
  { filename: 'packages/create-app/CHANGELOG.md', status: 'modified' },
  { filename: 'package-lock.json', status: 'modified' },
]
function pullRequest() {
  return {
    state: 'open',
    draft: false,
    changed_files: files.length,
    user: { login: 'github-actions[bot]', type: 'Bot' },
    base: { ref: 'develop', sha: 'b'.repeat(40), repo: { full_name: repository } },
    head: { ref: 'changeset-release/develop', sha, repo: { full_name: repository } },
  }
}
const packageJson = JSON.stringify({
  name: '@art-liz/create-app',
  version: '0.3.0',
  scripts: { test: 'node --test' },
  dependencies: { '@art-liz/react': '1.0.0', lodash: '^4.0.0' },
})
const updatedPackageJson = JSON.stringify({
  name: '@art-liz/create-app',
  version: '0.3.1',
  scripts: { test: 'node --test' },
  dependencies: { '@art-liz/react': '1.1.0', lodash: '^4.0.0' },
})
const lockfile = JSON.stringify({
  packages: {
    '': { version: '0.1.0' },
    'packages/create-app': {
      version: '0.3.0',
      dependencies: { '@art-liz/react': '1.0.0', lodash: '^4.0.0' },
    },
  },
})
const updatedLockfile = JSON.stringify({
  packages: {
    '': { version: '0.1.0' },
    'packages/create-app': {
      version: '0.3.1',
      dependencies: { '@art-liz/react': '1.1.0', lodash: '^4.0.0' },
    },
  },
})
function fakeGh(checks = [], pr = pullRequest(), checksAfterDispatch = checks) {
  const mutations = []
  return {
    mutations,
    run(args) {
      if (args[0] !== 'api') {
        mutations.push(args)
        return ''
      }
      if (args[1].endsWith('/files')) return JSON.stringify([files])
      if (args[1].endsWith('/check-runs')) {
        return JSON.stringify([
          { check_runs: mutations.length >= 2 ? checksAfterDispatch : checks },
        ])
      }
      if (args[1].includes('/contents/')) {
        const content = args[1].includes('package-lock.json')
          ? args[1].includes(pr.head.sha)
            ? updatedLockfile
            : lockfile
          : args[1].includes(pr.head.sha)
            ? updatedPackageJson
            : packageJson
        return JSON.stringify({ content: Buffer.from(content).toString('base64') })
      }
      return JSON.stringify(pr)
    },
  }
}
const successfulChecks = ['Quality gates', 'Allowed source branch'].map((name) => ({
  name,
  conclusion: 'success',
  app: { id: 15368 },
}))

test('accepts only the bot release PR with a complete version-only diff', () => {
  validateReleasePullRequest(pullRequest(), files, repository)
  for (const mutate of [
    (pr) => {
      pr.user = { login: 'contributor', type: 'User' }
    },
    (pr) => {
      pr.head.repo.full_name = 'fork/design-system'
    },
    (pr) => {
      pr.base.ref = 'main'
    },
    (pr) => {
      pr.head.ref = 'feature'
    },
    (pr) => {
      pr.draft = true
    },
    (pr) => {
      pr.state = 'closed'
    },
    (pr) => {
      pr.head.sha = 'invalid'
    },
    (pr) => {
      pr.changed_files += 1
    },
  ]) {
    const pr = pullRequest()
    mutate(pr)
    assert.throws(() => validateReleasePullRequest(pr, files, repository))
  }
  for (const file of [
    { filename: 'packages/react/src/Button/Button.tsx', status: 'modified' },
    { filename: '.github/workflows/ci.yml', status: 'modified' },
    { filename: '.changeset/config.json', status: 'modified' },
    { filename: '.changeset/README.md', status: 'removed' },
    { filename: '.changeset/new-change.md', status: 'added' },
    { filename: 'packages/react/package.json', status: 'renamed' },
  ]) {
    assert.throws(() =>
      validateReleasePullRequest(pullRequest(), [files[0], files[1], files[2], file], repository),
    )
  }
  assert.throws(() => validateReleasePullRequest(pullRequest(), [], repository))
})

test('rejects functional, external dependency, and unrelated lockfile changes', () => {
  for (const [filename, mutate] of [
    ['packages/create-app/package.json', (json) => (json.scripts.test = 'node --test changed')],
    ['packages/create-app/package.json', (json) => (json.dependencies.lodash = '^5.0.0')],
    [
      'package-lock.json',
      (json) => (json.packages['packages/create-app'].dependencies.lodash = '^5.0.0'),
    ],
  ]) {
    const gh = fakeGh()
    const original = gh.run
    gh.run = (args) => {
      if (args[1]?.includes(`/contents/${filename}?`)) {
        const result = JSON.parse(original(args))
        const content = JSON.parse(Buffer.from(result.content, 'base64'))
        if (args[1].includes(sha)) mutate(content)
        result.content = Buffer.from(JSON.stringify(content)).toString('base64')
        return JSON.stringify(result)
      }
      return original(args)
    }
    assert.throws(() => enableReleaseAutomerge({ repository, number: 47, run: gh.run }))
  }
})

test('dispatches both checks before merging the inspected SHA', () => {
  const gh = fakeGh([], pullRequest(), successfulChecks)
  enableReleaseAutomerge({ repository, number: 47, run: gh.run, sleep: () => {} })
  assert.deepEqual(
    gh.mutations.slice(0, 2).map((args) => args[2]),
    ['ci.yml', 'pr-branch-policy.yml'],
  )
  for (const command of gh.mutations.slice(0, 2))
    assert.deepEqual(command.slice(-2), ['--ref', 'changeset-release/develop'])
  assert.deepEqual(gh.mutations[2], [
    'pr',
    'merge',
    '47',
    '--repo',
    repository,
    '--squash',
    '--match-head-commit',
    sha,
  ])
})

test('reuses passing checks and never uses an administrator bypass', () => {
  const gh = fakeGh(successfulChecks)
  enableReleaseAutomerge({ repository, number: 47, run: gh.run, maxAttempts: 0 })
  assert.equal(gh.mutations.length, 1)
  assert.equal(gh.mutations[0].includes('--admin'), false)
})

test('does not treat pending, failed or third-party checks as passing', () => {
  for (const check of [
    { ...successfulChecks[0], conclusion: null },
    { ...successfulChecks[0], conclusion: 'failure' },
    { ...successfulChecks[0], app: { id: 999 } },
  ]) {
    const gh = fakeGh([check, successfulChecks[1]])
    assert.throws(() =>
      enableReleaseAutomerge({
        repository,
        number: 47,
        run: gh.run,
        sleep: () => {},
        maxAttempts: 0,
      }),
    )
    assert.equal(gh.mutations.length, 2)
  }
})

test('dry run reads the PR but does not dispatch workflows or enable merge', () => {
  const gh = fakeGh()
  const plan = enableReleaseAutomerge({ repository, number: 47, dryRun: true, run: gh.run })
  assert.equal(plan.commands.length, 3)
  assert.deepEqual(gh.mutations, [])
})

test('rejected PRs and invalid inputs cannot perform mutations', () => {
  const pr = pullRequest()
  pr.base.ref = 'main'
  const gh = fakeGh([], pr)
  assert.throws(() => enableReleaseAutomerge({ repository, number: 47, run: gh.run }))
  for (const number of ['0', '-1', '47; echo', '']) {
    assert.throws(() => enableReleaseAutomerge({ repository, number, run: gh.run }))
  }
  assert.deepEqual(gh.mutations, [])
})

test('a failed dispatch prevents enabling auto-merge', () => {
  const gh = fakeGh()
  assert.throws(() =>
    enableReleaseAutomerge({
      repository,
      number: 47,
      run(args) {
        if (args[0] === 'workflow') throw new Error('Dispatch rejected')
        return gh.run(args)
      },
    }),
  )
  assert.deepEqual(gh.mutations, [])
})

test('uses the latest run of each required check, including paginated retries', () => {
  const gh = fakeGh([
    { ...successfulChecks[0], id: 10, conclusion: 'failure' },
    { ...successfulChecks[0], id: 20, conclusion: 'success' },
    { ...successfulChecks[1], id: 21, conclusion: 'success' },
  ])
  enableReleaseAutomerge({ repository, number: 47, run: gh.run })
  assert.equal(gh.mutations.length, 1)
  const pending = fakeGh([
    { ...successfulChecks[0], id: 10 },
    { ...successfulChecks[0], id: 20, conclusion: null },
    { ...successfulChecks[1], id: 21 },
  ])
  assert.throws(() =>
    enableReleaseAutomerge({ repository, number: 47, run: pending.run, maxAttempts: 0 }),
  )
  assert.equal(pending.mutations.length, 2)
})
