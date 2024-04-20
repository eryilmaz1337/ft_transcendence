from django.urls import path, re_path
from django.views.static import serve
from .views import singup ,singin, account42, accountdataedit, userauthenticator ,upload_image
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('singup/',singup, name='singup'),
    path('singin/',singin, name='singin'),
    path('42-api/',account42, name='account42'),
    path('account-edit/', accountdataedit, name='accountdataedit'),
    path('userauthenticator/', userauthenticator, name='userauthenticator'),
    path('upload/', upload_image, name='upload_image'),
    re_path(r'^api/account/media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)