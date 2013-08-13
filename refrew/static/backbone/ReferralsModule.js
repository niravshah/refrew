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
		 $("#linkedin-widget-div").show();
                 $("#referral-form").show();
	},

	peopleSearch : function(keywords) {
     		var keywords = document.getElementById('keywords').value;
     		IN.API.PeopleSearch()
         		.fields("firstName", "lastName", "distance", "siteStandardProfileRequest","public-profile-url")
         		.params({"keywords": keywords, "count": 10, "sort": "distance"})
         		.result(function(results){
				Mod.Controller.displayPeopleSearch(results);
			})
         		.error(function error(e) { 
				console.log('peopleSearch Error:', e);
			}
     		);
	},

	selectref : function(){
        	var ref = document.getElementById('referencesel');
        	document.getElementById('reference').value = ref.options[ref.selectedIndex].value;
        	document.getElementById('referenceName').value = ref.options[ref.selectedIndex].text;
	},
	
	displayPeopleSearch : function(peopleSearch) {
        	var sel = document.getElementById("referencesel");
        	var members = peopleSearch.people.values;
		var liSearchArr = [];
		var dataids = [];
        	for (var member in members) {
         		var nameText = members[member].firstName + " " + members[member].lastName;
         		var url = members[member].siteStandardProfileRequest.url;
         		var distance = members[member].distance;
         		switch (distance) {
         		case 0:
                		break;
         		case 1:
				var model = new LinkedInSearchResultModel({name:nameText,url:url,user:$("#linkedin-userid").val(),job:$("#current-jobid").val()});
				liSearchArr.push(model);
				dataids.push(members[member].publicProfileUrl);
                		break;
         		case 2:
         		case 3:
         		case 100:
         		case -1:
         		}
     		}
		
		var liSearchCollection = new LinkedInSearchResultCollection(liSearchArr);
		var liSearchCollView = new LinkedInSearchResultCollectionView({collection:liSearchCollection});
	 	Viewer.mainSub2.show(liSearchCollView);	
		$('#linkedin-search-ele').wrap('<script id="member-data-script" type="IN/MemberData" data-ids="' + dataids + '" data-fields="firstName,lastName,industry"/>');
		$("#profiles").html($('#member-data-script'));
      		IN.parse(document.getElementById("profiles"));
	},

	referJob : function(jobid){
		var job = new ReferralJobModel({id:jobid});
                job.fetch({
                  success: function(model, response) {
			var jobView = new ReferralJobView({ model: job});
			Viewer.mainRegion.show(jobView);
			var referralView = new ReferralView({ model: job});
			Viewer.mainSub.show(referralView);
			if(IN.User){
			if(!IN.User.isAuthorized()){
				$("#linkedin-widget-div").hide();
				$("#referral-form").hide();
				console.log('referJob:user not authorized');
				IN.parse();	
			}}else if(IN){
				 IN.parse();
			}
			var coll = new Backbone.Collection(job.attributes['stages']);
			var stagesListView = new JobStagesListView({collection:coll});
			Viewer.rhsSub.show(stagesListView);
                  },
                  error: function(model, response) {
                        console.log("Error Fetching.");}
                  });
		  
		}
	});

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

	var ReferralView = Backbone.Marionette.ItemView.extend({
            template: '#linkedin-search-widget',
            tagName: 'div',
            className: 'col-lg-12',
	    model:ReferralJobModel,
	    events:{
		'click  button.js-submit' : 'searchLinkedIn'
	    },
	    searchLinkedIn : function(){
		Mod.Controller.peopleSearch();
	    }
        });
	
	var ReferralFormModel = Backbone.Model.extend({
		url:function(){
			return '/jobs/' + job.value +  '/referrals'
		},
		defaults: {
      		  job:'',
		  referenceName: '',
      		  reference: '',
      		  comment: '',
		  user:''
    		}
	});

 	var ReferralFormView = Backbone.Marionette.ItemView.extend({
            template: '#referral-form-template',
            tagName: 'div',
            className: 'col-lg-12',
	    model: ReferralFormModel,
	    events:{
		'click button.js-submit': 'submitClicked'
	    },
	    submitClicked : function(e){
		e.preventDefault();
      		var data = Backbone.Syphon.serialize(this);
		var model = new ReferralFormModel(data);
		model.save();
	    }
        });


	var LinkedInSearchResultModel = Backbone.Model.extend({
		defaults:{
			name:'',
			url:'',
			user:'',
			job:''
		}	
	});
	var LinkedInSearchResultCollection = Backbone.Collection.extend({model:LinkedInSearchResultModel});
	var LinkedInSearchResultModelView = Backbone.Marionette.ItemView.extend({
		model: LinkedInSearchResultModel,
            	template: '#lisearch-item-template',
            	tagName: 'div',
            	className: 'col-lg-4 col-sm-6 col-12',
            	events: {
                 	'click': 'selectReference'
            	},
            	selectReference: function(){
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
});	
})();
