if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.RecruitApp = new Backbone.Marionette.Application();

    gmm.RecruitApp.on("routing:started", function(){
		if( ! Backbone.History.started){ 
			Backbone.history.start();
		}
		if(this.getCurrentPath() == "/" && this.getCurrentRoute() === ""){
			gmm.RecruitApp.trigger("show:home");
		}
    });


    gmm.RecruitApp.addRegions({
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

    gmm.RecruitApp.getCurrentPath = function(){
		return Backbone.history.location.pathname;	
    };

    gmm.RecruitApp.getCurrentRoute = function(){
		return Backbone.history.fragment;
    };	

    gmm.RecruitApp.navigate = function(route,  options){
		options || (options = {});
		Backbone.history.navigate(route, options);
    };	

    gmm.RecruitApp.on('all', function (evt, model) {
		console.log('Event Debug: Event Caught: ' + evt);
		/*if (model) {
			console.dir(model);
		}*/
    });
})();

