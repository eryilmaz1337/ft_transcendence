from django.db import models

class Room(models.Model):
    name = models.CharField(max_length=60)
    slug = models.CharField(max_length=60)

    def __str__(self):
        return f"Room: {self.name} | Id: {self.slug}"

class UserMessage(models.Model):
    username = models.CharField(max_length=60, default='none')
    message = models.TextField()
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

    def __str__(self):
        return f"Message: {self.message} by {self.username}"
