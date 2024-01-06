# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, SkillViewSet, CourseViewSet, ResourceViewSet, PostViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'resources', ResourceViewSet, basename='resource')
router.register(r'posts', PostViewSet, basename='posts')

urlpatterns = [
    path('', include(router.urls)),
]
