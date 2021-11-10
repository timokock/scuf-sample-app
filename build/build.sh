#!/bin/bash
export ERROR=$'ERROR:\t'
export WARN=$'WARN:\t'
export INFO=$'INFO:\t'

SPEC_REGISTRY_URL="docker-registry-default.${bamboo_SPEC_BASE_URL}"

echo "${INFO}Starting docker daemon"
(dockerd-entrypoint.sh $DOCKER_DAEMON_ARGS --insecure-registry=$SPEC_REGISTRY_URL >> docker_logs.txt 2>&1) || (echo "${ERROR}Docker Start failed...  Did you remember to run with --privileged?" && cat docker_logs.txt) &

# WAIT FOR DOCKER TO START
docker_timeout_counter=1
docker ps >> /dev/null 2>&1
while [[ $? != 0 ]]; do
  if [[ "$docker_timeout_counter" -gt 5 ]]; then 
    echo "${ERROR}Exceeded max retry for connecting to docker..."
    exit 1
  fi
  docker_timeout_counter=$((docker_timeout_counter+1))
  echo "${INFO}Waiting for Docker to start..."
  sleep 1
  docker ps >> /dev/null 2>&1
done

VERSION_TAG=${SPEC_REGISTRY_URL}/aero-connected-maintenance-portal/scuf-cmp:${bamboo_buildNumber}

echo "${INFO}Building docker image"
docker build -t $VERSION_TAG /data || exit 1

if [ $bamboo_planRepository_branchName == "master" ]; then
  echo "${INFO}Starting deployment"
  
  echo "${INFO}Logging into spec"
  oc login --token "$bamboo_SERVICE_ACCOUNT_TOKEN" console.$bamboo_SPEC_BASE_URL
  
  echo "${INFO}Logging into docker"
  OPENSHIFT_REGISTRY_USERNAME="serviceaccount"
  OPENSHIFT_REGISTRY_PASSWORD="$bamboo_SERVICE_ACCOUNT_TOKEN"
  docker login -u "$OPENSHIFT_REGISTRY_USERNAME" -p "$OPENSHIFT_REGISTRY_PASSWORD" "$SPEC_REGISTRY_URL" || exit 1

  echo "${INFO}Pushing docker image to $VERSION_TAG"
  docker push $VERSION_TAG || exit 1
  
  echo "${INFO}Deploying..."
  IMAGE_STREAM=`oc get is scuf-cmp --template='{{.status.dockerImageRepository}}'`
  oc process -f /data/build/deployment.yml -p IMAGE_TAG=$IMAGE_STREAM:${bamboo_buildNumber} --local | oc apply -n aero-connected-maintenance-portal -f -
  echo "${INFO}Done deploying"
else
  echo "${INFO}Not deploying image due to not being on master branch"
fi