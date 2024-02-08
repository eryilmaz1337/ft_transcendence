from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
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

from .models import TabloT

def add_to_tablo_t(request):
    if request.method == 'POST':
        # Frontend'den gelen veriyi al
        deger = request.POST.get('deger', None)
        if deger is not None:
            # Modelimize gelen veriyi ekleyelim
            new_entry = TabloT(deger=deger)
            new_entry.save()
            return JsonResponse({'success': True, 'message': 'Veri başarıyla eklendi.'})
        else:
            return JsonResponse({'success': False, 'message': 'Gönderilen veri eksik veya hatalı.'})
    else:
        return JsonResponse({'success': False, 'message': 'Geçersiz istek.'})
