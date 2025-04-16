#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Default environment
ENV="dev1"

# Process command line arguments
while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    -e|--env)
      ENV="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [-e|--env <dev1|dev2>]"
      exit 1
      ;;
  esac
done

# Validate environment value
if [[ "$ENV" != "dev1" && "$ENV" != "dev2" ]]; then
  echo "Error: Environment must be either 'dev1' or 'dev2'"
  echo "Usage: $0 [-e|--env <dev1|dev2>]"
  exit 1
fi

# Script to fetch site paths and save to JSON file
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_FILE="${SCRIPT_DIR}/sitepath-${ENV}.json"

# Set the host URL based on the environment
HOST_URL=""
if [[ "$ENV" == "dev1" ]]; then
  HOST_URL="https://www.dev.nav.no"
elif [[ "$ENV" == "dev2" ]]; then
  HOST_URL="https://www-q6.nav.no"
fi

# Construct the full URL
PATH_ENDPOINT="/_/service/no.nav.navno/sitecontentPaths"
URL="${HOST_URL}${PATH_ENDPOINT}"

# Convert ENV to uppercase using tr instead of ${ENV^^}
ENV_UPPER=$(echo "$ENV" | tr '[:lower:]' '[:upper:]')
ENV_VAR_NAME="NAV_ENONICXP_${ENV_UPPER}"

# Check if the token environment variable exists
if [ -z "${!ENV_VAR_NAME}" ]; then
  echo "Error: ${ENV_VAR_NAME} environment variable is not set"
  exit 1
fi

echo "Fetching site paths from ${URL} for environment ${ENV}..."

# Fetch the site paths and save to file
curl -s -H "secret: ${!ENV_VAR_NAME}" "${URL}" > "${OUTPUT_FILE}"

# Check if the curl command was successful and the file is not empty
if [ $? -eq 0 ] && [ -s "${OUTPUT_FILE}" ]; then
  echo "Site paths successfully saved to ${OUTPUT_FILE}"
else
  echo "Error: Failed to fetch site paths or received empty response"
  rm -f "${OUTPUT_FILE}"  # Remove the file if it's empty or invalid
  exit 1
fi
