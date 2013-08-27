define(["appl",
        "tpl!apps/recruit/templates/recruit-add-job.tpl",
	"tpl!apps/recruit/templates/recruit-job-form.tpl",
	"tpl!apps/recruit/templates/recruit-job-form-nav.tpl",
	"tpl!apps/recruit/templates/recruit-rewards-add-stage.tpl",
	"tpl!apps/recruit/templates/recruit-rewards-add-stage-form.tpl"],
        function(App, recAddJobTpl, recJobFormTpl, recJobFormNavTpl, addStageNavTpl, addStageTpl){

        App.module("RecruitModule.Views",function(Mod,App,Backbone, Marionette, $, _) {
 
	Mod.AddJobView =  Backbone.Marionette.ItemView.extend({
                        template: recAddJobTpl,
                        tagName: 'div',
                        className: 'well',
			events:{
				'click #add-job' : 'addJob'
			},
			addJob : function(){
				App.navigate('#/jobs/newjob');
			}
        });

	Mod.JobForm = Backbone.Marionette.ItemView.extend({
                        template: recJobFormTpl,
			initialize: function(){
				 this.listenTo(this.model, "change", this.render);
			},
			modelEvents:{'change':'onChange'},
        		onChange : function(){
				console.log('DetailedJobModel Changed');
			},
			events:{
				'change .form-control' : 'autoSave'
			},
			autoSave : function(){
				var data = Backbone.Syphon.serialize(this);
                               	this.model.set(data);
				this.model.save({},{
					success:function(response,model){
						App.navigate('#/jobs/' + response.attributes.jobid);
					}});
			}
	});

	Mod.JobFormNav =  Backbone.Marionette.ItemView.extend({
                        template: recJobFormNavTpl,
                        tagName: 'div',
			className: 'well',
			events:{
				'click #add-rewards' : 'addRewards'
			},
			addRewards : function(){
				App.navigate('#/'+App.getCurrentRoute() + '/rewards');
			}
        });
        
	Mod.JobStageFormNav =  Backbone.Marionette.ItemView.extend({
                        template: addStageNavTpl,
                        tagName: 'div',
                        className: 'well',
                        events:{
                                'click #add-stage' : 'addStage'
                        },
                        addStage : function(){
				App.RecruitModule.Control.Controller.addNewJobStage();
                        }
        });
        Mod.JobStageForm =  Backbone.Marionette.ItemView.extend({
                        template: addStageTpl,
                        tagName: 'div',
                        className: 'well',
                        events:{
                                'click #save-reward' : 'saveJobStage'
                        },
                        saveJobStage : function(evt){
                                var loadingView = new App.Models.Loading({model:new App.Models.LoadingModel({title:'Saving Reference'})});
                                App.content.currentLayout.lr3c2.show(loadingView);
                                evt.preventDefault();
				var data = Backbone.Syphon.serialize(this);
                                var model = new App.Models.JobStageModel(data);
				model.urlRoot = App.getCurrentRoute();
				model.save(null,{
					success : function(){
						App.RecruitModule.Control.Controller.displayCurrentRewards();
                                                var alertModel = new App.Models.AlertModel({message:'Reward Added!',alertClass:'alert-success'});
                                                var alert = new App.Models.Alert({model:alertModel})
                                               	App.content.currentLayout.lr3c2.show(alert);	
					}
				});
                        }
        });

	

		
});

});

