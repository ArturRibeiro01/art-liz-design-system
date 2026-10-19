import assert from 'node:assert/strict'
import test from 'node:test'
import { enableReleaseAutomerge, validateReleasePullRequest } from './release-automerge.mjs'

const repository = 'ArturRibeiro01/art-liz-design-system'
const sha = 'a'.repeat(40)
const files = [
  { filename: '.changeset/example-release.md', status: 'removed' },
  { filename: 'packages/create-app/package.json', status: 'modified' },
  { filename: 'packages/create-app/CHANGELOG.md', status: 'modified' },
]
function pullRequest() {
  return {
    state: 'open',
    draft: false,
    changed_files: files.length,
    user: { login: 'github-actions[bot]', type: 'Bot' },
    base: { ref: 'develop', repo: { full_name: repository } },
    head: { ref: 'changeset-release/develop', sha, repo: { full_name: repository } },
  }
}
function fakeGh(checks = [], pr = pullRequest()) {
  const mutations = []
  return {
    mutations,
    run(args) {
      if (args[0] !== 'api') {
        mutations.push(args)
        return ''
      }
      if (args[1].endsWith('/files')) return JSON.stringify([files])
      if (args[1].endsWith('/check-runs')) return JSON.stringify([{ check_runs: checks }])
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
      validateReleasePullRequest(pullRequest(), [files[0], files[1], file], repository),
    )
  }
  assert.throws(() => validateReleasePullRequest(pullRequest(), [], repository))
})

test('dispatches both checks before enabling native auto-merge bound to the inspected SHA', () => {
  const gh = fakeGh()
  enableReleaseAutomerge({ repository, number: 47, run: gh.run })
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
    '--auto',
    '--squash',
    '--match-head-commit',
    sha,
  ])
})

test('reuses passing checks and never uses an administrator bypass', () => {
  const gh = fakeGh(successfulChecks)
  enableReleaseAutomerge({ repository, number: 47, run: gh.run })
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
    enableReleaseAutomerge({ repository, number: 47, run: gh.run })
    assert.equal(gh.mutations.length, 3)
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
    { ...successfulChecks[0], id: 20 },
    { ...successfulChecks[1], id: 21 },
  ])
  enableReleaseAutomerge({ repository, number: 47, run: gh.run })
  assert.equal(gh.mutations.length, 1)
  const pending = fakeGh([
    { ...successfulChecks[0], id: 10 },
    { ...successfulChecks[0], id: 20, conclusion: null },
    { ...successfulChecks[1], id: 21 },
  ])
  enableReleaseAutomerge({ repository, number: 47, run: pending.run })
  assert.equal(pending.mutations.length, 3)
})
