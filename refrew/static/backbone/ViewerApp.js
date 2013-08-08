/*global gmm */
if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer = new Backbone.Marionette.Application();

    gmm.Viewer.on("routing:started", function(){
  	if( ! Backbone.History.started){ 
		console.log('Starting Backbone History');
		Backbone.history.start();
	}
    });

    gmm.Viewer.addRegions({
        jobsRegion: '#jobs-region',
        rewardsRegion: '#rewards-region',
        modal : BootstrapModalRegion.extend({el:"#myModal"})
    });


    gmm.Viewer.navigate = function(route,  options){
  	options || (options = {});
  	Backbone.history.navigate(route, options);
    };	

    gmm.Viewer.on('all', function (evt, model) {
        console.log('Event Debug: Event Caught: ' + evt);
        /*if (model) {
            console.dir(model);
        }*/
    });
})();

