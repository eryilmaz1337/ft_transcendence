from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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
