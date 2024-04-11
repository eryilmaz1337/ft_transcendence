from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import sync_to_async
from chat.models import Room, user_message

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_slug']
        self.roomGroupName = self.room_name

        await self.channel_layer.group_add(
            self.roomGroupName,
            self.channel_name
        )
        # WebSocket bağlantısı kabul edildiğinde çalışacak kod
        await self.accept()

    # WebSocket bağlantısı kesildiğinde çalışacak kod
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.roomGroupName,
            self.channel_name
        )

    # WebSocket'ten veri alındığında çalışacak kod
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        username = text_data_json["username"]
        room_name = text_data_json["room_name"]

        if room_name is None:
        # Handle the missing room_name appropriately:
        # Maybe send an error message back to the client or ignore the message
            print("Room name is missing in the message!")
            return
        
        await self.save_message(message, username, room_name)

        await self.channel_layer.group_send(
            self.roomGroupName, {
                "type": "sendMessage",
                "message": message,
                "username": username,
                "room_name": room_name,
            }
        )

        # Gelen mesajı aynı istemciye geri gönder
        # print("Alınan veri:", text_data)
        # await self.send(text_data=text_data)

    async def sendMessage(self, event):
        message = event["message"]
        username = event["username"]
        await self.send(text_data=json.dumps({"message": message, "username": username}))

    @sync_to_async
    def save_message(self, message, username, room_name):
        print(username,room_name,"----------------------")
        room=Room.objects.get(name=room_name)
        
        Message.objects.create(user=user,room=room,content=message)
