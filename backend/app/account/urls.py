from django.urls import path
from .views import singup ,singin, account42, accountdataedit, upload_image

urlpatterns = [
    path('singup/',singup, name='singup'),
    path('singin/',singin, name='singin'),
    path('42-api/',account42, name='account42'),
    path('account-edit/', accountdataedit, name='accountdataedit'),
    path('upload/', upload_image, name='upload_image'),
]
