define(["appl","apps/jobs/jobs_views"], function(App){
	'use strict';
    App.module('JobsModule.Control', function (Mod, App, Backbone, Marionette, $, _) {
        Mod.addInitializer(function (options) {
			console.log('JobsModule Initializer Called');
			Mod.Controller = new Controller({});
        });

		var Controller = Backbone.Marionette.Controller.extend({
			initialize: function (options) {
				 _.bindAll();					
			},
			listJobs : function(){
			  var jobsCollection = new App.Models.SummaryJobCollection();
			  var jobsView = new App.JobsModule.Views.SummaryJobListView({collection:jobsCollection});
			  App.lr2.show(jobsView);
			  App.lr3.close();
			  App.lr4c1.close();
			  App.lr4c2.close();	
			  App.lr5.close();
			}			
		});

    });
    return App.JobsModule;
});

