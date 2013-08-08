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
		var job = new Model({id:jobid});
                job.fetch({
                  success: function(model, response) {
	           	var referralView = new ReferralView({ model: job});
                       	Viewer.mainRegion.$el.show();
			Viewer.mainRegion.show(referralView);
                  },
                  error: function(model, response) {
                        console.log("Error Fetching.");}
                  });

		}
	});

	var Model = Backbone.Model.extend({
             urlRoot:'/jobs',
	     parse:function(response){
                 return response.item;}
        });

	var ReferralView = Backbone.Marionette.ItemView.extend({
            template: '#layer-item-template',
            tagName: 'div',
            className: 'col-lg-4 col-sm-6 col-12',
	    model:Mod.JobModel
        });
});	
})();
