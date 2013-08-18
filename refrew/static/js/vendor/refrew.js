function onLinkedInLoad() {
	if(gmm.Viewer){
		gmm.Viewer.trigger("linkedin:load");}
	IN.Event.on(IN, "auth", onLinkedInAuth);
}

function linkedinLogout(){
	$('#linkedin-logout').hide();
	IN.User.logout();
}

function onLinkedInAuth() {
	$('#linkedin-logout').show();
	IN.API.Profile("me").result( function(me) {
		$('#linkedin-userid').val(me.values[0].id);
		if(gmm.Viewer){
			gmm.Viewer.trigger("linkedin:auth");}
	});
}