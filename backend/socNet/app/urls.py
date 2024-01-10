# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from .views import *

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'resources', ResourceViewSet, basename='resource')
router.register(r'posts', PostViewSet, basename='post')
router.register(r'comments', CommentViewSet, basename='comment')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', views.obtain_auth_token),
    path('signup/', SignUpView.as_view(), name='signup'),
    # path('login', Login.as_view(), name='login'),
    path('follows/', FollowsViewSet.as_view(), name='follows'),
    path('followers/', FollowersViewSet.as_view(), name='followers'),
    path('myskills/', MySkillsViewSet.as_view(), name='myskills'),
    path('self/', ProfileViewSet.as_view(), name='profile'),
    path('post_likes/', PLikeViewSet.as_view(), name='pliked'),
    path('course_likes/', CLikeViewSet.as_view(), name='cliked'),
    path('costile/', Costile.as_view(), name='costile'),
    path('myposts/', MyPosts.as_view(), name='posts'),
    path('myposts/<int:pk>', MyPosts.as_view(), name='posts'),
    path('enrolled/', EnrolledCourses.as_view(), name='enrolled'),
    path('feed/', Feed.as_view(), name='feed'),
    path('others/', Others.as_view(), name='others'),
]
