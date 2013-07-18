package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class AttendanceRequestManager {
	SQLCommand sqlCommand = new SQLCommand();
	ConnectToSql connectToSql = new ConnectToSql();
	
	/**
	 * @author irawati_a
	 * @param employeeId, date, detailsJsonArray
	 * @return object from database(request ID)
	 **/
	
	public JSONObject requestForm(String employeeId, String date, String assignTo, JSONArray detailsJsonArray){

		JSONObject jsonObj = new JSONObject();
		try{
			if(employeeId == null && date == null){
				jsonObj.put("status", "Error");
				jsonObj.put("message", "parameter is not complate");
			}else{
				jsonObj = saveDataToMasterRequest(employeeId, date, assignTo, detailsJsonArray);
			}

		}catch(JSONException e){
			throw new AttendanceException(e);
		}
		return jsonObj;
	}

	private JSONObject saveDataToMasterRequest(String employeeId, String date, String assignTo, JSONArray detailsJsonArray) {

		ResultSet rs = null;
		JSONObject jsonObj = new JSONObject();
		String requestId;

		rs = connectToSql.executeQuery(sqlCommand.masterRequest(employeeId, date, assignTo));

		try {
			while(rs.next()){
				requestId = rs.getString("request_id");
				jsonObj = insertDataToDetails(requestId, assignTo, detailsJsonArray);
			}
		}catch(SQLException e){
			throw new AttendanceException(e);
		}
		return jsonObj;
	}

	private JSONObject insertDataToDetails(String requestId, String assignTo, JSONArray detailsJsonArray) {

		JSONObject jsonObj = new JSONObject();
		int rs;
		boolean isStatus = false;
		
		for(int i=0 ;i<detailsJsonArray.length(); i++){
			try {
				JSONObject object = detailsJsonArray.getJSONObject(i);
				if(object.has("param_request_type") && object.has("param_desc") && object.has("param_qty") && object.has("param_cost")){
					String paramRequestType = object.getString("param_request_type");
					String paramDesc = object.getString("param_desc");
					String paramQty = object.getString("param_qty");
					String paramCost = object.getString("param_cost");
					String currency = object.getString("param_currency");
					
					rs = connectToSql.executeUpdate(sqlCommand.detailsRequest(requestId, paramRequestType, paramDesc, paramQty, paramCost, currency));
					
					if(rs == 1){
						jsonObj.put("request_id", requestId);
						jsonObj.put("status", "success");
						jsonObj.put("message", "database have been update");
						isStatus = true;
						
					}else{
						jsonObj.put("status", "error");
						jsonObj.put("message", "Can not connect to database");
					}
					
				}
				
			} catch (JSONException e) {
				throw new AttendanceException(e);
			}
		}
		
		if(isStatus){
			SendEmailManager emailer = new SendEmailManager();
			ResultSet response;
			String employeeName = null;
			String employeeEmailPhoton = null;
			
			response = connectToSql.executeQuery(sqlCommand.getProfileDataSearchByEmployeeId(assignTo));
			
			try{
				while (response.next()){
					employeeName = response.getString("employee_name");
					employeeEmailPhoton = response.getString("employee_email_photon");
					
				}
			}catch(SQLException e){
				throw new AttendanceException(e);
			}
			
			String[] recipients = new String[]{employeeEmailPhoton};
			String[] bccRecipients = new String[]{};  
			String subject = "Approval Request "+requestId;  
			String messageBody = "Hi "+employeeName+", "+
					"\n\nThis message was sent from MKT - Leave Control and Voucher System. " +
					"\nThe following request has been sent to you for your approval. To view this request, please click on this link: " +
					"\nhttp://172.17.10.165/Attendance-UI.git/assets/www/html/Attendance.html#attendanceRequest?request-id="+requestId+"";
			
			emailer.sendMail(recipients, bccRecipients, subject, messageBody);  
		}
		return jsonObj;
	}
}
