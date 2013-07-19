package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class AttendanceRequestDetailsManager {

	JSONObject jsonObj = new JSONObject();
	JSONArray jsonArray = new JSONArray();
	SQLCommand sqlCommand = new SQLCommand();
	ConnectToSql connectToSql = new ConnectToSql();
	ResultSet rs;
	
	/**
	 * @author irawati_a
	 * @param requestId
	 * @return object from database
	 **/

	public JSONObject requestDetails(String requestId){
		try{
			if(requestId == null){
				jsonObj.put("status", "Error");
				jsonObj.put("message", "parameter is not complete");
			}else{
				jsonObj = getRequestDetails(requestId);
				jsonObj.put("status", "Success");
			}

		}catch(JSONException e){
			throw new AttendanceException(e);
		}
		return jsonObj;
	}

	private JSONObject getRequestDetails(String requestId) {
		JSONObject jsonObj = new JSONObject();
		JSONObject objRequestDetails = new JSONObject();
		
		rs = connectToSql.executeQuery(sqlCommand.selectDetailRequest(requestId));

		try {
			while(rs.next()){
				jsonObj = new JSONObject();
				jsonObj.put("request_id", rs.getString("request_id"));
				jsonObj.put("detail_request_id", rs.getString("detail_request_id"));
				jsonObj.put("request_type", rs.getString("request_type"));
				jsonObj.put("description", rs.getString("description"));
				jsonObj.put("quantity", rs.getString("quantity"));
				jsonObj.put("cost", rs.getString("cost"));
				jsonObj.put("currency", rs.getString("currency"));
				jsonArray.put(jsonObj);
				
			}
			objRequestDetails.put("request_details", jsonArray);
			objRequestDetails.put("employee_details", getEmployeeDetails(requestId));
			
		}catch(SQLException e){
			throw new AttendanceException(e);
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}
		
		return objRequestDetails;
	}

	private JSONObject getEmployeeDetails(String requestId) {
		rs = connectToSql.executeQuery(sqlCommand.employeeDetails(requestId));
		
		
		try{
			while(rs.next()){
				jsonObj = new JSONObject();
				jsonObj.put("status_request", rs.getString("status"));
				jsonObj.put("request_id", rs.getString("request_id"));
				jsonObj.put("employee_id", rs.getString("employee_id"));
				jsonObj.put("employee_name", rs.getString("employee_name"));
				jsonObj.put("project_id", rs.getString("project_id"));
				jsonObj.put("signature", rs.getString("signature"));
				jsonObj.put("assign_to", rs.getString("assign_to"));
				
				if(rs.getString("status").equals("finish")){
					jsonObj.put("approve_by", rs.getString("approve_by"));
				}
			}
		}catch(SQLException e){
			throw new AttendanceException(e);
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}
		
		return jsonObj;
	}
}
