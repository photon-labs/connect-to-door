package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

public class ReportAttendanceService {
	public String handleRequestReportAttendance(final String status, final String date){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleReport ="/report";
		String responseString ;
		JSONObject response = null ;
		JSONObject postBody = new JSONObject();
		try {	
			postBody.put("status", status);
			postBody.put("month", date);
			String postBodyString = postBody.toString();
			final String jsonString = httpAdapter.sendPostRequest(postBodyString, moduleReport);
			response = new JSONObject(jsonString);
		}catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		responseString = response.toString();
		return responseString;
	}
}
