package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

import com.photon.connecttodoor.utils.ApplicationConstant;

public class DailyAttendanceService {
	/**
	 * @author febrianto_s
	 * handle request for daily attendance
	 * @param employeeId
	 * @param date (yyy-mm-dd)
	 * @return
	 */
	public String handleRequestDailyAttendance(final String employeeId, final String date){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleDailyAttendance = ApplicationConstant.MODULE_DAILY_ATT;
		String responseString ;
		JSONObject response = null ;
		JSONObject postBody = new JSONObject();
		try {	
			postBody.put("employee_id", employeeId);
			postBody.put("date", date);
			String postBodyString = postBody.toString();
			final String jsonString = httpAdapter.sendPostRequest(postBodyString, moduleDailyAttendance);
			response = new JSONObject(jsonString);
		}catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		responseString = response.toString();
		return responseString;
	}
}
