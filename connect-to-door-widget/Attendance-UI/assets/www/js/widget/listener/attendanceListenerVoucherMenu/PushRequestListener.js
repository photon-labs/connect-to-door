Clazz.createPackage("com.attendance.widget.listener");
/**
 * @author dede_pu
 * Create class PushRequestListener
 */
Clazz.com.attendance.widget.listener.PushRequestListener = Clazz.extend(Clazz.Widget, {

	/**
	 * @author dede_pu
	 * function to push Request page
	 */
	pushRequest : function(data) {	
		var CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		var authority = CookieAPI.getAuthority();
		if (authority == "General Manager"
				|| authority == "Finance"
					|| authority == "Super Admin") {
			require(["widget/module/attendanceRequest/AttendanceRequest",
			         "widget/module/attendanceRequest/RequestDate",
			         "widget/module/attendanceRequest/RequestBy",
			         "widget/module/attendanceRequest/RequestItemInput",
			         "widget/module/attendanceRequest/RequestListDetail",
			         "widget/module/attendanceRequest/SubmittedBySignature",
			         "widget/module/attendanceRequest/ApprovalNameAndSignature",
			         "widget/module/attendanceRequest/ApproveDeclinePrintButton",
			         "widget/listener/attendanceListenerRequest/ReadInpuListener",
			         "widget/listener/attendanceListenerRequest/SelectedListListener",
			         "widget/listener/attendanceListenerRequest/DeclineApproveAndPrintListener",
			         "widget/listener/attendanceListenerCommon/DropDownControllerListener",
			         "widget/listener/attendanceListenerProfile/PersonInformationListener",
			         "api/CookieAPI","widget/common/ErrorAlert"],function(){
				var attendanceRequest = new Clazz.com.attendance.widget.module.request.AttendanceRequest({data : data});
				Clazz.navigationController.push(attendanceRequest);
			});
		}
		else{
			require(["widget/common/ErrorAlert"],function(){
				var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText:"You are not authorized"});
				errorAlert.showAlert("nonIdle");	
			});

		}				
	},

});
