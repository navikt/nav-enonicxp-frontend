#!/bin/bash

# Script for building failover-images for dev-environments
# Usage: In root, run "npm run build-and-push-dev-failover --app_env=dev1|dev2 --image_tag=din-valgte-image-tag-123"
#
# (GAR uses DIGEST instead of TAG, so the image tag you use is not important.)
#
# About secrets:
# As NPM packages with ie post-install scripts could potentially sniff and compromise secrets,
# we need to read secrets from environment variables instead.
#
# The secrets are: NAV_ENONICXP_DEV1 AND NAV_ENONICXP_DEV2
#
# Either add these manually via "export NAV_ENONICXP_DEV1=YOUR_TOKEN_HERE" or use 1Password or similar to have secrets
# injected into each Terminal session.

APP_ENV=$1
IMAGE_TAG=$2

echo $IMAGE_TAG

if [[ -z $IMAGE_TAG ]]
then
  echo "Image tag must be specified"
  exit
fi

if [[ "$APP_ENV" == "dev1" ]]
then
  echo "Building image $IMAGE_TAG for dev1"
  SERVICE_SECRET=$NAV_ENONICXP_DEV1
  ENV_FILE=".env-dev1"
elif [[ "$APP_ENV" == "dev2" ]]
then
  echo "Building image $IMAGE_TAG for dev2"
  SERVICE_SECRET=$NAV_ENONICXP_DEV2
  ENV_FILE=".env-dev2"
else
  echo "Invalid ENV specified, aborting"
  exit
fi

IMAGE_NAME_FULL="europe-north1-docker.pkg.dev/nais-management-233d/navno/nav-enonicxp-frontend:$IMAGE_TAG"

docker buildx build --platform linux/amd64 -f .failover/Dockerfile.failover -t "$IMAGE_NAME_FULL" --no-cache --build-arg ENV_FILE="$ENV_FILE" --build-arg SERVICE_SECRET="$SERVICE_SECRET" --build-arg GITHUB_PAT="$GITHUB_PAT" .
docker push $IMAGE_NAME_FULL
