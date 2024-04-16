from django.contrib import admin
from .models import users, UploadedFile

admin.site.register(users)
admin.site.register(UploadedFile)
