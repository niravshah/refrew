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
	marionette: "vendor/backbone.marionette",
	appl : "refrew-app",
	refrew:"vendor/refrew",
	sidr:"vendor/jquery.sidr.min",
	linkedin: "http://platform.linkedin.com/in.js?async=true",
	tpl: "vendor/tpl",
	parsley : "vendor/parsley"
  },
  shim: {
	underscore: {
      		exports: "_"
    	},
    	backbone: {
      		deps: ["jquery", "underscore", "json2"],
      		exports: "Backbone"
    	},
	marionette:{
		deps:["backbone"],
		exports: "Marionette"
	}
  },
 });
 
require(["appl","apps/Models","apps/Layouts"], function(Viewer){
  Viewer.start();
});
