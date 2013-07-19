package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class LoginManager{
	public JSONObject login(String employeeId, String facebookId) {
		Boolean isLogin = false;

		if(employeeId != null){
			isLogin = true;
		}
		return responseLogin(isLogin, employeeId, facebookId);
	}

	/***
	 * @author suryo_p
	 * @param isLogin
	 * @param employeeId
	 * @param facebookId
	 * @return responseLogin in JSONObject format
	 */
	public JSONObject responseLogin(boolean isLogin, String employeeId, String facebookId){
		JSONObject responseLogin = new JSONObject();
		JSONObject response = new JSONObject();
		String message = null;
		try{
			responseLogin = getObjectFromDatabase(employeeId, facebookId);
			if(isLogin && responseLogin != null){
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
	 * @param employeeId
	 * @param facebookId
	 * @return jsonObject contain object from database
	 */
	public JSONObject getObjectFromDatabase(String employeeId, String facebookId){
		ResultSet rs = null;
		JSONObject jsonObject = new JSONObject();
		SQLCommand sqlCommand = new SQLCommand();
		ConnectToSql connectToSql = new ConnectToSql();

		try{
			rs = connectToSql.executeQuery(sqlCommand.validateEmployeeAccount(employeeId, facebookId));
			if (rs.next()){
				jsonObject.put("username", rs.getString("employee_name"));
				jsonObject.put("isAdmin", rs.getString("authority"));
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
