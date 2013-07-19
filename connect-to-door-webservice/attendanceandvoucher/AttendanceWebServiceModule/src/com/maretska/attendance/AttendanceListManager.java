package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class AttendanceListManager {

	/**
	 * @author irawati_a
	 * @param dateStart, dateEnd, searchBy, status
	 * @return jsonArray. contain object from database
	 **/

	public JSONObject accountSearchBy(String dateStart, String dateEnd, String searchBy, String status){
		JSONObject jsonObj = new JSONObject();
		JSONArray responseAttendanceList = new JSONArray();
		try{
			if(status == null && dateStart == null && dateEnd == null && searchBy == null){
				jsonObj.put("status", "Error");
				jsonObj.put("message", "Input is not complete");
				responseAttendanceList.put(jsonObj);
			}else{
				jsonObj.put("status", "success");
				responseAttendanceList = attendanceList(dateStart, dateEnd, searchBy, status);
				jsonObj.put("data", responseAttendanceList);				
			}
		}catch(JSONException e){
			throw new AttendanceException(e);
		}
		return jsonObj;
	}

	public JSONArray attendanceList(String dateStart, String dateEnd, String searchBy, String status){
		SQLCommand sqlCommand = new SQLCommand();
		ResultSet rs = null;
		JSONObject jsonObject = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		ConnectToSql connectToSql = new ConnectToSql();

		if(status.equals("user_name")){
			rs = connectToSql.executeQuery(sqlCommand.attendanceListByName(dateStart, dateEnd, searchBy));
		}else if(status.equals("employee_id")){
			rs = connectToSql.executeQuery(sqlCommand.attendanceListByEmpid(dateStart, dateEnd, searchBy));
		}else if(status.equals("project_id")){
			rs = connectToSql.executeQuery(sqlCommand.attendanceListByProjectid(dateStart, dateEnd, searchBy));
		}else if(status.equals("date")){
			rs = connectToSql.executeQuery(sqlCommand.attendanceListByDate(dateStart, dateEnd));
		}else{
			try {
				jsonObject.put("status", "Error");
				jsonObject.put("message", "Bad Request");
				jsonArray.put(jsonObject);
			} catch (JSONException e) {
				throw new AttendanceException(e);
			}
		}

		try{
			while (rs.next()){
				jsonObject = new JSONObject();
				jsonObject.put("employee_name", rs.getString("employee_name"));
				jsonObject.put("employee_id", rs.getString("employee_id"));
				jsonObject.put("project_id", rs.getString("project_id"));
				jsonObject.put("total_attendance", rs.getString("total_attendance"));
				jsonObject.put("total_working", rs.getString("total_working"));
				jsonObject.put("total_leave", rs.getString("total_leave"));
				jsonObject.put("average_working_hour", rs.getString("average_working_hour"));
				jsonArray.put(jsonObject);
			}
		}catch(SQLException e){
			throw new AttendanceException(e);
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return jsonArray;
	}

}