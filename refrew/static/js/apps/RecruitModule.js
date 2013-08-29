define(["appl", "apps/recruit/recruit_views"], function(App) {'use strict';
	gmm.Viewer.module('RecruitModule.Control', function(Mod, App, Backbone, Marionette, $, _) {
		Mod.addInitializer(function(options) {
			console.log('RecruitModule Initializer Called');
			Mod.Controller = new Controller({});
		});

		var Controller = Backbone.Marionette.Controller.extend({
			renderRecruitHome : function() {
				App.content.close();
				var recLayout = new App.Layouts.RecruitPageLayout();
				App.content.show(recLayout);
				var recView = new App.RecruitModule.Views.AddJobView();
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

			addJob : function() {
				var userid = $('#linkedin-userid').val();
				var model = new App.Models.DetailedJobModel({
					jobid : null,
					user : userid
				});
				var recForm = new App.RecruitModule.Views.JobForm({
					model : model,
					templateHelpers : {
						editMode : function() {
							return true;
						}
					}
				});
				var recFormNav = new App.RecruitModule.Views.JobFormNav();
				App.content.currentLayout.lr3c1.close();
				App.content.currentLayout.lr2c1.show(recForm);
				App.content.currentLayout.lr1.show(recFormNav);
			},
			editJob : function(jobid) {
				var userid = $('#linkedin-userid').val();
				var model = new App.Models.DetailedJobModel({
					jobid : jobid,
					user : userid
				});
				App.content.currentLayout.lr3c1.close();
				App.content.currentLayout.lr1.close();
				model.fetch({
					success : function() {
						var recForm = new App.RecruitModule.Views.JobForm({
							model : model,
							templateHelpers : {
								editMode : function() {
									return true;
								}
							}
						});
						var recFormNav = new App.RecruitModule.Views.JobFormNav();
						App.content.currentLayout.lr2c1.show(recForm);
						App.content.currentLayout.lr1.show(recFormNav);
					},
					error : function() {
						console.log('ERROR: RecruitModule.Control editJob model.fetch');
					}
				});

				Mod.Controller.displayCurrentRewards();
			},
			viewJob : function(jobid) {
				var userid = $('#linkedin-userid').val();
				var model = new App.Models.DetailedJobModel({
					jobid : jobid,
					user : userid
				});
				App.content.currentLayout.lr3c1.close();
				App.content.currentLayout.lr1.close();
				model.fetch({
					success : function() {
						var recForm = new App.RecruitModule.Views.JobForm({
							model : model,
							templateHelpers : {
								editMode : function() {
									return false;
								}
							}
						});
						var recFormNav = new App.RecruitModule.Views.JobFormNav();
						App.content.currentLayout.lr2c1.show(recForm);
						App.content.currentLayout.lr1.show(recFormNav);
					},
					error : function() {
						console.log('ERROR: RecruitModule.Control editJob model.fetch');
					}
				});

				Mod.Controller.displayCurrentRewards();
			},
			renderEditForm : function(model) {
				var recForm = new App.RecruitModule.Views.JobForm({
					model : model,
					templateHelpers : {
						editMode : function() {
							return true;
						}
					}
				});
				App.content.currentLayout.lr2c1.show(recForm);
			},
			editJobRewards : function(jobid) {
				App.content.currentLayout.lr2c1.close();
				var rewardsCollection = new App.Models.RewardCollection();
				var rewardsView = new App.RewardsModule.Views.RewardCollectionView({
					collection : rewardsCollection,
					itemViewOptions : {
						'className' : 'col-lg-4',
						'viewScreen' : 'recruit'
					}
				});
				App.content.currentLayout.lr2c1.show(rewardsView);
				Mod.Controller.displayCurrentRewards();
			},

			displayCurrentRewards : function() {
				var jobStageCol = new App.Models.JobStageCollection({
					'url' : function() {
						if (App.getCurrentRoute().indexOf('rewards') > -1) {
							return App.getCurrentRoute();
						} else {
							return App.getCurrentRoute() + '/rewards';
						}
					}
				});
				jobStageCol.fetch({
					success : function() {
						var jobStageView = new App.Models.JobStagesListView({
							collection : jobStageCol
						});
						App.content.currentLayout.lr2c2.show(jobStageView);
					}
				});

			},
			rewardSelected : function(ev, data) {
				var model = new App.Models.RewardModel(data);
				var stageForm = new App.RecruitModule.Views.JobStageForm({
					model : model
				});
				App.content.currentLayout.lr3c2.show(stageForm);
			},
			addNewJobStage : function() {
				var stageForm = new App.RecruitModule.Views.JobStageForm();
				App.content.currentLayout.lr3c2.show(stageForm);
			},
			deleteJobStage : function(data) {
				var model = new Backbone.Model(data);
				if (App.getCurrentRoute().indexOf('rewards') > -1) {
					model.url = App.getCurrentRoute() + '/delete';
				} else {
					model.url = App.getCurrentRoute() + '/rewards/delete';
				}
				model.save(null, {
					success : function() {
						Mod.Controller.displayCurrentRewards();
					}
				});
			},
			onLinkedInAuth : function() {
				if (App.getCurrentRoute().indexOf('refer') > -1) {
					var userid = $('#linkedin-userid').val();
					$('#recruit-linkedin-userid').val(userid);
				}
			}
		});

	});
});
