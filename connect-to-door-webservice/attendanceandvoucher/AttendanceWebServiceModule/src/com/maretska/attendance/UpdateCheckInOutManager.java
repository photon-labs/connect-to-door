package com.maretska.attendance;

import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class UpdateCheckInOutManager{

	/***
	 * @author suryo_p
	 * filtering the request
	 * @param employeeId
	 * @param presenceId
	 * @param checkIn
	 * @param checkOut
	 * @return response in JSONObject format
	 */
	public JSONObject doUpdate(String employeeId, String presenceId, String checkIn, String checkOut, String date){
		JSONObject response = new JSONObject();

		try {
			if(employeeId != null && presenceId != null && checkIn != null && checkOut != null){
				response = updateDatabase(employeeId, presenceId, checkIn, checkOut, date);
			}else{
				response.put("status", "error");
				response.put("message", "request parameter not complete");
			}
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return response;
	}

	/***
	 * @author suryo_p
	 * update check-in/out data into database
	 * @param employeeId
	 * @param presenceId
	 * @param checkIn
	 * @param checkOut
	 * @return response in JSONObject format
	 */
	public JSONObject updateDatabase(String employeeId, String presenceId, String checkIn, String checkOut, String date){
		JSONObject jsonObject = new JSONObject();
		int rs;
		SQLCommand sqlCommand = new SQLCommand();
		ConnectToSql connectToSql = new ConnectToSql();

		rs = connectToSql.executeUpdate(sqlCommand.updateDailyAttendance(checkIn, checkOut, employeeId, presenceId, date));

		try{
			// rs = 1, means response from the database after insert or update query
			if(rs == 1){
				jsonObject.put("status", "success");
				jsonObject.put("message", "update success");
			}else{
				jsonObject.put("status", "error");
				jsonObject.put("message", "can't connect to database");
			}

		}catch(JSONException e){
			throw new AttendanceException(e);
		}

		return jsonObject;
	}
}
