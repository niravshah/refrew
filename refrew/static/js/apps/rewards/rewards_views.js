define(["appl", "tpl!apps/rewards/templates/rewards-item.tpl", "tpl!apps/rewards/templates/rewards-item-details.tpl", "tpl!apps/rewards/templates/add-reward-button.tpl","tpl!apps/rewards/templates/reward-form.tpl"], function(App, rewardsItemTpl, rewardsItemDetailsTpl, recAddRewardTpl,rewardFormTpl) {

	App.module("RewardsModule.Views", function(Mod, App, Backbone, Marionette, $, _) {
		Mod.AddRewardsView = Backbone.Marionette.ItemView.extend({
			template : recAddRewardTpl,
			tagName : 'div',
			className : 'well',
			events : {
				'click #add-job' : 'addReward'
			},
			addReward : function() {
				App.navigate('#/rewards/new');
			}
		});

		Mod.RewardForm = Backbone.Marionette.ItemView.extend({
			template : rewardFormTpl,
			tagName: 'div',
			className: 'row',	
			initialize : function(options) {
				this.listenTo(this.model, "change", this.render);
				this.mode = this.options.mode;
			},
			events : {
				'change .form-control' : 'autoSave',
				'click #edit-job' : 'renderEditForm'
			},
			autoSave : function() {
				var data = Backbone.Syphon.serialize(this);
				this.model.set(data);
				this.model.save({}, {
					success : function(response, model) {
						App.navigate('#/rewards/' + response.attributes.id);
					}
				});
			},
			renderEditForm : function() {
				App.RewardsModule.Control.Controller.renderEditForm(this.model);
			}
		});

		Mod.RewardItemView = Backbone.Marionette.ItemView.extend({
			model : Mod.RewardModel,
			template : rewardsItemTpl,
			tagName : 'div',
			className : 'col-lg-12 col-sm-6 col-12',
			events : {
				'click #show-details' : 'showRewardItemDetails',
				'click #select-reward' : 'rewardSelected'
			},
			initialize : function(options) {
				this.model.attributes.viewScreen = this.options.viewScreen;
			},
			templateHelpers : {
				showSelectButton : function() {
					if (this.viewScreen == 'recruit')
						return true;
					else
						return false;
				}
			},
			showRewardItemDetails : function() {
				var detailView = new Mod.RewardItemDetailView({
					model : this.model
				});
				App.modal.show(detailView);
			},
			rewardSelected : function(ev) {
				$('.selected').removeClass('selected');
				$(ev.target.parentElement).addClass('selected');
				var data = Backbone.Syphon.serialize(this);
				App.RecruitModule.Control.Controller.rewardSelected(ev, data);
			}
		});

		Mod.RewardCollectionView = Backbone.Marionette.CollectionView.extend({
			itemView : Mod.RewardItemView,
			initialize : function(options) {
				var _this = this;
				_.bindAll(this, "render");
				_.bindAll(this, "render");
				this.collection.fetch({
					success : function(model, response) {
						_this.render();
						_this.collection.on("reset", _this.render, _this);
					},
					error : function(model, response) {
						console.log("Error Fetching.");
					}
				});
			}
		});

		Mod.RewardItemDetailView = Backbone.Marionette.ItemView.extend({
			template : rewardsItemDetailsTpl
		});
	});

});
