import json
from refrew import app
from flask import Flask, render_template,request, redirect, url_for, jsonify
from flask.ext.mongoengine import MongoEngine, ValidationError
from flask.ext.wtf import Form, TextField, Required
from flask.ext.mongoengine.wtf import model_form
from flask.ext.security import Security, MongoEngineUserDatastore, UserMixin, RoleMixin, login_required
from flask_negotiate import consumes, produces
from bson import json_util

from models import db, user_datastore, security, Role, User, Reward, RewardForm

@app.route('/rewards/add/',methods=['GET'])
@login_required
def add_reward_form():
  form = RewardForm()
  return render_template('add_reward.html',form=form)

@app.route('/rewards/<id>/edit',methods=['GET'])
@login_required
def edit_reward_form(id):
   item = Reward.objects(itemid=id).first()
   form = RewardForm(request.form, obj=item)
   return render_template('add_reward.html',form=form, edit=True)	

@app.route('/rewards',methods=['GET','POST'])
@login_required
def rewards():
	if request.method == 'POST':
		form = RewardForm(request.form)
		if request_has_json():
		  try:
			  json_data = json.dumps(request.json,default=json_util.default)
		          model = Reward.from_json(json_data)
			  model.save()
		  except ValidationError as e:
		         return jsonify(item=str(e))
		else:
		 if form.validate():
		   form.save()
	         else:
                   return render_template('add_reward.html',form=form)
		return list_rewards()
	else:
   		return list_rewards()


@app.route('/rewards/<id>',methods=['GET','POST'])
@login_required
def reward(id):
        if request.method == 'GET':
		rewards = Reward.objects(itemid=id)
		return get_items(request, rewards)
	if request.method == 'POST':
		item = Reward.objects(itemid=id).first()
		print 'Fetched Item'
	        if request_has_json():
			item.description =  request.json['description']
	                item.save()
			return 'Updated'
                else:
                        form = RewardForm(request.form)
		        form.populate_obj(item)
			print 'Populated Item from Form'
			print item.description
			item.save()
			return render_template('list_items.html',items=[item])
			
	
@app.route('/rewardlist',methods=['GET'])
def list_rewards():
	rewards = Reward.objects()
	return get_items(request, rewards)


def get_items(request, items):
	 if request_wants_json():
                  return jsonify_items(items)
         else:
                  return render_template('list_rewards.html',items=items)

def jsonify_items(items):
	return jsonify(item=[it.to_json() for it in items])

def request_wants_json():
    best = request.accept_mimetypes.best_match(['application/json', 'text/html'])
    return best == 'application/json' and request.accept_mimetypes[best] > request.accept_mimetypes['text/html']

def request_has_json():
	if 'application/json' in request.content_type:
		return True;
	return False;
