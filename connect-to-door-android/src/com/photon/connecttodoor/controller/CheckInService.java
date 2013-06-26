package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

public class CheckInService {
	public String handleCheckInRequest(final String employeeId, final String url){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String responseString ;
		JSONObject response = null ;
		JSONObject postBody = new JSONObject();
		try {	
			postBody.put("employee_id", employeeId);
			postBody.put("status", "checkIn");
			String postBodyString = postBody.toString();
			final String jsonString = httpAdapter.sendPostRequest(postBodyString, url);
			response = new JSONObject(jsonString);
		}catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		responseString = response.toString();
		return responseString;
	}
}
