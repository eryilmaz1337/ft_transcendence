from django.urls import path
from .views import singup ,singin

urlpatterns = [
    path('singup/',singup, name='singup'),
    path('singin/',singin, name='singin'),
]
