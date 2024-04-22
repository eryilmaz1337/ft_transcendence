from django.conf import settings
from django.core.files.storage import default_storage
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .serializers import FileUploadSerializer
from django.utils.crypto import get_random_string

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.shortcuts import render
from .models import users
import json
import requests
import random
import string


def generate_random_string():
    length=42
    # Kullanılacak karakterler
    characters = string.ascii_letters + string.digits
    # Rasgele dize oluşturma
    random_string = ''.join(random.choice(characters) for _ in range(length))
    while users.objects.filter(securitykey=random_string).exists():
        random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string

@csrf_exempt
def singup(request):
    if request.method == 'POST':
            data = json.loads(request.body)
            users.objects.create(
                username=data['jsonusername'],
                name=data['jsonname'],
                surname=data['jsonsurname'],
                email=data['jsonemail'],
                profile_image = "http://localhost:423/img/profile_photos/pp08.jpeg",
                password=make_password(data['jsonpassword']),
                securitykey=generate_random_string()
            )
            return JsonResponse({"message": "Kullanıcı başarıyla oluşturuldu"}, status=201)
    else:
        return JsonResponse({'error': 'Invalid request method'})
    
    
@csrf_exempt  # Gerçek bir uygulamada CSRF token kullanılmalıdır
def singin(request):
    if request.method == 'POST':
        # POST verisinden kullanıcı adı ve parolayı al
        data = json.loads(request.body)
        username = data.get('jsonusername')
        password = data.get('jsonpassword')
        user = users.objects.get(username=username)
        if check_password(password, user.password):
            return JsonResponse({'securitykey': user.securitykey,'username': user.username, 'name': user.name, 'surname': user.surname, 'email': user.email, 'profile_image': user.profile_image})
        else:
            # Kullanıcı kimlik bilgileri yanlışsa JSON yanıt döndür
            return JsonResponse({'success': False, 'message': 'Invalid credentials'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

    return JsonResponse({'success': False, 'message': 'Only POST method is allowed'})

@csrf_exempt
def account42(request):
    if request.method == 'POST':
        jsecuritykey="NULL"
        data = json.loads(request.body)
        authorization_code = data.get('code')  # Frontend'den gelen yetkilendirme kodu
        if authorization_code:
            # Yetkilendirme kodunu kullanarak access_token al
            token_url = 'https://api.intra.42.fr/oauth/token'
            client_id = 'u-s4t2ud-1c2cdbd5f93bbb10f5c88928250742cd0f34b7404d28cf9db6ce0a7ec31ae127'
            client_secret = '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'
            redirect_uri = 'http://localhost:423'
            grant_type = 'authorization_code'
            
            token_data = {
                'grant_type': grant_type,
                'client_id': client_id,
                'client_secret': client_secret,
                'code': authorization_code,
                'redirect_uri': redirect_uri
            }
            token_response = requests.post(token_url, data=token_data)
            if token_response.status_code == 200:
                token_info = token_response.json()
                access_token = token_info.get('access_token')

                # Access token ile kullanıcı bilgilerini al
                user_info_url = 'https://api.intra.42.fr/v2/me'
                headers = {'Authorization': f'Bearer {access_token}'}
                user_response = requests.get(user_info_url, headers=headers)
                
                if user_response.status_code == 200:
                    user_data = user_response.json()
                    user_exists = users.objects.filter(login_42=user_data['login']).exists()# Kullanıcı adıyla veritabanını kontrol et eğer bu kullanıcı yoksa veritabanına kaydet.
                    if not user_exists:
                        jsecuritykey=generate_random_string()
                        users.objects.create(
                        username=user_data['login'],
                        login_42=user_data['login'],
                        name=user_data['first_name'],
                        surname=user_data['last_name'],
                        email=user_data['email'],
                        profile_image = user_data['image']['link'],
                        securitykey= jsecuritykey
                        )
                        return JsonResponse({'securitykey': jsecuritykey,'username': user_data['login'], 'name': user_data['first_name'], 'surname': user_data['last_name'], 'email': user_data['email'], 'profile_image': user_data['image']['link']})
                    else:
                        user = users.objects.get(login_42=user_data['login'])
                        return JsonResponse({'securitykey': user.securitykey,'username': user.username, 'name': user.name, 'surname': user.surname, 'email': user.email, 'profile_image': user.profile_image})
                else:
                    return JsonResponse({'error': 'Failed to fetch user data', 'status_code': user_response.status_code})
            else:
                return JsonResponse({'error': 'Failed to obtain access token', 'status_code': token_response.status_code})
        else:
            return JsonResponse({'error': 'No authorization code provided'})

    else:
        return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def accountdataedit(request):
    if request.method == 'POST':
        # POST verisinden kullanıcı adı ve parolayı al
        data = json.loads(request.body)
        jsecuritykey = data.get('jsonsecuritykey')
        if not users.objects.filter(securitykey=jsecuritykey).exists():
            user = users.objects.get(securitykey=jsecuritykey)
            if not user.securitykey==jsecuritykey:
                return JsonResponse({'success': False, 'massage': 'unauthorized transaction'})
        user = users.objects.get(securitykey=jsecuritykey)
        oldusername = data.get('jsonoldusername')
        jusername = data.get('jsonusername')
        jname = data.get('jsonname')
        jsurname = data.get('jsonsurname')
        jemail = data.get('jsonemail')
        jprofileimage = data.get('jsonprofileimage')
        user_exists = users.objects.filter(username=jusername).exists()
        if not user_exists and jusername != oldusername:
            user.username = jusername
        user.name = jname
        user.surname = jsurname
        user.email = jemail
        user.profile_image = jprofileimage
        user.save()
        return JsonResponse({'username': user.username, 'name': user.name, 'surname': user.surname, 'email': user.email, 'profile_image': user.profile_image})
    else:
        return JsonResponse({'success': False, 'message': 'Only POST method is allowed'})


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_image(request):
    if request.method == 'POST':
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            file = serializer.validated_data['file']
            new_name = 'profile_image'  # Sabit bir dosya adı kullanıyoruz
            extension = 'jpg'  # Sabit bir uzantı kullanıyoruz
            new_filename = f"{new_name}.{extension}"
            
            # Eski dosyayı sil
            existing_file_path = 'uploads/' + new_filename
            if default_storage.exists(existing_file_path):
                default_storage.delete(existing_file_path)

            # Yeni dosyayı kaydet
            file_path = default_storage.save(existing_file_path, file)
            file_url = settings.MEDIA_URL + file_path

            return Response({'file_url': file_url}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def userauthenticator(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if users.objects.filter(securitykey=data.get('skey')).exists():
            user = users.objects.get(securitykey=data.get('skey'))
            if user.online:
                user.online = False
            else:
                user.online = True
            user.save()
            return JsonResponse({'success': True, 'username': user.username})
        else:
            return JsonResponse({'success': False, 'message': 'unauthorized transaction'})
    else:
        return JsonResponse({'success': False, 'message': 'Only POST method is allowed'}) 

@csrf_exempt
def onlineusers(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if users.objects.filter(securitykey=data.get('jsonsecuritykey')).exists():
            online_users = users.objects.filter(online=True)
            online_users_data = []
            for user in online_users:
                user_data = {
                    'username': user.username
                }
                online_users_data.append(user_data)
            return JsonResponse({'online_users': online_users_data})
        else:
            return JsonResponse({'success': False, 'message': 'no unauthorized'})
    else:
        return JsonResponse({'success': False, 'message': 'Only POST method is allowed'}) 