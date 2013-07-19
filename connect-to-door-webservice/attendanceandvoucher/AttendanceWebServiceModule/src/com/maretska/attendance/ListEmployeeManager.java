package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class ListEmployeeManager {

	/***
	 * @author suryo_p
	 * check authority of employee
	 * @param employeeId
	 * @return response in JSONObject format
	 */
	public JSONObject checkAuthorized(String employeeId){
		ConnectToSql connectToSql = new ConnectToSql();
		SQLCommand sqlCommand = new SQLCommand();
		JSONObject jsonObject = new JSONObject();
		ResultSet rs;

		rs = connectToSql.executeQuery(sqlCommand.getAuthority(employeeId));

		try{
			if(rs.next()){
				String authority = rs.getString("authority");

				if(authority.equalsIgnoreCase("Admin") || authority.equalsIgnoreCase("Finance") ||
						authority.equalsIgnoreCase("General Manager")){
					jsonObject = getListOfEmployee();
				}else{
					jsonObject.put("status", "error");
					jsonObject.put("message", "You're not authorize");
				}
			}else{
				jsonObject.put("status", "error");
				jsonObject.put("message", "Please login Attendance Facebook first");
			}
		} catch (SQLException e) {
			throw new AttendanceException(e);
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}
		return jsonObject;
	}

	/***
	 * @author suryo_p
	 * get list of all employee
	 * @return response in JSONObject format
	 */
	public JSONObject getListOfEmployee(){
		JSONObject jsonObject = new JSONObject();
		JSONArray jsonArray = new JSONArray();
		JSONObject response = new JSONObject();

		ConnectToSql connectToSql = new ConnectToSql();
		SQLCommand sqlCommand = new SQLCommand();
		ResultSet rs;

		rs = connectToSql.executeQuery(sqlCommand.getAllOfEmployeeIdAndName());

		try{
			while(rs.next()){
				jsonObject = new JSONObject();
				jsonObject.put("employee_name", rs.getString("employee_name"));
				jsonObject.put("employee_id", rs.getString("employee_id"));
				jsonArray.put(jsonObject);
			}

			response.put("status", "success");
			response.put("employee_list", jsonArray);
		} catch (JSONException e) {
			throw new AttendanceException(e);
		} catch (SQLException e) {
			throw new AttendanceException(e);
		}
		return response;
	}

}