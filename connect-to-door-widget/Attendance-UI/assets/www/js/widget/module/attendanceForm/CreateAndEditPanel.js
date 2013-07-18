Clazz.createPackage("com.attendance.widget.attendanceForm");

Clazz.com.attendance.widget.attendanceForm.CreateAndEditPanel = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl: "../template/attendanceForm/attendanceFormLeftContent.tmp",
	CreateAndEditListener : null,
	InputAndSaveListener : null,
	submenu_active : null,
	CookieAPI:null,
	dropDownControllerListener : null,
	defaultContainer : "attendance\\:form-left-content",

	/**
	 * @author dhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		this.CreateAndEditListener = new Clazz.com.attendance.widget.listener.CreateAndEditListener();
		this.InputAndSaveListener = new Clazz.com.attendance.widget.listener.InputAndSaveListener();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.CookieAPI.clearButtonClickedAttendanceForm();
		this.dropDownControllerListener = new Clazz.com.attendance.widget.listener.DropDownControllerListener(); 
	},

	bindUI : function(){
		this.setActionButton();
		this.setActionDropDown();
		$('.attendance-form-background-input-name').attr("readonly",true);		
	},
	/**
	 * @author dhika_p
	 * function to set action button in the template
	 */
	setActionButton : function(){
		var self = this;	

		$('.attendance-form-button-create-account').click(function(e){
			$('.attendance-form-background-input-username').attr("readonly",false);
			$('.attendance-form-background-input-employeeid').attr("readonly",false);
			self.CookieAPI.saveButtonClickedAttendanceForm("create");
			self.InputAndSaveListener.onEnabledButtonSave("create");
			self.CreateAndEditListener.clearTextDeleteSearch();
		});

		$('.attendance-form-button-edit-account').click(function(e){
			self.CookieAPI.saveButtonClickedAttendanceForm("edit");
			self.CreateAndEditListener.onButtonEditAccClick();
			self.InputAndSaveListener.onDeactiveInputForm();
			self.CreateAndEditListener.clearTextDeleteSearch();
		});

		$('.attendance-form-button-delete-account').click(function(e){
			self.CookieAPI.saveButtonClickedAttendanceForm("delete");
			self.CreateAndEditListener.onButtonDeleteAccClick();
			self.InputAndSaveListener.onDeactiveInputForm();
			self.CreateAndEditListener.clearTextDeleteSearch();
		});

		$('.attendance-form-button-search').click(function(e){
			self.CreateAndEditListener.onButtonSearchClick();
		});

		$('.attendance-form-button-delete').click(function(e){
			self.CreateAndEditListener.ocButtonDeleteClick();
		});			
	},

	/**
	 * @author dhika_p
	 * function to set action dropdown in the template
	 */
	setActionDropDown:function(){
		var self = this;

		var dropDownValueButton = $('.attendance-form-image-arrow , .attendance-form-drop-name');
		var dropDownValue = $('.attendance-form-drop-name');
		var dropDownContent = $('.attendance-form-content-drop-master');
		var dropDownContentItem = $('.attendance-form-content-drop-text');
		dropDownContent.hide();
		dropDownValueButton.click(function(event){
			$(".form-status-message").text("");
			self.dropDownControllerListener.dropDownController(dropDownContent, event);
		});

		dropDownContentItem.click(function(){
			self.dropDownControllerListener.dropDownSelectController(dropDownContent);
			var value = $(this).text();
			dropDownValue.text(value);
			$('.attendance-form-background-input-name').val('');
			$('.attendance-form-background-input-name').attr("readonly",false);	
			$(".attendance-form-background-input-name, .attendance-form-drop-name").removeClass("attendance-form-add-text-alert");
			$(".attendance-form-body-left").removeClass('form-detail-button-text-delete');
			self.validateInputSearch();
		});

	},	

	validateInputSearch : function(){
		var inputText = $(".attendance-form-background-input-name");           
		inputText.keypress(function(event){
			var dropDownSelected = $('.attendance-form-drop-name').text();
			var self = this;
			var backspace = 8;
			var deleteButton = 46;
			var leftArrow = 37;
			var tab = 9;
			var zero = 48;
			var nine = 57;
			var i = 105;
			var I = 73;
			var charcode = event ? event.which : event.keyCode;
			if(dropDownSelected == "Employee ID"){
				$(".attendance-form-background-input-name").attr("maxlength","5");
				if(charcode == backspace || charcode == deleteButton || charcode == leftArrow || charcode == tab || charcode == i || charcode == I){
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
			}
			else if(dropDownSelected == "Username"){
				$(".attendance-form-background-input-name").attr("maxlength","10");
				if(charcode > 64 && charcode < 91 ){
					$(".form-status-message").text("");
					return true;
				}
				else if(charcode > 96 && charcode < 123) {
					$(".form-status-message").text("");
					return true;
				}
				else if(charcode == 95 || charcode == backspace) {
					$(".form-status-message").text("");
					return true;
				}
				else{
					return false;
				}
			}
			else{

			}
		});
	},		
});
