define(["appl",
        "tpl!apps/jobs/templates/jobs-item.tpl"],function(App, jobsItemTpl){

        App.module( "JobsModule.Views",function(Mod,App,Backbone, Marionette, $, _) {

	Mod.SummaryJobView = Backbone.Marionette.ItemView.extend({
		initialize: function(options){
			var _this = this;
			_.bindAll(_this,"showJobDetail");
		},
		model: Mod.SummaryJobModel,
		template: jobsItemTpl,
		tagName: 'div', 
		className: 'col-lg-4 col-sm-6 col-12',
		events: {
			'click': 'showJobDetail'
		},    
		showJobDetail: function(){
			if(this.options.renderingView == 'recruit'){
				 App.navigate('#/recruit/'+this.model.attributes['jobid']);
			}else{
				App.navigate('#/jobs/'+this.model.attributes['jobid']+'/refer');	
			}
		}	
	});

	Mod.SummaryJobListView = Backbone.Marionette.CollectionView.extend({
		itemView : Mod.SummaryJobView,
		initialize: function(options) {
			var _this = this;
			_.bindAll(this,"render");
			this.collection.fetch({
				data: $.param(this.options.parmData),
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

