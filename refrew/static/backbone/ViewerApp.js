﻿/*global gmm */
if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer = new Backbone.Marionette.Application();

    gmm.Viewer.on("routing:started", function(){
  	if( ! Backbone.History.started){ 
		Backbone.history.start();}

    	if(this.getCurrentRoute() === ""){
    	      gmm.Viewer.trigger("show:home");
   	}
    });


    gmm.Viewer.addRegions({
        mainRegionTitle: '#main-region-title',
	mainRegion: '#main-region',
	mainSub: '#main-sub',
        rhsSubTitle: '#rhs-sub-title',
	rhsSub: '#rhs-sub',
        modal : BootstrapModalRegion.extend({el:"#myModal"})
    });

    gmm.Viewer.getCurrentRoute = function(){
  	return Backbone.history.fragment;
    };	

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

