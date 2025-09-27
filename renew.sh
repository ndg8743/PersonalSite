#!/bin/bash
cd /root/PersonalSite
/usr/bin/docker compose run --rm certbot renew
/usr/bin/docker compose restart nginx
