package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class AttendanceDetailUpdateManager {

	/**
	 * @author irawati_a
	 * @param employeeId, adminId, employeeDetail
	 * @return status request
	 **/
	public JSONObject attendanceDetailUpdate(String employeeId, String adminId, JSONArray employeeDetail){

		JSONObject jsonObj = new JSONObject();
		SQLCommand sqlCommand = new SQLCommand();
		ConnectToSql connectToSql = new ConnectToSql();
		ResultSet rs;

		for(int i=0 ;i<employeeDetail.length(); i++){
			try {
				JSONObject object = employeeDetail.getJSONObject(i);
				if(object.has("param_date") && object.has("param_absence")){
					String date = object.getString("param_date");
					String absence = object.getString("param_absence");

					rs = connectToSql.executeQuery(sqlCommand.updateAbsenceReport(employeeId, date, absence, adminId));
					
					jsonObj = getStatusRequest(rs);
				}

			} catch (JSONException e) {
				throw new AttendanceException(e);
			}
		}
		return jsonObj;
	}

	public JSONObject getStatusRequest(ResultSet rs){
		JSONObject jsonObj = new JSONObject();
		try {
			while(rs.next()){
				String message =  rs.getString("message");
				if(message.equalsIgnoreCase("success")){
					jsonObj.put("status", "success");
					jsonObj.put("message", "data has been update");					
				}else{
					jsonObj.put("status", "error");
					jsonObj.put("message", "data has not been update");
				}

			}
		} catch (SQLException e) {
			throw new AttendanceException(e);
		}  catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return jsonObj;
	}
}
