import json
from refrew import app
from flask import Flask, render_template,request, redirect, url_for, jsonify
from flask.ext.mongoengine import MongoEngine, ValidationError
from flask.ext.wtf import Form, TextField, Required
from flask.ext.mongoengine.wtf import model_form
from flask.ext.security import Security, MongoEngineUserDatastore, UserMixin, RoleMixin, login_required
from flask_negotiate import consumes, produces
from bson import json_util

from models import db, user_datastore, security, Role, User, Reward, ReferralForm, Referral

@app.route('/referrals/add/',methods=['GET'])
@login_required
def add_referral_form():
  form = ReferralForm()
  return render_template('add_referral.html',form=form)

@app.route('/referrals/<id>/edit',methods=['GET'])
@login_required
def edit_referral_form(id):
   item = Referral.objects(itemid=id).first()
   form = ReferralForm(request.form, obj=item)
   return render_template('add_referral.html',form=form, edit=True)	


@app.route('/referrals/delete/all')
def delete_all_refs():
	Referral.objects().delete()
	return list_referrals()

@app.route('/referrals',methods=['GET','POST'])
@login_required
def referrals():
	if request.method == 'POST':
		form = ReferralForm(request.form)
		if request_has_json():
		  try:
			  json_data = json.dumps(request.json,default=json_util.default)
		          model = Referral.from_json(json_data)
			  model.save()
		  except ValidationError as e:
		         return jsonify(item=str(e))
		else:
		 if form.validate():
		   form.save()
	         else:
                   return render_template('add_referral.html',form=form)
		return list_referrals()
	else:
   		return list_referrals()


@app.route('/referrals/<id>',methods=['GET','POST'])
@login_required
def referral(id):
        if request.method == 'GET':
		rewards = Referral.objects(itemid=id)
		return get_items(request, rewards)
	if request.method == 'POST':
		item = Referral.objects(itemid=id).first()
	        if request_has_json():
			item.description =  request.json['description']
	                item.save()
			return 'Updated'
                else:
                        form = ReferralForm(request.form)
		        form.populate_obj(item)
			item.save()
			return render_template('list_referrals.html',items=[item])

@app.route('/referrallist', methods=['GET'])
def list_referrals():
	items = Referral.objects();
	print str(items);
	return render_template('list_referrals.html', items=items);

def get_items(request, items):
	 if request_wants_json():
                  return jsonify_items(items)
         else:
                  return render_template('list_referrals.html',items=items)

def jsonify_items(items):
	return jsonify(item=[it.to_json() for it in items])

def request_wants_json():
    best = request.accept_mimetypes.best_match(['application/json', 'text/html'])
    return best == 'application/json' and request.accept_mimetypes[best] > request.accept_mimetypes['text/html']

def request_has_json():
	if 'application/json' in request.content_type:
		return True;
	return False;
