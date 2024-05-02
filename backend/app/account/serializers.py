# serializers.py
from rest_framework import serializers

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField(max_length=None, allow_empty_file=False)
    description = serializers.CharField(max_length=255, required=False)
