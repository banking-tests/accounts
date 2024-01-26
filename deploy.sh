#!/bin/bash

if [ -f .env ]; then
  source .env
fi

CONTAINER_NAME="$COMPOSE_PROJECT_NAME"
TAG=$1

AWS_REGION=$(echo "$DOCKER_REGISTRY_URI" | cut -d '.' -f 4)
DOCKER_REGISTRY_HOST=$(echo "$DOCKER_REGISTRY_URI" | cut -d '/' -f 1)
aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$DOCKER_REGISTRY_HOST"

docker pull "$DOCKER_REGISTRY_URI:$TAG"

CURRENT_CONTAINER_ID=$(docker ps -qf "name=$CONTAINER_NAME")

if [ -z "$CURRENT_CONTAINER_ID" ]
    docker stop "$CURRENT_CONTAINER_ID" && docker rm "$CURRENT_CONTAINER_ID"
then
    echo "No current container $CONTAINER_NAME"
fi

shift

TEMP_CONTAINER_NAME="$CONTAINER_NAME-temp"

docker run -d --name "$TEMP_CONTAINER_NAME" "$@" "$DOCKER_REGISTRY_URI:$TAG"
docker rename "$TEMP_CONTAINER_NAME" "$CONTAINER_NAME"
