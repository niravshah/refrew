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
			  var jobsView = new App.JobsModule.Views.SummaryJobListView({
							collection:jobsCollection, 
							itemView: App.JobsModule.Views.SummaryJobView,
							itemViewOptions:{'renderingView':'home'},
							parmData:{'rec':12}});
			  return jobsView;	
			}			
		});

    });
    return App.JobsModule;
});

