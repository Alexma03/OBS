#!/usr/bin/env bash
set -euo pipefail

# Deploy OBS Astro overlays to Cloudflare Workers.
# Uses the cf CLI OAuth session (cf auth login).

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

AUTH_FILE="${CF_AUTH_FILE:-$HOME/Library/Preferences/.cf/auth.jsonc}"
if [[ ! -f "$AUTH_FILE" ]]; then
	echo "No cf auth session found. Run: cf auth login" >&2
	exit 1
fi

export CLOUDFLARE_API_TOKEN
CLOUDFLARE_API_TOKEN="$(
	node -e "
const fs = require('fs');
const raw = fs.readFileSync(process.argv[1], 'utf8')
  .replace(/^\\s*\\/\\/.*$/gm, '')
  .replace(/,\\s*([}\\]])/g, '\$1');
const { oauth_token } = JSON.parse(raw);
if (!oauth_token) {
  console.error('cf auth session missing oauth_token');
  process.exit(1);
}
process.stdout.write(oauth_token);
" "$AUTH_FILE"
)"

export CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-c3f9252496fef01a2039f9cd3297880c}"

npm run build
npx wrangler deploy
