# myapp/models.py

from django.db import models

class TabloT(models.Model):
    # Otomatik artan anahtar alanı, her yeni kayıt için otomatik olarak artar
    # primary_key=True ile anahtar alanını belirtiyoruz
    id = models.AutoField(primary_key=True)
    # Diğer alanlar buraya eklenmeli, sizin frontend'den alacağınız veriye göre
    # Örneğin:
    deger = models.CharField(max_length=255)  # Varsayılan maksimum uzunluk 255 karakter
