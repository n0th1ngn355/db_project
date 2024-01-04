from django.shortcuts import render

# Create your views here.
# views.py

from rest_framework import viewsets
from .models import User, Post, EducationalMaterial, LearningGroup
from .serializers import UserSerializer, PostSerializer, EducationalMaterialSerializer, LearningGroupSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.nodes.all()
    serializer_class = UserSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.nodes.all()
    serializer_class = PostSerializer


class EducationalMaterialViewSet(viewsets.ModelViewSet):
    queryset = EducationalMaterial.nodes.all()
    serializer_class = EducationalMaterialSerializer


class LearningGroupViewSet(viewsets.ModelViewSet):
    queryset = LearningGroup.nodes.all()
    serializer_class = LearningGroupSerializer
