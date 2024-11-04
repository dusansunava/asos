#!/bin/sh
set -e

# Substitute environment variables in nginx.conf.template
envsubst '${VITE_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start nginx
exec nginx -g 'daemon off;'