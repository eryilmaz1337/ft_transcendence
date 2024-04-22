from django.contrib import admin
from .models import users
from .models import friends
from .models import darklist

admin.site.register(users)
admin.site.register(friends)
admin.site.register(darklist)