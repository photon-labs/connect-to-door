package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class FingerIdManager{

	/***
	 * @author suryo_p
	 * @param fingerId
	 * @return employeeId in JSONObject format
	 */
	public JSONObject getEmployeeId(String fingerId){
		JSONObject responseLogin = new JSONObject();
		JSONObject response = new JSONObject();
		String message = null;
		try{
			responseLogin = getObjectFromDatabase(fingerId);
			if(fingerId != null && responseLogin != null){
				message = "Login success";
				responseLogin.put("status", "success");
				responseLogin.put("message", message);
				response = responseLogin;
			}else{
				message = "Login failed";
				response.put("status", "error");
				response.put("message", message);
			}
		}catch(JSONException e){
			throw new AttendanceException(e);
		}
		return response;
	}

	/***
	 * @author suryo_p
	 * @param fingerId
	 * @return jsonObject contain object from database
	 */
	public JSONObject getObjectFromDatabase(String fingerId){
		ResultSet rs = null;
		JSONObject jsonObject = new JSONObject();
		SQLCommand sqlCommand = new SQLCommand();
		ConnectToSql connectToSql = new ConnectToSql();

		try{
			rs = connectToSql.executeQuery(sqlCommand.verifyFingerID(fingerId));
			if (rs.next()){
				jsonObject.put("employeeId", rs.getString("employee_id"));
			}else{
				jsonObject = null;
			}
			rs.close();
		} catch (SQLException e) {
			throw new AttendanceException(e);
		} catch (JSONException e) {
			throw new AttendanceException(e);
		} finally {
			rs = null;
		}

		return jsonObject;
	}
}
