from channels.generic.websocket import AsyncWebsocketConsumer
import requests
from asgiref.sync import sync_to_async
import aiohttp
import json

connected_users = {}

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        skey = self.scope['url_route']['kwargs']['room_slug']
        api_url = 'http://localhost:8000/api/account/userauthenticator/'
        data = {'skey': skey}

        async with aiohttp.ClientSession() as session:
            async with session.post(api_url, json=data) as response:
                json_response = await response.json()
        self.username = json_response.get('username')
        connected_users[self.username] = self.channel_name 
        if json_response.get('success'):
            await self.accept()
        else:
            await self.close()
    
    async def disconnect(self, close_code):
        skey = self.scope['url_route']['kwargs']['room_slug']
        api_url = 'http://localhost:8000/api/account/userauthenticator/'
        data = {'skey': skey}

        async with aiohttp.ClientSession() as session:
            async with session.post(api_url, json=data) as response:
                json_response = await response.json()
    # WebSocket'ten veri alındığında çalışacak kod
    async def receive(self, text_data):
          api_url = 'http://localhost:8000/api/account/userauthenticator/'
          data = json.loads(text_data)
          async with aiohttp.ClientSession() as session:
              async with session.post(api_url, json=data) as response:
                    json_response = await response.json()
          if not self.username == data.get("sender"):
            self.send(text_data=json.dumps({
            'message': "Error"
            }))
          else:
            sender_username = data['sender']
            receiver_username = data['receiver_username']
            message = data['message']
            timestamp = data['timestamp']
            receiver_channel_name = connected_users.get(receiver_username)
            if receiver_channel_name:
                await self.channel_layer.send(
                    receiver_channel_name,
                    {
                        "type": "chat.message",
                        "message": message,
                        "sender_username": sender_username,
                        "timestamp": timestamp,
                    },
                )
              
    async def chat_message(self, event):
        message = event['message']
        sender_username = event['sender_username']
        timestamp = event['timestamp']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender_username': sender_username,
            'timestamp': timestamp,
        }))