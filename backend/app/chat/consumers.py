from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # WebSocket bağlantısı kabul edildiğinde çalışacak kod
        await self.accept()

    async def disconnect(self, close_code):
        # WebSocket bağlantısı kesildiğinde çalışacak kod
        pass

    async def receive(self, text_data):
        # WebSocket'ten veri alındığında çalışacak kod
        print("Alınan veri:", text_data)
        
        # Gelen mesajı aynı istemciye geri gönder
        await self.send(text_data=text_data)

    async def sendMessage(self, event):
        message = event["message"]
        username = event["username"]
        await self.send(text_data=json.dumps({"message": message, "username": username}))
