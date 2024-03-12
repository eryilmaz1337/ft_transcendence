#!/bin/sh
set -e

echo "Waiting for the database to be ready..."
until python /app/manage.py shell -c "from django.db import connections; connections['default'].cursor()"; do
  sleep 2
  echo "Waiting for database..."
done

echo "Database is ready!"

echo "Applying database migrations..."
python /app/manage.py migrate

echo "Starting Django development server..."
python /app/manage.py runserver 0.0.0.0:8000