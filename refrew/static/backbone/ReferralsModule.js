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
	           	var referralView = new ReferralView({ model: job});
			Viewer.mainRegion.show(referralView);
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

	var ReferralView = Backbone.Marionette.ItemView.extend({
            template: '#linkedin-search-widget',
            tagName: 'div',
            className: 'row',
	    model:ReferralJobModel
        });
});	
})();
