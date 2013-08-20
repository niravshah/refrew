define(["appl","apps/rewards/rewards_views"], function(App){
	'use strict';
    App.module('RewardsModule.Control', function (Mod, Viewer, Backbone, Marionette, $, _) { 
		Mod.addInitializer(function (options) {
			console.log('RewardsModule Initializer Called');
			Mod.Controller = new Controller({});
		});
	
		var Controller = Backbone.Marionette.Controller.extend({
			initialize: function (options) {
				 _.bindAll();					
			},
			listRewards:function(){
				var rewardsCollection =  new Viewer.Models.RewardCollection();
				var rewardsView = new Viewer.RewardsModule.Views.RewardCollectionView({collection:rewardsCollection});
				App.content.currentLayout.rr2.show(rewardsView);
		   	}		
		});
	});
	return App.RewardsModule;
})

