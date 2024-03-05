# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Chat

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Save message to database
        sender_id = self.scope["user"].id  # Assuming you're using Django's built-in user authentication
        sender = await self.get_username(sender_id)
        chat = Chat.objects.create(room_name=self.room_name, sender=sender, message=message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat.message',
                'message': message,
                'sender': sender,
                'timestamp': chat.timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            }
        )

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']
        timestamp = event['timestamp']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender,
            'timestamp': timestamp,
        }))

    async def get_username(self, user_id):
        # Function to get the username from user_id, modify as per your user model
        # For example, if you have a custom User model with a 'username' field:
        # return YourCustomUserModel.objects.get(id=user_id).username
        return str(user_id)
