#!/bin/bash
cd /root/nginx
/usr/bin/docker compose run --rm certbot renew
/usr/bin/docker compose restart nginx
