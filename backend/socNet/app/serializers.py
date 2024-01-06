# serializers.py

from rest_framework import serializers
from .models import User, Skill, Course, Resource, Post


class UserSerializer(serializers.Serializer):
    user_id = serializers.CharField(read_only=True)
    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    date_of_birth = serializers.DateTimeField()

    def to_representation(self, instance):
        return {
            'user_id': str(instance.user_id),
            'username': instance.username,
            'email': instance.email,
            'date_of_birth': instance.date_of_birth,
        }

    def create(self, validated_data):
        user = User(**validated_data)
        user.save()
        return user

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def destroy(self, instance):
        instance.delete()


class SkillSerializer(serializers.Serializer):
    skill_id = serializers.CharField(read_only=True)
    name = serializers.CharField()

    def to_representation(self, instance):
        return {
            'skill_id': str(instance.skill_id),
            'name': instance.name,
        }

    def create(self, validated_data):
        skill = Skill(**validated_data)
        skill.save()
        return skill

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def destroy(self, instance):
        instance.delete()


class CourseSerializer(serializers.Serializer):
    course_id = serializers.CharField(read_only=True)
    title = serializers.CharField()
    description = serializers.CharField()
    instructor = serializers.CharField(source='User.user_id')

    def to_representation(self, instance):
        return {
            'course_id': str(instance.course_id),
            'title': instance.title,
            'description': instance.description,
            'instructor': str(instance.created_by.single()),
        }

    def create(self, validated_data):
        course = Course(**validated_data)
        u = User.nodes.get(user_id=validated_data['User']['user_id'])
        course.save()
        course.created_by.connect(u)
        return course

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def destroy(self, instance):
        instance.delete()


class ResourceSerializer(serializers.Serializer):
    resource_id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    url = serializers.CharField()
    uploaded_by = serializers.StringRelatedField()

    def to_representation(self, instance):
        return {
            'resource_id': str(instance.resource_id),
            'name': instance.name,
            'url': instance.url,
            # 'uploaded_by': str(instance.uploaded_by.user_id),
        }

    def create(self, validated_data):
        resource = Resource(**validated_data)
        resource.save()
        return resource

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def destroy(self, instance):
        instance.delete()


class PostSerializer(serializers.Serializer):
    post_id = serializers.CharField(read_only=True)
    title = serializers.CharField()
    content = serializers.CharField()
    created_at = serializers.DateTimeField()
    def to_representation(self, instance):
        return {
            'post_id': str(instance.post_id),
            'title': instance.title,
            'content': instance.content,
            'created_at' : instance.created_at
        }

    def create(self, validated_data):
        post = Post(**validated_data)
        post.save()
        return post

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def destroy(self, instance):
        instance.delete()