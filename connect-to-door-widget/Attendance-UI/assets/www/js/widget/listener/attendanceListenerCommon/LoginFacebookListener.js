Clazz.createPackage("com.attendance.widget.listener");

Clazz.com.attendance.widget.listener.LoginFacebookListener = Clazz.extend(Clazz.Widget, {
	CookieAPI : null,
	mask: null,

	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		require(["widget/common/AttendanceMask"],function(){
			self.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
		})	
	},

	buttonClickLogin : function() {	
		var self = this;

		/**
		 * @author andhika_p
		 * Get login Status and also check the status of user, if users connected from facebook 
		 * this method will bring users to attendance employee login page 
		 */
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				self.getAPIFacebook(response.authResponse.accessToken);
				self.pushLoginEmployeePage();
			} 
			else if (response.status === 'not_authorized') {
				self.loginFacebook();
			} 
			else {
				self.loginFacebook();
			}
		});
	},

	/**
	 * @author andhika_p
	 * this method will show a frame of facebook login
	 */
	loginFacebook : function(){
		var self = this;
		this.mask.showMask();
		FB.login(function(response) {
			if (response.authResponse) {
				self.mask.removeMask();
				self.getAPIFacebook(response.authResponse.accessToken);
				self.pushLoginEmployeePage();
			}
			else{
				self.mask.removeMask();
			}
		});
	},

	/**
	 * @author andhika_p
	 * this method will save 3 variable on local storage,
	 * token, username facebook, and user id facebook from facebook API
	 */
	getAPIFacebook: function (token) {
		var self = this;

		//check current date
		var statusDate = this.checkDate();
		if (statusDate == "different-day"){

			//save id Request from query string
			var idRequest = self.CookieAPI.getRequest();
			self.CookieAPI.removeAllCredentialAndConfidential();
			if (idRequest !== "" && idRequest !== null && idRequest !== undefined){
				self.CookieAPI.saveRequest(idRequest);
			}
		}

		FB.api('/me', function(response) {
			self.CookieAPI.saveToken(token);
			self.CookieAPI.saveUsernameFB(response.username);
			self.CookieAPI.saveUserIDFB(response.id)
			self.CookieAPI.saveCurrentDate(self.getDate());
			self.CookieAPI.saveEmailFacebook(response.email);

		});
	},

	/**
	 * @author andhika_p
	 * this method will push to employee ID and save facebook API to local storage
	 * @token token from facebook API
	 */
	pushEmployeeID : function(token){
		//token from facebook API
		this.getAPIFacebook(token);

		//push login employee page
		this.pushLoginEmployeePage();

	},

	/**
	 * @author andhika_p
	 * check date from the last login
	 */
	checkDate : function(){
		var self = this;
		var currentDate = this.getDate();
		var dateStored = this.CookieAPI.getCurrentDate();
		if (dateStored == currentDate){
			return "same-day"
		}
		else{
			return "different-day"
		}
	},

	/**
	 * @author andhika_p
	 * return current date with dd-mm-yyyy format
	 */
	getDate : function(){
		var currentTime = new Date();
		var currentDate = currentTime.getDate();
		var currentMonth = currentTime.getMonth();
		var currentYear = currentTime.getFullYear();
		var currentFullYear = currentDate + '/' + currentMonth + '/' + currentYear;
		return currentFullYear;
	},

	/**
	 * @author andhika_p
	 * push login employee page
	 */
	pushLoginEmployeePage : function(){
		//push login employee view
		require(["widget/module/attendanceLoginEmployee/LoginEmployee",
		         "widget/listener/attendanceListenerCommon/LoginEmployeeListener",
		         "widget/common/LoadingMask","widget/common/TokenChecker",
		         "widget/listener/attendanceListenerCommon/RemoveAllCredentialAndPushLoginListener",
		         "api/LoginAPI"],function(){
			var loginEmployee = new Clazz.com.attendance.widget.modules.attendanceLoginEmployee.LoginEmployee();
			Clazz.navigationController.push(loginEmployee);	
		});
	}
});
