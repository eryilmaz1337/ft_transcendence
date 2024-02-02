from django.urls import path
from .views import add_numbers

urlpatterns = [
    path('add/', add_numbers, name='add_numbers'),
]
