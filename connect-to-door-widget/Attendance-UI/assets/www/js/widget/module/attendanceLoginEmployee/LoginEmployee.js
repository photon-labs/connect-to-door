Clazz.createPackage("com.attendance.widget.modules.attendanceLoginEmployee");
/**
 * @author dede_pu
 * Create class LoginEmployee
 */
Clazz.com.attendance.widget.modules.attendanceLoginEmployee.LoginEmployee = Clazz.extend(Clazz.WidgetWithTemplate, {

	// template URL, used to indicate where to get the template
	templateUrl: "../template/attendanceCommon/attendanceLoginEmployee.tmp",
	name : "attendanceLoginEmployee",
	loginEmployeeListener : null,
	CookieAPI : null,

	initialize : function(config){
		this.loginEmployeeListener = new Clazz.com.attendance.widget.listener.LoginEmployeeListener();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();	

	},

	/***
	 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
	 */
	bindUI : function(){		
		var self = this;
		this.selectorFocusController($('.employee-id-input-bg'));
		this.blockInput();

		$('.employee-id-input-bg').keyup(function(event){
			var enter = 13;
			if(event.keyCode == enter){
				var employeeID = $('.employee-id-input-bg').val();
				self.loginEmployeeListener.checkFacebook(employeeID);
				$('.employee-id-input-focus-out').focus();
			}
		});

		$('.continue-button').click(function(e){
			var employeeID = $('.employee-id-input-bg').val();
			self.loginEmployeeListener.onContinueClick(employeeID);
		});

		//validate employee id
		var employeeID = self.CookieAPI.getUserIdEmployee();
		if (employeeID != null){
			if(this.Surl == "m4r3tsk4"){
				
			}
			else{
				self.loginEmployeeListener.pushAttendanceMenuPage();
			}
		}
	},

	/**
	 * @author dede_pu
	 * function to block key input (work only 0-9 and i, I)
	 */
	blockInput : function() {
		$('.employee-id-input-bg').keypress(function(event){
			var zero = 48;
			var nine = 57;
			var i = 105;
			var I = 73;
			var bs = 08;
			var charcode = event ? event.which : event.keyCode;
			if(charcode == i || charcode == I ||charcode == bs || (charcode >= zero && charcode <= nine)){
				return true;
			}
			else{
				return false;
			}
		});
		
	},

	/**
	 * @author andhika_p
	 * focus controller for selector when focus in and out
	 * @param selector
	 */
	selectorFocusController : function(selector){
		var self = this;
		selector.focus();

		selector.focusout(function(){
			self.loginEmployeeListener.disableButtonContinue();
		});
		selector.focusin(function(){
			self.loginEmployeeListener.enableButtonContinue();
		});
	},

});
