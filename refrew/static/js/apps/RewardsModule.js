define(["appl", "apps/rewards/rewards_views"], function(App) {'use strict';
	App.module('RewardsModule.Control', function(Mod, Viewer, Backbone, Marionette, $, _) {
		Mod.addInitializer(function(options) {
			console.log('RewardsModule Initializer Called');
			Mod.Controller = new Controller({});
		});

		var Controller = Backbone.Marionette.Controller.extend({
			initialize : function(options) {
				_.bindAll();
			},
			listRewards : function() {
				var rewardsCollection = new Viewer.Models.RewardCollection();
				var rewardsView = new Viewer.RewardsModule.Views.RewardCollectionView({
					collection : rewardsCollection,
					itemViewOptions : {
						'viewScreen' : 'home'
					}
				});
				App.content.currentLayout.rr2.show(rewardsView);
			},
			renderRewardsHome : function() {
				App.content.close();
				var recLayout = new App.Layouts.RecruitPageLayout();
				App.content.show(recLayout);
				var recView = new App.RewardsModule.Views.AddRewardsView();
				recLayout.lr2c1.show(recView);
				var jobsCollection = new App.Models.SummaryJobCollection();
				var userid = $('#linkedin-userid').val();
				var jobsView = new App.JobsModule.Views.SummaryJobListView({
					itemView : App.JobsModule.Views.SummaryJobView,
					collection : jobsCollection,
					parmData : {
						'rec' : 12,
						'user' : userid
					},
					itemViewOptions : {
						'renderingView' : 'recruit'
					}
				});

				recLayout.lr3c1.show(jobsView);
			},
			addReward : function() {
				var userid = $('#linkedin-userid').val();
				var model = new App.Models.DetailedRewardModel({
					id : null,
					user : userid
				});
				var recForm = new App.RewardsModule.Views.RewardForm({
					model : model,
					templateHelpers : {
						editMode : function() {
							return true;
						}
					}
				});
				App.content.currentLayout.lr1.close();
				App.content.currentLayout.lr3c1.close();
				App.content.currentLayout.lr2c1.show(recForm);
			}
		});
	});
	return App.RewardsModule;
})

