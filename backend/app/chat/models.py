from django.db import models
# from django.contrib.auth.models import User
# Create your models here.
class user_message(models.Model):
    username = models.CharField(max_length=60,default='none')
    room_id= models.CharField(max_length=60,default='none')
    massage = models.CharField(max_length=60,default='none')
    def __str__(self):
        return "Room : "+self.username
