define(["appl",
	"tpl!apps/rewards/templates/rewards-item.tpl",
	"tpl!apps/rewards/templates/rewards-item-details.tpl"],
	function(App, rewardsItemTpl,rewardsItemDetailsTpl){

	App.module( "RewardsModule.Views",function(Mod,App,Backbone, Marionette, $, _) {

		Mod.RewardItemView = Backbone.Marionette.ItemView.extend({
		model: Mod.RewardModel,
		template: rewardsItemTpl,
		tagName: 'div', 
		className: 'col-lg-12 col-sm-6 col-12 well',
		events:{
			'click':'showRewardItemDetails'
		},
		showRewardItemDetails:function(){
			var detailView = new Mod.RewardItemDetailView({model:this.model});
			App.modal.show(detailView);
		}	
		});


		Mod.RewardCollectionView = Backbone.Marionette.CollectionView.extend({
		itemView: Mod.RewardItemView,
		initialize: function(options) {			
			var _this = this;
			_.bindAll(this,"render");
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

		Mod.RewardItemDetailView = Backbone.Marionette.ItemView.extend({
                	template: rewardsItemDetailsTpl
	        });
});

});
