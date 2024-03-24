import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        # Her bağlantı için benzersiz bir kimlik oluştur
        self.user_id = self.scope["user"].id

        # Bağlantıyı kabul et
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        # Gelen mesajı al
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Mesajı gönderilecek kullanıcının kimliğini al
        to_user_id = text_data_json['to_user_id']

        # Mesajı alıcıya gönder
        self.send_user_message(to_user_id, message)

    def send_user_message(self, to_user_id, message):
        # Mesajı gönderecek kanal adını oluştur
        channel_name = f"user_{to_user_id}"

        # Mesajı alıcıya gönder
        async_to_sync(self.channel_layer.send)(
            channel_name,
            {
                "type": "chat.message",
                "message": message,
                "from_user_id": self.user_id,
            }
        )

    def chat_message(self, event):
        # Mesajı WebSocket'e gönder
        self.send(text_data=json.dumps(event))
