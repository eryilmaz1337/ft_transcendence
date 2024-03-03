from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.shortcuts import render
from .models import users
import json

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
