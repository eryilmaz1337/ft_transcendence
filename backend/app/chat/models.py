# models.py
from django.db import models
from django.contrib.auth.models import User  # Eğer kullanıcı ilişkilendirmesi yapmak istiyorsanız

class Chat(models.Model):
    room_name = models.CharField(max_length=255)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)  # Örneğin, kullanıcılarla ilişkilendirmek istiyorsanız
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender.username} - {self.timestamp}"
