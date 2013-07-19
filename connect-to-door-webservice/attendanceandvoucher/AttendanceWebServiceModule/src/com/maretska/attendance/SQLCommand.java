package com.maretska.attendance;

import org.json.JSONException;
import org.json.JSONObject;

public class SQLCommand {

	/**
	 * @author suryo_p
	 * query to get data employee's profile from database search by employeeId
	 * @param employeeId
	 * @return syntax SQL in String
	 */
	public String getProfileDataSearchByEmployeeId(String employeeId){
		String profileData = "Call attendance_profile_sp ('"+employeeId+"')";
		return profileData;
	}

	/**
	 * @author suryo_p
	 * query to get data employee's profile from database search by user name
	 * @param username
	 * @return syntax SQL in String
	 */
	public String getProfileDataSearchByUsername(String username){
		String profileData = "Call attendance_profile_search_by_username ('"+username+"')";
		return profileData;
	}

	/**
	 * @author suryo_p
	 * query to insert employee's presenceId, employee's ID and employee's date check in into database
	 * @param employeeId
	 * @param dateCheckIn
	 * @return syntax SQL to save check-in to database
	 */
	public String doCheckIn(String presenceId, String employeeId, String dateCheckIn){
		String checkIn = "Call insert_attendance_report_sp ('"+presenceId+"', '"+employeeId+"', '"+dateCheckIn+"')";
		return checkIn;
	}

	/***
	 * @author suryo_p
	 * query to update employee's check out time in into database
	 * @param employeeId
	 * @param dateCheckOut
	 * @return syntax SQL in String
	 */
	public String doCheckOut(String employeeId, String dateCheckOut){
		String checkOut = "Call update_attendance_report_sp ('"+dateCheckOut+"','"+employeeId+"')";
		return checkOut;
	}

	/***
	 * @author suryo_p
	 * query to update employee's check out time in into database
	 * @param employeeId
	 * @param dateCheckOut
	 * @return syntax SQL in String
	 */
	public String updateCheckOut(String employeeId, String dateCheckOut){
		String checkOut = "Call update_check_out ('"+dateCheckOut+"','"+employeeId+"')";
		return checkOut;
	}

	/***
	 * @author suryo_p
	 * @param employeeData
	 * @return syntax SQL to create new employee's account and employee's holiday into database
	 * @throws JSONException
	 */
	public String createAccount(JSONObject employeeData) throws JSONException{
		String employee_id = employeeData.getString("employee_id");
		String username = employeeData.getString("username");
		String project_id = employeeData.getString("project_id");
		String name = employeeData.getString("name");
		String email_photon = employeeData.getString("email_photon");
		String facebook_id = employeeData.getString("facebook_id");
		String start_work = employeeData.getString("start_work");
		String job_role = employeeData.getString("job_role");
		String annual = employeeData.getString("annual");
		String c_off = employeeData.getString("c_off");
		String condolences = employeeData.getString("condolences");
		String married = employeeData.getString("married");
		String maternity = employeeData.getString("maternity");
		String paternity = employeeData.getString("paternity");
		String onsite = employeeData.getString("onsite");
		String sick = employeeData.getString("sick");
		String signature = employeeData.getString("signature");
		String gender = employeeData.getString("gender");
		String createAccount = "Call insert_form_sp('"+employee_id+"','"+username+"','"+name+"','"+email_photon+"','"+facebook_id+"','"+job_role+"','"+start_work+"','"+project_id+"','"+annual+"','"+c_off+"','"+condolences+"','"+married+"','"+maternity+"','"+paternity+"','"+onsite+"','"+sick+"', '"+signature+"', '"+gender+"')";
		return createAccount;
	}

	/***
	 * @author suryo_p
	 * @param employeeProfile
	 * @return syntax SQL to update employee's account and employee's holiday into database
	 * @throws JSONException 
	 */
	public String updateAccount(JSONObject employeeData) throws JSONException{
		String employee_id = employeeData.getString("employee_id");
		String username = employeeData.getString("username");
		String project_id = employeeData.getString("project_id");
		String name = employeeData.getString("name");
		String email_photon = employeeData.getString("email_photon");
		String facebook_id = employeeData.getString("facebook_id");
		String start_work = employeeData.getString("start_work");
		String job_role = employeeData.getString("job_role");
		String annual = employeeData.getString("annual");
		String c_off = employeeData.getString("c_off");
		String condolences = employeeData.getString("condolences");
		String married = employeeData.getString("married");
		String maternity = employeeData.getString("maternity");
		String paternity = employeeData.getString("paternity");
		String onsite = employeeData.getString("onsite");
		String sick = employeeData.getString("sick");
		String signature = employeeData.getString("signature");
		String gender = employeeData.getString("gender");
		String updateAccount = "Call update_form_sp('"+employee_id+"','"+username+"','"+name+"','"+email_photon+"','"+facebook_id+"','"+job_role+"','"+start_work+"','"+project_id+"','"+annual+"','"+c_off+"','"+condolences+"','"+married+"','"+maternity+"','"+paternity+"','"+onsite+"','"+sick+"', '"+signature+"', '"+gender+"')";
		return updateAccount;
	}

	/***
	 * @author suryo_p
	 * @param employeeProfile
	 * @return syntax SQL to update employee's status into 'deactivate' in database
	 */
	public String deleteAccount(String employeeId){
		String deleteAccount = "Call delete_acc_sp('"+employeeId+"')";
		return deleteAccount;
	}

	/***
	 * @author suryo_p
	 * query to get employee's authority, employee's ID and employee's name from database
	 * @param employeeId
	 * @param facebookId
	 * @return syntax SQL in String
	 */
	public String validateEmployeeAccount(String employeeId, String facebookId){
		String getAuthorityIDAndEmployeeName = "CALL authority_sp('"+employeeId+"', '"+facebookId+"')";
		return getAuthorityIDAndEmployeeName;
	}

	/**
	 * @author suryo_p
	 * query to get daily attendance from database
	 * @param currentTime
	 * @return syntax SQL in String
	 */
	public String showDailyAttendance(String currentTime){
		String getDailyAttendance = "Call select_attendance_report_sp('"+currentTime+"')";
		return getDailyAttendance;
	}

	/**
	 * @author suryo_p
	 * query to update employee's check in-out
	 * @param checkIn, example value: "2012-04-31 11:30"
	 * @param checkOut, example value: "2012-04-31 21:30"
	 * @param adminID
	 * @return syntax SQL in String
	 */
	public String updateDailyAttendance(String checkIn, String checkOut, String adminID, String presenceId, String date){
		String updateDailyAttendance = "Call update_attendance_report_by_admin('"+checkIn+"' , '"+checkOut+"' , '"+adminID+"', '"+presenceId+"', '"+date+"')";
		return updateDailyAttendance;
	}


	/***
	 * @author irawati_a
	 * query to get attendanceList employees
	 * @param dateStart
	 * @param dateEnd
	 * @param searchByUserName
	 * @return syntax SQL in String
	 */
	public String attendanceListByName(String dateStart, String dateEnd, String searchByUserName){
		String getEmployeesBySearch = "Call attendance_list_username_sp('"+dateStart+"', '"+dateEnd+"', '"+searchByUserName+"')";
		return getEmployeesBySearch;
	}

	/***
	 * @author irawati_a
	 * query to get attendanceList employees
	 * @param dateStart
	 * @param dateEnd
	 * @param searchByEmployeeId
	 * @return syntax SQL in String
	 */
	public String attendanceListByEmpid(String dateStart, String dateEnd, String searchByEmployeeId){
		String getEmployeesBySearch = "Call attendance_list_sp_empid('"+dateStart+"', '"+dateEnd+"', '"+searchByEmployeeId+"')";
		return getEmployeesBySearch;
	}

	/***
	 * @author irawati_a
	 * query to get attendanceList employees
	 * @param dateStart
	 * @param dateEnd
	 * @param searchByProjectId
	 * @return syntax SQL in String
	 */
	public String attendanceListByProjectid(String dateStart, String dateEnd, String searchByProjectId){
		String getEmployeesBySearch = "Call attendance_list_projectid_sp('"+dateStart+"', '"+dateEnd+"', '"+searchByProjectId+"')";
		return getEmployeesBySearch;
	}

	/***
	 * @author irawati_a
	 * query to get attendanceList employees
	 * @param dateStart
	 * @param dateEnd
	 * @return syntax SQL in String
	 */
	public String attendanceListByDate(String dateStart, String dateEnd){
		String getEmployeesBySearch = "Call attendance_list_date_sp('"+dateStart+"', '"+dateEnd+"')";
		return getEmployeesBySearch;
	}

	/***
	 * @author irawati_a
	 * query to get attendanceDetails employee
	 * @param dateStart
	 * @param dateEnd
	 * @param employeeId
	 * @return syntax SQL in String
	 */
	public String attendanceDetail(String dateStart, String dateEnd, String employeeId){
		String getEmployeeDetails = "Call attendance_detail_sp('"+dateStart+"', '"+dateEnd+"', '"+employeeId+"')";
		return getEmployeeDetails;
	}

	/***
	 * @author suryo_p
	 * query to request Attendance's Report before adjustment
	 * @param dateStart
	 * @param dateEnd
	 * @return syntax SQL in String
	 */
	public String beforeAdjustment(){
		String beforeAdjustment = "Call report_before_adjusment()";
		return beforeAdjustment;
	}

	/***
	 * @author suryo_p
	 * query to request Attendance's Report after adjustment
	 * @param dateStart
	 * @param dateAfterAdjustmentFromWidget
	 * @return syntax SQL in String
	 */
	public String afterAdjustment(String dateAfterAdjustmentFromWidget){
		String afterAdjustment = "Call report_after_adjusment('"+dateAfterAdjustmentFromWidget+"')";
		return afterAdjustment;
	}

	/***
	 * @author suryo_p
	 * query to request Attendance's Report adjustment
	 * @param dateStart
	 * @param dateAdjustmentFromWidget
	 * @return syntax SQL in String
	 */
	public String adjustment(String dateAdjustmentFromWidget){
		String adjustment = "Call report_adjusment('"+dateAdjustmentFromWidget+"')";
		return adjustment;
	}

	/***
	 * @author suryo_p
	 * query to request Attendance's Report adjustment
	 * @param dateStart
	 * @param dateEnd
	 * @return syntax SQL in String
	 * @throws JSONException 
	 */
	public String saveReimburse(String employeeId, JSONObject contentReimburse) throws JSONException{
		String date = contentReimburse.getString("dateReimburse");
		String description = contentReimburse.getString("description");
		String quantity = contentReimburse.getString("quantity");
		String cost = contentReimburse.getString("cost");
		String saveReimburse = "CALL attendance ('"+employeeId+"', '"+date+"', '"+description+"', '"+quantity+"', '"+cost+"')";
		return saveReimburse;
	}

	/**
	 * @author suryo_p
	 * validate employee's status has checked in or not
	 * @param currentDate format YYYY-MM-DD
	 * @param employeeId
	 * @return syntax SQL in String
	 */
	public String validateCheckInOutStatus(String currentDate, String employeeId){
		String validateCheckInOutStatus = "Call ceck_checkin_sp('"+currentDate+"','"+employeeId+"')";
		return validateCheckInOutStatus;
	}

	/**
	 * @author suryo_p
	 * update/save reimbursement status into database
	 * @param reimburseId
	 * @param employeeId
	 * @param presentDate format YYYY-MM-DD
	 * @param statusReimburse
	 * @return syntax SQL in String
	 */
	public String updateReimbursementStatus(String reimburseId, String employeeId, String presentDate, String statusReimburse, String assignTo){
		String updateReimbursementStatus = "Call update_status_reimbursement('"+reimburseId+"','"+employeeId+"','"+presentDate+"','"+statusReimburse+"', '"+assignTo+"')";
		return updateReimbursementStatus;
	}

	/**
	 * @author suryo_p
	 * @param employeeId
	 * @param reimburseType
	 * @param presentDate format DD-MM-YYYY
	 * @param cashAdvance
	 * @return syntax SQL in String
	 */
	public String insertReimbursementMaster(String employeeId, String reimburseType, String presentDate, String cashAdvance, String statusReimburse, String assignTo){
		String insertReimbursementMaster = "Call insert_master_reimbursement_sp('"+employeeId+"' ,'"+reimburseType+"','"+presentDate+"','"+cashAdvance+"', '"+statusReimburse+"', '"+assignTo+"')";
		return insertReimbursementMaster;
	}

	/**
	 * @author suryo_p
	 * @param reimburseId
	 * @param description
	 * @param cost
	 * @return syntax SQL in String
	 * @throws JSONException 
	 */
	public String insertReimbursementDetail(String reimburseId, JSONObject contentReimburse) throws JSONException{
		String description = contentReimburse.getString("description");
		String quantity = contentReimburse.getString("quantity");
		String cost = contentReimburse.getString("cost");
		String dateReimburse = contentReimburse.getString("date");
		String insertReimbursementDetail = "Call insert_detail_reimbursement_sp('"+reimburseId+"' ,'"+description+"','"+quantity+"','"+cost+"', '"+dateReimburse+"')";
		return insertReimbursementDetail;
	}

	/**
	 * @author suryo_p
	 * get employee data of reimbursement to display in widget
	 * @param reimbursementId
	 * @return syntax SQL in String
	 */
	public String getReimbursementEmployeeData(String reimbursementId){
		String getReimbursementData = "Call select_reimburse_by('"+reimbursementId+"')";
		return getReimbursementData;
	}

	/**
	 * @author suryo_p
	 * get reimbursement content to display in widget
	 * @param reimbursementId
	 * @return syntax SQL in String
	 */
	public String getReimbursementContent(String reimbursementId){
		String getReimbursementContent = "Call select_detail_reimburse('"+reimbursementId+"')";
		return getReimbursementContent;
	}

	/***
	 * @author irawati_a
	 * update request ID employee
	 * @param employeeId
	 * @param date
	 * @return syntax SQL in String
	 */
	public String masterRequest(String employeeId, String date, String assignTo){
		String updateMasterRequest = "Call insert_master_request('"+employeeId+"', '"+date+"', '"+assignTo+"')";
		return updateMasterRequest;
	}

	/***
	 * @author irawati_a
	 * update request details employee
	 * @param employeeId
	 * @param date
	 * @return syntax SQL in String
	 */
	public String detailsRequest(String requestId, String paramRequestType, String paramDesc, String paramQty, String paramCost, String currency){
		String updateDetailsRequest = "Call insert_detail_request_sp('"+requestId+"', '"+paramRequestType+"', '"+paramDesc+"', '"+paramQty+"', '"+paramCost+"', '"+currency+"')";
		return updateDetailsRequest;
	}

	/***
	 * @author irawati_a
	 * update status employee request 
	 * @param requestId
	 * @param employeeId
	 * @param date
	 * @param status
	 * @return syntax SQL in String
	 */
	public String updateStatusRequest(String requestId, String employeeId, String date, String status, String assignTo){
		String updateStatusRequest = "Call update_status_request('"+requestId+"', '"+employeeId+"', '"+date+"', '"+status+"', '"+assignTo+"')";
		return updateStatusRequest;
	}

	/***
	 * @author irawati_a
	 * get request details
	 * @param requestId
	 * @return syntax SQL in String
	 */	
	public String selectDetailRequest(String requestId){
		String selectDetailRequest = "Call select_detail_request('"+requestId+"')";
		return selectDetailRequest;
	}

	/***
	 * @author irawati_a
	 * get employee details request
	 * @param requestId
	 * @return syntax SQL in String
	 */	
	public String employeeDetails(String requestId){
		String employeeDetails = "Call select_request_by('"+requestId+"')";
		return employeeDetails;
	}

	/***
	 * @author irawati_a
	 * update Absence Report
	 * @param empId, date, absence, admin
	 * @return syntax SQL in String
	 */	
	public String updateAbsenceReport(String empId, String date, String absence, String admin){
		String updateAbsenceReport = "Call update_absence_report('"+empId+"', '"+date+"', '"+absence+"', '"+admin+"')";
		return updateAbsenceReport;
	}


	/***
	 * @author suryo_p
	 * check employee id on database has been stored or not
	 * @param employeeId
	 * @return syntax SQL in String
	 */	
	public String checkEmployeeId(String employeeId){
		String checkEmployeeId = "Call check_employee_id ('"+employeeId+"')";
		return checkEmployeeId;
	}

	/**
	 * @author suryo_p
	 * get list of Assistant  Manager
	 * @return syntax SQL in String
	 */
	public String getListOfAPM(){
		String listAPM = "Call get_pm()";
		return listAPM;
	}

	/**
	 * @author suryo_p
	 * get list of General Manager
	 * @return syntax SQL in String
	 */
	public String getListOfGM(){
		String listGM = "Call get_gm()";
		return listGM;
	}

	/**
	 * @author suryo_p
	 * get employee's signature
	 * @return syntax SQL in String
	 */
	public String getSignatureEmployee(String employeeId){
		String signatureEmployee = "Call insert_signature('"+employeeId+"')";
		return signatureEmployee;
	}

	/**
	 * @author suryo_p
	 * get reimbursement history
	 * @return syntax SQL in String
	 */
	public String getReimbursementHistory(String reimbursementId){
		String reimbursementHistory = "Call select_signature_reimbursement('"+reimbursementId+"')";
		return reimbursementHistory;
	}

	/**
	 * @author suryo_p
	 * check user name already exist or not
	 * @return syntax SQL in String
	 */
	public String isUsernameExist(String username){
		String checkUsername = "Call check_user_name('"+username+"')";
		return checkUsername;
	}

	/**
	 * @author suryo_p
	 * insert data employee who not check-in into absence table
	 * @param date
	 * @return syntax SQL in String
	 */
	public String setEmployeeWhoNotCheckedIn(String date){
		String checkUsername = "Call select_employee_leave('"+date+"')";
		return checkUsername;
	}

	/**
	 * @author suryo_p
	 * get employee data who not check-out
	 * @param date
	 * @return syntax SQL in String
	 */
	public String getEmployeeWhoNotCheckOut(String date){
		String checkUsername = "Call select_report_not_check_out('"+date+"')";
		return checkUsername;
	}

	/**
	 * @author suryo_p
	 * get all of the employee id and employee name
	 * @return syntax SQL in String
	 */
	public String getAllOfEmployeeIdAndName(){
		String checkUsername = "SELECT employee_id, employee_name FROM Attendance_Maretska.employee;";
		return checkUsername;
	}

	/**
	 * @author suryo_p
	 * get authority of employee
	 * @return syntax SQL in String
	 */
	public String getAuthority(String employeeId){
		String checkUsername = "SELECT attendance_authority.authority FROM employee LEFT JOIN "+
				"attendance_authority ON (attendance_authority.authority_code = employee.authority_code) "+
				"WHERE employee.employee_id = '"+employeeId+"';";
		return checkUsername;
	}

	/**
	 * @author suryo_p
	 * get authority of employee
	 * @return syntax SQL in String
	 */
	public String verifyFingerID(String fingerId){
		String querySelectFingerId = "SELECT employee_id FROM Attendance_Maretska.employee WHERE finger_id = '"+fingerId+"';";
		return querySelectFingerId;
	}

}