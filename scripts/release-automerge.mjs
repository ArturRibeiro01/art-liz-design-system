import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const requiredChecks = ['Quality gates', 'Allowed source branch']

export function validateReleasePullRequest(pr, files, repository) {
  if (
    pr.state !== 'open' ||
    pr.draft ||
    pr.user?.login !== 'github-actions[bot]' ||
    pr.user?.type !== 'Bot' ||
    pr.base?.ref !== 'develop' ||
    pr.base?.repo?.full_name !== repository ||
    pr.head?.ref !== 'changeset-release/develop' ||
    pr.head?.repo?.full_name !== repository ||
    !/^[a-f0-9]{40}$/.test(pr.head?.sha ?? '')
  ) {
    throw new Error('Auto-merge is restricted to the Changesets bot PR in this repository.')
  }
  if (!files.length || files.length !== pr.changed_files) {
    throw new Error('The complete release PR file list is required.')
  }
  const isManifest = (file) => /^packages\/[^/]+\/package\.json$/.test(file.filename)
  for (const file of files) {
    const manifest =
      (isManifest(file) || ['package.json', 'package-lock.json'].includes(file.filename)) &&
      file.status === 'modified'
    const changelog =
      /^packages\/[^/]+\/CHANGELOG\.md$/.test(file.filename) &&
      ['added', 'modified'].includes(file.status)
    const changeset =
      /^\.changeset\/[a-z0-9-]+\.md$/.test(file.filename) && file.status === 'removed'
    if (!manifest && !changelog && !changeset) {
      throw new Error(`Unexpected change in release PR: ${file.filename} (${file.status}).`)
    }
  }
  if (!files.some(isManifest)) throw new Error('A release PR must update a package manifest.')
}

function assertAllowedJsonChanges(base, head, filename) {
  const manifest = /^packages\/[^/]+\/package\.json$/.test(filename)
  const workspacePath = (path) =>
    path[0] === 'packages' &&
    (path[1] === '' || /^packages\/[^/]+$/.test(path[1])) &&
    path.length >= 3
  const dependencySection = new Set([
    'dependencies',
    'devDependencies',
    'optionalDependencies',
    'peerDependencies',
  ])
  const allowed = (path) => {
    if (manifest) {
      return (
        (path.length === 1 && path[0] === 'version') ||
        (path.length === 2 && dependencySection.has(path[0]) && /^@art-liz\//.test(path[1]))
      )
    }
    return (
      (path.length === 3 && workspacePath(path) && path[2] === 'version') ||
      (path.length === 4 &&
        workspacePath(path) &&
        dependencySection.has(path[2]) &&
        /^@art-liz\//.test(path[3]))
    )
  }
  const compare = (before, after, path = []) => {
    if (Object.is(before, after)) return
    if (allowed(path)) return
    if (
      before &&
      after &&
      typeof before === 'object' &&
      typeof after === 'object' &&
      !Array.isArray(before) &&
      !Array.isArray(after)
    ) {
      for (const key of new Set([...Object.keys(before), ...Object.keys(after)]))
        compare(before[key], after[key], [...path, key])
      return
    }
    throw new Error(`Unexpected content change in release file: ${filename}`)
  }
  compare(JSON.parse(base), JSON.parse(head))
}

function readFileAtRef(run, endpoint, filename, ref) {
  const response = JSON.parse(
    run(['api', `${endpoint}/contents/${filename}?ref=${encodeURIComponent(ref)}`]),
  )
  return Buffer.from(response.content, 'base64').toString('utf8')
}

export function enableReleaseAutomerge({ repository, number, dryRun = false, run = runGh }) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository ?? '') || !/^[1-9]\d*$/.test(String(number))) {
    throw new Error('A repository and positive release PR number are required.')
  }
  const endpoint = `repos/${repository}`
  const pr = JSON.parse(run(['api', `${endpoint}/pulls/${number}`]))
  const files = JSON.parse(
    run(['api', `${endpoint}/pulls/${number}/files`, '--paginate', '--slurp']),
  ).flat()
  validateReleasePullRequest(pr, files, repository)
  for (const file of files) {
    if (
      /^packages\/[^/]+\/package\.json$/.test(file.filename) ||
      file.filename === 'package-lock.json'
    ) {
      assertAllowedJsonChanges(
        readFileAtRef(run, endpoint, file.filename, pr.base.sha),
        readFileAtRef(run, endpoint, file.filename, pr.head.sha),
        file.filename,
      )
    }
  }

  const checks = JSON.parse(
    run(['api', `${endpoint}/commits/${pr.head.sha}/check-runs`, '--paginate', '--slurp']),
  ).flatMap((page) => page.check_runs)
  const passed = requiredChecks.every((name) => {
    const latest = checks
      .filter((check) => check.name === name && check.app?.id === 15368)
      .sort((a, b) => b.id - a.id)[0]
    return latest?.conclusion === 'success'
  })
  const commands = []
  // Explicit dispatch works even when the PR was created using GITHUB_TOKEN.
  if (!passed) {
    for (const workflow of ['ci.yml', 'pr-branch-policy.yml']) {
      commands.push(['workflow', 'run', workflow, '--repo', repository, '--ref', pr.head.ref])
    }
  }
  commands.push([
    'pr',
    'merge',
    String(number),
    '--repo',
    repository,
    '--auto',
    '--squash',
    '--match-head-commit',
    pr.head.sha,
  ])
  if (!dryRun) for (const command of commands) run(command)
  return { number: Number(number), sha: pr.head.sha, dryRun, commands }
}

function runGh(args) {
  return execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] })
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const plan = enableReleaseAutomerge({
    repository: process.env.GITHUB_REPOSITORY ?? process.env.GH_REPO,
    number: process.env.RELEASE_PR_NUMBER,
    dryRun: process.argv.includes('--dry-run'),
  })
  console.log(JSON.stringify(plan, null, 2))
}
