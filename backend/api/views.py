from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Task

class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(created_by=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(created_by=self.request.user)
        else:
            print(serializer.errors)

class TaskDelete(generics.DestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(created_by=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
