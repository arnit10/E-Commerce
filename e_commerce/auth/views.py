from django.http import JsonResponse
from django.shortcuts import render
import json
from django.contrib.auth import authenticate, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required



@csrf_exempt
def signup(request):
    """
    Function used to register new user
    """
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')

    user = User.objects.filter(username=username).exists()
    if user:
        return JsonResponse({
            "status": "error",
            "message": "Username already exist."
        })

    user = User.objects.create_user(
        username=username,
        password=password,
        first_name=first_name,
        last_name=last_name,
        email=email
    )

    return JsonResponse({
        "status": "success",
        "message": "User registered successfully."
    })


@csrf_exempt
def login(request):
    """
    Function used for user login
    """
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return JsonResponse({
            "status": "success",
            "message": "User fetched successfully.",
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email            
        })
    
    return JsonResponse({
        "status": "error",
        "message": "User does not exist."
    })

@login_required
def user_details(request):
    user = request.user
    return JsonResponse({
        "status": "success",
        "message": "User details fetched successfully.",
        "username": user.username
    })

def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'})