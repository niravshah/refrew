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
				var recView = new App.RecruitModule.Views.AddJobView();
			},

			addJob : function(){
				var recForm = new App.RecruitModule.Views.JobForm();	
				var recFormNav = new App.RecruitModule.Views.JobFormNav();
			}
		});
		
	});
});
