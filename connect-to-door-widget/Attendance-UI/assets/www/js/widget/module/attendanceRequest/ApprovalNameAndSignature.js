Clazz.createPackage("com.attendance.widget.module.request");
Clazz.com.attendance.widget.module.request.ApprovalNameAndSignature = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceRequest/attendanceRequestSubmittedApproval.tmp",
	name : "attendanceRequestSubmittedApproval",
	defaultContainer : "request\\:submitted-approval",

	CookieAPI : null,
	dropDownControllerListener : null,

	//voucher status from API
	voucherStatus : null,
	readInputListener : null,
	submittedApproveByEmpID : null,

	/**
	 * @author andhika_p
	 * initialize construct object and fill data
	 */
	initialize : function(config){
		var self= this;
		this.voucherStatus = config.voucherStatus;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		var idRequest = this.CookieAPI.getRequest();
		if (idRequest !== "" && idRequest !== null && idRequest !== undefined){
			self.submittedApproveByEmpID = config.employeeId;
		}

		this.dropDownControllerListener = new Clazz.com.attendance.widget.listener.DropDownControllerListener();
		this.readInputListener = new Clazz.com.attendance.widget.listener.ReadInputListener();

		this.selectUIByvoucherStatus();
	},

	bindUI: function(){
		var self = this;
		$('.request-approval-dropdown-content').hide();
		this.pushSignatureImage();
		var authority = this.CookieAPI.getAuthority();
		if(authority == "General Manager"
			|| authority == "Super Admin"){
			$('.attendance-request-submitted-approval-dropdown').text('Mohammad Daud');
			$('.request-approval-dropdown-content').css('visibility','hidden');
			$('.attendance-request-submitted-approval-dropdown').css('cursor','default');
			$('.request-arrow-box').css('cursor','default');
			$('.request-arrow-box').css('visibility','hidden');
		}

		if(this.voucherStatus == "finish"){
			self.readInputListener.getGMSignatureFromAPI(self.voucherStatus, self.submittedApproveByEmpID);
		}else{
			self.readInputListener.getListFromAPI("gm");
		}

	},

	/**
	 * @author andhika_p
	 * controller dropdown in template
	 */
	dropdownController : function(){
		var self = this;
		var dropDownContentItem = $(".request-approval-dropdown-item");
		var dropDownValue = $('.attendance-request-submitted-approval-dropdown');
		var dropDownValueButton = $('.attendance-request-submitted-approval-dropdown, .request-arrow-box')
		var dropDownContent = $('.request-approval-dropdown-content');
		dropDownContent.hide();

		dropDownContentItem.click(function(){
			self.dropDownControllerListener.dropDownSelectControllerLargeScreen(dropDownContent);
			self.CookieAPI.saveAssignTo($(this).data("employeeId"));
			var value = $(this).text();
			dropDownValue.text(value);
		});

		dropDownValueButton.click(function(event){
			$('.request-list-detail-content-no,.request-list-detail-content-request,.request-list-detail-content-description,.request-list-detail-content-quantity,.request-list-detail-content-cost').removeClass('request-list-highlight');
			$('.attendance-request-dd-item-input').slideUp();
			$('.request-approval-dropdown-currency').slideUp();
			self.dropDownControllerListener.dropDownControllerLargeScreen(dropDownContent, event);
		});
	},

	/**
	 * @author andhika_p
	 * this method used for select ui with handlebars, when voucher status is "build" or etc
	 */
	selectUIByvoucherStatus : function(){
		var self = this;
		require(["lib/handlebars-1.0.0.beta.6"],function(){
			Handlebars.registerHelper("build",function(opt){
				if(self.voucherStatus == "build"){
					return opt.fn(this);
				}
				else{}
			});

			Handlebars.registerHelper("approve",function(opt){
				if(self.voucherStatus == "approve"){
					return opt.fn(this);
				}
				else{}
			});

			Handlebars.registerHelper("finish",function(opt){
				if(self.voucherStatus == "finish"){
					return opt.fn(this);
				}
			});
		});
	},

	/**
	 * @author andhika_p
	 * this method used for control image when voucher status changed
	 */
	imageController : function(){
		var self = this;
		if (this.voucherStatus == "finish" && this.submittedApproveByEmpID !== null){
			self.readInputListener.getGMSignatureFromAPI();
		}
	},

	/**
	 * @author andhika_p
	 * this method used for push image to the template and save status GM signature 
	 * to local storage with "true" status
	 */
	pushSignatureImage : function(){
		var self = this;
		$('.attendance-request-submittend-approval-insert-button-approve').click(function(){
				self.readInputListener.getGMSignatureFromAPI(self.voucherStatus, self.submittedApproveByEmpID);
		});
	},

	setImageSignatureGM : function(link){
		if(this.voucherStatus == "approve"){
			$('.attendance-request-submittend-approval-insert-button-approve').remove();
			$('.attendance-request-approve-by-alert').remove();
			$('.attendance-request-submitted-approval-signature-approve').css("background-image","url('"+ link +"')");
			$('.attendance-request-submitted-approval-signature-approve').css("background-size", "contain");
		}else{
			$('.attendance-request-submittend-approval-insert-button-approve').remove();
			$('.attendance-request-approve-by-alert').remove();
			$('.attendance-request-submitted-approval-signature-finish').css("background-image","url('"+ link +"')");
			$('.attendance-request-submitted-approval-signature-finish').css("background-size", "contain");
		}

	},


	setDropdownItem : function(data){
		var self = this;
		dataLength = data.length;
		var voucherStatus = this.CookieAPI.getReimbursementStatus();;
		for(var index in data){
			var itemDropdown = $('<div class=request-approval-dropdown-item >'+ data[index].employee_name +'</div>').data("employeeId",data[index].employee_id );
			$('.request-approval-dropdown-content').append(itemDropdown);
		}
		var selector = $('.request-approval-dropdown-content');
		self.setDropdownHeight(dataLength, selector);
	},

	setDropdownHeight : function(dataLength, selector){
		height = dataLength * 27;
		selector.css("height",height);
		this.dropdownController();
	},

});