from django.db import models

class users(models.Model):
    online = models.BooleanField(default=False)
    username = models.CharField(max_length=60, primary_key=True)
    name = models.CharField(max_length=60, default='none')
    surname = models.CharField(max_length=60, default='none')
    email = models.CharField(max_length=60, default='none')
    password = models.CharField(max_length=100, default='none')
    # profile_image = models.ImageField(upload_to='profile_images/', default='profile_images/default.jpg')
    def __str__(self):
        return f"Username: {self.username}, Name: {self.name} {self.surname}, email: {self.email}"