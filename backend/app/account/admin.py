from django.contrib import admin
from .models import users
from .models import friends
from .models import darklist
from .models import history

admin.site.register(users)
admin.site.register(friends)
admin.site.register(darklist)
admin.site.register(history)