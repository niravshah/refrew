define(["appl"], function(App){
	'use strict';
	gmm.Viewer.module('RouterModule', function (Mod, App, Backbone, Marionette, $, _) {

		Mod.Router = Backbone.Marionette.AppRouter.extend({
				appRoutes: {
				  'home':'showHome',
				  'jobs/:jobid/refer': 'refer',
				  'jobs': 'listJobs',
				  'recruit':'renderRecruitHome'
				}
		});

		var API = {
			showHome:function(){
			   console.log('Show Home Triggered');
			   var homePageLayout = new App.Layouts.HomePageLayout();
			   App.content.show(homePageLayout);
			   homePageLayout.lr2.show(App.JobsModule.Control.Controller.listJobs());
			   App.RewardsModule.Control.Controller.listRewards();
			},
			listJobs:function(){App.JobsModule.Control.Controller.listJobs();},
			refer: function(jobid){App.ReferralsModule.Control.Controller.referJob(jobid);},
			renderRecruitHome: function(){App.RecruitModule.Control.Controller.renderRecruitHome();}
		};

		App.addInitializer(function(){
			require(["apps/JobsModule","apps/RewardsModule","apps/ReferralsModule","apps/RecruitModule"],function(){
				App.router = new Mod.Router({controller: API  });
				App.trigger('routing:started');
			});
		});

		App.on('show:jobs',function(model){
			App.navigate("#/jobs");
		});

		App.on('show:home',function(model){
			App.navigate("#/home");
		});	

		App.on('show:referral',function(model){
			App.navigate("#/jobs/" + model.attributes['itemid'] + "/refer");
		});

		App.on('linkedin:auth', function(){
			App.ReferralsModule.Control.Controller.onLinkedInAuth2();
		});

	});
});

