package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;
import com.maretska.attendance.util.CurrentDate;

public class CheckInOutManager{

	/***
	 * @author suryo_p
	 * get the current time and get the response from the database and check the request
	 * @param employeeId
	 * @param statusCheckInOut
	 * @param currentTime
	 * @return JSONObject contain the response
	 */
	public JSONObject doCheckInOut(String employeeId, String statusCheckInOut){
		JSONObject responseCheckInOut = new JSONObject();
		CurrentDate currentDate = new CurrentDate();

		// format for present's id, ex: 20121214
		String presentDate = currentDate.getCurrentDate();

		// format for check-in/out time, ex: 2012-12-14(space)10:58
		Calendar cal = Calendar.getInstance();
		String dateFormat = "yyyy-MM-dd HH:mm:ss";
		SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
		String presentTime = sdf.format(cal.getTime());

		try{
			if(employeeId != null){
				responseCheckInOut = saveDataToDatabase(employeeId, presentDate, presentTime, statusCheckInOut);
			}else{
				responseCheckInOut.put("status", "error");
				responseCheckInOut.put("message", "employee ID not identified");
			}
		}catch(JSONException e){
			throw new AttendanceException(e);
		}
		return responseCheckInOut;
	}

	/***
	 * @author suryo_p
	 * filtering is user use check in or check out
	 * @param employeeId
	 * @param currentDate
	 * @param currentTime
	 * @param statusCheckInOut
	 * @return
	 */
	public JSONObject saveDataToDatabase(String employeeId, String currentDate, String currentTime, String statusCheckInOut){
		SQLCommand sqlCommand = new SQLCommand();
		ConnectToSql connectToSql = new ConnectToSql();
		ResultSet rs;
		JSONObject jsonObject = new JSONObject();

		if(statusCheckInOut.equals("checkIn")){
			rs = connectToSql.executeQuery(sqlCommand.doCheckIn(currentDate+employeeId, employeeId, currentTime));
			jsonObject = checkInOut(rs, currentTime, statusCheckInOut, "checked in");
		}else if(statusCheckInOut.equals("checkOut")){
			rs = connectToSql.executeQuery(sqlCommand.doCheckOut(employeeId, currentTime));
			jsonObject = checkInOut(rs, currentTime, statusCheckInOut, "checked out");
		}else if(statusCheckInOut.equals("updateCheckOut")){
			rs = connectToSql.executeQuery(sqlCommand.updateCheckOut(employeeId, currentTime));
			jsonObject = updateCheckInOut(rs, currentTime, statusCheckInOut);
		}else if(statusCheckInOut.equals("check-status")){
			jsonObject = validateHasCheckedInOut(employeeId);
		}else{
			try {
				jsonObject.put("status", "error");
				jsonObject.put("message", "failed to check in-out");
			} catch (JSONException e) {
				throw new AttendanceException(e);
			}
		}

		return jsonObject;
	}

	/***
	 * @author suryo_p
	 * validate the response from database after save check in time into database
	 * @param rs
	 * @param dateCheckedInOut
	 * @param statusCheckInOut
	 * @return JSONObject response
	 */
	public JSONObject updateCheckInOut(ResultSet rs, String dateCheckedInOut, String statusCheckInOut){
		JSONObject response = new JSONObject();

		try{
			while(rs.next()){
				String databaseResponse = rs.getString("response");

				// response = 1, means response from the database after insert or update query
				if(databaseResponse.equalsIgnoreCase("1")){
					response.put("status", "success");
					response.put("message", "checkOut");
					response.put("checkOut", dateCheckedInOut);
				}else{
					response.put("status", "error");
					response.put("message", "database error");
				}
			}
		}catch(JSONException e){
			throw new AttendanceException(e);
		}catch (SQLException e){
			throw new AttendanceException(e);
		}
		return response;
	}

	/***
	 * @author suryo_p
	 * filtering is user use check in or check out
	 * @param employeeId
	 * @param currentDate
	 * @param currentTime
	 * @param statusCheckInOut
	 * @return
	 */
	public JSONObject forceCheckInOut(String employeeId, String currentDate, String checkInTime, String checkOutTime){
		SQLCommand sqlCommand = new SQLCommand();
		ConnectToSql connectToSql = new ConnectToSql();
		ResultSet rs;
		JSONObject jsonObject = new JSONObject();

		rs = connectToSql.executeQuery(sqlCommand.doCheckIn(currentDate+employeeId, employeeId, checkInTime));
		jsonObject = checkInOut(rs, checkInTime, "checkIn", "checked in");

		try {
			String status = jsonObject.getString("status");
			String message = jsonObject.getString("message");

			if(status.equalsIgnoreCase("success") || message.equalsIgnoreCase("You've been already checked in")){
				rs = connectToSql.executeQuery(sqlCommand.doCheckOut(employeeId, checkOutTime));
				jsonObject = new JSONObject();
				jsonObject = checkInOut(rs, checkOutTime, "checkOut", "checked out");
			}else{
				jsonObject.put("status", "error");
				jsonObject.put("message", "failed to check in-out");
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return jsonObject;
	}

	/***
	 * @author suryo_p
	 * validate the response from database after save check in time into database
	 * @param rs
	 * @param dateCheckedInOut
	 * @return JSONObject response
	 */
	public JSONObject checkInOut(ResultSet rs, String dateCheckedInOut, String statusCheckInOut, String textToDisplayWhenError){
		JSONObject response = new JSONObject();

		try{
			while(rs.next()){
				String databaseResponse = rs.getString("response");

				// response = 1, means response from the database after insert or update query
				if(databaseResponse.equalsIgnoreCase("1")){
					response.put("status", "success");
					response.put("message", statusCheckInOut);
					response.put(statusCheckInOut, dateCheckedInOut);
				}else{
					response.put("status", "error");
					response.put("message", "You've been already "+textToDisplayWhenError);
				}
			}
		}catch(JSONException e){
			throw new AttendanceException(e);
		}catch (SQLException e){
			throw new AttendanceException(e);
		}
		return response;
	}

	/**
	 * @author suryo_p
	 * validate user has checked in out or not
	 * @param employeeId
	 * @return JSONObject contain the response about check In-Out status
	 */
	public JSONObject validateHasCheckedInOut(String employeeId){
		CurrentDate currentDate = new CurrentDate();
		ConnectToSql connectToSql = new ConnectToSql();
		SQLCommand sqlCommand = new SQLCommand();
		JSONObject jsonObject = new JSONObject();
		ResultSet rs;

		rs = connectToSql.executeQuery(sqlCommand.validateCheckInOutStatus(currentDate.getDate(), employeeId));

		try{
			if(rs.next()){
				jsonObject.put("presence_id", rs.getString("presence_id"));
				jsonObject.put("check_in", rs.getString("check_in"));
				jsonObject.put("check_out", rs.getString("check_out"));
				jsonObject.put("employee_id", rs.getString("employee_id"));
			}
		} catch (JSONException e) {
			throw new AttendanceException(e);
		} catch (SQLException e) {
			throw new AttendanceException(e);
		}
		return jsonObject;
	}
}