import json
from flask import Flask, render_template,request, redirect, url_for, jsonify
from flask.ext.mongoengine import MongoEngine, ValidationError
from flask.ext.wtf import Form, TextField, Required
from flask.ext.mongoengine.wtf import model_form
from flask.ext.security import Security, MongoEngineUserDatastore, \
    UserMixin, RoleMixin, login_required
from flask_negotiate import consumes, produces
from bson import json_util

# Create app
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret'
app.config['SECURITY_REGISTERABLE']=True
# MongoDB Config
app.config['MONGODB_DB'] = 'mydatabase'
app.config['MONGODB_HOST'] = 'localhost'
app.config['MONGODB_PORT'] = 27017

# Create database connection object
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
AddJobForm = model_form(Job)

# Setup Flask-Security
user_datastore = MongoEngineUserDatastore(db, User, Role)
security = Security(app, user_datastore)

# Create a user to test with
@app.before_first_request
def create_user():
    user_datastore.create_user(email='nirav', password='password')

# Views
@app.route('/')
@login_required
def home():
    return 'Welcome to Referral Rewards'

@app.route('/jobs/add/',methods=['GET'])
@login_required
def add_job_form():
  form = AddJobForm()
  return render_template('add_job.html',form=form)

@app.route('/jobs/<id>/edit',methods=['GET'])
@login_required
def edit_job_form(id):
   job = Job.objects(jobid=id).first()
   form = AddJobForm(request.form, obj=job)
   return render_template('add_job.html',form=form, edit=True)	


@app.route('/jobs',methods=['GET','POST'])
@login_required
def jobs():
	if request.method == 'POST':
		form = AddJobForm(request.form)
		if request_has_json():
		  try:
			  json_data = json.dumps(request.json,default=json_util.default)
		          model = Job.from_json(json_data)
			  model.save()
		  except ValidationError as e:
		         return jsonify(item=str(e))
		else:
		 if form.validate():
		   form.save()
	         else:
                   return render_template('add_job.html',form=form)
		return list_jobs()
	else:
   		return list_jobs()


@app.route('/jobs/<id>',methods=['GET','POST'])
@login_required
def job(id):
        if request.method == 'GET':
		jobs = Job.objects(jobid=id)
	        if request_wants_json():
		  return jsonify(item=[job.to_json() for job in jobs])
	        else:
        	  return render_template('list_jobs.html',jobs=jobs)
	if request.method == 'POST':
		job = Job.objects(jobid=id).first()
	        if request_has_json():
			job.description =  request.json['description']
	                job.save()
			return 'Updated'
                else:
                        form = AddJobForm(request.form)
		        form.populate_obj(job)
			job.save()
			return render_template('list_jobs.html',jobs=[job])
			
	
@app.route('/joblist',methods=['GET'])
def list_jobs():
	jobs = Job.objects()
	if request_wants_json():
        	return jsonify(items=[job.to_json() for job in jobs])
	return render_template('list_jobs.html',jobs=jobs)

def request_wants_json():
    best = request.accept_mimetypes.best_match(['application/json', 'text/html'])
    return best == 'application/json' and request.accept_mimetypes[best] > request.accept_mimetypes['text/html']

def request_has_json():
	if 'application/json' in request.content_type:
		return True;
	return False;

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
