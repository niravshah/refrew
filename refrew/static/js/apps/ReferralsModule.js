define(["appl"],function(App){    
'use strict';
    App.module('ReferralsModule', function (Mod, Viewer, Backbone, Marionette, $, _) {
       
		Mod.addInitializer(function (options) {
			console.log('Referrals Initializer Called');		
			Mod.Controller = new Controller({});
		});

		var Controller = Backbone.Marionette.Controller.extend({
			peopleSearch : function(keywords) {
				var keywords = document.getElementById('keywords').value;
				IN.API.PeopleSearch()
					.fields("firstName", "lastName", "distance",'positions','picture-url','headline','skills','location:(name)',"public-profile-url")
					.params({"keywords": keywords, "count": 10, "sort": "distance"})
					.result(function(results){Mod.Controller.displayPeopleSearch(results);})
					.error(function error(e) {console.log('peopleSearch Error:', e);
				}
				);
			},

			displayPeopleSearch : function(peopleSearch) {
				var sel = document.getElementById("referencesel");
				var members = peopleSearch.people.values;
				var liSearchArr = [];
				for (var member in members) {
					var distance = members[member].distance;
					switch (distance) {
						case 1:
							var model = new Viewer.Models.LinkedInSearchResultModel(members[member]);
							model.attributes.user = $('#linkedin-userid').val();
							model.attributes.job = $('#current-jobid').val();
							liSearchArr.push(model);
						break;
						default:
					}
				}
				var liSearchCollection = new Viewer.Models.LinkedInSearchResultCollection(liSearchArr);
				var liSearchCollView = new Viewer.Models.LinkedInSearchResultCollectionView({collection:liSearchCollection});
				Viewer.lr5.show(liSearchCollView);					
			 },
			
			submitReferral : function(e, _this){
				var loadingView = new Viewer.Models.Loading({model:new Viewer.Models.LoadingModel({title:'Saving Reference'})});
				Viewer.lr4c2.show(loadingView);
				e.preventDefault();
				var data = Backbone.Syphon.serialize(_this);
				var model = new Viewer.Models.LinkedInSearchResultModel(data);
				model.save(null,{
					success:function(resp){
						var alertModel = new Viewer.Models.AlertModel({message:'Referral Added!',alertClass:'alert-success'});
						var alert = new Viewer.Models.Alert({model:alertModel})
						Viewer.lr4c2.show(alert);
						Viewer.ReferralsModule.Controller.renderUserRefs(resp.get('job'),resp.get('user'));
					},
					error : function(){	
						console.log('error');
					}
				});
			},
			onLinkedInAuth2 : function(jobid){
				if(Viewer.getCurrentRoute().indexOf('refer') > -1){
					Viewer.lr3.$el.hide();
					Viewer.lr4c1.$el.show();
					if(!jobid){
						jobid = $('#current-jobid').val();
					}
								var userid = $('#linkedin-userid').val();
					Mod.Controller.renderUserRefs(jobid,userid);
				}
			},
			referJob : function(jobid){
				var job = new Viewer.Models.DetailedJobModel({id:jobid});
				job.fetch({
					success: function(model, response) {
						var jobView = new Viewer.Models.DetailedJobView({model: job});
						Viewer.lr2.show(jobView);
						var coll = new Backbone.Collection(job.attributes['stages']);
						var stagesListView = new Viewer.Models.JobStagesListView({collection:coll});
						Viewer.rr2.show(stagesListView);
						var liSearchWidget = new Viewer.Models.LISearchWidgetView();
						Viewer.lr4c1.show(liSearchWidget);
						var liLoginButton = new Viewer.Models.LILoginButtonView();
						Viewer.lr3.show(liLoginButton);
						if (IN){
							if(IN.User){
								if(IN.User.isAuthorized()){
									Mod.Controller.onLinkedInAuth2(jobid);
								}else{
									Viewer.lr4c1.$el.hide();
									IN.parse($('#main-sub').get(0));
								}
							}else{
								Viewer.lr4c1.$el.hide();
								if(IN.parse){
									IN.parse($('#main-sub').get(0));
								}
							}
						}else{
							Viewer.lr3.$el.hide();
						}
					},
					error: function(model, response) {
						console.log("Error Fetching.");
					}
				});
			}, /* end of referJob function*/
			renderUserRefs : function(jobid,userid){
				var userRefs = new Viewer.Models.UserJobReferralsCollection(jobid,userid);
				userRefs.job = jobid;
				userRefs.user = userid;
				userRefs.fetch({
					success:function(){
						var userRefsView = new Viewer.Models.UserJobReferralsListView({collection:userRefs});
						Viewer.lr3.show(userRefsView);
						Viewer.lr3.$el.show();
						if(userRefs.length > 1){
							var alertMsgModel = new Viewer.Models.AlertModel({message:'You have already made <strong>2 referrals</strong> (the maximum allowed) for this vacancy', alertClass:'alert-info'});
							var alertMsg = new Viewer.Models.Alert({model:alertMsgModel});
							Viewer.lr4c1.show(alertMsg);
							Viewer.lr5.close();
						}
					},
					error:function(){
						console.log('UserJobReferralsView : fetch : error');
					}
				});
					
			}/*end of renderUserRefs function*/			
		});	
	});
});
