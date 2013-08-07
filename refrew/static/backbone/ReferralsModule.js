if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer.module('ReferralsModule', function (Mod, Viewer, Backbone, Marionette, $, _) {
        Mod.addInitializer(function (options) {
		console.log('Referrals Initializer Called');
		
		Mod.controller = new Controller({
               	   region: Viewer.jobsRegion
            	});

        });

	var Controller = Backbone.Marionette.Controller.extend({
            initialize: function (options) {
                _.bindAll();

		 gmm.Viewer.vent.on('show:referral',function(model){
			Backbone.history.navigate("#/refer/" + model.attributes['itemid']);
                	gmm.Viewer.jobsRegion.$el.hide();
		});
	    
		 gmm.Viewer.vent.on('refer:job',function(jobid){
                	console.log("ReferralsModule : refer:job : ",jobid);
        	});
	    }
	});
});	
})();
