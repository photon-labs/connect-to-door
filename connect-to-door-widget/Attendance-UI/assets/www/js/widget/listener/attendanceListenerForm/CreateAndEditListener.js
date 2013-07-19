Clazz.createPackage("com.attendance.widget.listener");

Clazz.com.attendance.widget.listener.CreateAndEditListener = Clazz.extend(Clazz.Widget, {
	statusEdit : true,
	statusCreate : true,
	mainContent: null,
	InputAndSaveListener:null,
	CookieAPI : null,
	profileAPI : null,
	loadingMask : null,
	personData : {
		name :"-",
		employeeID : "-",
		projectID : "-",
		emailAddress : "-",
		startWorking : "-",
		position : "-",
		annual : "-",
		coff : "-",
		condolences : "-",
		married : "-",
		maternity : "-",
		paternity : "-",
		onSite : "-",
		sick : "-",
		authority : "-",
		username : "-",
		facebookId : "-",
		signature : "-",
		gender : "-",
	},

	initialize : function(){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.InputAndSaveListener = new Clazz.com.attendance.widget.listener.InputAndSaveListener();
		this.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
		require(["api/ProfileAPI"],function(){
			self.profileAPI = new Clazz.com.attendance.api.ProfileAPI();
		});
	},

	onButtonEditAccClick:function(){
		$('.attendance-form-background-input-name').attr("readonly",true);
		$('.attendance-form-drop-name').text("");
		$('.attendance-form-background-input-name').val("");
		$('.attendance-form-input-name').val("");
		$('.attendance-form-button-delete').addClass("attendance-form-hidden");
		$('.attendance-form-body-left-bottom , .attendance-form-input-name , .attendance-form-button-search').addClass("attendance-form-visible");
		$(".attendance-form-background-input-name, .attendance-form-drop-name").removeClass("attendance-form-add-text-alert");
		$(".form-status-message").text("");
	},

	onButtonDeleteAccClick:function(){
		$('.attendance-form-background-input-name').attr("readonly",true);
		$('.attendance-form-drop-name').text("");
		$('.attendance-form-background-input-name').val("");
		$('.attendance-form-input-name').val("");
		$('.attendance-form-body-left-bottom , .attendance-form-input-name , .attendance-form-button-search').addClass('attendance-form-visible');
		$('.attendance-form-button-delete').removeClass("attendance-form-hidden");
		$(".attendance-form-background-input-name, .attendance-form-drop-name").removeClass("attendance-form-add-text-alert");
		$(".form-status-message").text("");
	},

	onButtonSearchClick:function(){
		var self = this;
		var modeSearch = $('.attendance-form-drop-name').text();
		if (modeSearch == "Employee ID" || modeSearch == "Username"){
			$(".attendance-form-background-input-name, .attendance-form-drop-name").removeClass("attendance-form-add-text-alert");
			self.checkSearchInputText(modeSearch);
		}else if (modeSearch == ""){
			$(".attendance-form-background-input-name, .attendance-form-drop-name").addClass("attendance-form-add-text-alert");
		}
	},

	ocButtonDeleteClick:function(){
		var self = this;
		var modeSearch = $('.attendance-form-drop-name').text();
		if (modeSearch == "Employee ID" || modeSearch == "Username"){
			self.deleteAccount(modeSearch);
		}else if (modeSearch == ""){
			$(".attendance-form-background-input-name, .attendance-form-drop-name").addClass("attendance-form-add-text-alert");
		}
	},	
	
	clearTextDeleteSearch : function(){
		$('.form-text-only-fullname').text('');
		$('.form-text-only-employee-id').text('');
		$('.form-text-only-project-id').text('');
		$('.form-text-only-photon').text('');
		$('.form-text-only-start-working').text('');
		$('.form-text-only-role').text('');
		$('.form-text-only-annual').text('');
		$('.form-text-only-c-off').text('');
		$('.form-text-only-condolences').text('');
		$('.form-text-only-married').text('');
		$('.form-text-only-maternity').text('');
		$('.form-text-only-paternity').text('');
		$('.form-text-only-onsite').text('');
		$('.form-text-only-sick').text('');
		$('.form-text-only-username').text('');
		$('.form-text-only-facebook').text('');
		$('.form-signature-input').text('');
		$('.form-text-only-gender').text('');
		$('.form-text-only-signature').text('');
	},
	
	//check search input text when empty
	checkSearchInputText : function(modeSearch){
		var self = this;
		var searchText = $('.attendance-form-background-input-name').val();

		if(searchText == ""){
			$(".attendance-form-background-input-name").addClass("attendance-form-add-text-alert");
		}
		else{
			$(".attendance-form-background-input-name").addClass("attendance-form-add-text-box");
			if(modeSearch == "Employee ID"){
				var searchParameter = "employee_id"
			}else{
				var searchParameter = "username"
			}
			this.loadingMask.showLoading();
			self.profileAPI.getPersonInformation(searchParameter, searchText,function(response){
				if(response !== null && response !== undefined && response.status == "success"){
					if(self.CookieAPI.getButtonClickedAttendanceForm() == "delete"){
						$('.form-text-only-fullname').text(response.employee_name);
						$('.form-text-only-employee-id').text(response.employee_id);
						$('.form-text-only-project-id').text(response.project_id);
						$('.form-text-only-photon').text(response.employee_email_photon);
						$('.form-text-only-start-working').text(response.employee_start_work);
						$('.form-text-only-role').text(response.authority);
						$('.form-text-only-annual').text(response.annual);
						$('.form-text-only-c-off').text(response.c_off);
						$('.form-text-only-condolences').text(response.condolences);
						$('.form-text-only-married').text(response.married);
						$('.form-text-only-maternity').text(response.maternity);
						$('.form-text-only-paternity').text(response.paternity);
						$('.form-text-only-onsite').text(response.onsite);
						$('.form-text-only-sick').text(response.sick);
						$('.form-text-only-username').text(response.user_name);
						$('.form-text-only-facebook').text(response.facebook_id);
						$('.form-text-only-signature').text(response.signature.substring(0,21)+"...");
						$('.form-text-only-gender').text(response.gender)
						
						
					}else{
						$('.attendance-form-background-input-username').attr("readonly",true);
						$('.attendance-form-background-input-employeeid').attr("readonly",true);
						self.personData.name =response.employee_name;
						self.personData.employeeID = response.employee_id;
						self.personData.projectID = response.project_id;
						self.personData.emailAddress = response.employee_email_photon;
						self.personData.startWorking = response.employee_start_work;
						self.personData.position = response.authority;
						self.personData.annual = response.annual;
						self.personData.coff = response.c_off;
						self.personData.condolences = response.condolences;
						self.personData.married = response.married;
						self.personData.maternity = response.maternity;
						self.personData.paternity = response.paternity;
						self.personData.onSite = response.onsite;
						self.personData.sick = response.sick;
						self.personData.authority = response.authority;
						self.personData.username = response.user_name;
						self.personData.facebookId = response.facebook_id;
						self.personData.signature = response.signature;
						self.personData.gender = response.gender;

						var personInformation = new Clazz.com.attendance.widget.attendanceForm.InputForm();
						self.CookieAPI.saveIsEnableButtonSave(true);	
						personInformation.setValueFromSearch(self.personData);
					}
					self.loadingMask.removeLoading();
				}
				else{
					self.loadingMask.removeLoading();
					require(["widget/common/ErrorAlert"],function(){
						var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText:"Incorrect "+modeSearch});
						errorAlert.showAlert("nonIdle");        
						self.InputAndSaveListener.onEnabledButtonSave("");
						self.InputAndSaveListener.onDeactiveInputForm();
					});
				}
			});

		}
	},

	deleteAccount : function(modeSearch){
		var self = this;
		var searchText = $('.attendance-form-background-input-name').val();
		if(searchText == ""){
			$(".attendance-form-background-input-name").addClass("attendance-form-add-text-alert");
		}
		else{
			$(".attendance-form-background-input-name").addClass("attendance-form-add-text-box");


			if(modeSearch == "Employee ID"){
				var searchParameter = "employee_id"
			}else{
				var searchParameter = "username"
			}
			this.loadingMask.showLoading();
			self.profileAPI.getPersonInformation(searchParameter, searchText,function(response){
				if(response !== null && response !== undefined && response.status == "success"){
					self.personData.name =response.employee_name;
					self.personData.employeeID = response.employee_id;
					self.personData.projectID = response.project_id;
					self.personData.emailAddress = response.employee_email_photon;
					self.personData.startWorking = response.employee_start_work;
					self.personData.position = response.authority;
					self.personData.annual = response.annual;
					self.personData.coff = response.c_off;
					self.personData.condolences = response.condolences;
					self.personData.married = response.married;
					self.personData.maternity = response.maternity;
					self.personData.paternity = response.paternity;
					self.personData.onSite = response.onsite;
					self.personData.sick = response.sick;
					self.personData.authority = response.authority;
					self.personData.username = response.user_name;
					self.personData.facebookId = response.facebook_id;
					self.personData.signature = response.signature;
					self.personData.gender = response.gender;

					self.CookieAPI.saveIsEnableButtonSave(true);	
					self.loadingMask.removeLoading();
					require(["widget/module/attendanceForm/DeleteAlert"],function(){
						var deleteAlert = new Clazz.com.attendance.widget.attendanceForm.DeleteAlert({deleteText:"Are you sure you want to delete ? "});
						deleteAlert.showAlert(self.personData.employeeID);	
						self.InputAndSaveListener.onEnabledButtonSave("");
						self.InputAndSaveListener.onDeactiveInputForm();
					});
				}
				else{
					self.loadingMask.removeLoading();
					require(["widget/common/ErrorAlert"],function(){
						var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText:"Incorrect "+modeSearch});
						errorAlert.showAlert("nonIdle");        
						self.InputAndSaveListener.onEnabledButtonSave("");
						self.InputAndSaveListener.onDeactiveInputForm();
					});
				}

			});
		}
	},
});
