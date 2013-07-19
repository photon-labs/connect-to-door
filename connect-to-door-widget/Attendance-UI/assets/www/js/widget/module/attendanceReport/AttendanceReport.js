Clazz.createPackage("com.attendance.widget.attendanceReport");

Clazz.com.attendance.widget.attendanceReport.AttendanceReport = Clazz.extend(Clazz.WidgetWithTemplate, {
	// template URL, used to indicate where to get the template
	templateUrl: "../template/attendanceReport/attendanceReport.tmp",
	name : "attendancereport",
	
	ListDetailReport:null,
	Footer:null,
	//for block UI when change 
	mask : null,
	IdleTimer: null,

	/**
	 * @author dhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		this.ListDetailReport = new Clazz.com.attendance.widget.modules.attendane_report.ListDetailReport();
		this.Footer = new Clazz.com.attendance.widget.common.Footer();
		this.IdleTimer = new Clazz.com.attendance.widget.listener.IdleTimer();
		this.mask = new Clazz.com.attendance.widget.common.AttendanceMask();

	},

	/**
	 * @author dhika_p
	 * render widget on profile template
	 */
	postRender : function(element) {		
		this.ListDetailReport.render();		
		this.Footer.render();
		this.mask.showMask();	
	},

	/***
	 * Bind the action listeners. The bindUI() is called automatically after the render is complete 
	 */
	bindUI : function(){
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
