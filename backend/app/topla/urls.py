# topla/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('topla/', views.calculate_sum, name='calculate_sum'),
]
