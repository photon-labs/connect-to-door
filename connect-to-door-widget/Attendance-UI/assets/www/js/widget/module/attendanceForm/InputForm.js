Clazz.createPackage("com.attendance.widget.attendanceForm");

Clazz.com.attendance.widget.attendanceForm.InputForm = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl: "../template/attendanceForm/attendanceFormRightContent.tmp",
	InputAndSaveListener : null,
	defaultContainer : "attendance\\:form-right-content",
	dropDownControllerListener : null,
	CookieAPI : null,

	/**
	 * @author dhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.InputAndSaveListener = new Clazz.com.attendance.widget.listener.InputAndSaveListener();
		this.dropDownControllerListener = new Clazz.com.attendance.widget.listener.DropDownControllerListener(); 
	},

	bindUI : function(){
		this.setActionButton();
		this.setMaxLength();
		this.dropDownController();
		this.dropDownGenderController();
		var self = this;
		var inputEmployeeID = $ ('.attendance-form-background-input-employeeid');
		var inputProjectID = $('.attendance-form-background-input-projectid');
		var annual = $('.attendance-form-bg-input-annual');
		var cOff= $('.attendance-form-bg-input-coff');
		var condolences = $('.attendance-form-bg-input-condolences');
		var married = $('.attendance-form-bg-input-married');
		var maternity = $('.attendance-form-input-bg-maternity');
		var onsite =  $('.attendance-form-input-bg-onsite');
		var paternity = $('.attendance-form-bg-input-paternity');
		var sick =  $('.attendance-form-bg-input-sick');		
		var fullName = $('.attendance-form-background-input-fullname');	
		var emailFacebook = $('.attendance-form-bg-input-email-facebook');
		var email = $('.attendance-form-bg-input-email');
		var username = $('.attendance-form-background-input-username');
		
		$('.attendance-form-bg-input-start-working').attr("readonly",true);
		fullName.keypress(function(event){
			return(self.InputAndSaveListener.filterKeyPressFullName(event));
		});

		username.keypress(function(event){
			return(self.InputAndSaveListener.filterKeyPressUsername(event));
		});

		email.keypress(function(event){
			return(self.InputAndSaveListener.filterKeyPressEmail(event));
		});

		emailFacebook.keypress(function(event){
			return(self.InputAndSaveListener.filterKeyPressEmployeeID(event));
		});

		inputEmployeeID.keypress(function(event){
			return (self.InputAndSaveListener.filterKeyPressEmployeeID(event));
		});	

		inputProjectID.keypress(function(event){
			return (self.InputAndSaveListener.numberOnlyKeyPress(event));
		});

		annual.keypress(function(event){
			return (self.InputAndSaveListener.numberOnlyKeyPressValidation(event));
		});

		cOff.keypress(function(event){
			return (self.InputAndSaveListener.numberOnlyKeyPress(event));
		});

		condolences.keypress(function(event){
			return (self.InputAndSaveListener.numberOnlyKeyPress(event));
		});

		married.keypress(function(event){
			return (self.InputAndSaveListener.numberOnlyKeyPress(event));
		});

		maternity.keypress(function(event){
			return (self.InputAndSaveListener.numberOnlyKeyPress(event));
		});

		onsite.keypress(function(event){
			return (self.InputAndSaveListener.numberOnlyKeyPress(event));
		});

		paternity.keypress(function(event){
			return (self.InputAndSaveListener.numberOnlyKeyPress(event));
		});

		sick.keypress(function(event){
			return (self.InputAndSaveListener.numberOnlyKeyPress(event));
		});		
		
		$('.facebook-id-search').click(function(){
			window.open('http://findmyfacebookid.com/','','')
		});
	},

	/**
	 * @author dhika_p
	 * function to set action button in the template
	 */
	setActionButton : function(){
		var self = this;			
		var currentDateTime = this.getCurrentDate();
		$('.attendance-form-button-save').click(function(event){
			self.InputAndSaveListener.buttonSaveClick();
		});	

		$('.attendance-form-bg-input-start-working').attr("readonly",true);
		$( ".attendance-form-bg-input-start-working" ).datepicker({
			showOn: "button",
			maxDate : currentDateTime,
			dateFormat: 'dd/mm/yy',
			buttonImage: "../images/icon_calendar_start-working.png",
			buttonImageOnly: true,
		});	

		$(".attendance-form-bg-input-start-working").click(function(e){
			$('.attendance-form-input-start-working .ui-datepicker-trigger ').click();
		});	
	},

	/**
	 * @author andhika_p
	 * get current date with dd/mm/yyyy format
	 */
	getCurrentDate: function(){
		var d = new Date();
		var curr_date = d.getDate();
		var curr_month = d.getMonth()+1;
		var curr_year = d.getFullYear();

		return (curr_date +'/'+curr_month+'/'+curr_year);
	},

	setMaxLength : function(){
		var length = 3;
		$('.attendance-form-bg-input-annual').attr('maxlength', length);
		$('.attendance-form-bg-input-coff').attr('maxlength', length);
		$('.attendance-form-bg-input-condolences').attr('maxlength', length);
		$('.attendance-form-bg-input-married').attr('maxlength', length);
		$('.attendance-form-input-bg-maternity').attr('maxlength', length);
		$('.attendance-form-input-bg-onsite').attr('maxlength', length);
		$('.attendance-form-bg-input-paternity').attr('maxlength', length);
		$('.attendance-form-bg-input-sick').attr('maxlength', length);
		$('.attendance-form-bg-input-empty').attr('maxlength', length);

	},

	dropDownController : function(){
		var self = this;

		var dropDownValueButton = $('.attendance-form-submitted-approval-dropdown, .form-arrow-box');
		var dropDownValue = $('.attendance-form-submitted-approval-dropdown');
		var dropDownContent = $('.form-approval-dropdown-content');
		var dropDownContentItem = $('.form-approval-dropdown-item');
		dropDownContent.hide();
		dropDownValueButton.click(function(event){
			$('.form-dropdown-gender').slideUp();
			self.dropDownControllerListener.dropDownController(dropDownContent, event);
		});

		dropDownContentItem.click(function(){
			var value = $(this).text();
			dropDownValue.text(value);
			self.dropDownControllerListener.dropDownSelectController(dropDownContent);
		});

	},

	dropDownGenderController : function(){
		var self = this;

		var dropDownValueButton = $('.attendance-form-gender-dropdown, .form-arrow-box-gender');
		var dropDownValue = $('.attendance-form-gender-dropdown');
		var dropDownContent = $('.form-dropdown-gender');
		var dropDownContentItem = $('.form-dropdown-gender-item');
		dropDownContent.hide();
		dropDownValueButton.click(function(event){
			$('.form-approval-dropdown-content').slideUp();
			self.dropDownControllerListener.dropDownController(dropDownContent, event);
		});

		dropDownContentItem.click(function(){
			var value = $(this).text();
			dropDownValue.text(value);
			self.dropDownControllerListener.dropDownSelectController(dropDownContent);
		});

	},

	setValueFromSearch : function(personData){
		this.activeInputForm();
		$ ('.attendance-form-background-input-employeeid').val(personData.employeeID);
		if(personData.projectID == ""){
			$('.attendance-form-background-input-projectid').val("-");
		}else{
			$('.attendance-form-background-input-projectid').val(personData.projectID);
		}
		
		$('.attendance-form-bg-input-annual').val(personData.annual);
		$('.attendance-form-bg-input-coff').val(personData.coff);
		$('.attendance-form-bg-input-condolences').val(personData.condolences);
		$('.attendance-form-bg-input-married').val(personData.married);
		$('.attendance-form-input-bg-maternity').val(personData.maternity);
		$('.attendance-form-input-bg-onsite').val(personData.onSite);
		$('.attendance-form-bg-input-paternity').val(personData.paternity);
		$('.attendance-form-bg-input-sick').val(personData.sick);		
		$('.attendance-form-background-input-fullname').val(personData.name);	
		$('.attendance-form-bg-input-email-facebook').val(personData.facebookId);
		$('.attendance-form-bg-input-email').val(personData.emailAddress);
		$('.attendance-form-background-input-username').val(personData.username);
		$('.attendance-form-submitted-approval-dropdown').text(personData.authority);
		$('.attendance-form-bg-input-start-working').val(personData.startWorking);
		$('.form-signature-input').val(personData.signature);
		$('.attendance-form-gender-dropdown').text(personData.gender);
	},

	activeInputForm : function(){
		var self = this;
		var statusEnabled = this.CookieAPI.getIsEnableButtonSave();
		if (statusEnabled=="true"){
			this.enabledInputForm();
			this.clearInputText();
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
			$('.attendance-form-background-input-username').removeClass('attendance-form-background-input-fullname-red');
			$('.attendance-form-signature').removeClass('attendance-form-background-input-fullname-red');
			$('.attendance-form-gender-dropdown').removeClass('attendance-form-background-input-fullname-red');
		}
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
		'.form-arrow-box-gender, .attendance-form-gender-dropdown, .facebook-id-search').addClass("attendance-form-visible");
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
		'.attendance-form-background-input-username, .form-signature-input, .form-arrow-box-gender, .attendance-form-gender-dropdown, .facebook-id-search').removeClass("attendance-form-visible");
		$('.attendance-form-calendar-inactive').removeClass("attendance-form-hidden");
	},
});
