package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class ProfileManager{

	private static final String EMPLOYEE_ID = "employee_id";
	private static final String USERNAME = "username";

	/***
	 * @author suryo_p
	 * get employee profile from the database
	 * @param parameterValue
	 * @return
	 */
	public JSONObject getProfileEmployee(String parameterValue, String searchBy){
		JSONObject responseProfile = new JSONObject();
		try{
			if(parameterValue == null){
				responseProfile.put("status", "Error");
				responseProfile.put("message", "Your request not contain Employee ID");
			}else{
				responseProfile = getProfileFromDatabase(parameterValue, searchBy);
			}
		}catch(JSONException e){
			throw new AttendanceException(e);
		}
		return responseProfile;
	}

	/***
	 * @author suryo_p
	 * search profile employee in database using employeeId as parameter
	 * @param parameterValue
	 * @return
	 */
	public JSONObject getProfileFromDatabase(String parameterValue, String searchBy){
		SQLCommand sqlCommand = new SQLCommand();
		ResultSet rs = null;
		ConnectToSql connectToSql = new ConnectToSql();
		JSONObject jsonObject = new JSONObject();

		if(searchBy.equals(EMPLOYEE_ID)){
			// get result from database, result contain object
			rs = connectToSql.executeQuery(sqlCommand.getProfileDataSearchByEmployeeId(parameterValue));
		}else if(searchBy.equals(USERNAME)){
			// get result from database, result contain object
			rs = connectToSql.executeQuery(sqlCommand.getProfileDataSearchByUsername(parameterValue));
		}else{
			try {
				jsonObject.put("status", "error");
				jsonObject.put("message", "parameter undefined");
			} catch (JSONException e) {
				throw new AttendanceException(e);
			}
		}

		try{
			while (rs.next()){
				jsonObject.put("status", "success");
				jsonObject.put("user_name", rs.getString("user_name"));
				jsonObject.put("employee_name", rs.getString("employee_name"));
				jsonObject.put("employee_id", rs.getString("employee_id"));
				jsonObject.put("project_id", rs.getString("project_id"));
				jsonObject.put("authority", rs.getString("authority"));
				jsonObject.put("employee_email_photon", rs.getString("employee_email_photon"));
				jsonObject.put("facebook_id", rs.getString("uid_facebook"));
				jsonObject.put("employee_start_work", rs.getString("employee_start_work"));
				jsonObject.put("annual", rs.getString("annual"));
				jsonObject.put("c_off", rs.getString("c_off"));
				jsonObject.put("condolences", rs.getString("condolences"));
				jsonObject.put("married", rs.getString("married"));
				jsonObject.put("maternity", rs.getString("maternity"));
				jsonObject.put("paternity", rs.getString("paternity"));
				jsonObject.put("onsite", rs.getString("onsite"));
				jsonObject.put("sick", rs.getString("sick"));
				jsonObject.put("signature", rs.getString("signature"));
				jsonObject.put("gender", rs.getString("gender"));
			}
		}catch(SQLException e){
			throw new AttendanceException(e);
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return jsonObject;
	}

}