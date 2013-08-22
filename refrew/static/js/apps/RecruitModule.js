define(["appl","parsley", "apps/recruit/recruit_views"],function(App){    
'use strict';
    gmm.Viewer.module('RecruitModule.Control', function (Mod, App, Backbone, Marionette, $, _) {
		Mod.addInitializer(function (options) {
			console.log('RecruitModule Initializer Called');		
			Mod.Controller = new Controller({});
		});

		var Controller = Backbone.Marionette.Controller.extend({		
			renderRecruitHome : function(){
			 	App.content.close();
				var recLayout = new App.Layouts.RecruitPageLayout();
				App.content.show(recLayout);	
				var recView = new App.RecruitModule.Views.AddJobView();
				recLayout.lr2c1.show(recView);
			},

			addJob : function(){
				var model = new App.Models.DetailedJobModel({jobid:undefined});
				var recForm = new App.RecruitModule.Views.JobForm({model:model});	
				var recFormNav = new App.RecruitModule.Views.JobFormNav();
				App.content.currentLayout.lr2c1.show(recForm);
				App.content.currentLayout.lr1.show(recFormNav);
			}
		});
		
	});
});
