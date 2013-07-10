from flask import Flask
from flask.ext.wtf import Form
from flask.ext.mongoengine import MongoEngine, ValidationError
from flask.ext.mongoengine.wtf import model_form
from flask.ext.security import Security, MongoEngineUserDatastore, \
    UserMixin, RoleMixin, login_required

from refrew import app

db = MongoEngine(app)

class Role(db.Document, RoleMixin):
    name = db.StringField(max_length=80, unique=True)
    description = db.StringField(max_length=255)

class User(db.Document, UserMixin):
    email = db.StringField(max_length=255)
    password = db.StringField(max_length=255)
    active = db.BooleanField(default=True)
    confirmed_at = db.DateTimeField()
    roles = db.ListField(db.ReferenceField(Role), default=[])

class Job(db.Document):
	jobid = db.StringField(max_length=3)
	description = db.StringField()
	reward = db.ReferenceField('Reward')
	def __str__(self):
                return self.description

class Reward(db.Document):
        itemid = db.StringField(max_length=3)
        description = db.StringField()
	def __str__(self):
		return self.description

class Refer(db.Document):
	itemid = db.StringField(max_length=3)
	job =  db.ReferenceField('Job')
	reference = db.URLField()


AddJobForm = model_form(Job)
RewardForm = model_form(Reward)
ReferForm = model_form(Refer)

user_datastore = MongoEngineUserDatastore(db, User, Role)
security = Security(app, user_datastore)

@app.before_first_request
def create_user():
    user_datastore.create_user(email='nirav', password='password')
