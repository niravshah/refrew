/*global gmm */
if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer = new Backbone.Marionette.Application();

    var ModalRegion = Backbone.Marionette.Region.extend({
	el: "#myModal",
	constructor: function(){
		_.bindAll(this);
		Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
		this.on("show", this.showModal, this);
	},
	getEl: function(selector){
		var $el = $(selector);
		$el.on("hidden", this.close);
		return $el;
	},
	showModal: function(view){
		view.on("close", this.hideModal, this);
		this.$el.modal('show');
	},
	hideModal: function(){
		console.log('hideModal function');
		this.$el.modal('hide');
	}
    });


    var Router = Backbone.Marionette.AppRouter.extend({
    	appRoutes: {
	      'refer/:jobid': 'refer'
	}
    });	

    gmm.Viewer.refer = function(jobid){
	console.log(jobid);
	gmm.Viewer.vent.trigger("refer:job", jobid);
    };	


    gmm.Viewer.addInitializer(function(){
      gmm.Viewer.router = new Router({
      		controller: gmm.Viewer
    });	
    
    gmm.Viewer.vent.trigger('routing:started');
    });

    gmm.Viewer.vent.on("routing:started", function(){
  	if( ! Backbone.History.started) Backbone.history.start();
    });

    gmm.Viewer.addRegions({
        jobsRegion: '#jobs-region',
        rewardsRegion: '#rewards-region',
        modal : ModalRegion
    });

    gmm.Viewer.vent.on('show:referral',function(model){
	Backbone.history.navigate("#/refer/" + model.attributes['itemid']);
	gmm.Viewer.jobsRegion.$el.hide();
    });
    
    gmm.Viewer.vent.on('all', function (evt, model) {
        console.log('gmm.Viewer DEBUG: Event Caught: ' + evt);
        if (model) {
            console.dir(model);
        }
    });
})();

