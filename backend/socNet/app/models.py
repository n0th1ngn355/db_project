from django.db import models

from neomodel import StructuredNode, StringProperty, RelationshipTo, RelationshipFrom, UniqueIdProperty, DateTimeProperty


class User(StructuredNode):
    user_id = UniqueIdProperty(primary_key=True)
    username = StringProperty(unique_index=True, required=True)
    email = StringProperty(unique_index=True, required=True)
    password = StringProperty(required=True)
    date_of_birth = DateTimeProperty()

    # Relationships
    follows = RelationshipTo('User', 'FOLLOWS')
    has_skill = RelationshipTo('Skill', 'HAS_SKILL')
    enrolled_in = RelationshipTo('Course', 'ENROLLED_IN')
    teaches = RelationshipTo('Skill', 'TEACHES')
    shared_resource = RelationshipTo('Resource', 'SHARED_RESOURCE')
    posted = RelationshipTo('Post', 'POSTED')

    def __str__(self):
        return self.username


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

def __str__(self):
        return self.name
