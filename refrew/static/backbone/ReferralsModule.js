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
	onLinkedinAuth : function(){
		console.log('ReferralsModule : onLinkedinAuth'); 
		if(Viewer.mainSub.$el){Viewer.mainSub.$el.show()};	
	},

	peopleSearch : function(keywords) {
     		var keywords = document.getElementById('keywords').value;
     		IN.API.PeopleSearch()
         		.fields("firstName", "lastName", "distance",'positions','picture-url','headline','skills','location:(name)',"public-profile-url")
         		.params({"keywords": keywords, "count": 10, "sort": "distance"})
         		.result(function(results){
				Mod.Controller.displayPeopleSearch(results);
			})
         		.error(function error(e) { 
				console.log('peopleSearch Error:', e);
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
         		case 0:
                		break;
         		case 1:
				var model = new LinkedInSearchResultModel(members[member]);
				model.attributes.user = $('#linkedin-userid').val();
				model.attributes.job = $('#current-jobid').val();
				liSearchArr.push(model);
                		break;
         		case 2:
         		case 3:
         		case 100:
         		case -1:
         		}
     		}
	
		var liSearchCollection = new LinkedInSearchResultCollection(liSearchArr);
		var liSearchCollView = new LinkedInSearchResultCollectionView({collection:liSearchCollection});
	 	Viewer.mainSub3.show(liSearchCollView);	
	},

	referJob : function(jobid){
		var job = new ReferralJobModel({id:jobid});
                job.fetch({
                  success: function(model, response) {
			var jobView = new ReferralJobView({model: job});
			Viewer.mainRegion.show(jobView);
		 	var coll = new Backbone.Collection(job.attributes['stages']);
                        var stagesListView = new JobStagesListView({collection:coll});
                        Viewer.rhsSub.show(stagesListView);
			var liSearchWidget = new LISearchWidgetView();
			Viewer.mainSub2.show(liSearchWidget);
			var liLoginButton = new LILoginButtonView();
			Viewer.mainSub.show(liLoginButton);
			if (IN){
			   if(IN.User){
				if(IN.User.isAuthorized()){
				     	Viewer.mainSub.$el.hide();
					var userid = $('#linkedin-userid').val();
					var userRefs = new UserJobReferralsCollection(jobid,userid);
					userRefs.job = jobid;
					userRefs.user = userid;
					userRefs.fetch({
						success:function(){
                                        		var userRefsView = new UserJobReferralsListView({collection:userRefs});
							Viewer.mainSub.show(userRefsView); 
							Viewer.mainSub.$el.show();
							if(userRefs.length > 1){								
								Viewer.mainSub2.close();}
						},
						error:function(){
							console.log('UserJobReferralsView : fetch : error');
						}
					});
				}else{
					Viewer.mainSub2.$el.hide();
					IN.parse($('#main-sub').get(0));}
			   }else{
				Viewer.mainSub2.$el.hide();
				if(IN.parse){IN.parse($('#main-sub').get(0));}
			   }
			}else{
				Viewer.mainSub.$el.hide();}
                  },
                  error: function(model, response) {
                        console.log("Error Fetching.");}
                  });
		  
		}
	});

	/* Models and Vies for Main Job Display on the Referrals Page*/

	var ReferralJobModel = Backbone.Model.extend({
             urlRoot:'/jobs',
             parse:function(response){
                 return response.item;}
        });

        var ReferralJobView = Backbone.Marionette.ItemView.extend({
            template: '#job-item-template',
            tagName: 'div',
            className: 'col-lg-12',
            model:ReferralJobModel
        });
	
	/* End */

	/* Models and Vies for Job Stages Display on the Referrals Page*/
	
	var JobStageModel = Backbone.Model.extend({});
	
	var JobStageItemView = Backbone.Marionette.ItemView.extend({
            model: JobStageModel,
            template: '#reward-item-template',
            tagName: 'div',
            className: 'col-lg-12 col-sm-6 col-12',
            events: {
                 'click': 'showJobDetail'
            },
            showJobDetail: function(){
                /*Modal Dialog*/
                /*var detailView = new JobItemDetailView({model: this.model});
                gmm.Viewer.modal.show(detailView);*/
                Viewer.navigate('#/jobs/'+this.model.attributes['itemid']+'/refer');
            }
        });

        var JobStagesListView = Backbone.Marionette.CollectionView.extend({
            itemView: JobStageItemView,
            initialize: function(options) {
              var _this = this;
              _.bindAll(this,"render");
              _this.render();
	    }
        });
	
	/* End */


	/* Model and Views for UserJobReferrals */

	 var UserJobReferralsModel = Backbone.Model.extend({
	     defaults:{
		reference:'',
		referenceName: '',
		job:'',
		user:''
	     }	
        });

	var UserJobReferralsCollection = Backbone.Collection.extend({
	     model: UserJobReferralsModel,
	     url:function(){return '/jobs/' + this.job + '/users/' + this.user + '/referrals';},
             parse:function(response){
                 return response.item;},
	     defaults:{
		user:'',
		job:''
	     }	
	});

        var UserJobReferralsView = Backbone.Marionette.ItemView.extend({
            template: '#user-job-referral-template'
        });

	var UserJobReferralsListView =  Backbone.Marionette.CompositeView.extend({
            itemView: UserJobReferralsView,
	    itemViewContainer:'#user-job-referrals-itemview-container',
	    template:'#user-job-referrals-container-template',
	    tagName: 'div',
            className: 'col-lg-12',	
            initialize: function(options) {
              var _this = this;
              _.bindAll(this,"render");
              _this.render();
            }
        });


	/* End &/	
	
	/* Models and Views for the LinkedIn Search Widget - Result Display - Referral Submit */

	var LISearchWidgetView = Backbone.Marionette.ItemView.extend({
            template: '#linkedin-search-widget',
            tagName: 'div',
            className: 'col-lg-6',
	    events:{
		'click #search-ref' : 'searchLinkedIn'
	    },
	    searchLinkedIn : function(){
		Mod.Controller.peopleSearch();
	    }
        });

	var LILoginButtonView = Backbone.Marionette.ItemView.extend({
		template: '#linkedin-login-button',
            	tagName: 'div',
            	className: 'col-lg-12'
	});

	var ReferralSubmitFormView = Backbone.Marionette.ItemView.extend({
		template: '#li-referral-form-template',
		model:LinkedInSearchResultModel,
		tagName:'div',
		className:'col-lg-6',
		events:{
		   	'click #submit-ref' : 'submitRef'
		},
		submitRef : function(e){
			e.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			console.log(data);
			var model = new LinkedInSearchResultModel(data);
                	model.save();
            	}
	});
	
	var LinkedInSearchResultModel = Backbone.Model.extend({
		initialize:function(){
			this.job = this.attributes['job'];
		},
		url:function(){
                        return '/jobs/' + this.get('job') +  '/referrals'
                },
		defaults:{
			name:'',
			url:'',
			user:'',
			job:'',
			referenceName:''
		}	
	});
	var LinkedInSearchResultCollection = Backbone.Collection.extend({model:LinkedInSearchResultModel});
	var LinkedInSearchResultModelView = Backbone.Marionette.ItemView.extend({
		model: LinkedInSearchResultModel,
            	template: '#lisearch-item-template',
            	tagName: 'div',
            	className: 'col-lg-4 col-sm-6 col-12',
            	events: {
                 	'click button.js-submit': 'selectReference'
            	},
            	selectReference: function(evt){
			var data = Backbone.Syphon.serialize(this);
			var model = new LinkedInSearchResultModel(data);
                	var referralSubmitForm = new ReferralSubmitFormView({model:model});
                	Viewer.mainSub21.show(referralSubmitForm);
			Viewer.mainSub21.$el.show();
			$('.selected').removeClass('selected');
			$(evt.target.parentElement).addClass('selected');
            	}

	});
	var LinkedInSearchResultCollectionView = Backbone.Marionette.CollectionView.extend({
		itemView: LinkedInSearchResultModelView,
            	initialize: function(options) {
                        var _this = this;
                	_.bindAll(this,"render");
                        _this.render();
		}
	});

	/* Spinner */
	
	/* End */
	
});	
})();
