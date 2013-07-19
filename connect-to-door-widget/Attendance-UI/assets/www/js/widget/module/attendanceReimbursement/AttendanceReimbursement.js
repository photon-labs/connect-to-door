Clazz.createPackage("com.attendance.widget.module.attendanceReimbursement");

Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursement = Clazz.extend(Clazz.WidgetWithTemplate, {
	// template URL, used to indicate where to get the template
	templateUrl: "../template/attendanceReimbursement/attendanceReimbursement.tmp",
	name : "attendanceReimbursement",
	attendanceReimbursementTopDate:null,
	attendanceReimbursementTopContent:null,
	attendanceReimbursementDetailTable:null,
	attendanceReimbursementFooter:null,
	attendanceReimbursementSignature:null,
	attendanceButtonTable:null,
	CookieAPI:null,
	reimbursementStatus:null,
	mask : null,
	IdleTimer: null,
	data : null,
	
	/**
	 * @author dhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		var requestID = this.CookieAPI.getRequest();
		if(requestID !== null ){
			self.data = config.data;
			var headerItem ={name : self.data.employee_name,
			                employeeID: self.data.employee_id,
			                projectID : self.data.project_id,
			                reimbursementType : self.data.reimbursement_type};
			self.CookieAPI.saveReimbursementStatus(self.data.reimbursement_status);
			self.attendanceReimbursementTopDate = new Clazz.com.attendance.widget.module.request.RequestDate();
			self.attendanceReimbursementTopContent = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementTopContent({
				headerItem :headerItem
			});
			self.attendanceReimbursementDetailTable = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementDetailTable({
				data : self.data.data
			});
			self.attendanceReimbursementSignature = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementSignature({
				history : config.data.history
			});
		}else{
			var authority = this.CookieAPI.getAuthority();
			if(authority == "General Manager"
				|| authority == "Admin"
					|| authority == "Finance"
						|| authority == "Super Admin"
							|| authority == "Project Manager"){
				self.CookieAPI.saveReimbursementStatus("build-apm");
			}else{
				self.CookieAPI.saveReimbursementStatus("build");
			}
			
			self.attendanceReimbursementTopDate = new Clazz.com.attendance.widget.module.request.RequestDate();
			self.attendanceReimbursementTopContent = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementTopContent();
			self.attendanceReimbursementDetailTable = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementDetailTable();
			self.attendanceReimbursementSignature = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementSignature();
		}
		
		this.attendanceButtonTable = new Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementButtonTable();
		this.attendanceReimbursementFooter = new Clazz.com.attendance.widget.module.reimbursement.AttendanceReimbursementFooter();
		this.reimbursementStatus = this.CookieAPI.getReimbursementStatus();
		this.IdleTimer = new Clazz.com.attendance.widget.listener.IdleTimer();
		
		require(["widget/common/AttendanceMask"],function(){
			self.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
		});
		
	},

	/**
	 * @author dhika_p
	 * render widget on profile template
	 */
	postRender : function(element) {		
		this.attendanceReimbursementTopDate.render();
		this.attendanceReimbursementTopContent.render();
		this.attendanceReimbursementDetailTable.render();
		this.attendanceReimbursementSignature.render();
		this.attendanceReimbursementFooter.render();
		
		var reimbursementStatus = this.CookieAPI.getReimbursementStatus();
		if (reimbursementStatus == "build" || reimbursementStatus == "build-apm"){
			this.attendanceButtonTable.render();			
		}

		this.mask.showMask();

	},

	bindUI: function(){

		if(this.CookieAPI.getReimbursementStatus() == "build-apm"){
			this.CookieAPI.clearDropDownValueReimbursement();
			$('.attendance-reimbursement-box-midle').css("height","1139px");
		}
		if(this.CookieAPI.getReimbursementStatus() == "gm-apm"){
			$('.attendance-reimbursement-box-midle').css("height","937px");
		}
		if(this.CookieAPI.getReimbursementStatus() == "complete-apm"){
			$('.attendance-reimbursement-box-midle').css("height","845px");
		}
		if(this.CookieAPI.getReimbursementStatus() == "build"){
			this.CookieAPI.clearDropDownValueReimbursement();
			$('.attendance-reimbursement-box-midle').css("height","1136px");
		}
		if(this.CookieAPI.getReimbursementStatus() == "apm"){
			$('.attendance-reimbursement-box-midle').css("height","1000px");
		}
		if(this.CookieAPI.getReimbursementStatus() == "gm"){
			$('.attendance-reimbursement-box-midle').css("height","1069px");
		}
		if(this.CookieAPI.getReimbursementStatus() == "complete"){
			$('.attendance-reimbursement-box-midle').css("height","980px");
		}


		var self = this;
		setTimeout(function(){
			self.mask.removeMask();
		},1000);
		this.IdleTimer.getIdleTimer();
	},

	onPause : function(){

	},

	onResume : function (){
		this.IdleTimer.getIdleTimer();
		this.mask.removeMask();
	},
});