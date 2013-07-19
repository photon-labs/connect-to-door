Clazz.createPackage("com.attendance.widget.listener");
Clazz.com.attendance.widget.listener.PushProfileListener = Clazz.extend(Clazz.Widget, {
	CookieAPI : null,
	mask : null,

	//token checker,loading mask, and remove credential/login page listener
	tokenChecker : null,
	removeCredentialAndPushLoginListener: null,
	loadingMask : null,
	
	initialize : function(config){
		var self = this;
		require(["widget/common/AttendanceMask","widget/common/TokenChecker",
		         "widget/listener/attendanceListenerCommon/RemoveAllCredentialAndPushLoginListener",
		         "widget/common/LoadingMask"],function(){
			self.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
			self.tokenChecker = new Clazz.com.attendance.widget.common.TokenChecker();
			self.removeCredentialAndPushLoginListener = new Clazz.com.attendance.listener.common.RemoveAllCredentialAndPushLoginListener();
			self.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
		})	
	},

	/**
	 * @author dede_pu
	 * function to push Profile page
	 */
	buttonProfileClick: function(){
		var self = this;
		this.loadingMask.showLoading();
		this.tokenChecker.checkTokenFacebookBack(function(response){
			if(response == 'connected'){
				self.loadingMask.removeLoading();
				require(["widget/listener/attendanceListenerCommon/SignOutAndBackListener"
				         ,"widget/listener/attendanceListenerProfile/PersonInformationListener"
				         ,"api/CookieAPI"
				         ,"widget/common/Footer"
				         ,"widget/module/attendanceProfile/AttendanceProfile"
				         ,"widget/module/attendanceProfile/AttendanceAndVoucherButton"
				         ,"widget/module/attendanceProfile/PersonInformation"
				         ,"widget/module/attendanceReimbursement/AttendanceReimbursementUserInfo"
				         ,"widget/listener/attendanceListenerVoucherMenu/PushVoucherListener"],function(){
					var attendanceProfile = new Clazz.com.attendance.widget.module.profile.AttendanceProfile();
					Clazz.navigationController.push(attendanceProfile);
				});
			}
			else{
				self.loadingMask.removeLoading();
				self.removeCredentialAndPushLoginListener.removeAllCredentialAndPushLoginView();
			}
		})			

	},
});