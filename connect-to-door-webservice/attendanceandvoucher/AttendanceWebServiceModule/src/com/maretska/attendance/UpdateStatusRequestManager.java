package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class UpdateStatusRequestManager {

	JSONObject jsonObj = new JSONObject();
	JSONArray jsonArray = new JSONArray();
	SQLCommand sqlCommand = new SQLCommand();
	ConnectToSql connectToSql = new ConnectToSql();
	ResultSet rs;

	/**
	 * @author irawati_a
	 * @param requestId, employeeId, date, status
	 * @return object from database
	 **/

	public JSONObject updateStatusRequest(String requestId, String employeeId, String date, String status, String assignTo){

		try{
			if(employeeId == null && date == null){
				jsonObj.put("status", "Error");
				jsonObj.put("message", "parameter is not complate");
			}else{
				jsonObj = updateStatus(requestId, employeeId, date, status, assignTo);
			}

		}catch(JSONException e){
			throw new AttendanceException(e);
		}
		return jsonObj;
	}

	private JSONObject updateStatus(String requestId, String employeeId,
			String date, String status, String assignTo) {

		try{
			rs = connectToSql.executeQuery(sqlCommand.updateStatusRequest(requestId, employeeId, date, status, assignTo));

			if(rs.next()){
				String employeeName = rs.getString("employee_name");
				String employeeEmail = rs.getString("employee_email_photon");

				jsonObj = sendMailResponse(status,employeeName,employeeEmail,requestId);				
			}else{
				jsonObj.put("status", "error");
				jsonObj.put("message", "Can not connect to database");
			}
		}catch(SQLException e){
			throw new AttendanceException(e);
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return jsonObj;
	}

	private JSONObject sendMailResponse(String statusRequest, String employeeName, String employeeEmail, String requestId) {

		SendEmailManager emailer = new SendEmailManager();
		String[] recipients = new String[]{employeeEmail};  
		String[] bccRecipients = new String[]{};  
		String subject = "Approval Request "+requestId;  
		String messageBody;

		AttendanceRequestDetailsManager getRequestDetails = new AttendanceRequestDetailsManager();

		if(statusRequest.equals("approve")){
			messageBody = "Hi "+employeeName+", " +
					"\n\nThis message was sent from MKT - Leave Control and Voucher System. " +
					"\nYour request has been approved. To view your complete request form, please click on this link: " +
					"\nhttp://172.17.10.165/Attendance-UI.git/assets/www/html/Attendance.html#attendanceRequest?request-id="+requestId+"";

			jsonObj = getRequestDetails.requestDetails(requestId);
			bccRecipients = new String[]{"fitri.wardani@photoninfotech.net"};

		}else if(statusRequest.equals("finish")){
			messageBody = "Hi "+employeeName+", " +
					"\n\nThis message was sent from MKT - Leave Control and Voucher System. " +
					"\nYour request has been finished. To view your complete request form, please click on this link: " +
					"\nhttp://172.17.10.165/Attendance-UI.git/assets/www/html/Attendance.html#attendanceRequest?request-id="+requestId+"";

			jsonObj = getRequestDetails.requestDetails(requestId);
			bccRecipients = new String[]{"fitri.wardani@photoninfotech.net"}; 

		}else{
			messageBody = "Hi "+employeeName+", " +
					"\n\nThis message was sent from MKT - Leave Control and Voucher System. " +
					"\nYour request has been decline.";

			try {
				jsonObj.put("status", "success");
				jsonObj.put("message", "Your request has been decline");
			} catch (JSONException e) {
				throw new AttendanceException(e);
			}
		}
		emailer.sendMail(recipients, bccRecipients, subject, messageBody); 



		return jsonObj;
	}
}
