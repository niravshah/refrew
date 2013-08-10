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
	    referJob : function(jobid){
		var job = new ReferralJobModel({id:jobid});
                job.fetch({
                  success: function(model, response) {
	           	var jobView = new ReferralJobView({ model: job});
			Viewer.mainRegion.show(jobView);
			var referralView = new ReferralView({ model: job});
			Viewer.mainSub.show(referralView);
			var linkedinid = $("#linkedin-userid").val();
			var referralFormModel = new ReferralFormModel({jobid:job.attributes['itemid'],user:linkedinid});
			var referralFormView = new ReferralFormView({model:referralFormModel});
			Viewer.mainSub2.show(referralFormView);			
			if(!IN.User.isAuthorized()){
				$("#linkedin-widget-div").hide();
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
	    model:ReferralJobModel
        });
	
	var ReferralFormModel = Backbone.Model.extend({
		defaults: {
      		  jobid:'',
		  referralName: '',
      		  referralLink: '',
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
     		console.log('Submit Clicked:',data);
		this.trigger("form:submit", data);
	    }
        });
});	
})();
