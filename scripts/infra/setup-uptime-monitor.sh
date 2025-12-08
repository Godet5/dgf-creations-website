#!/usr/bin/env bash
set -euo pipefail

# Configure an UptimeRobot monitor for dgf-creations.com

API_KEY="${UPTIMEROBOT_API_KEY:-}"
MONITOR_URL="https://dgf-creations.com"
FRIENDLY_NAME="dgf-creations-main"

if [ -z "$API_KEY" ]; then
  echo "ERROR: UPTIMEROBOT_API_KEY not set."
  exit 1
fi

echo "Creating (or attempting to create) UptimeRobot monitor for $MONITOR_URL"

curl -s -X POST https://api.uptimerobot.com/v2/newMonitor \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "api_key=${API_KEY}" \
  -d "format=json" \
  -d "type=1" \
  -d "url=${MONITOR_URL}" \
  -d "friendly_name=${FRIENDLY_NAME}" \
  | jq .

echo "Done. Check your UptimeRobot dashboard to confirm."
