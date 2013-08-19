requirejs.config({
  baseUrl: "../static/js",
  urlArgs: "bust=" + (new Date()).getTime(),
  paths: {
	jquery: "vendor/jquery-1.10.2",
	bootstrap:"vendor/bootstrap",
	underscore: "vendor/underscore-1.4.3",
	json2: "vendor/json2",
	backbone: "vendor/backbone-0.9.10",	
	"backbone.syphon": "vendor/backbone.syphon",
	marionette: "vendor/backbone.marionette-1.0.0-rc3",
	refrew:"vendor/refrew",
	sidr:"vendor/jquery.sidr.min",
	linkedin: "http://platform.linkedin.com/in.js?async=true",
	tpl: "vendor/tpl",
	nod : "vendor/nod"
  },
  shim: {
	jquery:{
	  	exports:"$" 
	},
	underscore: {
      		exports: "_"
    	},
    	backbone: {
      		deps: ["jquery", "underscore", "json2"],
      		exports: "Backbone"
    	},
    	"backbone.syphon": ["backbone"],
    	marionette: {
      	deps: ["backbone"],
      	exports: "Marionette"
    },
  
  },
 });
 
require(["appl","apps/Models"], function(Viewer){
  Viewer.start();
});
