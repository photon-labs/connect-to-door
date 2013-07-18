Clazz.createPackage("com.attendance.listener.common");
Clazz.com.attendance.listener.common.RemoveAllCredentialAndPushLoginListener = Clazz.extend(Clazz.Widget, {
	CookieAPI : null,

	/**
	 * @author andhika_p
	 * initialize construct class local storage
	 */
	initialize : function(config){
		var self = this;
		require(["api/CookieAPI"], function () {
			self.CookieAPI = new Clazz.com.attendance.api.CookieAPI();		
		});
	},
	/**
	 * @author andhika_p
	 * this method used for remove all credential in local storage and push login facebook.
	 */
	removeAllCredentialAndPushLoginView : function(){
		$("attendance\\:widget").empty();

		//clear all API data
		this.CookieAPI.removeAllCredentialAndConfidential();

		//push login facebook page
		require(["login/LoginFacebook", "listener/attendanceListenerCommon/LoginFacebookListener"
		         ,"api/CookieAPI"], function () {
			var loginFacebookView = new Clazz.com.attendance.widget.attendanceLoginFacebook.LoginFacebook();
			Clazz.navigationController.push(loginFacebookView);	
		});
	},
});