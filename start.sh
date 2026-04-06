#!/bin/bash

echo "Installing dependencies..."

pip install --upgrade pip

pip install setuptools

pip install wheel

pip install -r requirements.txt

echo "Starting backend..."

cd backend

python manage.py migrate --noinput

python manage.py collectstatic --noinput

gunicorn config.wsgi:application --bind 0.0.0.0:$PORT