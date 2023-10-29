import statistics
from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserProfileSerializer, LoginSerializer
from .tokenauthentication import JWTAuthentication
from rest_framework import status
from .models import UserProfile
from django.http import JsonResponse



@api_view(['POST'])
def register_user(request):
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)




@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        token = JWTAuthentication.generate_token(payload=serializer.data)
        
        response = JsonResponse({
            "message": "Login Successfully",
            'token': token,
            'user': serializer.data
        }, status=status.HTTP_201_CREATED)

        response.set_cookie('token', token, httponly=True, secure=False)  
        return response
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_all_users(request):
    users = UserProfile.objects.all()
    serializer = UserProfileSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
