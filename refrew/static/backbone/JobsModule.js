if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer.module('JobsModule', function (Mod, App, Backbone, Marionette, $, _) {
        Mod.addInitializer(function (options) {
			console.log('JobsModule Initializer Called');
			Mod.Controller = new Controller({});
        });

		var Controller = Backbone.Marionette.Controller.extend({
			initialize: function (options) {
				 _.bindAll();					
			},
			listJobs : function(){
			  var jobsCollection = new App.Models.SummaryJobCollection();
			  var jobsView = new App.Models.SummaryJobListView({collection:jobsCollection});
			  App.mainRegion.show(jobsView);
			  App.mainSub.close();
			  App.mainSub2.close();
			  App.mainSub21.close();	
			  App.mainSub3.close();
			}			
		});

    });
})();

