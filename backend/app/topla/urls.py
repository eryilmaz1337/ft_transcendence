from django.urls import path
from .views import add_numbers, add_value

urlpatterns = [
    path('add/', add_numbers, name='add_numbers'),
    path('add_value/', add_value, name='add_value'),
]
