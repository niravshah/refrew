define(["appl", "apps/recruit/recruit_views"],function(App){    
'use strict';
    gmm.Viewer.module('RecruitModule.Control', function (Mod, App, Backbone, Marionette, $, _) {
		Mod.addInitializer(function (options) {
			console.log('RecruitModule Initializer Called');		
			Mod.Controller = new Controller({});
		});

		var Controller = Backbone.Marionette.Controller.extend({		
			renderRecruitHome : function(){
			 	App.content.close();
				var recLayout = new App.Layouts.RecruitPageLayout();
				App.content.show(recLayout);	
				var recView = new App.RecruitModule.Views.AddJobView();
				recLayout.lr2c1.show(recView);
				var jobsCollection = new App.Models.SummaryJobCollection();
                          	var userid = $('#linkedin-userid').val();
				var jobsView = new App.JobsModule.Views.SummaryJobListView({
							itemView:App.JobsModule.Views.SummaryJobView,
							collection:jobsCollection,
							parmData:{'rec':12,'user':userid},
							itemViewOptions:{'renderingView':'recruit'}}); 
				
				recLayout.lr3.show(jobsView);
			},

			addJob : function(){
				var userid = $('#linkedin-userid').val();
				var model = new App.Models.DetailedJobModel({jobid:null,user:userid});
				var recForm = new App.RecruitModule.Views.JobForm({model:model});	
				var recFormNav = new App.RecruitModule.Views.JobFormNav();
				App.content.currentLayout.lr2c1.show(recForm);
				App.content.currentLayout.lr1.show(recFormNav);
			},
			editJob : function(jobid){
				var userid = $('#linkedin-userid').val();
                                var model = new App.Models.DetailedJobModel({jobid:jobid,user:userid});
				model.fetch({
					success:function(){
						var recForm = new App.RecruitModule.Views.JobForm({model:model});
                                		var recFormNav = new App.RecruitModule.Views.JobFormNav();
                                		App.content.currentLayout.lr2c1.show(recForm);
                                		App.content.currentLayout.lr1.show(recFormNav);
					},
					error: function(){console.log('ERROR: RecruitModule.Control editJob model.fetch');}
				});
			},
			onLinkedInAuth : function(){
				if(App.getCurrentRoute().indexOf('refer') > -1){
					var userid = $('#linkedin-userid').val();
					$('#recruit-linkedin-userid').val(userid);
				}
			}
		});
		
	});
});
