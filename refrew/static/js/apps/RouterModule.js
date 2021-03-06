define(["appl"], function(App) {'use strict';
	gmm.Viewer.module('RouterModule', function(Mod, App, Backbone, Marionette, $, _) {

		Mod.Router = Backbone.Marionette.AppRouter.extend({
			appRoutes : {
				'home' : 'showHome',
				'jobs/:jobid/refer' : 'refer',
				'jobs' : 'listJobs',
				'recruit' : 'renderRecruitHome',
				'jobs/newjob' : 'addJob',
				'jobs/:jobid' : 'editJob',
				'jobs/:jobid/rewards' : 'editJobRewards',
				'rewards' : 'renderRewardsHome',
				'rewards/new' : 'addReward',
			}
		});

		var API = {
			showHome : function() {
				console.log('Show Home Triggered');
				var homePageLayout = new App.Layouts.HomePageLayout();
				App.content.show(homePageLayout);
				homePageLayout.lr2.show(App.JobsModule.Control.Controller.listJobs());
				App.RewardsModule.Control.Controller.listRewards();
			},
			listJobs : function() {
				App.JobsModule.Control.Controller.listJobs();
			},
			refer : function(jobid) {
				App.ReferralsModule.Control.Controller.referJob(jobid);
			},
			renderRecruitHome : function() {
				App.RecruitModule.Control.Controller.renderRecruitHome()
			},
			addJob : function() {
				App.RecruitModule.Control.Controller.addJob()
			},
			editJob : function(jobid) {
				App.RecruitModule.Control.Controller.editJob(jobid)
			},
			editJobRewards : function(jobid) {
				App.RecruitModule.Control.Controller.editJobRewards(jobid)
			},
			renderRewardsHome : function() {
				App.RewardsModule.Control.Controller.renderRewardsHome()
			},
			addReward : function() {
				App.RewardsModule.Control.Controller.addReward()
			},
			
		};

		App.addInitializer(function() {
			require(["apps/JobsModule", "apps/RewardsModule", "apps/ReferralsModule", "apps/RecruitModule"], function() {
				App.router = new Mod.Router({
					controller : API
				});
				App.trigger('routing:started');
			});
		});

		App.on('show:jobs', function(model) {
			App.navigate("#/jobs");
		});

		App.on('show:home', function(model) {
			App.navigate("#/home");
		});

		App.on('show:referral', function(model) {
			App.navigate("#/jobs/" + model.attributes['itemid'] + "/refer");
		});

		App.on('linkedin:auth', function() {
			App.ReferralsModule.Control.Controller.onLinkedInAuth2();
			App.RecruitModule.Control.Controller.onLinkedInAuth();
		});

	});
});

