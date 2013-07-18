package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;
import com.maretska.attendance.util.CurrentDate;

public class DailyAttendanceManager{

	/***
	 * @author suryo_p
	 * filtering the request
	 * @param employeeId
	 * @return JSONArray
	 */
	public JSONObject getDailyAttendance(String employeeId, String date){
		JSONObject responseProfile = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		try{
			if(employeeId == null){
				responseProfile.put("status", "Error");
				responseProfile.put("message", "Your request not contain Employee ID");
			}else{
				responseProfile.put("status", "success");
				jsonArray = getDataFromDatabase(date);
				responseProfile.put("employee_data", jsonArray);
			}

		}catch(JSONException e){
			throw new AttendanceException(e);
		}
		return responseProfile;
	}

	/***
	 * @author suryo_p
	 * request data from database and save data into JSONObject
	 * @return JSONArray contain the response from database
	 */
	public JSONArray getDataFromDatabase(String dateRequestAttendance){
		JSONArray response = new JSONArray();
		SQLCommand sqlCommand = new SQLCommand();
		ConnectToSql connectToSql = new ConnectToSql();
		ResultSet rs = null;

		rs = connectToSql.executeQuery(sqlCommand.showDailyAttendance(dateRequestAttendance));

		try {
			while(rs.next()){
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("presence_id", rs.getString("presence_id"));
				jsonObject.put("check_in", rs.getString("check_in"));
				jsonObject.put("check_out", rs.getString("check_out"));
				jsonObject.put("admin", rs.getString("admin"));
				jsonObject.put("employee_name", rs.getString("employee_name"));
				response.put(jsonObject);
			}
		} catch(JSONException e){
			throw new AttendanceException(e);
		}catch (SQLException e) {
			throw new AttendanceException(e);
		}

		return response;
	}
}
