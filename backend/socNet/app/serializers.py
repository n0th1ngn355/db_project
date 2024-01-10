# serializers.py

from rest_framework import serializers
from .models import *
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User as User1

import json
from neomodel import db

def get_followers(user_instance):
    query = f"MATCH (follower:User)-[:FOLLOWS]->(:User {{user_id: '{user_instance.user_id}'}}) RETURN follower"
    results, meta = db.cypher_query(query)

    followers = [User.inflate(row[0]) for row in results]
    return followers



class UserSerializer(serializers.Serializer):
    user_id = serializers.CharField(read_only=True)
    name = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()
    date_of_birth = serializers.DateField()


    def to_representation(self, instance):
        me = User.nodes.get(email=self.context['request'].user.username)
        return {
            'user_id': str(instance.user_id),
            'name': instance.name,
            'email': instance.email,
            'date_of_birth': instance.date_of_birth,
            'skills': ', '.join(list(map(lambda x: str(x), instance.skills))),
            'follows': str(len(instance.follows)),
            'followers': str(len(get_followers(instance))),
            'isfollowing': str(me.follows.is_connected(instance))
        }

    def create(self, validated_data):
        user = User(**validated_data)
        username = validated_data['email']
        email = validated_data['email']
        password = validated_data['password']
        u1 = User1.objects.create_user(username, email, password)
        u1.save()
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


class CommentSerializer(serializers.Serializer):
    comment_id = serializers.CharField(read_only=True)
    content = serializers.CharField()
    created_at = serializers.DateTimeField()
    post_id = serializers.CharField(read_only=True)
    def to_representation(self, instance):
        return {
            'comment_id': str(instance.comment_id),
            'content': instance.content,
            'created_at': instance.created_at
        }

    def create(self, validated_data):
        user = User.nodes.get(email=self.context['request'].user.username)
        post = Post.nodes.get(post_id=validated_data['post_id'])
        del validated_data['post_id']
        print(validated_data)
        comment = Comment(**validated_data)
        comment.save()
        user.commented.connect(comment)
        comment.post.connect(post)
        return comment

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
    # created_by = serializers.CharField(source='User.user_id')

    def to_representation(self, instance):
        return {
            'course_id': str(instance.course_id),
            'title': instance.title,
            'description': instance.description,
            'teaches': ', '.join(list(map(lambda x: str(x), instance.teaches))),
            'created_by': str(instance.created_by.single().user_id),
            'enrolled_users': str(len(instance.enrolled_users)),
            'completed_by': str(len(instance.completed_by)),
            'liked': str(len(instance.liked))
        }

    def create(self, validated_data):
        user = User.nodes.get(email=self.context['request'].user.username)
        course = Course(**validated_data)
        course.save()
        course.created_by.connect(user)
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
    shared_by = serializers.CharField(source='User.user_id')

    def to_representation(self, instance):
        return {
            'resource_id': str(instance.resource_id),
            'name': instance.name,
            'url': instance.url,
            'shared_by': str(instance.shared_by.single()),
        }

    def create(self, validated_data):
        resource = Resource(**validated_data)
        u = User.nodes.get(user_id=validated_data['User']['user_id'])
        resource.save()
        resource.uploaded_by.connect(u)
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
    # posted = serializers.CharField(source='User.user_id')

    def to_representation(self, instance):

        comments_data = []
        for comment in instance.comments.all():
            comment_data = {
                'comment_id': str(comment.comment_id),
                'content': comment.content,
                'created_at': comment.created_at,
                'user_id': str(comment.user.single().user_id),
                'name': str(comment.user.single().name)
            }
            comments_data.append(comment_data)
        return {
            'post_id': str(instance.post_id),
            'title': instance.title,
            'content': instance.content,
            'created_at': instance.created_at,
            'posted': str(instance.user.single().user_id),
            'liked': str(len(instance.liked)),
            'comments': comments_data
        }

    def create(self, validated_data):
        user = User.nodes.get(email=self.context['request'].user.username)
        post = Post(**validated_data)
        post.save()
        user.posted.connect(post)
        return post

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def destroy(self, instance):
        instance.delete()