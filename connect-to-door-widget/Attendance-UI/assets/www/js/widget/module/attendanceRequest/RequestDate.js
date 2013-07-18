Clazz.createPackage("com.attendance.widget.module.request");
Clazz.com.attendance.widget.module.request.RequestDate = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceRequest/attendanceRequestDate.tmp",
	name : "attendanceRequestDate",
	defaultContainer : "request\\:date",

	/**
	 * @author andhika_p
	 * initialize construct object and fill data
	 */
	initialize : function(config){

	},

	postRender : function(){

	},

	bindUI: function(){
		this.getCurrentTime();
	},

	/**
	 * @author andhika_p
	 * this method used for get current time and convert that to "dd/mm/yyyy"
	 */
	getCurrentTime : function(){
		var m_names = new Array("January", "February", "March", 
				"April", "May", "June", "July", "August", "September", 
				"October", "November", "December");

				var date = new Date();
				var curr_date = date.getDate();

				var curr_month = date.getMonth();
				var curr_year = date.getFullYear();

				$(".request-date-month").text(m_names[curr_month]);
				$(".request-date-number").text(curr_date);
				$(".request-date-year").text(curr_year);
	},
});