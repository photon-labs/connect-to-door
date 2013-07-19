Clazz.createPackage("com.attendance.widget.listener");

Clazz.com.attendance.widget.listener.InputAndSaveListener = Clazz.extend(Clazz.Widget, {
	CookieAPI:null,
	clickedButton:null,
	createAndEditAccountAPI : null,
	/**
	 * @author dhika_p
	 * initialize construct object
	 */
	initialize : function(){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.createAndEditAccountAPI = new Clazz.com.attendance.api.CreateAndEditAccountAPI();
	},


	/**
	 * @author dhika_p
	 * function to save Button Save Status
	 * */
	onEnabledButtonSave:function(formValue){

		if (formValue == "create"){
			this.clearInputText();
			$('.attendance-form-body-left-bottom , .attendance-form-input-name , .attendance-form-button-search , .attendance-form-button-delete').removeClass('attendance-form-visible');
			$('.attendance-form-input-name').val("");	
			$('.attendance-form-background-input-name').attr("readonly",true);	
			$(".form-status-message").text("");
			this.CookieAPI.saveIsEnableButtonSave(true);	
			this.activateInputForm();	
		}else {
			this.CookieAPI.saveIsEnableButtonSave(true);	
			this.activateInputForm();	
		}			
	},

	/**
	 * @author dhika_p
	 * function to enabled input form
	 * */
	activateInputForm : function (){
		var self = this;
		var statusEnabled = self.CookieAPI.getIsEnableButtonSave();
		if (statusEnabled=="true"){
			this.enabledInputForm();
			$('.attendance-form-button-save').css("cursor","pointer");
			$('.attendance-form-background-input-fullname').removeClass('attendance-form-background-input-fullname-red');
			$('.attendance-form-background-input-employeeid').removeClass('attendance-form-background-input-fullname-red');
			$('.attendance-form-background-input-projectid').removeClass('attendance-form-background-input-fullname-red');
			$('.attendance-form-bg-input-start-working').removeClass('attendance-form-bg-input-start-working-red');
			$('.attendance-form-bg-input-email').removeClass('attendance-form-bg-input-email-red');
			$('.attendance-form-bg-input-annual').removeClass('attendance-form-bg-input-annual-red');
			$('.attendance-form-bg-input-coff').removeClass('attendance-form-bg-input-annual-red');
			$('.attendance-form-bg-input-condolences').removeClass('attendance-form-bg-input-annual-red');
			$('.attendance-form-bg-input-married').removeClass('attendance-form-bg-input-annual-red');
			$('.attendance-form-input-bg-maternity').removeClass('attendance-form-bg-input-annual-red');
			$('.attendance-form-input-bg-onsite').removeClass('attendance-form-bg-input-annual-red');
			$('.attendance-form-bg-input-paternity').removeClass('attendance-form-bg-input-annual-red');
			$('.attendance-form-bg-input-sick').removeClass('attendance-form-bg-input-annual-red');
			$('.attendance-form-submitted-approval-dropdown').removeClass('attendance-form-background-input-fullname-red');
			$('.attendance-form-bg-input-email-facebook').removeClass('attendance-form-background-input-fullname-red');
			$('.attendance-form-gender-dropdown').removeClass('attendance-form-background-input-fullname-red');
			$('.attendance-form-background-input-username').removeClass('attendance-form-background-input-fullname-red');
			$('.form-signature-input').removeClass('attendance-form-background-input-fullname-red');
		}
	},

	/**
	 * @author dhika_p
	 * function to deactive input form
	 * */
	onDeactiveInputForm : function (){
		var self = this;
		this.CookieAPI.saveIsEnableButtonSave(false);	
		this.disabledInputForm();
		this.clearInputText();
		$('.attendance-form-button-save').css("cursor","default");
	},

	/**
	 * @author dhika_p
	 * function to clear input text
	 * */
	clearInputText:function(){
		$('.attendance-form-background-input-fullname , .attendance-form-background-input-employeeid , '+
				'.attendance-form-background-input-projectid , .attendance-form-bg-input-annual , .attendance-form-bg-input-coff ,'+
				' .attendance-form-bg-input-condolences , .attendance-form-bg-input-start-working , .attendance-form-bg-input-email ,'+
				'.attendance-form-bg-input-married , .attendance-form-input-bg-maternity , .attendance-form-input-bg-onsite ,'+
				'.attendance-form-bg-input-paternity , .attendance-form-bg-input-sick , .attendance-form-bg-input-email-facebook,'+
		'.attendance-form-background-input-username, .form-signature-input').val("");
		$('.attendance-form-submitted-approval-dropdown, .attendance-form-gender-dropdown').text("");
	},

	/**
	 * @author dhika_p
	 * function to enabled input form
	 * */
	enabledInputForm:function(){
		$('.attendance-form-background-input-fullname , .attendance-form-background-input-employeeid , '+
				'.attendance-form-background-input-projectid , .attendance-form-bg-input-annual , .attendance-form-bg-input-coff ,'+
				'.attendance-form-bg-input-condolences , .attendance-form-bg-input-start-working , .attendance-form-bg-input-email ,'+
				'.attendance-form-bg-input-married , .attendance-form-input-bg-maternity , .attendance-form-input-bg-onsite ,'+
				'.attendance-form-bg-input-paternity , .attendance-form-bg-input-sick , .attendance-form-bg-input-start-working,'+
				'.attendance-form-submitted-approval-title , .attendance-form-submitted-approval-dropdown , .form-arrow-box,'+
				'.attendance-form-bg-input-email-facebook,.attendance-form-background-input-username,.form-signature-input,'+
		'.attendance-form-gender-dropdown, .form-arrow-box-gender, .facebook-id-search').addClass("attendance-form-visible");
		$('.attendance-form-calendar-inactive').addClass("attendance-form-hidden");
	},

	/**
	 * @author dhika_p
	 * function to disabled input form
	 * */
	disabledInputForm:function(){
		$('.attendance-form-background-input-fullname , .attendance-form-background-input-employeeid , '+
				'.attendance-form-background-input-projectid , .attendance-form-bg-input-annual , .attendance-form-bg-input-coff ,'+
				'.attendance-form-bg-input-condolences , .attendance-form-bg-input-start-working , .attendance-form-bg-input-email ,'+
				'.attendance-form-bg-input-married , .attendance-form-input-bg-maternity , .attendance-form-input-bg-onsite ,'+
				'.attendance-form-bg-input-paternity , .attendance-form-bg-input-sick , .attendance-form-bg-input-start-working,'+
				'.attendance-form-submitted-approval-dropdown , .form-arrow-box , .attendance-form-bg-input-email-facebook,'+
				'.attendance-form-background-input-username, .form-signature-input, .attendance-form-gender-dropdown,'+
		'.form-arrow-box-gender, .facebook-id-search').removeClass("attendance-form-visible");
		$('.attendance-form-calendar-inactive').removeClass("attendance-form-hidden");
	},

	/**
	 * @author dhika_p
	 * function to save new account
	 * */
	buttonSaveClick:function(){	
		var self = this;
		var buttonStatus = this.CookieAPI.getIsEnableButtonSave();
		this.clickedButton = this.CookieAPI.getButtonClickedAttendanceForm();

		var dataFullName=$('.attendance-form-background-input-fullname').val();
		var dataEmployeID=$('.attendance-form-background-input-employeeid').val();
		var dataUsername=$('.attendance-form-background-input-username').val();
		var dataProjectID=$('.attendance-form-background-input-projectid').val();
		if(dataProjectID == "-" || dataProjectID == "" || dataProjectID == null){
			dataProjectID = "-"
		}
		var dataStartWorking=$('.attendance-form-bg-input-start-working').val();
		var dataEmail=$('.attendance-form-bg-input-email').val();
		var dataAnnual=$('.attendance-form-bg-input-annual').val();
		var dataCoff=$('.attendance-form-bg-input-coff').val();
		var dataCondolences=$('.attendance-form-bg-input-condolences').val();
		var dataMarried=$('.attendance-form-bg-input-married').val();
		var dataMaternity=$('.attendance-form-input-bg-maternity').val();
		var dataOnsite=$('.attendance-form-input-bg-onsite').val();
		var dataPaternity=$('.attendance-form-bg-input-paternity').val();
		var dataSick=$('.attendance-form-bg-input-sick').val();
		var dataPosition=$('.attendance-form-submitted-approval-dropdown').text();
		var facebookId=$('.attendance-form-bg-input-email-facebook').val();
		var dataGender=$('.attendance-form-gender-dropdown').text();
		var dataURLSignature=$('.form-signature-input').val();

		dataFullName = dataFullName.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			return letter.toUpperCase();
		});
		dataEmployeID = dataEmployeID.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			return letter.toUpperCase();
		});

		if(buttonStatus=="true"){
			if(self.validationForm(dataFullName, dataEmployeID, dataProjectID, dataStartWorking, dataEmail,
					dataAnnual, dataCoff, dataCondolences, dataMarried, dataMaternity, dataOnsite, dataPaternity,
					dataSick,dataPosition, facebookId, dataUsername, dataURLSignature, dataGender) == 0){

				if (self.clickedButton=="edit"){
					var statusData = "update";
					self.createAndEditAccountAPI.createAndEditAccount(statusData, dataEmployeID,
							dataUsername, dataProjectID, dataFullName, dataEmail, facebookId,
							dataStartWorking, dataPosition, dataAnnual, dataCoff,dataCondolences, 
							dataMarried, dataMaternity, dataPaternity, dataOnsite, dataSick,
							dataURLSignature, dataGender, function(response){
						if(response.status == "success"){
							$(".form-status-message").text(response.message);
							$('.attendance-form-background-input-name').val("");
							self.onDeactiveInputForm();
							self.CookieAPI.saveIsEnableButtonSave(false);
							self.clearInputText();
						}else{
							$(".form-status-message").text(response.message);
						}
					});

				}else{
					var statusData = "create";
					self.createAndEditAccountAPI.createAndEditAccount(statusData, dataEmployeID,
							dataUsername, dataProjectID, dataFullName, dataEmail, facebookId,
							dataStartWorking, dataPosition, dataAnnual, dataCoff,dataCondolences, 
							dataMarried, dataMaternity, dataPaternity, dataOnsite, dataSick,
							dataURLSignature, dataGender, function(response){
						if(response.status == "success"){
							$(".form-status-message").text(response.message);
							self.activateInputForm();
							self.clearInputText();
						}
						else{
							if(response.detail == "emp_id"){
								$('.attendance-form-background-input-employeeid').addClass('attendance-form-background-input-fullname-red');
								$(".form-status-message").text(response.message);
							} else if (response.detail == "username"){
								$('.attendance-form-background-input-username').addClass('attendance-form-background-input-fullname-red');
								$(".form-status-message").text(response.message);
							} else if (response.detail == "emp_user"){
								$('.attendance-form-background-input-employeeid').addClass('attendance-form-background-input-fullname-red');
								$('.attendance-form-background-input-username').addClass('attendance-form-background-input-fullname-red');
								$(".form-status-message").text(response.message);
							}else{
								$(".form-status-message").text(response.message);
							}
						}
					});

				}
			}
			else{
				$(".form-status-message").text("");
			}
		}	
	},

	/**
	 * @author dede_pu
	 * function validation form
	 */
	validationForm : function(dataFullName, dataEmployeID, dataProjectID, dataStartWorking, dataEmail,
			dataAnnual, dataCoff, dataCondolences, dataMarried, dataMaternity, dataOnsite, dataPaternity,
			dataSick,dataPosition, facebookId, dataUsername, dataURLSignature, dataGender) {
		var valid= 0;
		var dataPosition = $(".attendance-form-submitted-approval-dropdown").text();
		var intRegex = /^\d+$/;
		var stringRegex = /^\s*[a-zA-Z_\s]+\s*$/;


		if (dataFullName == "" || !stringRegex.test(dataFullName)){
			$('.attendance-form-background-input-fullname').addClass('attendance-form-background-input-fullname-red');
			valid=valid+1;
		}else{
			$('.attendance-form-background-input-fullname').removeClass('attendance-form-background-input-fullname-red');
			valid=valid+0;
		}

		if (dataEmployeID == ""){
			$('.attendance-form-background-input-employeeid').addClass('attendance-form-background-input-fullname-red');
			valid=valid+1;
		}else{
			$('.attendance-form-background-input-employeeid').removeClass('attendance-form-background-input-fullname-red');
			valid=valid+0;
		}

		if (dataGender !== ""){
			$('.attendance-form-gender-dropdown').removeClass('attendance-form-background-input-fullname-red');
			valid=valid+0;
		}else{
			$('.attendance-form-gender-dropdown').addClass('attendance-form-background-input-fullname-red');
			valid=valid+1;
		}

		if (dataUsername == "" || !stringRegex.test(dataUsername)){
			$('.attendance-form-background-input-username').addClass('attendance-form-background-input-fullname-red');
			valid=valid+1;
		}else{
			$('.attendance-form-background-input-username').removeClass('attendance-form-background-input-fullname-red');
			valid=valid+0;
		}

		if (dataURLSignature == ""){
			$('.form-signature-input').addClass('attendance-form-background-input-fullname-red');
			valid=valid+1;
		}else{
			$('.form-signature-input').removeClass('attendance-form-background-input-fullname-red');
			valid=valid+0;
		}

		if (dataStartWorking == ""){
			$('.attendance-form-bg-input-start-working').addClass('attendance-form-bg-input-start-working-red');
			valid=valid+1;
		}else{
			$('.attendance-form-bg-input-start-working').removeClass('attendance-form-bg-input-start-working-red');
			valid=valid+0;
		}

		var dataEmailValidate = this.checkDataEmail(dataEmail);

		if (dataEmail == "" || dataEmailValidate == false){
			$('.attendance-form-bg-input-email').addClass('attendance-form-bg-input-email-red');
			valid=valid+1;
		}else{
			$('.attendance-form-bg-input-email').removeClass('attendance-form-bg-input-email-red');
			valid=valid+0;
		}

		if (facebookId == ""){
			$('.attendance-form-bg-input-email-facebook').addClass('attendance-form-background-input-fullname-red');
			valid=valid+1;
		}else{
			$('.attendance-form-bg-input-email-facebook').removeClass('attendance-form-background-input-fullname-red');
			valid=valid+0;
		}

		if (dataAnnual == "" || !intRegex.test(dataAnnual) || dataAnnual.substring(1,2) == "-" || dataAnnual.substring(2,3) == "-"
			|| (dataAnnual.substring(0,1) == "-" && dataAnnual.substring(1,2) == "")){
			$('.attendance-form-bg-input-annual').addClass('attendance-form-bg-input-annual-red');
			valid=valid+1;
		}else{
			$('.attendance-form-bg-input-annual').removeClass('attendance-form-bg-input-annual-red');
			valid=valid+0;
		}

		if (dataCoff == "" || !intRegex.test(dataCoff)){
			$('.attendance-form-bg-input-coff').addClass('attendance-form-bg-input-annual-red');
			valid=valid+1;
		}else{
			$('.attendance-form-bg-input-coff').removeClass('attendance-form-bg-input-annual-red');
			valid=valid+0;
		}

		if (dataCondolences == "" || !intRegex.test(dataCondolences)){
			$('.attendance-form-bg-input-condolences').addClass('attendance-form-bg-input-annual-red');
			valid=valid+1;
		}else{
			$('.attendance-form-bg-input-condolences').removeClass('attendance-form-bg-input-annual-red');
			valid=valid+0;
		}

		if (dataMarried == "" || !intRegex.test(dataMarried) || dataMarried.substring(1,2) == "-" || dataMarried.substring(2,3) == "-"
			|| (dataMarried.substring(0,1) == "-" && dataMarried.substring(1,2) == "")){
			$('.attendance-form-bg-input-married').addClass('attendance-form-bg-input-annual-red');
			valid=valid+1;
		}else{
			$('.attendance-form-bg-input-married').removeClass('attendance-form-bg-input-annual-red');
			valid=valid+0;
		}

		if (dataMaternity == "" || !intRegex.test(dataMaternity) || dataMaternity.substring(1,2) == "-" || dataMaternity.substring(2,3) == "-"
			|| (dataMaternity.substring(0,1) == "-" && dataMaternity.substring(1,2) == "")){
			$('.attendance-form-input-bg-maternity').addClass('attendance-form-bg-input-annual-red');
			valid=valid+1;
		}else{
			$('.attendance-form-input-bg-maternity').removeClass('attendance-form-bg-input-annual-red');
			valid=valid+0;
		}

		if (dataOnsite == "" || !intRegex.test(dataOnsite)){
			$('.attendance-form-input-bg-onsite').addClass('attendance-form-bg-input-annual-red');
			valid=valid+1;
		}else{
			$('.attendance-form-input-bg-onsite').removeClass('attendance-form-bg-input-annual-red');
			valid=valid+0;
		}

		if (dataPaternity == "" || !intRegex.test(dataPaternity) || dataPaternity.substring(1,2) == "-" || dataPaternity.substring(2,3) == "-"
			|| (dataPaternity.substring(0,1) == "-" && dataPaternity.substring(1,2) == "")){
			$('.attendance-form-bg-input-paternity').addClass('attendance-form-bg-input-annual-red');
			valid=valid+1;
		}else{
			$('.attendance-form-bg-input-paternity').removeClass('attendance-form-bg-input-annual-red');
			valid=valid+0;
		}

		if (dataSick == "" || !intRegex.test(dataSick) || dataSick.substring(1,2) == "-" || dataSick.substring(2,3) == "-"
			|| (dataSick.substring(0,1) == "-" && dataSick.substring(1,2) == "")){
			$('.attendance-form-bg-input-sick').addClass('attendance-form-bg-input-annual-red');
			valid=valid+1;
		}else{
			$('.attendance-form-bg-input-sick').removeClass('attendance-form-bg-input-annual-red');
			valid=valid+0;
		}

		if (dataPosition !== ""){
			$('.attendance-form-submitted-approval-dropdown').removeClass('attendance-form-background-input-fullname-red');
			valid=valid+0;
		}else{
			$('.attendance-form-submitted-approval-dropdown').addClass('attendance-form-background-input-fullname-red');
			valid=valid+1;
		}
		return valid;
	},

	/**
	 * @author dede_pu
	 * function checking if email has @
	 */
	checkDataEmail : function (dataEmail) {
		$(".form-status-message").text("");
		var emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
		var valid = emailRegex.test(dataEmail);
		if (!valid) {
			return false;
		} else{
			return true;
		}
	},

	/**
	 * @author dhika_p
	 * function to validate key press number only: 0-9
	 * */
	numberOnlyKeyPress : function(event){
		var backspace = 8;
		var deleteButton = 46;
		var leftArrow = 37;
		var tab = 9;
		var zero = 48;
		var nine = 57;
		var dot = 46;
		var percent = 37;
		var charcode = event ? event.which : event.keyCode;
		if (charcode == percent || charcode == dot){
			return false;
		}
		else if(charcode == backspace || charcode == deleteButton || charcode == leftArrow || charcode == tab){
			return true;
		}
		else if(charcode < zero || charcode > nine){
			return false;
		}
		else{
			return true;
		}
	},

	/**
	 * @author dhika_p
	 * function to validate key press number only: 0-9 and -
	 * */
	numberOnlyKeyPressValidation : function(event){
		var backspace = 8;
		var deleteButton = 46;
		var leftArrow = 37;
		var tab = 9;
		var zero = 48;
		var nine = 57;
		var dot = 46;
		var percent = 37;
		var minus = 45;
		var charcode = event ? event.which : event.keyCode;
		if (charcode == percent || charcode == dot){
			return false;
		}
		else if(charcode == backspace || charcode == deleteButton || charcode == leftArrow
				|| charcode == tab || charcode == minus){
			$(".form-status-message").text("");
			return true;
		}
		else if(charcode < zero || charcode > nine){
			return false;
		}
		else{
			$(".form-status-message").text("");
			return true;
		}
	},

	/**
	 * @author dhika_p
	 * function to validate key press only: 0-9, backspace, delete, left arrow, tab, i, I 
	 * */	
	filterKeyPressEmployeeID : function(event){
		var zero = 48;
		var nine = 57;
		var i = 105;
		var I = 73;
		var backspace = 8;
		var charcode = event ? event.which : event.keyCode;
		if(charcode == i || charcode == backspace|| charcode == I || (charcode >= zero && charcode <= nine)){
			$(".form-status-message").text("");
			return true;
		}
		else{
			return false;
		}
	},

	filterKeyPressFullName : function (event){
		var space = 32;
		var backspace = 8;
		var charcode = event ? event.which : event.keyCode;
		if((charcode >= 65 && charcode <= 90)||(charcode >= 97 && charcode <= 122)||(charcode === space)|| (charcode == backspace)){
			$(".form-status-message").text("");
			return true;
		}
		else{
			return false;
		}
	},

	filterKeyPressUsername : function(event){
		var charcode = event ? event.which : event.keyCode;
		if((charcode >= 65 && charcode <= 90)||(charcode >= 97 && charcode <= 122)||(charcode === 95)|| charcode == 8){
			$(".form-status-message").text("");
			return true;
		}
		else{
			return false;
		}
	},

	filterKeyPressEmail : function(event){
		var charcode = event ? event.which : event.keyCode;

		if((charcode >= 65 && charcode <= 90)||(charcode >= 97 && charcode <= 122)
				|| charcode == 64 || charcode == 46 || charcode == 45 || charcode == 95 || charcode == 8){
			$(".form-status-message").text("");
			return true;
		}
		else{
			return false;
		}
	},
});
