from flask import Flask
from flask.ext.wtf import Form, TextField, BooleanField, Required
from flask.ext.mongoengine import MongoEngine, ValidationError
from flask.ext.mongoengine.wtf import model_form
from flask.ext.security import Security, MongoEngineUserDatastore, \
    UserMixin, RoleMixin, login_required
from flask_security.forms import RegisterForm

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
    incognito = db.BooleanField(default=False)
    screen_name = db.StringField(max_length=255)	
    first_name = db.StringField(max_length=255)
    last_name = db.StringField(max_length=255)

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

class Referral(db.Document):
	itemid = db.StringField(max_length=3)
	job =  db.ReferenceField('Job')
	reference = db.URLField()
	referenceName = db.StringField()

class ExtendedRegisterForm(RegisterForm):
    first_name = TextField('First Name', [Required()])
    last_name = TextField('Last Name', [Required()])
    incognito = BooleanField("Incognito") 
    screen_name = TextField('Screen Name', [Required()])		


AddJobForm = model_form(Job)
RewardForm = model_form(Reward)
ReferralForm = model_form(Referral)

user_datastore = MongoEngineUserDatastore(db, User, Role)
security = Security(app, user_datastore, register_form=ExtendedRegisterForm)

@app.route('/users')
def list_users():
	users = User.objects()
	content = '<p><ul>'
	for user in users:
	  content += '<li>' + user.email + '</li>'
	content += '</ul></p>'
	return content

@app.route('/users/delete/all')
def delete_all_users():
	User.objects().delete()
	return list_users()
