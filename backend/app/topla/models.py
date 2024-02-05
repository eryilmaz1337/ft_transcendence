from django.db import models

# Create your models here.
# models.py

class MyModel(models.Model):
    value = models.CharField(max_length=255)
