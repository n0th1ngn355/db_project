# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from .views import UserViewSet, SkillViewSet, FollowsViewSet,MySkillsViewSet, FollowersViewSet, SignUpView, CourseViewSet, ResourceViewSet, PostViewSet, Login

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'resources', ResourceViewSet, basename='resource')
router.register(r'posts', PostViewSet, basename='post')


urlpatterns = [
    path('', include(router.urls)),
    path('auth/', views.obtain_auth_token),
    path('signup/', SignUpView.as_view(), name='signup'),
    # path('login', Login.as_view(), name='login'),
    path('follows/', FollowsViewSet.as_view(), name='follows'),
    path('followers/', FollowersViewSet.as_view(), name='followers'),
    path('myskills/', MySkillsViewSet.as_view(), name='myskills')
]
