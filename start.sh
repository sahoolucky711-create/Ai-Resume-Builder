#!/bin/bash

pip install --upgrade pip

pip install --upgrade setuptools

pip install --no-cache-dir -r requirements.txt

cd backend

python manage.py migrate --noinput

python manage.py collectstatic --noinput

gunicorn config.wsgi:application --bind 0.0.0.0:$PORT