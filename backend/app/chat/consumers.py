from channels.generic.websocket import AsyncWebsocketConsumer
import requests
from asgiref.sync import sync_to_async
from chat.models import Room, UserMessage
import aiohttp
# from account.views import include

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        skey = self.scope['url_route']['kwargs']['room_slug']
        api_url = 'http://localhost:8000/api/account/userauthenticator/'
        data = {'skey': skey}

        async with aiohttp.ClientSession() as session:
            async with session.post(api_url, json=data) as response:
                json_response = await response.json()
        if json_response.get('success'):
           await self.accept()
    
    async def disconnect(self, close_code):
        skey = self.scope['url_route']['kwargs']['room_slug']
        api_url = 'http://localhost:8000/api/account/userauthenticator/'
        data = {'skey': skey}

        async with aiohttp.ClientSession() as session:
            async with session.post(api_url, json=data) as response:
                json_response = await response.json()
    # WebSocket'ten veri alındığında çalışacak kod
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get("message")
        username = text_data_json.get("username")
        room_name = text_data_json.get("room_name")
        
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
        await self.send(text_data=text_data)

    # async def connect(self):
        
    #     # Bağlantı kurulduğunda account uygulamasındaki bir view'e istek gönder
    #     await self.accept()
    #     skey = self.scope['url_route']['kwargs']['room_slug']
    #     api_url = 'http://localhost:8000/api/account/userauthenticator/'
    #     data = {'skey': skey}
    #     response = requests.post(api_url, json=data)
    #     # İşlem başarıyla gerçekleştirildiyse, cevap döndürülebilir
        # if response.status_code == 200:
        #     await self.send(text_data="Bağlantı başarıyla kuruldu!")
        # api_url = 'http://localhost:8000/api/account/userauthenticator/'
        # data = {'skey': skey}
        # response = requests.post(api_url, json=data)
        # json_response = response.json()
        # if json_response.get("success") == True:


    # # WebSocket'ten veri alındığında çalışacak kod
    # async def receive(self, text_data):
    #     text_data_json = json.loads(text_data)
    #     message = text_data_json.get("message")
    #     username = text_data_json.get("username")
    #     room_name = text_data_json.get("room_name")
        
    #     await self.save_message(message, username, room_name)

    #     await self.channel_layer.group_send(
    #         self.roomGroupName, {
    #             "type": "sendMessage",
    #             "message": message,
    #             "username": username,
    #             "room_name": room_name,
    #         }
    #     )

    #     # Gelen mesajı aynı istemciye geri gönder
    #     # print("Alınan veri:", text_data)
    #     await self.send(text_data=text_data)

    # async def sendMessage(self, event):
    #     message = event["message"]
    #     username = event["username"]
    #     await self.send(text_data=json.dumps({"message": message, "username": username}))

    # @sync_to_async
    # def save_message(self, message, username, room_name):
    #     room, created = Room.objects.get_or_create(name=room_name)
    #     if created:
    #         print("New room created:", room_name)
    #     print(username,room_name,"----------------------")

    #     room=Room.objects.get(name=room_name)
        
    #     UserMessage.objects.create(username=username,room=room,message=message)
