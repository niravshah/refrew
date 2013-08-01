import json
from refrew import app
from flask import Flask, render_template,request, redirect, url_for, jsonify
from flask.ext.mongoengine import MongoEngine, ValidationError
from flask.ext.wtf import Form, TextField, Required
from flask.ext.mongoengine.wtf import model_form
from flask.ext.security import Security, MongoEngineUserDatastore, UserMixin, RoleMixin, login_required
from flask_negotiate import consumes, produces
from bson import json_util

from models import db, user_datastore, security, Role, User, Reward, RewardForm, RoleForm

@app.route('/roles/add/',methods=['GET'])
@login_required
def add_role_form():
  form = RoleForm()
  return render_template('add_roles.html',form=form)

@app.route('/roles/<id>/edit',methods=['GET'])
@login_required
def edit_reward_form(id):
   item = Role.objects(name=id).first()
   form = RoleForm(request.form, obj=item)
   return render_template('add_roles.html',form=form, edit=True)	

@app.route('/roles',methods=['GET','POST'])
@login_required
def roles():
	if request.method == 'POST':
		form = RoleForm(request.form)
		if request_has_json():
		  try:
			  json_data = json.dumps(request.json,default=json_util.default)
		          model = Role.from_json(json_data)
			  model.save()
		  except ValidationError as e:
		         return jsonify(item=str(e))
		else:
		 if form.validate():
		   form.save()
	         else:
                   return render_template('add_roles.html',form=form)
		return list_roles()
	else:
   		return list_roles()


@app.route('/roles/<id>',methods=['GET','POST'])
@login_required
def role(id):
        if request.method == 'GET':
		rewards = Role.objects(name=id)
		return get_items(request, rewards)
	if request.method == 'POST':
		item = Role.objects(name=id).first()
		print 'Fetched Item'
	        if request_has_json():
			item.description =  request.json['description']
	                item.save()
			return 'Updated'
                else:
                        form = RoleForm(request.form)
		        form.populate_obj(item)
			print 'Populated Item from Form'
			print item.description
			item.save()
			return render_template('list_roles.html',items=[item])
			
	
@app.route('/rolelist',methods=['GET'])
def list_roles():
	rewards = Role.objects()
	return get_items(request, rewards)


def get_items(request, items):
	 if request_wants_json():
                  return jsonify_items(items)
         else:
                  return render_template('list_roles.html',items=items)

def jsonify_items(items):
	return jsonify(item=[it.to_json() for it in items])

def request_wants_json():
    best = request.accept_mimetypes.best_match(['application/json', 'text/html'])
    return best == 'application/json' and request.accept_mimetypes[best] > request.accept_mimetypes['text/html']

def request_has_json():
	if 'application/json' in request.content_type:
		return True;
	return False;
