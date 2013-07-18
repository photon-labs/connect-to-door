package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class SignatureManager {

	/***
	 * @author suryo_p
	 * get employee signature from the database
	 * @param parameterValue
	 * @return
	 */
	public JSONObject getSignatureEmployee(String employeeId){
		JSONObject response = new JSONObject();
		try{
			if(employeeId == null){
				response.put("status", "Error");
				response.put("message", "Bad Request");
			}else{
				response = getSignatureFromDatabase(employeeId);
			}
		}catch(JSONException e){
			throw new AttendanceException(e);
		}
		return response;
	}

	/***
	 * @author suryo_p
	 * search signature employee in database using employeeId as parameter
	 * @param parameterValue
	 * @return
	 */
	public JSONObject getSignatureFromDatabase(String employeeId){
		SQLCommand sqlCommand = new SQLCommand();
		ResultSet rs = null;
		ConnectToSql connectToSql = new ConnectToSql();
		JSONObject jsonObject = new JSONObject();

		rs = connectToSql.executeQuery(sqlCommand.getSignatureEmployee(employeeId));

		try{
			while (rs.next()){
				jsonObject.put("status", "success");
				jsonObject.put("signature", rs.getString("signature"));
			}
		}catch(SQLException e){
			throw new AttendanceException(e);
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return jsonObject;
	}

}
