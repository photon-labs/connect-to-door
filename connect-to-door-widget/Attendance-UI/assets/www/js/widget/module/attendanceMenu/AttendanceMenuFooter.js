Clazz.createPackage("com.attendance.widget.module.attendanceMenu");
Clazz.com.attendance.widget.module.attendanceMenu.MenuFooter = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceMenu/attendanceMenuFooter.tmp",
	menuListener : null,
	defaultContainer : 'attendance\\:menu-footer',

	initialize : function(config){
		this.menuListener = new Clazz.com.attendance.widget.listener.SignOutAndBackListener();
	},
	
	bindUI : function(){
		var self = this;
		$('.attendance-footer-right').click(function(){
			self.menuListener.buttonSignOutClick();
		});
	},
	
});