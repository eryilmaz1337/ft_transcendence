# Use the official Python image as the base image
FROM python:3.8-slim

# Set the working directory to /app

# Copy the current directory contents into the container at /app
# COPY ./app ../app
WORKDIR /app

COPY requirements.txt .
# Install any dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt


# Expose port 8000 for the Django application
EXPOSE 8000

# Run the Django development server
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
