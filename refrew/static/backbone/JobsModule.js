if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer.module('JobsModule', function (Mod, Viewer, Backbone, Marionette, $, _) {
        Mod.addInitializer(function (options) {
		console.log('JobsModule Initializer Called');
		Mod.controller = new Controller({
               	   region: Viewer.jobsRegion,
            });
        });

	var Controller = Backbone.Marionette.Controller.extend({
            initialize: function (options) {
                _.bindAll();
		this.jobsCollection = new JobCollection();
		this.region = options.region;
		this.jobsView = new JobListView({collection:this.jobsCollection});
		this.region.show(this.jobsView);
	    }
	});

        var JobModel = Backbone.Model.extend({});
        var JobCollection = Backbone.Collection.extend({
            model: JobModel,
	    url:'/jobs',
	    parse: function(response){return response.items;}
        });

	var JobItemDetailView = Backbone.Marionette.ItemView.extend({
		template: '#job-item-details-template'
	});
	
        var JobItemView = Backbone.Marionette.ItemView.extend({
            model: JobModel,
            template: '#layer-item-template',
            tagName: 'div', 
	    className: 'col-lg-4 col-sm-6 col-12',
	    events: {
     		 'click': 'showJobDetail'
	    },    
	    showJobDetail: function(){
		var detailView = new JobItemDetailView({model: this.model});
	        gmm.Viewer.modal.show(detailView);
    	    }	
        });

        var JobListView = Backbone.Marionette.CollectionView.extend({
            itemView: JobItemView,
	    initialize: function(options) {
                        var _this = this;
                        _.bindAll(this,"render");
                        this.collection.fetch({
                          success: function(model, response) {
                                _this.render();
                              _this.collection.on("reset", _this.render, _this);
                          },
                          error: function(model, response) {
                              console.log("Error Fetching.");
                          }
                        });
                }
        });
    });
})();

