# Use the official Python image as the base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install any dependencies specified in requirements.txt
# RUN apt-get update && apt-get install -y build-essential
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 8000 for the Django application
EXPOSE 8000

# Copy the startup script into the container and make it executable
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Run the startup script to initialize and then start the Django server
ENTRYPOINT ["/start.sh"]