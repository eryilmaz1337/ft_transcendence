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
        print(user);
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
        user_exists = users.objects.filter(username=jusername).exists()
        if not user_exists and jusername != oldusername:
            user.username = jusername
        user.name = jname
        user.surname = jsurname
        user.email = jemail
        user.save()
        return JsonResponse({'username': user.username, 'name': user.name, 'surname': user.surname, 'email': user.email, 'profile_image': user.profile_image})
    else:
        return JsonResponse({'success': False, 'message': 'Only POST method is allowed'})

@csrf_exempt
def userauthenticator(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        if not users.objects.filter(securitykey=data.get('jsonsecuritykey')).exists():
            user = users.objects.get(securitykey=data.securitykey)
            if not user.securitykey==data.get('jsonsecuritykey'):
                return JsonResponse({'success': False, 'massage': 'unauthorized transaction'})
            else:
                return JsonResponse({'success': True, 'message': 'user authenticator success'})
    else:
        return JsonResponse({'success': False, 'message': 'Only POST method is allowed'})