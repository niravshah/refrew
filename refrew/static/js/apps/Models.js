define(["appl"], function(App){    
    'use strict';
    App.module('Models', function (Mod, Viewer, Backbone, Marionette, $, _) {
	
	/* Summary Job Models and Views */
	
	Mod.SummaryJobModel = Backbone.Model.extend({
	    urlRoot:'/jobs',
	    defaults:{user:''}	
	});
        
	Mod.SummaryJobCollection = Backbone.Collection.extend({
        	model: Mod.SummaryJobModel,
		url:'/jobs',
	    	parse: function(response){
			return response.items;
	    	}
	});
	
	/* End */
	
	/* Deatiled Job Models and Views*/

	Mod.DetailedJobModel = Backbone.Model.extend({
        	idAttribute:"jobid",
		urlRoot:'/jobs',
        	parse:function(response){return response.item;},
		defaults:{
			locationName:'', 
			title:'',
			jobid:null,
			user:'',
			permOrCont:'',
			tSkill1:'',
			remuneration:'',
			tSkill2:'',
			tSkill3:'',
			pSkill1: '', 
			pSkill2: '', 
			pSkill3: '', 
			teamChar1: '', 
			teamChar2: '', 
			teamChar3: '', 
			permOrCont: '', 
			remuneration: '', 
			qalNeeded: '', 
			qal: '', 
			projChar1: '', 
			projChar2: '', 
			projChar3: ''
		}	
    	});
	/* End */

	/*Job Stages Models and Views*/
	
	Mod.JobStageModel = Backbone.Model.extend({});
	
	Mod.JobStageView = Backbone.Marionette.ItemView.extend({
		model: Mod.JobStageModel,
		template: '#jobstage-item-template',
		tagName: 'div',
		className: 'col-lg-12 col-sm-6 col-12 well',
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
	    searchLinkedIn : function(){Viewer.ReferralsModule.Control.Controller.peopleSearch();}
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
			var referralSubmitForm = new Viewer.ReferralsModule.Views.ReferralSubmitFormView({model:model});
			App.content.currentLayout.lr4c2.show(referralSubmitForm);
			App.content.currentLayout.lr4c2.$el.show();
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
});
