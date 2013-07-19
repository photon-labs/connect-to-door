package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class AttendanceDetailManager {
	
	/**
	 * @author irawati_a
	 * @param employeeId, dayStart, dayEnd
	 * @return jsonArray. contain object from database
	 **/
	
	public JSONObject attendanceDetail(String employeeId, String dayStart, String dayEnd){
		JSONObject jsonObj = new JSONObject();
		JSONArray responseAttendanceDetail = new JSONArray();
		try{
			if(employeeId == null && dayStart == null && dayEnd == null){
				jsonObj.put("status", "Error");
				jsonObj.put("message", "Input is not complete");
			}else{
				responseAttendanceDetail = attendanceDetailsResponse(employeeId, dayStart, dayEnd);
				jsonObj.put("status", "success");
				jsonObj.put("data", responseAttendanceDetail);				
			}
		}catch(JSONException e){
			throw new AttendanceException(e);
		}
		return jsonObj;
	}
	
	public JSONArray attendanceDetailsResponse(String employeeId, String dayStart, String dayEnd){
		
		SQLCommand sqlCommand = new SQLCommand();
		ResultSet rs = null;
		JSONObject jsonObj = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		ConnectToSql connectToSql = new ConnectToSql();
	
		rs = connectToSql.executeQuery(sqlCommand.attendanceDetail(dayStart, dayEnd, employeeId));
		
		try{
			while (rs.next()){
				jsonObj = new JSONObject();
				jsonObj.put("date", rs.getString("date"));
				jsonObj.put("absence", rs.getString("absence"));
				jsonObj.put("description", rs.getString("description"));
				
				jsonArray.put(jsonObj);
			}
		}catch(SQLException e){
			throw new AttendanceException(e);
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}		
		
		return jsonArray;

	}

}
