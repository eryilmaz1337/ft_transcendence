from django.urls import path
from .views import add_numbers, add_to_tablo_t

urlpatterns = [
    path('add/', add_numbers, name='add_numbers'),
    path('add-to-tablo-t/', add_to_tablo_t, name='add_to_tablo_t'),
]
