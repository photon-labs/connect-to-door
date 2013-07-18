Clazz.createPackage("com.attendance.widget.listener");
Clazz.com.attendance.widget.listener.SignOutAndBackListener = Clazz.extend(Clazz.Widget, {
	CookieAPI : null,
	errorAlert: null,	
	mask : null,

	//token checker,loading mask
	tokenChecker : null,
	loadingMask : null,
	
	/**
	 * @author andhika_p
	 * initialize fill page name, and construct class local storage
	 */
	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();		
		require(["widget/common/AttendanceMask","widget/common/TokenChecker","widget/common/LoadingMask"],function(){
			self.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
			self.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
			self.tokenChecker = new Clazz.com.attendance.widget.common.TokenChecker();
		})	
	},


	/**
	 * @author andhika_p
	 * this method used for log out facebook and link to login facebook automatically
	 */
	buttonSignOutClick : function(){
		var self = this;
		
		//show mask and loading mask
		this.loadingMask.showLoading();
		this.mask.showMask();	
		
		this.tokenChecker.checkTokenFacebookBack(function(response){
			if (response === 'connected'){
				FB.logout();
				self.loadingMask.removeLoading();
				self.pushLoginPageWithoutLogout();
				setTimeout(function(){
					self.mask.removeMask();
				},1500);
			}
			else {
				self.loadingMask.removeLoading();
				self.pushLoginPageWithoutLogout();
			}
		})			
	},

	/**
	 * @author andhika_p
	 * this method used for back action
	 */
	buttonBackClick: function(){
		
		this.loadingMask.showLoading();
		this.mask.showMask();	
		
		var self = this;	
		this.tokenChecker.checkTokenFacebookBack(function(response){
			if(response == 'connected'){
				self.loadingMask.removeLoading();
				Clazz.navigationController.pop();
				setTimeout(function(){
					self.mask.removeMask();
				},1500);
			}
			else{
				self.loadingMask.removeLoading();
				self.pushLoginPageWithoutLogout();
			}
		})			

	},

	/**
	 * @author andhika_p
	 * this method used for push login page without fb.logout, that happen cause users logout from facebook before
	 */
	pushLoginPageWithoutLogout : function(){
		require(["widget/listener/attendanceListenerCommon/RemoveAllCredentialAndPushLoginListener"],function(){
			var removeCredentialAndPushLoginListener = new Clazz.com.attendance.listener.common.RemoveAllCredentialAndPushLoginListener();
			removeCredentialAndPushLoginListener.removeAllCredentialAndPushLoginView();
		});
		
	},

	/**
	 * @author andhika_p
	 * this method used for show alert that the token is gone or lost.
	 */
	showTokenAlert : function(){
		var self = this;
		require(["widget/common/ErrorAlert"],function(){
			self.errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText : "Please login again"});
			self.errorAlert.showAlert();
		});
	},

});