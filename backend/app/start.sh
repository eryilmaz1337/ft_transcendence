#!/bin/sh

echo "Waiting for the database to be ready..."
until python3 /app/manage.py shell -c "from django.db import connections; connections['default'].cursor()"; do
  sleep 2
  echo "Waiting for database..."
done

echo "Database is ready!"

echo "Applying database migrations..."
python3 /app/manage.py migrate

echo "Starting Django development server..."
python3 /app/manage.py runserver 0.0.0.0:8000