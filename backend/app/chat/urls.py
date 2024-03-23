from django.urls import path
from .views import user_mass

urlpatterns = [
    path("<str:slug>", user_mass, name="user_mass"),
]