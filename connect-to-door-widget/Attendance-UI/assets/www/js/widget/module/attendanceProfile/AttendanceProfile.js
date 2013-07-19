Clazz.createPackage("com.attendance.widget.module.profile");
Clazz.com.attendance.widget.module.profile.AttendanceProfile = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceProfile/attendanceProfile.tmp",
	name : "profile",

	//widget
	profileFooter : null,
	personInformation : null,
	attendanceAndVoucherButton : null,

	mask : null,
	IdleTimer: null,

	/**
	 * @author andhika_p
	 * initialize construct object
	 */
	initialize : function(){
		this.profileFooter = new Clazz.com.attendance.widget.module.attendanceMenu.MenuFooter();
		this.personInformation = new Clazz.com.attendance.widget.module.profile.PersonInformation();
		this.attendanceAndVoucherButton = new Clazz.com.attendance.widget.module.profile.AttendanceAndVoucherButton();
		this.IdleTimer = new Clazz.com.attendance.widget.listener.IdleTimer();
		this.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
	},

	/**
	 * @author andhika_p
	 * render widget on profile template
	 */
	postRender : function(element) {
		this.profileFooter.render();
		this.personInformation.render();
		this.attendanceAndVoucherButton.render();
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