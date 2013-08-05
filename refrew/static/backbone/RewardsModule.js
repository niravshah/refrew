if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer.module('RewardsModule', function (Mod, Viewer, Backbone, Marionette, $, _) {
        Mod.addInitializer(function (options) {
		console.log('RewardsModule Initializer Called');
		Mod.controller = new Controller({
               	   region: Viewer.rewardsRegion,
		   rewards: options.rewards
            });
        });

	var Controller = Backbone.Marionette.Controller.extend({
            initialize: function (options) {
                _.bindAll();
		this.rewardsCollection =  new RewardCollection();
		this.region = options.region;
                this.rewardsView = new RewardListView({collection:this.rewardsCollection});
                this.region.show(this.rewardsView);		
	    }
	});

        var RewardModel = Backbone.Model.extend({});
        var RewardCollection = Backbone.Collection.extend({
            	url : '/rewards',
		model: RewardModel,
		parse: function(response){return response.items;}
        });
	
        var RewardItemView = Backbone.Marionette.ItemView.extend({
            model: RewardModel,
            template: '#reward-item-template',
            tagName: 'div', 
	    className: 'col-lg-12 col-sm-6 col-12'
        });

        var RewardListView = Backbone.Marionette.CollectionView.extend({
	         itemView: RewardItemView,
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

