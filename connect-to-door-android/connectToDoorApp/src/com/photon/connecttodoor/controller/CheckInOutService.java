package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

public class CheckInOutService {
	public String handleCheckInRequest(final String employeeId, final String status){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleCheckinOut = "/check-in-out";
		String responseString ;
		JSONObject response = null ;
		JSONObject postBody = new JSONObject();
		try {	
			postBody.put("employee_id", employeeId);
			postBody.put("status", status);
			String postBodyString = postBody.toString();
			final String jsonString = httpAdapter.sendPostRequest(postBodyString, moduleCheckinOut);
			response = new JSONObject(jsonString);
		}catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		responseString = response.toString();
		return responseString;
	}
}
