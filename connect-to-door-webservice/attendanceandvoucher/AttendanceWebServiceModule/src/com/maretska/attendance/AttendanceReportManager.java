package com.maretska.attendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.maretska.attendance.util.ConnectToSql;

public class AttendanceReportManager {

	private static final String STATUS_BEFORE_ADJUSTMENT = "before";
	private static final String STATUS_AFTER_ADJUSTMENT = "after";
	private static final String STATUS_ADJUSTMENT = "adjustment";

	/**
	 * @author suryo_p
	 * filtering the adjustment's status
	 * @param statusAdjustment
	 * @return response in JSONObject
	 */
	public JSONObject getAttendanceReport(String statusAdjustment, String selectedMonth){
		JSONObject jsonObject = new JSONObject();
		SQLCommand sqlCommand = new SQLCommand();
		ConnectToSql connectToSql = new ConnectToSql();
		ResultSet rs = null;


		if(statusAdjustment.equals(STATUS_BEFORE_ADJUSTMENT)){
			rs = connectToSql.executeQuery(sqlCommand.beforeAdjustment());
			jsonObject = getDataFromDatabase(rs);
		}else if(statusAdjustment.equals(STATUS_AFTER_ADJUSTMENT)){
			rs = connectToSql.executeQuery(sqlCommand.afterAdjustment(selectedMonth));
			jsonObject = getDataFromDatabase(rs);
		}else if(statusAdjustment.equals(STATUS_ADJUSTMENT)){
			rs = connectToSql.executeQuery(sqlCommand.adjustment(selectedMonth));
			jsonObject = getDataFromDatabase(rs);
		}else{
			try {
				jsonObject.put("status", "error");
				jsonObject.put("message", "bad request");
			} catch (JSONException e) {
				throw new AttendanceException(e);
			}
		}

		return jsonObject;
	}

	/**
	 * @author suryo_p
	 * get attendance report's data from database
	 * @param rs
	 * @return response in JSONObject
	 */
	public JSONObject getDataFromDatabase(ResultSet rs){
		JSONArray response = new JSONArray();
		JSONObject jsonObject = new JSONObject();
		int countOfDataFromDatabase = 1;

		try {
			while(rs.next()){
				JSONObject jsObject = new JSONObject();
				String number = Integer.toString(countOfDataFromDatabase);
				jsObject.put("no", number);
				jsObject.put("employee_name", rs.getString("employee_name"));
				jsObject.put("employee_id", rs.getString("employee_id"));
				jsObject.put("annual", rs.getString("annual"));
				jsObject.put("c_off", rs.getString("c_off"));
				jsObject.put("condolences", rs.getString("condolences"));
				jsObject.put("married", rs.getString("married"));
				jsObject.put("maternity", rs.getString("maternity"));
				jsObject.put("paternity", rs.getString("paternity"));
				jsObject.put("onsite", rs.getString("onsite"));
				jsObject.put("sick", rs.getString("sick"));
				response.put(jsObject);
				countOfDataFromDatabase++;
			}

			jsonObject.put("status", "success");
			jsonObject.put("data", response);

		} catch(JSONException e){
			throw new AttendanceException(e);
		}catch (SQLException e) {
			throw new AttendanceException(e);
		}

		return jsonObject;
	}

}
