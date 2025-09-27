#!/bin/bash

# Stop and remove all containers
docker-compose down

# Build and start the containers with environment variables
docker-compose up --build -d

# Show status of containers
docker-compose ps
