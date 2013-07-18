Clazz.createPackage("com.attendance.widget.listener");
/**
 * @author dede_pu
 * Create class LoginEmployeeListener
 */
Clazz.com.attendance.widget.listener.LoginEmployeeListener = Clazz.extend(Clazz.Widget, {
	statusClick : true,

	//token checker,loading mask, and credential and push login listener
	tokenChecker : null,
	loadingMask : null,

	removeCredentialAndPushLoginListener : null,
	loginEmployeeAPI : null,

	/**
	 * @author andhika_p
	 * initialize fill page name, and construct class local storage
	 */
	initialize : function(config){
		var self = this;
		this.data = this.dataSample;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();	
		this.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
		this.tokenChecker = new Clazz.com.attendance.widget.common.TokenChecker();
		this.removeCredentialAndPushLoginListener = new Clazz.com.attendance.listener.common.RemoveAllCredentialAndPushLoginListener();
		this.loginEmployeeAPI = new Clazz.com.attendance.api.LoginAPI();
	},

	/**
	 * @author andhika_p
	 * change status continue button to be true and check facebook token
	 */
	onContinueClick : function(employeeID){
		var self = this;
		this.statusClick = true;
		this.checkFacebook(employeeID);
	},
	/**
	 * @author andhika_p
	 * this method used for validation employee id from Local storage  
	 */
	employeeIDValidation: function(){
		var employeeID = this.CookieAPI.getUserIdEmployee();
		if (employeeID != null){
			this.pushAttendanceMenuPage();
		}
	},

	/**
	 * @author dede_pu
	 * function to push menu
	 */
	pushAttendanceMenuPage : function() {	
		require(["widget/module/attendanceMenu/AttendanceMenu",
		         "widget/module/attendanceMenu/AttendanceMenuAdminPanel",
		         "widget/listener/attendanceListenerMenu/MenuAdminPanelListener",
		         "widget/module/attendanceMenu/AttendanceMenuProfileVoucher",
		         "widget/listener/attendanceListenerMenu/PushProfileListener",
		         "widget/module/attendanceMenu/AttendanceMenuCheckInOut",
		         "widget/listener/attendanceListenerMenu/MenuCheckInOutListener",
		         "widget/module/attendanceMenu/AttendanceMenuFooter",
		         "widget/listener/attendanceListenerCommon/SignOutAndBackListener",
		         "widget/listener/attendanceListenerVoucherMenu/PushVoucherListener",
		         "widget/listener/attendanceListenerCommon/IdleTimer",
		         "widget/module/attendanceRequest/RequestDate",
		         "widget/common/AttendanceMask", "widget/common/ErrorAlert",
		         "api/CookieAPI", "api/LoginAPI","api/CheckInOutAPI",
		         "abstract/API","widget/common/Footer","api/ProfileAPI",
		         "api/ReportAPI","widget/common/PrintDataIntoCsv"],function(){
			var attendanceMenu = new Clazz.com.attendance.widget.module.attendanceMenu.AttendanceMenu();
			Clazz.navigationController.push(attendanceMenu);
		});	
	},

	/**
	 * @author dede_pu
	 * function to validate employee id
	 */
	validateEmployeeId : function(employeeID){
		var self = this;
		var statusEmpIDValid = false;
		var idFacebook = this.CookieAPI.getIDFB();
		this.loadingMask.showLoading();
		this.loginEmployeeAPI.doLogin(employeeID, idFacebook, function(response){
			// condition for read status Emp id 
			if (response.status == "success"){
				self.CookieAPI.saveUserIdEmployee(employeeID.toUpperCase());
				self.CookieAPI.saveAuthority(response.isAdmin);
				self.loadingMask.removeLoading();
				self.pushAttendanceMenuPage();
			}else{
				self.loadingMask.removeLoading();
				require(["widget/common/ErrorAlert"],function(){
					var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText:response.message});
					errorAlert.showAlert("nonIdle");
				});
			}

		});

	},

	/**
	 * @author andhika_p
	 * check token facebook
	 */
	checkFacebook : function(employeeID){
		var self = this;
		if (self.statusClick == true){
			self.statusClick = false;
			self.loadingMask.showLoading();
			self.tokenChecker.checkTokenFacebookBack(function(response){
				if(response == 'connected'){
					self.loadingMask.removeLoading();
					self.validateEmployeeId(employeeID);					
				}
				else{
					self.loadingMask.removeLoading();
					//save id Request from query string
					var idRequest = self.CookieAPI.getRequest();
					self.removeCredentialAndPushLoginListener.removeAllCredentialAndPushLoginView();
					if (idRequest !== "" && idRequest !== null && idRequest !== undefined){
						self.CookieAPI.saveRequest(idRequest);
					}
				}
			});	
		}
	},

	/**
	 * @author andhika_p
	 * change status true button Continue
	 */
	enableButtonContinue : function(){
		this.statusClick = true
	},

	/**
	 * @author andhika_p
	 * change status false button Continue
	 */
	disableButtonContinue : function(){
		this.statusClick = false
	},

});

