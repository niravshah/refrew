import json
import simplejson
from refrew import app
from flask import Flask, render_template, request, redirect, url_for, jsonify, Response
from flask.ext.mongoengine import MongoEngine, ValidationError
from flask.ext.wtf import Form, TextField, Required
from flask.ext.mongoengine.wtf import model_form
from flask.ext.security import Security, MongoEngineUserDatastore, UserMixin, RoleMixin, login_required
from flask_negotiate import consumes, produces
from models import db, user_datastore, security, Job, Role, User, AddJobForm, Reward, Referral, StageForm, Stage, MongoDocumentEncoder

from bson import json_util


def mongodoc_jsonify(*args, **kwargs):
    return Response(simplejson.dumps(dict(*args, **kwargs), cls=MongoDocumentEncoder), mimetype='application/json')


@app.route('/jobs/add/', methods=['GET'])
@login_required
def add_job_form():
    form = AddJobForm()
    return render_template('add_job.html', form=form)


@app.route('/jobs/<id>/edit', methods=['GET'])
@login_required
def edit_job_form(id):
    job = Job.objects(jobid=id).first()
    stages = Stage.objects(job=job)
    form = AddJobForm(request.form, obj=job,)
    return render_template('add_job.html', form=form, edit=True, stages=stages)


@app.route('/jobs', methods=['GET', 'POST'])
def jobs():
    if request.method == 'POST':
        form = AddJobForm(request.form)
        if request_has_json():
            try:
                json_data = json.dumps(request.json, default=json_util.default)
                model = Job.from_json(json_data)
                model.save()
                return mongodoc_jsonify(item=model.to_mongo())
            except ValidationError as e:
                return jsonify(item=str(e))
        else:
            if form.validate():
                form.save()
            else:
                return render_template('add_job.html', form=form)
        return list_jobs(10, 0)
    else:
        records_to_fetch = request.args.get('rec', 10)
        last = request.args.get('last', 0)
        user = request.args.get('user', '')
        return list_jobs(records_to_fetch, last, user)


@app.route('/jobs/<jobid>', methods=['GET', 'PUT'])
def job(jobid):
    if request.method == 'GET':
        job = Job.objects(jobid=int(jobid)).first()
        stages = Stage.objects(job=job)
        ref = Referral.objects(job=job)
        if request_wants_json():
            return mongodoc_jsonify(item=job.to_mongo())
        else:
            return render_template('list_job.html', job=job, referrals=ref, stages=stages)
    if request.method == 'PUT':
        job = Job.objects(jobid=int(jobid)).first()
        if request_has_json():
            json_data = json.dumps(request.json, default=json_util.default)
            model = Job.from_json(json_data)
            job.locationName = model.locationName
            job.title = model.title
            job.permOrCont = model.permOrCont
            job.remuneration = model.remuneration
            job.tSkill1 = model.tSkill1
            job.tSkill2 = model.tSkill2
            job.tSkill3 = model.tSkill3
            job.pSkill1 = model.pSkill1
            job.pSkill2 = model.pSkill2
            job.pSkill3 = model.pSkill3
            job.qalNeeded = model.qalNeeded
            job.qal = model.qal
            job.projChar1 = model.projChar1
            job.projChar2 = model.projChar2
            job.projChar3 = model.projChar3
            job.teamChar1 = model.teamChar1
            job.teamChar2 = model.teamChar2
            job.teamChar3 = model.teamChar3
            job.save()
            '''Job.objects(jobid=int(jobid)).first().update(json_data)'''
            return mongodoc_jsonify(item=job.reload().to_mongo())
        else:
            form = AddJobForm(request.form)
            form.populate_obj(job)
            job.save()
            return render_template('list_job.html', jobs=[job])


@app.route('/jobs/<jobid>/rewards', methods=['GET', 'POST'])
@login_required
def stages(jobid):
    if request.method == 'GET':
        job = Job.objects(jobid=int(jobid)).first()
        stages = Stage.objects(job=job)
        itemLst = [dict(stage.to_mongo()) for stage in stages]
        return mongodoc_jsonify(items=itemLst)
    if request.method == 'POST':
        if request_has_json():
            try:
                job = Job.objects(jobid=int(jobid)).first()
                reward = Reward.objects(itemid=request.json['reward']).first()
                model = Stage()
                model.job = job
                model.reward = reward
                model.rewardDesc = reward.itemid
                model.jobDesc = str(job.jobid)
                model.stage = request.json['stage']
                model.save()
                model.reload()
                return mongodoc_jsonify(item=model.to_mongo())
            except ValidationError as e:
                return jsonify(item=str(e))


@app.route('/jobs/<jobid>/rewards/delete', methods=['PUT'])
@login_required
def delete_stage(jobid):
    stage = Stage.objects(id=request.json['id']).first().delete()
    return mongodoc_jsonify(item='Object Deleted')


@app.route('/jobs/<id>/stages/add', methods=['GET', 'POST'])
@login_required
def add_job_stage(id):
    stage = StageForm()
    stage.job.data = Job.objects(jobid=id).first().id
    return render_template('add_stage.html', form=stage)


@app.route('/jobs/<jobid>/referrals', methods=['GET', 'POST'])
def job_referral(jobid):
    if request.method == 'GET':
        job = Job.objects(jobid=jobid).first()
        referrals = Referral.objects(job=job)
        return render_template('_referrals.html', referrals=referrals)
    if request.method == 'POST':
        if request_has_json():
            try:
                job = Job.objects(jobid=int(request.json['job'])).first()
                request.json['job'] = str(job.id)
                model = Referral.from_json(
                    json.dumps(request.json, default=json_util.default))
                model.status = 'Submitted'
                model.save()
                return jsonify(item='Submitted')
            except ValidationError as e:
                return jsonify(item=str(e))
        else:
            print 'Request does not have JSON!'


@app.route('/jobs/<jobid>/users/<userid>/referrals', methods=['GET'])
def user_job_referrals(jobid, userid):
    job = Job.objects(jobid=int(jobid)).first()
    referrals = Referral.objects(job=job, user=userid)
    return jsonify(item=[(dict(itemid=ref.itemid, job=ref.job.jobid, user=ref.user, referenceName=ref.referenceName, reference=ref.reference, status=ref.status))for ref in referrals])


@app.route('/jobs/<jobid>/referrals/<refid>/status/<value>', methods=['GET'])
@login_required
def change_job_referral_status(jobid, refid, value):
    job = Job.objects(jobid=int(jobid)).first()
    referral = Referral.objects(job=job, itemid=refid).first()
    referral.status = value
    referral.save()
    return job_referral(jobid)


@app.route('/joblist', methods=['GET'])
def list_jobs():
    list_jobs(100, 0)


def list_jobs(records_to_fetch, last, user):
    new_last = int(last) + int(records_to_fetch)
    if(user != ''):
        jobs = Job.objects(user=user)[int(last):new_last]
    else:
        jobs = Job.objects[int(last):new_last]
    if request_wants_json():
        itemLst = [dict(job.to_mongo()) for job in jobs]
        return mongodoc_jsonify(items=itemLst)
    return render_template('list_jobs.html', jobs=jobs)


@app.route('/jobs/delete/all', methods=['GET'])
def delete_all_jobs():
    Job.objects.delete()
    return 'Done'


def request_wants_json():
    best = request.accept_mimetypes.best_match(
        ['application/json', 'text/html'])
    return best == 'application/json' and request.accept_mimetypes[best] > request.accept_mimetypes['text/html']


def request_has_json():
    if 'application/json' in request.content_type:
        return True
    return False
