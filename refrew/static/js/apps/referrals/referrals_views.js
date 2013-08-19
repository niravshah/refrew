define(["appl",
        "tpl!apps/referrals/templates/user-job-referrals-container.tpl",
	"tpl!apps/referrals/templates/user-job-referrals.tpl",
	"tpl!apps/referrals/templates/referral-form.tpl"],
        function(App, userJobReferralsContainerTpl, userJobReferralsTpl, referralFormTpl){

 	App.module( "ReferralsModule.Views",function(Mod,App,Backbone, Marionette, $, _) {

       	Mod.UserJobReferralsView = Backbone.Marionette.ItemView.extend({
                template: userJobReferralsTpl
        });

        Mod.UserJobReferralsListView =  Backbone.Marionette.CompositeView.extend({
            itemView: Mod.UserJobReferralsView,
            itemViewContainer:'#user-job-referrals-itemview-container',
            template:userJobReferralsContainerTpl,
            tagName: 'div',
            initialize: function(options) {
             	var _this = this;
             	_.bindAll(this,"render");
              	_this.render();
            }
    	});

       Mod.ReferralSubmitFormView = Backbone.Marionette.ItemView.extend({
                model: App.Models.LinkedInSearchResultModel,
		template: referralFormTpl,
                tagName:'div',
                className:'col-lg-6',
                events:{
                        'click #submit-ref' : 'submitRef'
                },
		initialize: function(options) {
 	              	var _this = this;
                	_.bindAll(this,"render");
		},
                submitRef : function(e){
                        var _this = this;
                        App.ReferralsModule.Control.Controller.submitReferral(e,_this);
        }
        });

});

});

