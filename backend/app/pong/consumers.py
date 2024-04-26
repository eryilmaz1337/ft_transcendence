from channels.generic.websocket import AsyncWebsocketConsumer
import json

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'game_{self.room_name}'

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

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json['type']

        if message_type == 'ballMove':
            x = text_data_json['x']
            y = text_data_json['y']
            # Process ball movement here

        elif message_type == 'paddleMove':
            y = text_data_json['y']
            # Process paddle movement here

        elif message_type == 'scoreUpdate':
            if 'player1Score' in text_data_json:
                player1_score = text_data_json['player1Score']
                # Process player 1 score update here
            elif 'player2Score' in text_data_json:
                player2_score = text_data_json['player2Score']
                # Process player 2 score update here

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_message',
                'message': text_data_json
            }
        )

    # Receive message from room group
    async def game_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
