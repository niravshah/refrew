from flask import Flask, url_for
from flask.ext.mongoengine import MongoEngine, ValidationError
from flask.ext.mongoengine.wtf import model_form
from flask.ext.security import Security, MongoEngineUserDatastore, \
    UserMixin, RoleMixin, login_required

# Create app
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret'
app.config['SECURITY_REGISTERABLE']=True
# MongoDB Config
app.config['MONGODB_DB'] = 'mydatabase'
app.config['MONGODB_HOST'] = 'localhost'
app.config['MONGODB_PORT'] = 27017

@app.route('/')
@login_required
def home():
	urls = []
	for rule in app.url_map.iter_rules():
		urls.append(str(rule).replace('<','(').replace('>',')'))
	urls.sort()
	content = '<p><h1>Welcome to Referral Rewards</h1></p>'
	content += '<ul>'
	for url in urls:
		content += '<li>'
		content += url
		content += '</li>'
	content += '</ul>'  
  	return content

import refrew.models
import refrew.jobs
import refrew.rewards
