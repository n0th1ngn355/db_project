from django.db import models
from neomodel import DateProperty, StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, UniqueIdProperty, \
    DateTimeProperty, StructuredRel
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class Comment(StructuredRel):
    comment_id = UniqueIdProperty()
    content = StringProperty(required=True)
    created_at = DateTimeProperty(default_now=True)

    # user = RelationshipFrom('User', 'COMMENTED')
    #
    # post = RelationshipTo('Post', 'COMMENT_ON')

    def __str__(self):
        return self.content

class User(StructuredNode):
    user_id = UniqueIdProperty()
    name = StringProperty(required=True)
    email = StringProperty(unique_index=True, required=True)
    password = StringProperty(required=True)
    date_of_birth = DateProperty()

    # Relationships
    follows = RelationshipTo('User', 'FOLLOWS')
    skills = RelationshipTo('Skill', 'HAS_SKILL')
    enrolled_in = RelationshipTo('Course', 'ENROLLED_IN')
    completed = RelationshipTo('Course', 'COMPLETED')
    shared_resource = RelationshipTo('Resource', 'SHARED_RESOURCE')
    posted = RelationshipTo('Post', 'POSTED')
    pliked = RelationshipTo('Post', 'LIKED')
    cliked = RelationshipTo('Course', 'LIKED')
    pcommented = RelationshipTo('Post', 'COMMENTED', model=Comment)
    ccommented = RelationshipTo('Course', 'COMMENTED', model=Comment)
    def __str__(self):
        return self.name


class Skill(StructuredNode):
    skill_id = UniqueIdProperty()
    name = StringProperty(required=True)

    # Relationships
    belongs_to = RelationshipFrom('User', 'HAS_SKILL')

    def __str__(self):
        return self.name


class Course(StructuredNode):
    course_id = UniqueIdProperty()
    title = StringProperty(required=True)
    description = StringProperty()

    # Relationships
    enrolled_users = RelationshipFrom('User', 'ENROLLED_IN')
    created_by = RelationshipTo('User', 'CREATED_BY')
    completed_by = RelationshipFrom('User', 'COMPLETED')
    teaches = RelationshipTo('Skill', 'TEACHES')
    liked = RelationshipFrom('User', 'LIKED')
    comments = RelationshipFrom('User', 'COMMENTED', model=Comment)
    def __str__(self):
        return self.title


class Resource(StructuredNode):
    resource_id = UniqueIdProperty()
    name = StringProperty(required=True)
    url = StringProperty()

    # Relationships
    shared_by = RelationshipFrom('User', 'SHARED_RESOURCE')

    def __str__(self):
        return self.title


class Post(StructuredNode):
    post_id = UniqueIdProperty()
    title = StringProperty()
    content = StringProperty()
    created_at = DateTimeProperty(default_now=True)
    user = RelationshipFrom(User, 'POSTED')
    liked = RelationshipFrom('User', 'LIKED')
    comments = RelationshipFrom('User', 'COMMENTED', model=Comment)

    def __str__(self):
        return self.title
