Clazz.createPackage("com.attendance.widget.attendanceLoginFacebook");

Clazz.com.attendance.widget.attendanceLoginFacebook.LoginFacebook = Clazz.extend(Clazz.WidgetWithTemplate, {
	loginListener : null,

	// template URL, used to indicate where to get the template
	templateUrl: "../template/attendanceCommon/attendanceLoginFacebook.tmp",
	name :"attendanceLoginFacebook",
	
	mask : null,
	
	initialize : function(config){
		var self = this;
		this.loginFacebookListener = new Clazz.com.attendance.widget.listener.LoginFacebookListener();
		require(["widget/common/AttendanceMask"],function(){
			self.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
		})	
	},
	
	postRender : function(){
		this.mask.showMask();
	},
	
	/***
	 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
	 */
	bindUI : function(){
		var self = this;
		
		$('.button-login-facebook').click(function(e){
			self.loginFacebookListener.buttonClickLogin();
		});
		setTimeout(function(){
			self.mask.removeMask();
		},1500);
	},
});
