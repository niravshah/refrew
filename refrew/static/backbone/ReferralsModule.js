if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer.module('ReferralsModule', function (Mod, Viewer, Backbone, Marionette, $, _) {
        
	Mod.addInitializer(function (options) {
		console.log('Referrals Initializer Called');
		Mod.Controller = new Controller({
               	   region: Viewer.jobsRegion
            	});
        });

	var Controller = Backbone.Marionette.Controller.extend({
	    referJob : function(jobid){
		gmm.Viewer.jobsRegion.$el.hide();
		console.log("ReferralsModule : referJob : ",jobid);
	    }
	});
});	
})();
