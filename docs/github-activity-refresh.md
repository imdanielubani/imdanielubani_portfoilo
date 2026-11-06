# GitHub activity graph: instant refresh

The stack card on the home page shows real GitHub contributions for the account
linked in site settings. It refreshes in three ways:

| Trigger | Delay | How |
| --- | --- | --- |
| Push to this repository | Immediate, plus a second refresh 2 minutes later | `.github/workflows/refresh-github-activity.yml` |
| Push to another repository | Immediate, if that repo has the caller workflow | `docs/examples/portfolio-activity-caller.yml` |
| Anything else | Within 15 minutes | Scheduled run of the same workflow |
| Fallback (no workflow) | Within 1 hour | Next.js cache window in `fetch-contributions.ts` |

GitHub itself can take a minute or two to count a new push, which is why the
workflow refreshes twice.

## One-time setup (after the site is deployed)

1. Pick a long random secret, for example `openssl rand -hex 32`.
2. In the hosting provider for `apps/web`, set:
   - `REVALIDATE_SECRET` to that value
   - `GITHUB_TOKEN` (optional but recommended): a fine-grained token with no extra
     permissions. Without it, a public read-only mirror of your profile is used.
3. In this repository: **Settings > Secrets and variables > Actions > New repository secret**
   - `PORTFOLIO_SITE_URL` = the live site URL, e.g. `https://imdanielubani.com`
   - `PORTFOLIO_REVALIDATE_SECRET` = the same secret as step 1
4. Optional, for other repositories: copy `docs/examples/portfolio-activity-caller.yml`
   into `.github/workflows/` of each repo and add the same two secrets there.
   This repository must stay public (or the caller must be in the same account with
   Actions access enabled) for other repos to reuse the workflow.
5. Run **Actions > Refresh GitHub activity > Run workflow** once to confirm it works.

## Making sure your commits count

GitHub only counts a commit on your graph when:

- it is authored with an email verified on your GitHub account
  (Settings > Emails);
- it lands on the default branch (or `gh-pages`) of a repo that is not a fork;
- for private repositories, "Private contributions" is enabled on your profile.

## Notes

- `POST /api/revalidate` checks the secret with a constant-time comparison and
  only accepts tag names and paths that match a strict pattern.
- GitHub pauses scheduled workflows in repositories with no activity for 60 days.
  Any push re-enables them.
