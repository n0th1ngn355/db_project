from django.shortcuts import render

# Create your views here.
# views.py

from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import User, Skill, Course, Resource, Post
from .serializers import UserSerializer, SkillSerializer, CourseSerializer, ResourceSerializer, PostSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.nodes.all()
    serializer_class = UserSerializer
    def retrieve(self, request, *args, **kwargs):
        try:
            user_id = kwargs.get('pk')
            instance = User.nodes.get(user_id=user_id)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.nodes.all()
    serializer_class = SkillSerializer
    def retrieve(self, request, *args, **kwargs):
        try:
            skill_id = kwargs.get('pk')
            instance = Skill.nodes.get(skill_id=skill_id)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Skill.DoesNotExist:
            return Response({"detail": "Skill not found."}, status=status.HTTP_404_NOT_FOUND)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.nodes.all()
    serializer_class = CourseSerializer

    # def perform_create(self, serializer):
    #     # При создании курса, указываем пользователя в качестве инструктора
    #     instructor_id = self.request.data.get('instructor')
    #     instructor = User.nodes.get(user_id=instructor_id)
    #     serializer.save(instructor=instructor)


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.nodes.all()
    serializer_class = ResourceSerializer

    # def perform_create(self, serializer):
    #     # При создании ресурса, указываем пользователя, загрузившего ресурс
    #     uploaded_by_id = self.request.data.get('uploaded_by')
    #     uploaded_by = User.nodes.get(user_id=uploaded_by_id)
    #     serializer.save(uploaded_by=uploaded_by)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.nodes.all()
    serializer_class = PostSerializer
    def retrieve(self, request, *args, **kwargs):
        try:
            post_id = kwargs.get('pk')
            instance = Post.nodes.get(post_id=post_id)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
