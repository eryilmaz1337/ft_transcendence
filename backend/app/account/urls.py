from django.urls import path, re_path
from django.views.static import serve
from .views import singup ,singin, account42, accountdataedit, userauthenticator, upload_image, onlineusers, offlineusers, friendsadd ,getfriends, darklistadd, tournament
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('singup/',singup, name='singup'),
    path('singin/',singin, name='singin'),
    path('42-api/',account42, name='account42'),
    path('account-edit/', accountdataedit, name='accountdataedit'),
    path('userauthenticator/', userauthenticator, name='userauthenticator'),
    path('upload/', upload_image, name='upload_image'),
    path('onlineusers/', onlineusers, name='onlineusers'),
    path('offlineusers/', offlineusers, name='offlineusers'),
    path('friendsadd/', friendsadd, name='friendsadd'),
    path('getfriends/', getfriends, name='getfriends'),
    path('darklistadd/', darklistadd, name='darklistadd'),
    path('tournament/', tournament, name='tournament'),
    re_path(r'^api/account/media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)