define(["appl"], function(App){
	'use strict';
    App.module('JobsModule', function (Mod, App, Backbone, Marionette, $, _) {
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
			  var jobsView = new App.Models.SummaryJobListView({collection:jobsCollection});
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

