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
		/*Viewer.mainRegionTitle.$el.hide();*/
		Viewer.mainRegion.$el.hide();
		Viewer.rhsSub.$el.hide();
		$('#rhs-sub-title').hide();
		$('#main-region-title').text(jobid);
		console.log("ReferralsModule : referJob : ",jobid);
	    }
	});
});	
})();
