if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer.module('RewardsModule', function (Mod, Viewer, Backbone, Marionette, $, _) {
        
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
				var rewardsView = new Viewer.Models.RewardCollectionView({collection:rewardsCollection});
				Viewer.rr2.show(rewardsView);
		   }		
		});
	})
})();

