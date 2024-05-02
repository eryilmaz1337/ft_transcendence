from django.db import models

class users(models.Model):
    online = models.BooleanField(default=False)
    login_42 = models.CharField(max_length=100, default='none')
    securitykey = models.CharField(max_length=60, primary_key=True)
    username = models.CharField(max_length=60,default='none')
    name = models.CharField(max_length=60, default='none')
    surname = models.CharField(max_length=60, default='none')
    email = models.CharField(max_length=60, default='none')
    password = models.CharField(max_length=100, default='none')
    profile_image = models.CharField(max_length=1000, default='notimg')
    def __str__(self):
        return f"Username: {self.username}, Name: {self.name} {self.surname}, email: {self.email}"

class friends(models.Model):
    username = models.CharField(max_length=60,default='none')
    friends = models.CharField(max_length=60,default='none')
    def __str__(self):
        return f"Username: {self.username}, Name: {self.friends}"
    

class darklist(models.Model):
    username = models.CharField(max_length=60,default='none')
    darkfriends = models.CharField(max_length=60,default='none')
    def __str__(self):
        return f"Username: {self.username}, Name: {self.darkfriends}"