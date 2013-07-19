Clazz.createPackage("com.attendance.widget.list");
Clazz.com.attendance.widget.list.AttendanceList = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceList/attendanceList.tmp",
	name : "list",

	//widget
	Footer : null,
	listDetail : null,
	ListFilterPanel : null,

	mask : null,
	IdleTimer: null,

	/**
	 * @author andhika_p
	 * initialize construct object and fill data
	 */
	initialize : function(config){
		this.IdleTimer = new Clazz.com.attendance.widget.listener.IdleTimer();
		this.listDetail = new Clazz.com.attendance.widget.list.ListDetail();
		this.ListFilterPanel = new Clazz.com.attendance.widget.list.ListFilterPanel();
		this.Footer = new Clazz.com.attendance.widget.common.Footer();
		this.mask = new Clazz.com.attendance.widget.common.AttendanceMask();

	},

	/**
	 * @author andhika_p
	 * render widget on profile template
	 */
	postRender : function(){
		this.mask.showMask();	
		this.listDetail.render();
		this.ListFilterPanel.render();
		this.Footer.render();
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
