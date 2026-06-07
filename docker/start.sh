#!/bin/sh

sed -i 's/;catch_workers_output = yes/catch_workers_output = yes/g' /usr/local/etc/php-fpm.d/www.conf
sed -i 's/;decorate_workers_output = no/decorate_workers_output = no/g' /usr/local/etc/php-fpm.d/www.conf

php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
php artisan storage:link

php-fpm -D
nginx -g "daemon off;"