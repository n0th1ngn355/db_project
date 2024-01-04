# serializers.py

from rest_framework import serializers
from .models import User, Post, EducationalMaterial, LearningGroup


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'


class EducationalMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationalMaterial
        fields = '__all__'


class LearningGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = LearningGroup
        fields = '__all__'
