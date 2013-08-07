import json
from refrew import app
from flask import Flask, render_template,request, redirect, url_for, jsonify
from flask.ext.mongoengine import MongoEngine, ValidationError
from flask.ext.wtf import Form, TextField, Required
from flask.ext.mongoengine.wtf import model_form
from flask.ext.security import Security, MongoEngineUserDatastore, UserMixin, RoleMixin, login_required
from flask_negotiate import consumes, produces
from bson import json_util

from models import db, user_datastore, security, Job, Role, User, AddJobForm, Reward, Referral, StageForm, Stage

@app.route('/jobs/add/',methods=['GET'])
@login_required
def add_job_form():
  form = AddJobForm()
  return render_template('add_job.html',form=form)

@app.route('/jobs/<id>/edit',methods=['GET'])
@login_required
def edit_job_form(id):
   job = Job.objects(jobid=id).first()
   stages = Stage.objects(job=job)
   form = AddJobForm(request.form, obj=job,)
   return render_template('add_job.html',form=form, edit=True,stages=stages)	

@app.route('/jobs',methods=['GET','POST'])
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
		records_to_fetch =  request.args.get('rec',10)
		last =  request.args.get('last',0)
   		return list_jobs(records_to_fetch,last)


@app.route('/jobs/<id>',methods=['GET','POST'])
@login_required
def job(id):
        if request.method == 'GET':
		job = Job.objects(jobid=id).first()
		stage = Stage.objects(job=job)
		ref = Referral.objects(job=job)
	        if request_wants_json():
		  return jsonify(item=job)
	        else:
        	  return render_template('list_job.html',job=job,referrals=ref,stages=stage)
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
			return render_template('list_job.html',jobs=[job])


@app.route('/jobs/<id>/stages',methods=['GET','POST'])
@login_required
def stages(id):
    if request.method == 'GET':	
      stage = StageForm()	
      stage.job.data = Job.objects(jobid=id).first().id	
      return render_template('add_stage.html',form=stage)
    if request.method == 'POST':
      stage = StageForm(request.form)
      if stage.validate():
	      stage.save()
	      stages = Stage.objects(job=stage.job.data)
	      return render_template('list_stages.html',stages=stages)		      
      else:
	print stage.errors


@app.route('/jobs/<jobid>/referrals')
@login_required
def job_referral(jobid):
	job = Job.objects(jobid=jobid).first()
	referrals = Referral.objects(job=job)
	return render_template('_referrals.html',referrals=referrals)

@app.route('/jobs/<jobid>/referrals/<refid>/status/<value>',methods=['GET'])
@login_required
def change_job_referral_status(jobid, refid, value):
	job = Job.objects(jobid=jobid).first()
	referral = Referral.objects(job=job, itemid=refid).first()
	referral.status = value
	referral.save()
	return job_referral(jobid)
	
@app.route('/joblist',methods=['GET'])
def list_jobs():
	list_jobs(100,0)

def list_jobs(records_to_fetch,last):
	new_last = int(last)+int(records_to_fetch)
	jobs = Job.objects[int(last):new_last]
        if request_wants_json():
                itemLst = [dict(itemid=job.jobid,description=job.description) for job in jobs]
                return jsonify(items=itemLst)
        return render_template('list_jobs.html',jobs=jobs)

@app.route('/jobs/delete/all',methods=['GET'])
def delete_all_jobs():
	Job.objects.delete()
	return 'Done'


def request_wants_json():
    best = request.accept_mimetypes.best_match(['application/json', 'text/html'])
    return best == 'application/json' and request.accept_mimetypes[best] > request.accept_mimetypes['text/html']

def request_has_json():
	if 'application/json' in request.content_type:
		return True;
	return False;
