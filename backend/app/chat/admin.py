from django.contrib import admin
from .models import user_message,Room

admin.site.register(user_message)
admin.site.register(Room)