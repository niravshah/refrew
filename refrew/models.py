import json
from flask import Flask
from flask.ext.wtf import Form, TextField, BooleanField, Required, widgets, SelectField
from flask.ext.mongoengine import MongoEngine, ValidationError
from flask.ext.mongoengine.wtf import model_form
from flask.ext.security import Security, MongoEngineUserDatastore, \
    UserMixin, RoleMixin, login_required
from flask_security.forms import RegisterForm
from bson import ObjectId
from refrew import app

db = MongoEngine(app)

class Role(db.Document, RoleMixin):
    name = db.StringField(max_length=80, unique=True)
    description = db.StringField(max_length=255)
    def __str__(self):
	return self.name

class User(db.Document, UserMixin):
    itemid = db.StringField(max_length=10)
    email = db.StringField(max_length=255)
    password = db.StringField(max_length=255)
    active = db.BooleanField(default=True)
    confirmed_at = db.DateTimeField()
    incognito = db.BooleanField(default=False)
    screen_name = db.StringField(max_length=255)	
    first_name = db.StringField(max_length=255)
    last_name = db.StringField(max_length=255)
    roles = db.ListField(db.ReferenceField(Role), default=[])

class Stage(db.Document):
        job = db.ReferenceField('Job')
	description = db.StringField()
        reward = db.ReferenceField('Reward')
        def __str__(self):
                return self.description

class Job(db.Document):
	jobid = db.SequenceField()
	description = db.StringField()
	locationName =  db.StringField()
	title =  db.StringField()
	tSkill1 =  db.StringField()
	tSkill2 =  db.StringField()
	tSkill3 =  db.StringField()
	pSkill1 =  db.StringField()
	pSkill2 =  db.StringField()
	pSkill3 =  db.StringField()
	teamChar1 =  db.StringField()
	teamChar2 =  db.StringField()
	teamChar3 =  db.StringField()
	permOrCont =  db.StringField()
	remuneration =  db.StringField()
	qalNeeded =  db.StringField()
	qal =  db.StringField()
	projChar1 =  db.StringField()
	projChar2 =  db.StringField()
	projChar3 =  db.StringField()
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
	status = db.StringField()
	user = db.StringField()

class ExtendedRegisterForm(RegisterForm):
    itemid = TextField('Item Id', [Required()])
    first_name = TextField('First Name', [Required()])
    last_name = TextField('Last Name', [Required()])
    incognito = BooleanField("Incognito") 
    screen_name = TextField('Screen Name', [Required()])


AddJobForm = model_form(Job)
RewardForm = model_form(Reward)
ReferralForm = model_form(Referral)
StageForm = model_form(Stage)
RoleForm = model_form(Role)

user_datastore = MongoEngineUserDatastore(db, User, Role)
security = Security(app, user_datastore, register_form=ExtendedRegisterForm)

@app.route('/users')
def list_users():
	users = User.objects()
	content = '<p><ul>'
	for user in users:
	  content += '<li>' + user.itemid + ' : ' + user.first_name + user.last_name + ' : ' + user.email + ' : '
	  if not user.roles:
		 content +=  'No Roles Assigned'
	  else:
	    	 content +=  'User Roles: '
	  	 for role in user.roles:
		 	content += ' - ' + role.name
	  content += '</li>'
	content += '</ul></p>'
	return content

@app.route('/users/delete/all')
def delete_all_users():
	User.objects().delete()
	return list_users()

@app.route('/user/<itemid>/add/role/<rolename>')
def add_user_role(itemid,rolename):
     user = User.objects(itemid=itemid).first();
     role = user_datastore.find_or_create_role(rolename);
     user_datastore.add_role_to_user(user,role)
     user.save()
     return list_users()

@app.route('/user/<itemid>/delete/role/<rolename>')
def add_user_role(itemid,rolename):
     user = User.objects(itemid=itemid).first();
     role = user_datastore.find_or_create_role(rolename);
     user_datastore.remove_role_from_user(user,role)
     user.save()
     return list_users()


"""@app.before_first_request
def create_user():
    user_datastore.create_user(email='nirav', password='password')"""

