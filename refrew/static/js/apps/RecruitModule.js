define(["appl","parsley", "apps/recruit/recruit_views"],function(App){    
'use strict';
    gmm.Viewer.module('RecruitModule.Control', function (Mod, App, Backbone, Marionette, $, _) {
		Mod.addInitializer(function (options) {
			console.log('RecruitModule Initializer Called');		
			Mod.Controller = new Controller({});
		});

		var Controller = Backbone.Marionette.Controller.extend({		
			renderRecruitHome : function(){
				App.lr1.close();
				App.lr2.close();
				App.lr3.close();
				App.rr1.close();
				App.rr2.close();
				var recView = new App.RecruitModule.Views.AddJobView();
				App.lr1.show(recView);
			},

			addJob : function(){
				var recForm = new App.RecruitModule.Views.JobForm();	
				App.lr1.close();
				App.lr4c1.show(recForm);
			}
		});
		
	});
});
