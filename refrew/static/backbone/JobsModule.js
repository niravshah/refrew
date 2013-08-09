if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer.module('JobsModule', function (Mod, Viewer, Backbone, Marionette, $, _) {
        Mod.addInitializer(function (options) {
		console.log('JobsModule Initializer Called');
		Mod.controller = new Controller({
               	   region: Viewer.mainRegion,
            	});
        });

	var Controller = Backbone.Marionette.Controller.extend({
            initialize: function (options) {
                _.bindAll();
		Mod.region = options.region;
		Mod.API.listJobs();
	    }
	});

	Mod.API = {
		listJobs : function(){
		  var jobsCollection = new JobCollection();
		  var jobsView = new JobListView({collection:jobsCollection});
		  Mod.region.show(jobsView);
		},
		getJob : function(jobid){
			var job = new Mod.JobModel({id:jobid,parse:function(response){console.log('Parse:',response.items);return response.items;}});
			job.fetch({
                          success: function(model, response) {
				console.log('getJob Return:',model);
				return model;
			  },
                          error: function(model, response) {
                              console.log("Error Fetching.");}
                        });
		}		
	};

        Mod.JobModel = Backbone.Model.extend({
	    urlRoot:'/jobs',
	});
        
	var JobCollection = Backbone.Collection.extend({
            model: Mod.JobModel,
	    url:'/jobs',
	    parse: function(response){return response.items;}
        });

	var JobItemDetailView = Backbone.Marionette.ItemView.extend({
		template: '#job-item-details-template',
		events:{
		/*	'click #refer-button' : 'refer'*/
		},
		refer : function(){
			Viewer.trigger("show:referral",this.model);
		}
	});
	
        var JobItemView = Backbone.Marionette.ItemView.extend({
            model: Mod.JobModel,
            template: '#job-item-template',
            tagName: 'div', 
	    className: 'col-lg-4 col-sm-6 col-12',
	    events: {
     		 'click': 'showJobDetail'
	    },    
	    showJobDetail: function(){

		/*Modal Dialog*/
		/*var detailView = new JobItemDetailView({model: this.model});
	        gmm.Viewer.modal.show(detailView);*/ 

		Viewer.navigate('#/jobs/'+this.model.attributes['itemid']+'/refer');	
    	    }	
        });

        var JobListView = Backbone.Marionette.CollectionView.extend({
            itemView: JobItemView,
	    initialize: function(options) {
                        var _this = this;
                        _.bindAll(this,"render");
                        this.collection.fetch({
			  data: $.param({ rec: 12}), 
                          success: function(model, response) {
                              _this.render();
                              _this.collection.on("reset", _this.render, _this);},
                          error: function(model, response) {
                              console.log("Error Fetching.");}
                        });
            }
        });

    });
})();

