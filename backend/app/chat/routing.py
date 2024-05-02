from django.urls import path
from .consumers import ChatConsumer

websocket_urlpatterns = [
    #path('ws/chat/', ChatConsumer.as_asgi()),
    path("ws/chat/<str:room_slug>/", ChatConsumer.as_asgi()),
]