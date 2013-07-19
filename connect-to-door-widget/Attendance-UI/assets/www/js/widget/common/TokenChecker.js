Clazz.createPackage("com.attendance.widget.common");
Clazz.com.attendance.widget.common.TokenChecker = Clazz.extend(Clazz.Widget, {
	
	CookieAPI : null,
	errorAlert: null,	
	mask : null,
	/**
	 * @author andhika_p
	 * initialize fill page name, and construct class local storage
	 */
	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();		
		require(["widget/common/AttendanceMask"],function(){
			self.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
		})	
	},

	/**
	 * @author andhika_p
	 * check token from facebook with FB.getLoginStatus without call Fb.init when back button click
	 */
	checkTokenFacebookBack : function(callBackFunction){
		if(callBackFunction){
			var status = null;
			var self = this;
			FB.getLoginStatus(function(response) {
				if (response.status === 'connected') {
					status = "connected";
					callBackFunction(status);
				} 
				else if (response.status === 'not_authorized') {
					status = "not_connect";
					callBackFunction(status);
				} 
				else {
					status = "not_connected";
					callBackFunction(status);
				}
			},true);
		}
	},
	
});