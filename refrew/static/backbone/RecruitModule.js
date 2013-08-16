if (!this.gmm || typeof this.gmm !== 'object') {
    this.gmm = {};
}
(function () {
    'use strict';
    gmm.Viewer.module('RecruitModule', function (Mod, App, Backbone, Marionette, $, _) {
		Mod.addInitializer(function (options) {
			console.log('RecruitModule Initializer Called');		
			Mod.Controller = new Controller({});
		});

		var Controller = Backbone.Marionette.Controller.extend({		
			renderRecruitHome : function(){
				var addJob = new Mod.AddJobView();
				App.lr2.show(addJob);			
			}
		});
		
		Mod.AddJobView =  Backbone.Marionette.ItemView.extend({		
			template: '#recruit-add-job',
			tagName: 'div',
			className: 'well'
		});

	});
})();