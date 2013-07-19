Clazz.createPackage("com.attendance.widget.attendanceForm");

Clazz.com.attendance.widget.attendanceForm.AttendanceForm = Clazz.extend(Clazz.WidgetWithTemplate, {
	CreateAndEditPanel:null,
	InputForm:null,
	Footer:null,	
	CookieAPI : null,

	// template URL, used to indicate where to get the template
	templateUrl: "../template/attendanceForm/attendanceForm.tmp",
	name : "attendanceForm",
	mask : null,
	IdleTimer: null,

	/**
	 * @author dhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		this.CreateAndEditPanel = new Clazz.com.attendance.widget.attendanceForm.CreateAndEditPanel();
		this.InputForm = new Clazz.com.attendance.widget.attendanceForm.InputForm();
		this.Footer = new Clazz.com.attendance.widget.common.Footer();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.CookieAPI.clearIsEnableButtonSave();
		this.IdleTimer = new Clazz.com.attendance.widget.listener.IdleTimer();
		this.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
	},

	/**
	 * @author dhika_p
	 * render widget on profile template
	 */
	postRender : function(element) {		
		this.CreateAndEditPanel.render();
		this.InputForm.render();		
		this.Footer.render();
		this.mask.showMask();	
	},
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
