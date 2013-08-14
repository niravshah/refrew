(function () {
	'use strict';
	gmm.Viewer.module('RouterModule', function (Mod, Viewer, Backbone, Marionette, $, _) {

 	Mod.Router = Backbone.Marionette.AppRouter.extend({
        	appRoutes: {
	              'home':'showHome',
		      'jobs/:jobid/refer': 'refer',
		      'jobs': 'listJobs'
        	}
	});

	var API = {
		showHome:function(){
		   console.log('Show Home Triggered');
		   Viewer.JobsModule.API.listJobs();
		   Viewer.RewardsModule.API.listRewards();
		},
		listJobs:function(){Viewer.JobsModule.API.listJobs();},
    		refer: function(jobid){Viewer.ReferralsModule.Controller.referJob(jobid)}
	};

	Viewer.addInitializer(function(){
                Viewer.router = new Mod.Router({
                controller: API  });
                Viewer.trigger('routing:started');
        });

	Viewer.on('show:jobs',function(model){
             Viewer.navigate("#/jobs");
        });

	Viewer.on('show:home',function(model){
             Viewer.navigate("#/home");
        });	

 	Viewer.on('show:referral',function(model){
             Viewer.navigate("#/jobs/" + model.attributes['itemid'] + "/refer");
        });

	Viewer.on('linkedin:auth', function(){
	     Viewer.ReferralsModule.Controller.onLinkedInAuth2();
	});

  });
})();

