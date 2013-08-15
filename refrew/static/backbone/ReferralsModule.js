if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer.module('ReferralsModule', function (Mod, Viewer, Backbone, Marionette, $, _) {
       
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
				Viewer.mainSub3.show(liSearchCollView);					
			 },
			
			submitReferral : function(e, _this){
				var loadingView = new Viewer.Models.Loading({model:new Viewer.Models.LoadingModel({title:'Saving Reference'})});
				Viewer.mainSub21.show(loadingView);
				e.preventDefault();
				var data = Backbone.Syphon.serialize(_this);
				var model = new Viewer.Models.LinkedInSearchResultModel(data);
				model.save(null,{
					success:function(resp){
						var alertModel = new Viewer.Models.AlertModel({message:'Referral Added!',alertClass:'alert-success'});
						var alert = new Viewer.Models.Alert({model:alertModel})
						Viewer.mainSub21.show(alert);
						Viewer.ReferralsModule.Controller.renderUserRefs(resp.get('job'),resp.get('user'));
					},
					error : function(){	
						console.log('error');
					}
				});
			},
			onLinkedInAuth2 : function(jobid){
				if(Viewer.getCurrentRoute().indexOf('refer') > -1){
					Viewer.mainSub.$el.hide();
					Viewer.mainSub2.$el.show();
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
						Viewer.mainRegion.show(jobView);
						var coll = new Backbone.Collection(job.attributes['stages']);
						var stagesListView = new Viewer.Models.JobStagesListView({collection:coll});
						Viewer.rhsSub.show(stagesListView);
						var liSearchWidget = new Viewer.Models.LISearchWidgetView();
						Viewer.mainSub2.show(liSearchWidget);
						var liLoginButton = new Viewer.Models.LILoginButtonView();
						Viewer.mainSub.show(liLoginButton);
						if (IN){
							if(IN.User){
								if(IN.User.isAuthorized()){
									Mod.Controller.onLinkedInAuth2(jobid);
								}else{
									Viewer.mainSub2.$el.hide();
									IN.parse($('#main-sub').get(0));
								}
							}else{
								Viewer.mainSub2.$el.hide();
								if(IN.parse){
									IN.parse($('#main-sub').get(0));
								}
							}
						}else{
							Viewer.mainSub.$el.hide();
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
						Viewer.mainSub.show(userRefsView);
						Viewer.mainSub.$el.show();
						if(userRefs.length > 1){
							var alertMsgModel = new Viewer.Models.AlertModel({message:'You have already made <strong>2 referrals</strong> (the maximum allowed) for this vacancy', alertClass:'alert-info'});
							var alertMsg = new Viewer.Models.Alert({model:alertMsgModel});
							Viewer.mainSub2.show(alertMsg);
							Viewer.mainSub3.close();
						}
					},
					error:function(){
						console.log('UserJobReferralsView : fetch : error');
					}
				});
					
			}/*end of renderUserRefs function*/			
		});	
	});
})();
