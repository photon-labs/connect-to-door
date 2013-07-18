Clazz.createPackage("com.attendance.widget.module.request");
Clazz.com.attendance.widget.module.request.AttendanceRequest = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceRequest/attendanceRequest.tmp",
	name : "attendanceRequest",

	//object for select UI
	voucherStatus : null,

	mask : null,
	IdleTimer: null,

	//local storage
	CookieAPI : null,

	//widget
	attendanceRequestDate: null,
	attendanceRequestBy : null,
	attendanceRequestItemInput : null,
	attendanceRequestListDetail : null,
	attendanceRequestSubmittedSignature : null,
	attendanceRequestApprovalNameAndSignature : null,
	attendanceRequestApproveDeclinePrintButton : null,

	/**
	 * @author andhika_p
	 * initialize construct object and fill data
	 */
	initialize : function(config){
		var self = this;
		this.attendanceRequestDate = new Clazz.com.attendance.widget.module.request.RequestDate();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();


		//get voucher status
		var idRequest = this.CookieAPI.getRequest();
		if (idRequest !== "" && idRequest !== null && idRequest !== undefined){
			self.data = config.data;
			self.voucherStatus = self.data.employee_details.status_request;
			self.attendanceRequestBy = new Clazz.com.attendance.widget.module.request.RequestBy({
				employeeId : self.data.employee_details.employee_id,
				employeeName : self.data.employee_details.employee_name
			});
			this.attendanceRequestListDetail = new Clazz.com.attendance.widget.module.request.RequestListDetail({data : self.data.request_details});
			this.attendanceRequestSubmittedSignature = new Clazz.com.attendance.widget.module.request.SubmittedBySignature({
				voucherStatus : self.voucherStatus, 
				employeeSignature :  self.data.employee_details.signature,
			});
			this.attendanceRequestApprovalNameAndSignature = new Clazz.com.attendance.widget.module.request.ApprovalNameAndSignature({
				voucherStatus : self.voucherStatus,
				employeeId : self.data.employee_details.approve_by,
			});
		}else{
			self.voucherStatus = "build";
			self.attendanceRequestBy = new Clazz.com.attendance.widget.module.request.RequestBy();
			this.attendanceRequestListDetail = new Clazz.com.attendance.widget.module.request.RequestListDetail();
			this.attendanceRequestSubmittedSignature = new Clazz.com.attendance.widget.module.request.SubmittedBySignature({voucherStatus : self.voucherStatus});
			this.attendanceRequestApprovalNameAndSignature = new Clazz.com.attendance.widget.module.request.ApprovalNameAndSignature({voucherStatus : self.voucherStatus});
		}



		if(self.voucherStatus == "build"){
			this.attendanceRequestItemInput = new Clazz.com.attendance.widget.module.request.RequestItemInput();
			this.resetListWhenBuildStatus();
		}


		this.attendanceRequestApproveDeclinePrintButton = new Clazz.com.attendance.widget.module.request.ApproveDeclinePrintButton({voucherStatus : self.voucherStatus});

		this.IdleTimer = new Clazz.com.attendance.widget.listener.IdleTimer();
		var self = this;
		require(["widget/common/AttendanceMask"],function(){
			self.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
		})	
	},

	/**
	 * @author andhika_p
	 * render widget on profile template
	 */
	postRender : function(){
		var self = this;
		this.attendanceRequestDate.render();
		this.attendanceRequestBy.render();
		if(self.voucherStatus == "build"){
			self.attendanceRequestItemInput.render();
		}
		this.attendanceRequestListDetail.render();
		this.attendanceRequestSubmittedSignature.render();
		this.attendanceRequestApprovalNameAndSignature.render();
		this.attendanceRequestApproveDeclinePrintButton.render();

		this.mask.showMask();
	},

	bindUI: function(){
		this.setMainContentHeight();

		var self = this;
		setTimeout(function(){
			self.mask.removeMask();
		},1000);
		this.IdleTimer.getIdleTimer();
	},

	//
	onPause : function(){

	},

	onResume : function (){
		this.IdleTimer.getIdleTimer();
		this.mask.removeMask();
	},


	/**
	 * @author andhika_p
	 * set height of main content when voucher status is build, approve or finish
	 * 
	 */
	setMainContentHeight : function(){
		if(this.voucherStatus == "build"){
			$('.attendance-request-content-middle').css("height","1039px");
		}
		else if (this.voucherStatus == "approve"){
			$('.attendance-request-content-middle').css("height","840px");
		}
		else{
			$('.attendance-request-content-middle').css("height","795px");
		}

	},

	resetListWhenBuildStatus : function(){
		this.CookieAPI.saveVoucherStatus("build");
		this.CookieAPI.saveGMVoucherSignature("false");
		this.CookieAPI.saveAdminVoucherSignature("false");
		this.CookieAPI.clearListDataRequest();
	},
});