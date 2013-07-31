from flask import Flask, url_for, send_from_directory, render_template
from flask.ext.mongoengine import MongoEngine, ValidationError
from flask.ext.mongoengine.wtf import model_form
from flask.ext.security import Security, MongoEngineUserDatastore, \
    UserMixin, RoleMixin, login_required
from flask_mail import Mail
from flask_security.core import current_user

# Create app
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret'
app.config['SECURITY_REGISTERABLE']=True
# MongoDB Config
app.config['MONGODB_DB'] = 'mydatabase'
app.config['MONGODB_HOST'] = 'localhost'
app.config['MONGODB_PORT'] = 27017

app.config['DEFAULT_MAIL_SENDER'] = 'hello@refrew.com'
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT']=465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'nirav.shah83@gmail.com'
app.config['MAIL_PASSWORD'] = 'Alpha6383'
app.url_map.strict_slashes = False

mail = Mail(app)

@app.route('/')
@login_required
def home():
	return render_template("index.html")


@app.route('/urlmap')
@login_required
def urlmap():
	urls = []
        for rule in app.url_map.iter_rules():
                urls.append(str(rule).replace('<','(').replace('>',')'))
        urls.sort()
        content = '<p><h1>Welcome '
        if current_user.incognito == False:
                content += current_user.first_name + current_user.last_name
        else:
                content += current_user.screen_name
        content += '<p></h1>'
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
import refrew.referrals
