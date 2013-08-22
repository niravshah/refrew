define(["appl",
        "tpl!apps/recruit/templates/recruit-add-job.tpl",
	"tpl!apps/recruit/templates/recruit-job-form.tpl",
	"tpl!apps/recruit/templates/recruit-job-form-nav.tpl"],
        function(App, recAddJobTpl, recJobFormTpl, recJobFormNavTpl){

        App.module("RecruitModule.Views",function(Mod,App,Backbone, Marionette, $, _) {
 
	Mod.AddJobView =  Backbone.Marionette.ItemView.extend({
                        template: recAddJobTpl,
                        tagName: 'div',
                        className: 'well',
			events:{
				'click #add-job' : 'addJob'
			},
			addJob : function(){
				App.navigate('#/recruit/newjob');
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
				console.log('Triggered Auto Save');
				var data = Backbone.Syphon.serialize(this);
                               	this.model.set(data);
				this.model.save({},{
					success:function(response){
						App.navigate('#/recruit/' + response.attributes.jobid);
					}});
			}
	});

	Mod.JobFormNav =  Backbone.Marionette.ItemView.extend({
                        template: recJobFormNavTpl,
                        tagName: 'div',
			className: 'well'
        });

		
});

});

