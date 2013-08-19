define(["appl",
        "tpl!apps/jobs/templates/jobs-item.tpl"],function(App, jobsItemTpl){

        App.module( "JobsModule.Views",function(Mod,App,Backbone, Marionette, $, _) {

	Mod.SummaryJobView = Backbone.Marionette.ItemView.extend({
		model: Mod.SummaryJobModel,
		template: jobsItemTpl,
		tagName: 'div', 
		className: 'col-lg-4 col-sm-6 col-12',
		events: {
			'click': 'showJobDetail'
		},    
		showJobDetail: function(){
			App.navigate('#/jobs/'+this.model.attributes['itemid']+'/refer');	
		}	
	});

	Mod.SummaryJobListView = Backbone.Marionette.CollectionView.extend({
		itemView: Mod.SummaryJobView,
		initialize: function(options) {
			var _this = this;
			_.bindAll(this,"render");
			this.collection.fetch({
				data: $.param({ rec: 12}), 
				success: function(model, response) {
				  _this.render();
				  _this.collection.on("reset", _this.render, _this);
				},
				error: function(model, response) {
				  console.log("Error Fetching.");}
				});		
		}
	});

	Mod.DetailedJobView = Backbone.Marionette.ItemView.extend({
		model:Mod.DetailedJobModel,
		template: jobsItemTpl,
		tagName: 'div'		
	});	

});

});

