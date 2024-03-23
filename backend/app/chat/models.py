from django.db import models
# from django.contrib.auth.models import User
# Create your models here.
class user_message(models.Model):
    username = models.CharField(max_length=60,default='none')
    target_user_and_users = models.CharField(max_length=60,default='none')
    massage = models.CharField(max_length=60,default='none')
    def __str__(self):
        return "Room : "+self.username
    
# class Message(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     content = models.TextField()
#     room = models.ForeignKey(Room, on_delete=models.CASCADE)
#     created_on = models.DateTimeField(auto_now_add=True)


#     def __str__(self):
#         return "Message is :- "+ self.content