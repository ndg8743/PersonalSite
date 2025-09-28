#!/bin/bash
docker compose -f /root/nginx/docker-compose.yml run --rm certbot certonly --webroot --webroot-path /var/www/html -d gopee.dev -d www.gopee.dev --email admin@gopee.dev --agree-tos --no-eff-email
