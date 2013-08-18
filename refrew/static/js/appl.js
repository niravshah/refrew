define(["marionette", "apps/BootstrapModalRegion"], function(Marionette){

	if (!this.gmm || typeof this.gmm !== 'object') {
		this.gmm = {};
	};
	
    'use strict';
    gmm.Viewer = new Marionette.Application();
		
    gmm.Viewer.on("initialize:after", function(){
	
	require(["apps/RouterModule"], function () {
		
		require(["refrew","linkedin"], function () {
			IN.init({ onLoad: "onLinkedInLoad",api_key: "3ntk7givavqe", authorize:true});
		});

		require(["sidr"],function(){
			$('#simple-menu').sidr();
		});
	});

    });	

    gmm.Viewer.on("routing:started", function(){
			if( ! Backbone.History.started){ 
				Backbone.history.start();
			}
			if(this.getCurrentPath() == "/" && this.getCurrentRoute() === ""){
				gmm.Viewer.trigger("show:home");
			}
    });


    gmm.Viewer.addRegions({
        lr1: '#lhs-row-1',
		lr2: '#lhs-row-2',
		lr3: '#lhs-row-3',
		lr4c1: '#lhs-row-4-col-1',
		lr4c2: '#lhs-row-4-col-2',
		lr5: '#lhs-row-5',	
		rr1: '#rhs-row-1',
		rr2: '#rhs-row-2',
        modal : BootstrapModalRegion.extend({el:"#modal-region-1"})
    });

    gmm.Viewer.getCurrentPath = function(){
		return Backbone.history.location.pathname;	
    };

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
	
	return gmm.Viewer;
});

