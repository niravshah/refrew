define(["appl",
        "tpl!apps/recruit/templates/recruit-add-job.tpl",
	"tpl!apps/recruit/templates/recruit-job-form.tpl"],
        function(App, recAddJobTpl, recJobFormTpl){

        App.module( "RecruitModule.Views",function(Mod,App,Backbone, Marionette, $, _) {
 
	Mod.AddJobView =  Backbone.Marionette.ItemView.extend({
                        template: recAddJobTpl,
                        tagName: 'div',
                        className: 'well',
			events:{
				'click #add-job' : 'addJob'
			},
			addJob : function(){
				App.RecruitModule.Control.Controller.addJob();
			}
        });

	Mod.JobForm = Backbone.Marionette.ItemView.extend({
                        template: recJobFormTpl,
                        tagName: 'div',
                        className: 'well'
	});
		
});

});

