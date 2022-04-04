echo "Installing docker"
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

echo "Adding docker user"
addgroup $(whoami) docker

echo "Installing dependencies"
npm ci

echo "Building application"
npm run build

echo "Login to ghcr docker registry"
echo $GITHUB_PAT | docker login ghcr.io -u $GITHUB_USER --password-stdin

echo "Building docker image"
docker build -t $IMAGE_NAME .

echo "Pushing docker image"
docker push $IMAGE_NAME

#echo "Deploying to NAIS k8s"
#./deploy \
#--apikey="$NAIS_DEPLOY_APIKEY" \
#--cluster="$NAIS_CLUSTER_NAME" \
#--repository="nav-enonicxp-frontend" \
#--resource="/app/.nais/config-failover.yml" \
#--var="image=$IMAGE_NAME,$GITHUB_PAT=$GITHUB_PAT" \
#--vars="/app/.nais/vars-$APP_ENV-failover.yml" \
#--wait=true