from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .models import MyModel
import json

@csrf_exempt
def add_numbers(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        num1 = int(data.get('num1', 0))
        num2 = int(data.get('num2', 0))
        result = num1 + num2
        return JsonResponse({'result': result})
    else:
        return JsonResponse({'error': 'Invalid request method'})

def add_value(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        value = data.get('value', '')
        MyModel.objects.create(value=value)

        return JsonResponse({'message': 'Değer başarıyla eklendi.'})
    else:
        return JsonResponse({'error': 'Geçersiz istek methodu.'})
