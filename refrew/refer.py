import json
from refrew import app
from flask import Flask, render_template,request, redirect, url_for, jsonify
from flask.ext.mongoengine import MongoEngine, ValidationError
from flask.ext.wtf import Form, TextField, Required
from flask.ext.mongoengine.wtf import model_form
from flask.ext.security import Security, MongoEngineUserDatastore, UserMixin, RoleMixin, login_required
from flask_negotiate import consumes, produces
from bson import json_util

from models import db, user_datastore, security, Role, User, Reward, ReferForm, Refer

@app.route('/refer',methods=['GET','POST'])
@login_required
def refer():
	if request.method == 'GET':
		form = ReferForm(request.form)
		return render_template('refer.html',form=form)
	if request.method == 'POST':
		form = ReferForm(request.form)
		if form.validate():
			print form.reference
			print form.job
			form.save()
			return list_references()
		else:
			return render_template('refer.html',form=form)


@app.route('/referencelist', methods=['GET'])
def list_references():
	items = Refer.objects();
	return render_template('list_references.html', items=items);
