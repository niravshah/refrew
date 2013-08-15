if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer.module('Models', function (Mod, Viewer, Backbone, Marionette, $, _) {
	
	/* Summary Job Models and Views */
	
	Mod.SummaryJobModel = Backbone.Model.extend({
	    urlRoot:'/jobs',
	});
        
	Mod.SummaryJobCollection = Backbone.Collection.extend({
        model: Mod.SummaryJobModel,
	    url:'/jobs',
	    parse: function(response){return response.items;}
	});

	Mod.SummaryJobView = Backbone.Marionette.ItemView.extend({
		model: Mod.SummaryJobModel,
		template: '#job-item-template',
		tagName: 'div', 
		className: 'col-lg-4 col-sm-6 col-12',
		events: {
			'click': 'showJobDetail'
		},    
		showJobDetail: function(){
			Viewer.navigate('#/jobs/'+this.model.attributes['itemid']+'/refer');	
		}	
	});

	Mod.SummaryJobListView = Backbone.Marionette.CollectionView.extend({
		itemView: Mod.SummaryJobView,
		initialize: function(options) {
			var _this = this;
			_.bindAll(this,"render");
			this.collection.fetch({
				data: $.param({ rec: 12}), 
				success: function(model, response) {
				  _this.render();
				  _this.collection.on("reset", _this.render, _this);
				},
				error: function(model, response) {
				  console.log("Error Fetching.");}
				});		
		}
	});
	
	/* End */
	
	/* Deatiled Job Models and Views*/

	Mod.DetailedJobModel = Backbone.Model.extend({
        urlRoot:'/jobs',
        parse:function(response){return response.item;}
    });

	Mod.DetailedJobView = Backbone.Marionette.ItemView.extend({
		model:Mod.DetailedJobModel,
		template: '#job-item-template',
		tagName: 'div'		
	});
	
	/* End */

	/*Job Stages Models and Views*/
	
	Mod.JobStageModel = Backbone.Model.extend({});
	
	Mod.JobStageView = Backbone.Marionette.ItemView.extend({
		model: Mod.JobStageModel,
		template: '#reward-item-template',
		tagName: 'div',
		className: 'col-lg-12 col-sm-6 col-12',
		events: {
			 'click': 'showJobDetail'
		},
		showJobDetail: function(){
			Viewer.navigate('#/jobs/'+this.model.attributes['itemid']+'/refer');
		}
	});

	Mod.JobStagesListView = Backbone.Marionette.CollectionView.extend({
		itemView: Mod.JobStageView,
		initialize: function(options) {
		  var _this = this;
		  _.bindAll(this,"render");
		  _this.render();
		}
	});
	
	/* End */	
	
	/* Rewards Models and Views*/
	
	Mod.RewardModel = Backbone.Model.extend({});
	
	Mod.RewardCollection = Backbone.Collection.extend({
		model: Mod.RewardModel,
		url : '/rewards',		
		parse: function(response){return response.items;}
	});

	Mod.RewardItemDetailView = Backbone.Marionette.ItemView.extend({
		template: '#reward-item-details-template'
	});

	Mod.RewardItemView = Backbone.Marionette.ItemView.extend({
		model: Mod.RewardModel,
		template: '#reward-item-template',
		tagName: 'div', 
		className: 'col-lg-12 col-sm-6 col-12',
		events:{
			'click':'showRewardItemDetails'
		},
		showRewardItemDetails:function(){
			var detailView = new Mod.RewardItemDetailView({model:this.model});
			Viewer.modal.show(detailView);
		}	
	});

	Mod.RewardCollectionView = Backbone.Marionette.CollectionView.extend({
		itemView: Mod.RewardItemView,
		initialize: function(options) {			
			var _this = this;
			_.bindAll(this,"render");
			_.bindAll(this,"render");
			this.collection.fetch({
				success: function(model, response) {
					_this.render();				
					_this.collection.on("reset", _this.render, _this);
				},
				error: function(model, response) {
					console.log("Error Fetching.");
				}
			});
		}
	});	
	
	/* End */

	/* UserJobReferrals Models and Views */
	
	Mod.UserJobReferralsModel = Backbone.Model.extend({
	    defaults:{
			reference:'',
			referenceName: '',
			job:'',
			user:''
	    }	
    });

	Mod.UserJobReferralsCollection = Backbone.Collection.extend({
		model: Mod.UserJobReferralsModel,
		url:function(){return '/jobs/' + this.job + '/users/' + this.user + '/referrals';},
		parse:function(response){return response.item;},
		defaults:{
			user:'',
			job:''
		}	
	});

	Mod.UserJobReferralsView = Backbone.Marionette.ItemView.extend({
		template: '#user-job-referral-template'
	});

	Mod.UserJobReferralsListView =  Backbone.Marionette.CompositeView.extend({
        itemView: Mod.UserJobReferralsView,
	    itemViewContainer:'#user-job-referrals-itemview-container',
	    template:'#user-job-referrals-container-template',
	    tagName: 'div',        
		initialize: function(options) {
		  var _this = this;
		  _.bindAll(this,"render");
		  _this.render();
		}
    });

	/* End &/	
	
	/* LinkedIn Login Button View */
	
	Mod.LILoginButtonView = Backbone.Marionette.ItemView.extend({
		template: '#linkedin-login-button',
		tagName: 'div',
		className: 'col-lg-12'
	});
	
	/* End */
	
	/*LinkedIn Search Widget View*/

	Mod.LISearchWidgetView = Backbone.Marionette.ItemView.extend({
		template: '#linkedin-search-widget',
		tagName: 'div',
		className: 'col-lg-6',
	    events:{
		'click #search-ref' : 'searchLinkedIn'
	    },
	    searchLinkedIn : function(){Viewer.ReferralsModule.Controller.peopleSearch();}
    });

	/* End */
	
	/* LinkedIn Search Results Models and Views */
	
	Mod.LinkedInSearchResultModel = Backbone.Model.extend({
		initialize:function(){this.job = this.attributes['job'];},
		url:function(){return '/jobs/' + this.get('job') +  '/referrals'},
		defaults:{
			name:'',
			url:'',
			user:'',
			job:'',
			referenceName:''
		}	
	});
	
	Mod.LinkedInSearchResultCollection = Backbone.Collection.extend({model:Mod.LinkedInSearchResultModel});
	
	Mod.LinkedInSearchResultView = Backbone.Marionette.ItemView.extend({
		model: Mod.LinkedInSearchResultModel,
		template: '#lisearch-item-template',
		tagName: 'div',
		className: 'col-lg-4 col-sm-6 col-12',
		events: {
			'click button.js-submit': 'selectReference'
		},
		selectReference: function(evt){
			var data = Backbone.Syphon.serialize(this);
			var model = new Mod.LinkedInSearchResultModel(data);
			var referralSubmitForm = new Mod.ReferralSubmitFormView({model:model});
			Viewer.lr4c2.show(referralSubmitForm);
			Viewer.lr4c2.$el.show();
			$('.selected').removeClass('selected');
			$(evt.target.parentElement).addClass('selected');
		}
	});
	
	Mod.LinkedInSearchResultCollectionView = Backbone.Marionette.CollectionView.extend({
		itemView: Mod.LinkedInSearchResultView,
		initialize: function(options) {
			var _this = this;
			_.bindAll(this,"render");
			_this.render();
		}
	});
	
	/* End */
	
	/* LinkedIn Referral Submit View */

	Mod.ReferralSubmitFormView = Backbone.Marionette.ItemView.extend({
		model:Mod.LinkedInSearchResultModel,
		template: '#li-referral-form-template',		
		tagName:'div',
		className:'col-lg-6',
		events:{
		   	'click #submit-ref' : 'submitRef'
		},
		submitRef : function(e){
			var _this = this;
			Viewer.ReferralsModule.Controller.submitReferral(e,_this);
        }
	});
	
	/* End */
	
	/* Spinner */	
	
	Mod.LoadingModel = Backbone.Model.extend({
		defaults:{
		   title: 'Saving...'	
		}
	});
	
	Mod.Loading =  Backbone.Marionette.ItemView.extend({
		model: Mod.LoadingModel,
		template: '#loading-view',
		tagName: 'div',
		className: 'col-lg-6 col-sm-6 col-12'
    });

	/* End */

	/* Alert */
	Mod.AlertModel = Backbone.Model.extend({
		defaults:{
		   message: 'Success!',
		alertClass: 'alert-success'
		}
    });
	Mod.Alert =  Backbone.Marionette.ItemView.extend({
		model: Mod.AlertModel,
		template: '#alert-view-template',
		tagName: 'div',
		className: 'col-lg-6 col-sm-6 col-12'
	});

	/* End */	
	
	});
})();
