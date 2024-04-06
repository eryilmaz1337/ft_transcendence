from django.shortcuts import render
from .models import user_message
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def user_mass(request):
    return "a"


#     return render(request, "room.html",{"room_name":room_name,"slug":slug,'messages':messages})
# @csrf_exempt
# def rooms(request):
#     rooms=Room.objects.all()
#     return render(request, "rooms.html",{"rooms":rooms})

# @csrf_exempt
# def room(request,slug):
#     room_name=Room.objects.get(slug=slug).name
#     messages=Message.objects.filter(room=Room.objects.get(slug=slug))
    
#     return render(request, "room.html",{"room_name":room_name,"slug":slug,'messages':messages})