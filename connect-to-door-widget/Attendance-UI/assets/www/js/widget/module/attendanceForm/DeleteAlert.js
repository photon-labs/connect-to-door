Clazz.createPackage("com.attendance.widget.attendanceForm");

Clazz.com.attendance.widget.attendanceForm.DeleteAlert = Clazz.extend(Clazz.Widget, {
	mainContent : null,
	deleteText:null,
	employeeID : null,
	DeleteAccountAPI : null,
	loadingMask : null,
	
	initialize : function(config){
		this.CreateAndEditListener = new Clazz.com.attendance.widget.listener.CreateAndEditListener();
		var self = this;
		this.deleteText = config.deleteText;
		require(["api/DeleteAccountAPI"],function(){
			self.DeleteAccountAPI = new Clazz.com.attendance.api.DeleteAccountAPI();
		});
		this.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
	},

	/**
	 * This method is used to get customize loading layout.
	 * @returns mainContent is main layout that contain loading screen and image.
	 */
	getWidgetContent : function() {
		this.mainContent = $('<div class="avs-error-main"></div>');
		var deleteImage = $('<div class="avs-error-image"></div>');
		var deleteText = $('<div class="avs-delete-alert-text">'+ this.deleteText +'</div>');
		var yesButton = $('<div class="avs-yes-button"></div>')
		var noButton = $('<div class="avs-no-button"></div>')

		var self=this;
		noButton.click(function(){
			self.removeAlert();
			$(".attendance-form-background-input-name, .attendance-form-drop-name").removeClass("attendance-form-add-text-alert");
		});

		yesButton.click(function(){
			$('.attendance-form-drop-name').text("");
			$('.attendance-form-background-input-name').val("");
			$('.attendance-form-input-name').val("");
			
			self.CreateAndEditListener.clearTextDeleteSearch();
			self.removeAlert();
			self.deleteAccount(self.employeeID);
		});

		deleteImage.append(deleteText);
		deleteImage.append(yesButton);
		deleteImage.append(noButton);
		this.mainContent.append(deleteImage);
		return this.mainContent;
	},

	setErrorText : function(message){
		this.deleteText = message;
	},

	/**
	 * This method is used to remove customize loading layout.
	 */
	removeAlert : function() {
		var self = this;
		$('.avs-mask-main').remove();

	},

	/**
	 * This method is used to show customize loading layout.
	 */
	showAlert: function(employeeID){
		this.employeeID = employeeID;
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
	 * Refer to Widget.js
	 */
	renderUI : function() {
		return this.getWidgetContent();
	},

	/**
	 * @author andhika_p
	 * delete Account employee
	 * */
	deleteAccount : function(employeeID){	
		var self = this;
		var status ="delete";
		this.loadingMask.showLoading();
		this.DeleteAccountAPI.deleteAccount(status, employeeID, function(response){
			if(response.status == "success"){
				$(".form-status-message").text(response.message);
				self.loadingMask.removeLoading();
			}else {
				$(".form-status-message").text("Failed to delete account");
			}
		});
	},
});
