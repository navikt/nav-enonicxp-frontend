#!/bin/bash

# Script for building failover-images for dev-environments
# Usage: "build-dev-failover-image.sh <dev1|dev2> <image name>"
#
# About secrets:
# As NPM packages with ie post-install scripts could potentially sniff and compromise secrets,
# we need to read secrets from environment variables. These variables should be set using
# ie. 1Password CLI or similar.
#
# The secrets are: NAV_ENONICXP_DEV1, NAV_ENONICXP_DEV2 AND GITHUB_PAT.
#
# Once the image is built, use the relevant deploy action on Github with the chosen
# image name to deploy

APP_ENV=$1
IMAGE_NAME=$2

echo $IMAGE_NAME

if [[ -z $IMAGE_NAME ]]
then
  echo "Image name must be specified"
  exit
fi

if [[ "$APP_ENV" == "dev1" ]]
then
  echo "Building image $IMAGE_NAME for dev1"
  SERVICE_SECRET=$NAV_ENONICXP_DEV1
  ENV_FILE=".env-dev1"
elif [[ "$APP_ENV" == "dev2" ]]
then
  echo "Building image $IMAGE_NAME for dev2"
  SERVICE_SECRET=$NAV_ENONICXP_DEV2
  ENV_FILE=".env-dev2"
else
  echo "Invalid ENV specified, aborting"
  exit
fi

IMAGE_NAME_FULL="ghcr.io/navikt/nav-enonicxp-frontend:$IMAGE_NAME"

docker build -f Dockerfile -t "$IMAGE_NAME_FULL" --no-cache --build-arg ENV_FILE="$ENV_FILE" --build-arg SERVICE_SECRET="$SERVICE_SECRET" --build-arg GITHUB_PAT="$GITHUB_PAT" ../.
docker push $IMAGE_NAME_FULL
