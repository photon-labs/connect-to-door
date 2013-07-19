Clazz.createPackage("com.attendance.widget.listener");
/**
 * @author dede_pu
 * Create class IdleTimer
 */
Clazz.com.attendance.widget.listener.IdleTimer = Clazz.extend(Clazz.Widget, {
	CookieAPI : null,

	initialize : function(config){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		
	},

	/**
	 * @author dede_pu
	 * When user idle, user will be force to sign out
	 */
	getIdleTimer : function() {
		var self = this;
		$.idleTimer('destroy');
		$.idleTimer(1800000);
		
		//function on process when we idle
		$(document).bind("idle.idleTimer", function(){
			require(["widget/common/ErrorAlert"],function(){
				var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText:"Please Login to Continue"});
				errorAlert.showAlert("idle");
			});
		});
		
		//function on process when we active
		$(document).bind("active.idleTimer", function(){
			
		});
	},

});