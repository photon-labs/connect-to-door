package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class ListRecipientManager {

	private static final String APM = "apm";
	private static final String GENERAL_MANAGER = "gm";

	/***
	 * @author suryo_p
	 * get list of recipients from the database
	 * @param parameterValue
	 * @return JSONObject contain the response
	 */
	public JSONObject getListOfRecipients(String parameterValue){
		JSONObject responseProfile = new JSONObject();
		try{
			if(parameterValue == null){
				responseProfile.put("status", "error");
				responseProfile.put("message", "Bad Request");
			}else{
				responseProfile = getListOfRecipientsFromDatabase(parameterValue);
			}
		}catch(JSONException e){
			throw new AttendanceException(e);
		}
		return responseProfile;
	}

	/***
	 * @author suryo_p
	 * search list of recipients in database
	 * @param parameterValue
	 * @return JSONObject contain the response
	 */
	public JSONObject getListOfRecipientsFromDatabase(String parameterValue){
		SQLCommand sqlCommand = new SQLCommand();
		ResultSet rs = null;
		ConnectToSql connectToSql = new ConnectToSql();
		JSONObject jsonObject = new JSONObject();
		JSONArray jsonArray = new JSONArray();

		if(parameterValue.equals(APM)){
			// get result from database, result contain object
			rs = connectToSql.executeQuery(sqlCommand.getListOfAPM());
		}else if(parameterValue.equals(GENERAL_MANAGER)){
			// get result from database, result contain object
			rs = connectToSql.executeQuery(sqlCommand.getListOfGM());
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
				jsonObject = new JSONObject();
				jsonObject.put("employee_id", rs.getString("employee_id"));
				jsonObject.put("employee_name", rs.getString("employee_name"));
				jsonArray.put(jsonObject);
			}
			jsonObject = new JSONObject();
			jsonObject.put("data", jsonArray);
			jsonObject.put("status", "success");
		}catch(SQLException e){
			throw new AttendanceException(e);
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return jsonObject;
	}

}
