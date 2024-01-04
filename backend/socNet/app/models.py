from django.db import models

# Create your models here.
# models.py

from neomodel import StructuredNode, StringProperty, DateTimeProperty, RelationshipTo


class User(StructuredNode):
    login = StringProperty(unique_index=True, required=True)
    password = StringProperty(required=True)
    name = StringProperty()
    profile_photo = StringProperty()
    biography = StringProperty()


class Post(StructuredNode):
    text = StringProperty()
    media_files = StringProperty()
    timestamp = DateTimeProperty(default_now=True)
    likes = RelationshipTo(User, 'LIKES')
    comments = RelationshipTo(User, 'COMMENTED')
    tags = StringProperty()


class EducationalMaterial(StructuredNode):
    title = StringProperty()
    description = StringProperty()
    media_files = StringProperty()
    tags = StringProperty()
    useful_count = RelationshipTo(User, 'USEFUL')
    not_useful_count = RelationshipTo(User, 'NOT_USEFUL')
    comments = RelationshipTo(User, 'COMMENTED')


class LearningGroup(StructuredNode):
    name = StringProperty()
    description = StringProperty()
    members = RelationshipTo(User, 'MEMBER_OF')
    educational_materials = RelationshipTo(EducationalMaterial, 'GROUP_MATERIAL')
