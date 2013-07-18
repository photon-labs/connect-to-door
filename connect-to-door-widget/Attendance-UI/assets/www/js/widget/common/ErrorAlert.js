Clazz.createPackage("com.attendance.widget.common");

Clazz.com.attendance.widget.common.ErrorAlert = Clazz.extend(Clazz.Widget, {
	mainContent : null,
	errorText:null,
	statusIdle:null,
	loginEmployeeListener:null,

	initialize : function(config){
		this.errorText = config.errorText;
		this.loginEmployeeListener = new Clazz.com.attendance.widget.listener.LoginEmployeeListener ();
	},

	/**
	 * @author dhika_p
	 * This method is used to get customize loading layout.
	 * @returns mainContent is main layout that contain loading screen and image.
	 */
	getWidgetContent : function() {
		this.mainContent = $('<div class="avs-error-main"></div>');
		var alertImage = $('<div class="avs-error-image"></div>');
		var alertText = $('<div class="avs-alert-text">'+ this.errorText +'</div>');
		var okButton = $('<div class="avs-ok-button"></div>')

		var self=this;
		okButton.click(function(){
			self.removeAlert();
		});

		alertImage.append(alertText);
		alertImage.append(okButton);
		this.mainContent.append(alertImage);
		return this.mainContent;
	},

	/**
	 * @author dhika_p
	 * This method is used to set error text.
	 */
	setErrorText : function(message){
		this.errorText = message;
	},

	/**
	 * @author dhika_p
	 * This method is used to remove customize loading layout.
	 */
	removeAlert : function() {
		var self = this;
		$('.avs-mask-main').remove();
		if(self.statusIdle == "idle"){
			var SignOutAndBackListener = new Clazz.com.attendance.widget.listener.SignOutAndBackListener();
			$.idleTimer('destroy');
			SignOutAndBackListener.buttonSignOutClick();
		}
	},

	/**
	 * @author dhika_p
	 * This method is used to show customize loading layout.
	 */
	showAlert: function(statusIdle){
		var self = this;
		this.statusIdle = statusIdle;
		if(this.statusIdle == "idle"){
			FB.logout();

		}
		var maskMain = $('div.avs-mask-main');
		if(maskMain.length == 0) {
			maskMain = $('<div class="avs-mask-main"></div>');
			maskMain.append(this.getWidgetContent());
			//append loading on main container
			$(".attendance-dom").append(maskMain);
		} 

		maskMain.show();

	},

	/**
	 * @author dhika_p
	 * Refer to Widget.js
	 */
	renderUI : function() {
		return this.getWidgetContent();
	}
});
