from django.db import models
# from django.contrib.auth.models import User
# Create your models here.

class Room(models.Model):
    name = models.CharField(max_length=60)
    slug = models.CharField(max_length=60)

    def __str__(self):
        return "Room : " + self.name + " | Id: " + self.slug

# models.CASCADE room silinirse bağlı olduğu user_message classını silmeye yarar.
class user_message(models.Model):
    username = models.CharField(max_length=60,default='none')
    massage = models.TextField()
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

    def __str__(self):
        return "Message : " + self.message
