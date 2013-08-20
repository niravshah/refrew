define(["appl"], function(App){
    	'use strict';
    	App.module('Layouts', function (Mod, Viewer, Backbone, Marionette, $, _) {

		Mod.HomePageLayout = Backbone.Marionette.Layout.extend({
  			template: "#homepage-layout",
  			regions: {
				lr1: '#lhs-row-1',
                		lr2: '#lhs-row-2',
                		lr3: '#lhs-row-3',
                		lr4c1: '#lhs-row-4-col-1',
                		lr4c2: '#lhs-row-4-col-2',
                		lr5: '#lhs-row-5',
                		rr1: '#rhs-row-1',
                		rr2: '#rhs-row-2'
  			}
		});
	});
});


