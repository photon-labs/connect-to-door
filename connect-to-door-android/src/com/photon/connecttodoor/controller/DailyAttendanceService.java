package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

public class DailyAttendanceService {
	public String handleRequestDailyAttendance(final String employeeId, final String date){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleDailyAttendance ="/daily-attendance";
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