from django.urls import path
from .views import singup ,singin, account42, accountdataedit

urlpatterns = [
    path('singup/',singup, name='singup'),
    path('singin/',singin, name='singin'),
    path('42-api/',account42, name='account42'),
    path('account-edit/', accountdataedit, name='accountdataedit')
]
