#!/bin/bash

# Exit on any error
set -e

# Navigate to the project directory
cd /root/PersonalSite

# Load environment variables
if [ -f .env ]; then
  source .env
  echo "Environment variables loaded."
else
  echo "Error: .env file not found."
  exit 1
fi

# Build and deploy
echo "Starting deployment process..."

# Stop any running containers
echo "Stopping any existing containers..."
docker-compose down

# Build and start containers
echo "Building and starting containers..."
docker-compose up --build -d

# Show running containers
echo "Deployment complete. Running containers:"
docker-compose ps

echo "The website should now be accessible at https://gopee.dev"
