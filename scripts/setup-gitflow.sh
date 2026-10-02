#!/usr/bin/env bash
set -euo pipefail

usage() {
  printf 'Usage: bash scripts/setup-gitflow.sh --repo OWNER/REPO [--apply] [--replace-rulesets]\n'
}

repository=''
apply_changes=false
replace_rulesets=false

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
    --replace-rulesets)
      replace_rulesets=true
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
if [[ "$default_branch" != 'main' && "$default_branch" != 'develop' ]]; then
  printf 'Expected main or develop as the current default branch; found %s. Review the migration before continuing.\n' "$default_branch" >&2
  exit 1
fi

main_sha="$(gh api "repos/$repository/git/ref/heads/main" --jq '.object.sha')"
workflows_ready=true
for workflow in ci.yml pr-branch-policy.yml; do
  if ! gh api --method GET "repos/$repository/contents/.github/workflows/$workflow?ref=$default_branch" --jq '.path' >/dev/null 2>&1; then
    workflows_ready=false
    printf 'Missing on default branch (%s): .github/workflows/%s\n' "$default_branch" "$workflow"
  fi
done

if gh api "repos/$repository/branches/develop" >/dev/null 2>&1; then
  develop_action='keep existing develop branch unchanged'
else
  develop_action="create develop at main commit $main_sha"
fi

ruleset_records="$(gh api "repos/$repository/rulesets?includes_parents=false" --jq '.[] | [.id, .name, .source_type, .enforcement, .target] | @tsv')"
legacy_protected_branches=()
for branch in main develop; do
  if gh api "repos/$repository/branches/$branch/protection" >/dev/null 2>&1; then
    legacy_protected_branches+=("$branch")
  fi
done

find_ruleset_id() {
  local wanted_name="$1"
  local branch_name="$2"
  local branch_ref="refs/heads/$branch_name"
  local found_id=''
  local id name source_type enforcement target includes

  while IFS=$'\t' read -r id name source_type enforcement target; do
    [[ -z "$id" ]] && continue
    includes="$(gh api "repos/$repository/rulesets/$id" --jq '.conditions.ref_name.include // [] | join("|")')"

    if [[ "$name" == "$wanted_name" ]]; then
      if [[ "$source_type" != 'Repository' || "$target" != 'branch' || "$includes" != "$branch_ref" ]]; then
        printf 'Ruleset name collision: %s exists but does not target only %s in this repository.\n' "$wanted_name" "$branch_ref" >&2
        return 1
      fi
      found_id="$id"
    elif [[ "$target" == 'branch' ]]; then
      case "|$includes|" in
        *"|$branch_ref|"*)
          printf 'Another ruleset (%s) already targets %s; review it before adding the GitFlow ruleset.\n' "$name" "$branch_ref" >&2
          return 1
          ;;
      esac
    fi
  done <<< "$ruleset_records"

  printf '%s' "$found_id"
}

if ! main_ruleset_id="$(find_ruleset_id 'main Rules' 'main')"; then
  exit 1
fi
if ! develop_ruleset_id="$(find_ruleset_id 'Develop Rules' 'develop')"; then
  exit 1
fi

printf 'Repository: %s\n' "$repository"
printf 'Current default branch: %s\n' "$default_branch"
printf 'Plan: %s; create/update repository rulesets for main/develop with required PRs and checks, no bypass, deletion/force-push blocks; enable delete-after-merge; set develop as default last.\n' "$develop_action"
if [[ "$workflows_ready" != true ]]; then
  printf 'The required workflows are not both present on the current default branch yet.\n'
fi
if [[ -n "$main_ruleset_id" ]]; then
  printf 'Existing ruleset found: main Rules (id %s); it will be left unchanged unless --replace-rulesets is passed.\n' "$main_ruleset_id"
fi
if [[ -n "$develop_ruleset_id" ]]; then
  printf 'Existing ruleset found: Develop Rules (id %s); it will be left unchanged unless --replace-rulesets is passed.\n' "$develop_ruleset_id"
fi
if [[ ${#legacy_protected_branches[@]} -gt 0 ]]; then
  printf 'Legacy branch protection also exists on: %s; rulesets will layer with it.\n' "${legacy_protected_branches[*]}"
fi

if [[ "$apply_changes" != true ]]; then
  printf 'Dry run only. Confirm both workflows and required checks on the current default branch, then rerun with --apply.\n'
  exit 0
fi

if [[ "$workflows_ready" != true ]]; then
  printf 'Refusing to apply: publish both required workflows to the current default branch first.\n' >&2
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

apply_ruleset() {
  local branch_name="$1"
  local ruleset_name="$2"
  local existing_id="$3"
  local branch_ref="refs/heads/$branch_name"
  local ruleset_payload

  ruleset_payload="$(printf '{"name":"%s","target":"branch","enforcement":"active","conditions":{"ref_name":{"include":["%s"],"exclude":[]}},"rules":[{"type":"deletion"},{"type":"non_fast_forward"},{"type":"required_status_checks","parameters":{"strict_required_status_checks_policy":true,"do_not_enforce_on_create":true,"required_status_checks":[{"context":"Quality gates","integration_id":15368},{"context":"Allowed source branch","integration_id":15368}]}},{"type":"pull_request","parameters":{"required_approving_review_count":0,"dismiss_stale_reviews_on_push":true,"require_code_owner_review":false,"require_last_push_approval":false,"required_review_thread_resolution":false,"require_extra_approval_for_unattributed_changes":true,"allowed_merge_methods":["merge","squash","rebase"]}},{"type":"copilot_code_review","parameters":{"review_on_push":true,"review_draft_pull_requests":false}}],"bypass_actors":[]}' "$ruleset_name" "$branch_ref")"

  if [[ -n "$existing_id" ]]; then
    if [[ "$replace_rulesets" == true ]]; then
      gh api --method PUT "repos/$repository/rulesets/$existing_id" --input - <<<"$ruleset_payload" >/dev/null
      printf 'Updated ruleset: %s\n' "$ruleset_name"
    else
      printf 'Kept existing ruleset unchanged: %s\n' "$ruleset_name"
    fi
  else
    gh api --method POST "repos/$repository/rulesets" --input - <<<"$ruleset_payload" >/dev/null
    printf 'Created ruleset: %s\n' "$ruleset_name"
  fi
}

apply_ruleset 'develop' 'Develop Rules' "$develop_ruleset_id"
apply_ruleset 'main' 'main Rules' "$main_ruleset_id"

gh api --method PATCH "repos/$repository" -F delete_branch_on_merge=true >/dev/null
gh api --method PATCH "repos/$repository" -f default_branch=develop >/dev/null
printf 'GitFlow rulesets applied. Verify rulesets, required checks, default branch, and automatic branch deletion in GitHub.\n'