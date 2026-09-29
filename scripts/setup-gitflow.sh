#!/usr/bin/env bash
set -euo pipefail

usage() {
  printf 'Usage: bash scripts/setup-gitflow.sh --repo OWNER/REPO [--apply] [--replace-protection]\n'
}

repository=''
apply_changes=false
replace_protection=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --repo)
      repository="${2:-}"
      shift 2
      ;;
    --apply)
      apply_changes=true
      shift
      ;;
    --replace-protection)
      replace_protection=true
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      usage >&2
      exit 2
      ;;
  esac
done

if [[ ! "$repository" =~ ^[^/]+/[^/]+$ ]]; then
  usage >&2
  exit 2
fi

if ! command -v gh >/dev/null 2>&1; then
  printf 'GitHub CLI (gh) is required.\n' >&2
  exit 1
fi

gh auth status
permission="$(gh repo view "$repository" --json viewerPermission --jq '.viewerPermission')"
if [[ "$permission" != 'ADMIN' ]]; then
  printf 'Admin permission is required for %s (current permission: %s).\n' "$repository" "$permission" >&2
  exit 1
fi

default_branch="$(gh repo view "$repository" --json defaultBranchRef --jq '.defaultBranchRef.name')"
if [[ "$default_branch" != 'main' ]]; then
  printf 'Expected main as the current default branch; found %s. Review the migration before continuing.\n' "$default_branch" >&2
  exit 1
fi

main_sha="$(gh api "repos/$repository/git/ref/heads/main" --jq '.object.sha')"
workflows_ready=true
for workflow in ci.yml pr-branch-policy.yml; do
  if ! gh api "repos/$repository/contents/.github/workflows/$workflow" -f ref=main --jq '.path' >/dev/null 2>&1; then
    workflows_ready=false
    printf 'Missing on main: .github/workflows/%s\n' "$workflow"
  fi
done

if gh api "repos/$repository/branches/develop" >/dev/null 2>&1; then
  develop_action='keep existing develop branch unchanged'
else
  develop_action="create develop at main commit $main_sha"
fi

protected_branches=()
for branch in main develop; do
  if gh api "repos/$repository/branches/$branch/protection" >/dev/null 2>&1; then
    protected_branches+=("$branch")
  fi
done

printf 'Repository: %s\n' "$repository"
printf 'Current default branch: %s\n' "$default_branch"
printf 'Plan: %s; require pull requests and CI checks on main/develop; block admin bypass, force-pushes, and deletion; set develop as default last.\n' "$develop_action"
if [[ "$workflows_ready" != true ]]; then
  printf 'The required workflows are not both present on main yet.\n'
fi
if [[ ${#protected_branches[@]} -gt 0 ]]; then
  printf 'Existing protection found on: %s\n' "${protected_branches[*]}"
fi

if [[ "$apply_changes" != true ]]; then
  printf 'Dry run only. Merge and validate both workflows on main, review existing protections, then rerun with --apply.\n'
  exit 0
fi

if [[ "$workflows_ready" != true ]]; then
  printf 'Refusing to apply: publish both required workflows to main first.\n' >&2
  exit 1
fi

if [[ ${#protected_branches[@]} -gt 0 && "$replace_protection" != true ]]; then
  printf 'Refusing to overwrite existing branch protection. Review it, then explicitly pass --replace-protection if replacement is intended.\n' >&2
  exit 1
fi

read -r -p "Type 'apply' to update $repository branch settings: " confirmation
if [[ "$confirmation" != 'apply' ]]; then
  printf 'Cancelled without applying changes.\n'
  exit 1
fi

if [[ "$develop_action" != 'keep existing develop branch unchanged' ]]; then
  gh api --method POST "repos/$repository/git/refs" \
    -f ref='refs/heads/develop' \
    -f sha="$main_sha" >/dev/null
fi

protection_payload='{"required_status_checks":{"strict":true,"contexts":["Quality gates","Allowed source branch"]},"enforce_admins":true,"required_pull_request_reviews":{"dismiss_stale_reviews":true,"required_approving_review_count":0},"restrictions":null,"allow_force_pushes":false,"allow_deletions":false}'

for branch in main develop; do
  gh api --method PUT "repos/$repository/branches/$branch/protection" \
    --input - <<<"$protection_payload" >/dev/null
done

gh api --method PATCH "repos/$repository" -f default_branch=develop >/dev/null
printf 'GitFlow settings applied. Verify the default branch, protection rules, and required checks in GitHub.\n'