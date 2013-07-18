package com.maretska.attendance.service;

import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;

public class AttendanceWebServiceApplication extends Application{
	public AttendanceWebServiceApplication(){
	}

	public final Restlet createRoot(){
		Router router = new Router(getContext());
		router.attach("/login", LoginService.class);
		router.attach("/profile", ProfileEmployeeService.class);
		router.attach("/check-in-out", CheckInOutService.class);
		router.attach("/create-edit-account", CreateAndEditAccountService.class);
		router.attach("/update-check-in-out", UpdateCheckInOutService.class);
		router.attach("/daily-attendance", DailyAttendanceService.class);
		router.attach("/attendance-list", AttendanceListService.class);
		router.attach("/attendance-detail", AttendanceDetailService.class);
		router.attach("/attendance-detail-update", AttendanceDetailUpdateService.class);
		router.attach("/attendance-request", AttendanceRequestService.class);
		router.attach("/attendance-request-details", AttendanceRequestDetailsService.class);
		router.attach("/update-status-request", UpdateStatusRequestService.class);
		router.attach("/report", AttandanceReportService.class);
		router.attach("/reimburse", ReimburseService.class);
		router.attach("/list-recipients", ListRecipientService.class);
		router.attach("/signature", SignatureService.class);

		return router;
	}
}
