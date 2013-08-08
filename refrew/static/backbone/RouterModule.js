(function () {
	'use strict';
	gmm.Viewer.module('RouterModule', function (Mod, Viewer, Backbone, Marionette, $, _) {

 	Mod.Router = Backbone.Marionette.AppRouter.extend({
        	appRoutes: {
	              'refer/:jobid': 'refer'
        	}
	});

	var API = {
    		refer: function(jobid){
			Viewer.ReferralsModule.Controller.referJob(jobid)}
	};


	Viewer.addInitializer(function(){
                Viewer.router = new Mod.Router({
                controller: API  });
                Viewer.trigger('routing:started');
        });


 	Viewer.on('show:referral',function(model){
             Viewer.navigate("#/refer/" + model.attributes['itemid']);
        });

  });
})();

