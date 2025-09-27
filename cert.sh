#!/bin/bash

# Load environment variables
if [ -f .env ]; then
  source .env
fi

cd /root/PersonalSite
docker compose run --rm certbot certonly --webroot --webroot-path /var/www/html -d gopee.dev -d www.gopee.dev --email ${REACT_APP_CONTACT_EMAIL} --agree-tos --no-eff-email
