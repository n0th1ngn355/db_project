# urls.py

from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, PostViewSet, EducationalMaterialViewSet, LearningGroupViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'posts', PostViewSet)
router.register(r'educational-materials', EducationalMaterialViewSet)
router.register(r'learning-groups', LearningGroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
