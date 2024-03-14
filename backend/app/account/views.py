from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.shortcuts import render
from .models import users
import json
import requests

@csrf_exempt
def singup(request):
    if request.method == 'POST':
            data = json.loads(request.body)
            users.objects.create(
                username=data['jsonusername'],
                name=data['jsonname'],
                surname=data['jsonsurname'],
                email=data['jsonemail'],
                password=make_password(data['jsonpassword'])
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
            # Giriş başarılıysa JSON yanıt döndür
            return JsonResponse({'success': True, 'message': 'Login successful'})
        else:

            # Kullanıcı kimlik bilgileri yanlışsa JSON yanıt döndür
            return JsonResponse({'success': False, 'message': 'Invalid credentials'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

    return JsonResponse({'success': False, 'message': 'Only POST method is allowed'})

@csrf_exempt
def account42(request):
    if request.method == 'POST':
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
                    user_exists = users.objects.filter(username=user_data['login']).exists()# Kullanıcı adıyla veritabanını kontrol et eğer bu kullanıcı yoksa veritabanına kaydet.
                    if not user_exists:
                        users.objects.create(
                        username=user_data['login'],
                        name=user_data['first_name'],
                        surname=user_data['last_name'],
                        email=user_data['email']
                    )
                        return JsonResponse({'username': user_data['login'], 'name': user_data['first_name'], 'surname': user_data['last_name'], 'email': user_data['email']})
                    else:
                        user = User.objects.get(username=username)
                        return JsonResponse({'username': user.username, 'name': user.name, 'surname': user.surname, 'email': user.email})
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
        # oldusername = data.get('jsonoldusername')
        jusername = data.get('jsonusername')
        jname = data.get('jsonname')
        jsurname = data.get('jsonsurname')
        jemail = data.get('jsonemail')
        user_exists = False
        # user_exists = users.objects.filter(username=username).exists()
        if not user_exists:
            user = users.objects.get(username=jusername)
            user.username = jusername
            user.name = jname
            user.surname = jsurname
            user.email = jemail
            user.save()
            return JsonResponse({'username': user.username, 'name': user.name, 'surname': user.surname, 'email': user.email})
        else:
            return JsonResponse({'success': False, 'massage': 'This username is used'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

    return JsonResponse({'success': False, 'message': 'Only POST method is allowed'})