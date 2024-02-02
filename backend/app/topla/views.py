# topla/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def calculate_sum(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            number1 = int(data.get('number1', 0))
            number2 = int(data.get('number2', 0))
            result = {'sum': number1 + number2}
            return JsonResponse(result)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
