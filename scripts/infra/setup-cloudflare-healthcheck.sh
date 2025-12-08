#!/usr/bin/env bash
set -euo pipefail

CF_API_TOKEN="${CLOUDFLARE_API_TOKEN:-}"
CF_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-}"
CF_ZONE_ID="${CLOUDFLARE_ZONE_ID:-}"

if [ -z "$CF_API_TOKEN" ] || [ -z "$CF_ACCOUNT_ID" ] || [ -z "$CF_ZONE_ID" ]; then
  echo "ERROR: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, or CLOUDFLARE_ZONE_ID missing."
  exit 1
fi

NAME="dgf-creations-healthcheck"
ORIGIN_URL="https://dgf-creations.com"

echo "Creating Cloudflare health check for ${ORIGIN_URL}"

curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/load_balancers/monitors" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @- <<EOF | jq .
{
  "type": "https",
  "description": "${NAME}",
  "method": "GET",
  "path": "/",
  "timeout": 5,
  "retries": 2,
  "interval": 60,
  "expected_body": "",
  "expected_codes": "200",
  "follow_redirects": true,
  "allow_insecure": false,
  "header": {},
  "probe_zone": "dgf-creations.com"
}
EOF

echo "Health check request submitted. Wire it into your Load Balancer / origins as needed."
