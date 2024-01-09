from django.contrib.auth import authenticate
from django.shortcuts import render

# Create your views here.
# views.py

from rest_framework import viewsets, status, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from neomodel import db
from rest_framework.views import APIView
from .models import User, Skill, Course, Resource, Post
from django.contrib.auth.models import User as User1

from .serializers import UserSerializer,  SkillSerializer, CourseSerializer, ResourceSerializer, PostSerializer

def get_followers(user_instance):
    query = f"MATCH (follower:User)-[:FOLLOWS]->(:User {{user_id: '{user_instance.user_id}'}}) RETURN follower"
    results, meta = db.cypher_query(query)

    followers = [User.inflate(row[0]) for row in results]
    return followers


class Others(APIView):
    permission_classes = [IsAuthenticated]
    queryset = User.nodes.all()

    def get(self, request, *args, **kwargs):
        try:
            user = User.nodes.get(email=request.user.username)
            others = filter(lambda x: x.user_id != user.user_id, User.nodes.all())
            serializer = UserSerializer(others, many=True, context={'request': request})
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class MyPosts(APIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.nodes.all()

    def get(self, request, pk=None, *args, **kwargs):
        try:
            if pk:
                user = User.nodes.get(user_id=pk)
            else:
                user = User.nodes.get(email=request.user.username)
            posts = user.posted
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class CLikeViewSet(APIView):
    permission_classes = [IsAuthenticated]
    queryset = User.nodes.all()
    def get(self, request, *args, **kwargs):
        try:
            user = User.nodes.get(email=request.user.username)
            courses = user.cliked
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        try:
            _id = request.data.get('course_id')
            course = Course.nodes.get(course_id=_id)
            user = User.nodes.get(email=request.user.username)
            if not user.cliked.is_connected(course):
                user.cliked.connect(course)
                return Response({"detail": "success"},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "Error"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


    def delete(self, request, *args, **kwargs):
        try:
            _id = request.data.get('course_id')
            course = Course.nodes.get(course_id=_id)
            user = User.nodes.get(email=request.user.username)
            if user.cliked.is_connected(course):
                user.cliked.disconnect(course)
                return Response({"detail": "success"},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "Error"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class PLikeViewSet(APIView):
    permission_classes = [IsAuthenticated]
    queryset = User.nodes.all()
    def get(self, request, *args, **kwargs):
        try:
            user = User.nodes.get(email=request.user.username)
            posts = user.pliked
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


    def post(self, request, *args, **kwargs):
        try:
            _id = request.data.get('post_id')
            post = Post.nodes.get(post_id=_id)

            user = User.nodes.get(email=request.user.username)
            if not user.pliked.is_connected(post):
                user.pliked.connect(post)
                return Response({"detail": "success"},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "Error"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            _id = request.data.get('post_id')
            post = Post.nodes.get(post_id=_id)

            user = User.nodes.get(email=request.user.username)
            if user.pliked.is_connected(post):
                user.pliked.disconnect(post)
                return Response({"detail": "success"},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "Error"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


class ProfileViewSet(APIView):
    permission_classes = [IsAuthenticated]
    queryset = User.nodes.all()
    def get(self, request, *args, **kwargs):
        try:
            user = User.nodes.get(email=request.user.username)
            serializer = UserSerializer(user, context={'request':request})
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class EnrolledCourses(APIView):
    permission_classes = [IsAuthenticated]
    queryset = Course.nodes.all()

    def get(self, request, *args, **kwargs):
        try:
            user = User.nodes.get(email=request.user.username)
            courses = user.enrolled_in.all()
            serializer = CourseSerializer(courses, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


class FollowersViewSet(APIView):
    permission_classes = [IsAuthenticated]
    queryset = User.nodes.all()

    def get(self, request, *args, **kwargs):
        try:
            user = User.nodes.get(email=request.user.username)
            follows = get_followers(user)
            serializer = UserSerializer(follows, many=True, context={'request':request})
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


class FollowsViewSet(APIView):
    permission_classes = [IsAuthenticated]
    queryset = User.nodes.all()

    def get(self, request, *args, **kwargs):
        try:
            user = User.nodes.get(email=request.user.username)
            follows = user.follows.all()
            serializer = UserSerializer(follows, many=True, context={'request':request})
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        try:
            user_to_follow_id = request.data.get('user_id')
            user_to_follow = User.nodes.get(user_id=user_to_follow_id)

            user = User.nodes.get(email=request.user.username)
            if user != user_to_follow and not user.follows.is_connected(user_to_follow):
                user.follows.connect(user_to_follow)
                return Response({"detail": f"You are now following {user_to_follow.name}."},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "Error"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    def delete(self, request, *args, **kwargs):
        try:
            user_to_follow_id = request.data.get('user_id')
            user_to_follow = User.nodes.get(user_id=user_to_follow_id)

            user = User.nodes.get(email=request.user.username)
            if user != user_to_follow and user.follows.is_connected(user_to_follow):
                user.follows.disconnect(user_to_follow)
                return Response({"detail": f"You are now don't following {user_to_follow.name}."},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "Error"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class Feed(APIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.nodes.all()

    def get(self, request, *args, **kwargs):
        try:
            user = User.nodes.get(email=request.user.username)
            follows = user.follows.all()
            posts = []
            for f in follows:
                posts.extend(f.posted.all())
            serializer = PostSerializer(posts, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class MySkillsViewSet(APIView):
    permission_classes = [IsAuthenticated]
    queryset = Skill.nodes.all()

    def get(self, request, *args, **kwargs):
        try:
            user = User.nodes.get(email=request.user.username)
            skills = user.skills.all()
            serializer = SkillSerializer(skills, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        try:
            skill_id = request.data.get('skill_id')
            skill = Skill.nodes.get(skill_id=skill_id)

            user = User.nodes.get(email=request.user.username)
            if not user.skills.is_connected(skill):
                user.skills.connect(skill)
                return Response({"detail": f"You are now have skill {skill.name}."},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "Error"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, *args, **kwargs):
        try:
            skill_id = request.data.get('skill_id')
            skill = Skill.nodes.get(skill_id=skill_id)

            user = User.nodes.get(email=request.user.username)
            if user.skills.is_connected(skill):
                user.skills.disconnect(skill)
                return Response({"detail": f"You are now don't have skill {skill.name}."},
                                status=status.HTTP_201_CREATED)
            else:
                return Response({"detail": "Error"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class Costile(APIView):
    def post(self, request):
        res = []
        for u in request.data:
            if not User1.objects.filter(username=u['email']).exists():
                u1 = User1.objects.create_user(u['email'], u['email'], u['password'])
                u1.save()
            else:
                u1 = authenticate(request, username=u['email'], password=u['password'])
            token, created = Token.objects.get_or_create(user=u1)
            res.append(token.key)
        return Response(res)


class Login(APIView):

    def post(self, request):
        # print(request.data)
        try:
            email = request.data.get('email')
            password = request.data.get('password')

            user1 = User.nodes.get(email=email, password=password)
            user = authenticate(request, username=email, password=password)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user_id': user1.user_id})
        except:
            return Response({'error': 'Invalid credentials'}, status=400)

class SignUpView(generics.CreateAPIView):
    serializer_class = UserSerializer
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED, headers=headers)

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return User.nodes.all()

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def destroy(self, request, *args, **kwargs):
        # instance = User.nodes.get(user_id=kwargs.get('pk'))
        instance = request.user
        instance.delete()
        return Response(data='delete success')

    def update(self, request, *args, **kwargs):
        instance = User.nodes.get(user_id=kwargs.get('pk'))
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=True, methods=['GET'])
    def follows(self, request, *args, **kwargs):
        try:
            user = User.nodes.get(user_id=kwargs.get('pk'))
            follows = user.follows.all()
            serializer = UserSerializer(follows, context={'request':request}, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)


    @action(detail=True, methods=['GET'])
    def followers(self, request, *args, **kwargs):
        try:
            user = User.nodes.get(user_id=kwargs.get('pk'))
            followers = get_followers(user)
            serializer = UserSerializer(followers, context={'request':request}, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

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

    def update(self, request, *args, **kwargs):
        instance = Skill.nodes.get(skill_id=kwargs.get('pk'))
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = Skill.nodes.get(skill_id=kwargs.get('pk'))
        instance.delete()
        return Response(data='delete success')

    def get_queryset(self):
        return Skill.nodes.all()

    def retrieve(self, request, *args, **kwargs):
        try:
            skill_id = kwargs.get('pk')
            instance = Skill.nodes.get(skill_id=skill_id)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Skill.DoesNotExist:
            return Response({"detail": "Skill not found."}, status=status.HTTP_404_NOT_FOUND)


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Course.nodes.all()

    def update(self, request, *args, **kwargs):
        instance = Course.nodes.get(course_id=kwargs.get('pk'))
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = Course.nodes.get(course_id=kwargs.get('pk'))
        instance.delete()
        return Response(data='delete success')

    def retrieve(self, request, *args, **kwargs):
        try:
            _id = kwargs.get('pk')
            instance = Course.nodes.get(course_id=_id)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Course.DoesNotExist:
            return Response({"detail": "Course not found."}, status=status.HTTP_404_NOT_FOUND)


class ResourceViewSet(viewsets.ModelViewSet):
    serializer_class = ResourceSerializer

    def get_queryset(self):
        return Resource.nodes.all()

    def update(self, request, *args, **kwargs):
        instance = Resource.nodes.get(resource_id=kwargs.get('pk'))
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = Resource.nodes.get(resource_id=kwargs.get('pk'))
        instance.delete()
        return Response(data='delete success')

    def retrieve(self, request, *args, **kwargs):
        try:
            _id = kwargs.get('pk')
            instance = Resource.nodes.get(resource_id=_id)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Resource.DoesNotExist:
            return Response({"detail": "Resource not found."}, status=status.HTTP_404_NOT_FOUND)


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        return Post.nodes.all()

    def update(self, request, *args, **kwargs):
        instance = Post.nodes.get(post_id=kwargs.get('pk'))
        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = Post.nodes.get(post_id=kwargs.get('pk'))
        instance.delete()
        return Response(data='delete success')

    def retrieve(self, request, *args, **kwargs):
        try:
            post_id = kwargs.get('pk')
            instance = Post.nodes.get(post_id=post_id)
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
