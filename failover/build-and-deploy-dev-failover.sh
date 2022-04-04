#!/bin/bash

# script for building failover-images for dev-environments locally

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
  SERVICE_SECRET=$(<.secret-dev1)
  ENV_FILE=".env-dev1"
elif [[ "$APP_ENV" == "dev2" ]]
then
  echo "Building image $IMAGE_NAME for dev2"
  SERVICE_SECRET=$(<.secret-dev2)
  ENV_FILE=".env-dev2"
else
  echo "Invalid ENV specified, aborting"
  exit
fi

GITHUB_PAT=$(<../.github-token)
IMAGE_NAME_FULL="ghcr.io/navikt/nav-enonicxp-frontend:$IMAGE_NAME"

docker build -f Dockerfile -t "$IMAGE_NAME_FULL" --no-cache --build-arg ENV_FILE="$ENV_FILE" --build-arg SERVICE_SECRET="$SERVICE_SECRET" --build-arg GITHUB_PAT="$GITHUB_PAT" ../.
docker push "$IMAGE_NAME_FULL"

npx run-func ../trigger-workflow.js triggerWorkflow deploy-image.yml "" "{\"image\":\"$IMAGE_NAME_FULL\", \"app_env\":\"$APP_ENV\"}"