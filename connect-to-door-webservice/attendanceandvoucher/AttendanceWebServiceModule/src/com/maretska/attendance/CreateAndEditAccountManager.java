package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class CreateAndEditAccountManager{

	ConnectToSql connectToSql = new ConnectToSql();
	SQLCommand sqlCommand = new SQLCommand();

	/***
	 * @author suryo_p
	 * create account to save employee's data into database
	 * @param employeeData
	 * @return response JSONObject
	 */
	public JSONObject createAccount(JSONObject employeeData){
		JSONObject response = new JSONObject();
		ResultSet rs;

		try {
			String employeeId = employeeData.getString("employee_id");

			// check is employee_id has available or not, resulted in a number, 1 if success and 0 if invalid
			rs = connectToSql.executeQuery(sqlCommand.checkEmployeeId(employeeId));

			if(rs.next()){
				String isAccountHasStored = rs.getString("record_employee_id");
				response = getCreateAccountResponse(isAccountHasStored, employeeId, employeeData);
			}else{
				response.put("status", "error");
				response.put("message", "can't connect to database");
			}
		} catch (JSONException e) {
			throw new AttendanceException(e);
		} catch (SQLException e) {
			throw new AttendanceException(e);
		}
		return response;
	}

	/**
	 * @author suryo_p
	 * give response is account has been stored or not
	 * @param response
	 * @return response JSONObject
	 */
	public JSONObject getCreateAccountResponse(String response, String employeeId, JSONObject employeeData){
		JSONObject jsonObject = new JSONObject();
		int rs;
		String isUsernameHasStore = checkUsernameAvailableOrNot(employeeData);

		try {
			String username = employeeData.getString("username");
			if(response.equalsIgnoreCase("0") && isUsernameHasStore.equalsIgnoreCase("0")){
				rs = connectToSql.executeUpdate(sqlCommand.createAccount(employeeData));

				if(rs == 1){
					jsonObject.put("status", "success");
					jsonObject.put("message", "Account has been created");
				}else{
					jsonObject.put("status", "error");
					jsonObject.put("message", "Can't connect to database");
				}
			}else if(response.equalsIgnoreCase("0") && isUsernameHasStore.equalsIgnoreCase("1")){
				jsonObject.put("status", "error");
				jsonObject.put("message", "Username "+username+" already exist ");
				jsonObject.put("detail", "username");
			}else if(response.equalsIgnoreCase("1") && isUsernameHasStore.equalsIgnoreCase("0")){
				jsonObject.put("status", "error");
				jsonObject.put("message", "Employee id "+employeeId+" already exist ");
				jsonObject.put("detail", "emp_id");
			}else{
				jsonObject.put("status", "error");
				jsonObject.put("message", "Employee id "+employeeId+" and username "+username+" already exist ");
				jsonObject.put("detail", "emp_user");
			}
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}
		return jsonObject;
	}

	/**
	 * @author suryo_p
	 * check is user name has available or not
	 * @param employeeData
	 * @return String contain response 1 if already exist or 0 if available
	 */
	public String checkUsernameAvailableOrNot(JSONObject employeeData){
		ResultSet rs;
		String isUsernameHasStored = "";

		try {
			String username = employeeData.getString("username");
			rs = connectToSql.executeQuery(sqlCommand.isUsernameExist(username));

			if(rs.next()){
				isUsernameHasStored = rs.getString("record_user_name");
			}else{
				isUsernameHasStored = "1";
			}
		} catch (JSONException e) {
			throw new AttendanceException(e);
		} catch (SQLException e) {
			throw new AttendanceException(e);
		}

		return isUsernameHasStored;
	}

	/***
	 * @author suryo_p
	 * edit account to update employee's data into database
	 * @param employeeData
	 * @return response JSONObject
	 */
	public JSONObject editAccount(JSONObject employeeData){
		JSONObject response = new JSONObject();
		ResultSet rs;

		try {
			// get result from database, resulted in a number, > 1 or -1 if success and 0 if invalid
			rs = connectToSql.executeQuery(sqlCommand.updateAccount(employeeData));
			while(rs.next()){
				String responseMessage = rs.getString("message");
				if(responseMessage.equalsIgnoreCase("success")){
					response.put("status", "success");
					response.put("message", "Account has been updated");
				}else{
					response.put("status", "error");
					response.put("message", "Failed to update account");
				}
			}
		} catch (JSONException e) {
			throw new AttendanceException(e);
		} catch (SQLException e) {
			throw new AttendanceException(e);
		}

		return response;
	}

	/***
	 * @author suryo_p
	 * deactivate account to update employee's data into database
	 * @param employeeData
	 * @return response JSONObject
	 */
	public JSONObject deactivateAccount(String employeeId){
		JSONObject response = new JSONObject();
		int rs;

		try {
			// get result from database, resulted in a number, 1 if success and 0 if invalid
			rs = connectToSql.executeUpdate(sqlCommand.deleteAccount(employeeId));
			if(rs >= 1 || rs == -1){
				response.put("status", "success");
				response.put("message", "Account has been deleted");
			}else{
				response.put("status", "error");
				response.put("message", "Can't connect to database");
			}
		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return response;
	}
}
