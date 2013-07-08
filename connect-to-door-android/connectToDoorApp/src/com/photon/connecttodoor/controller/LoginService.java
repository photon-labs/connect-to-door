package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginService {
	public String handleLoginRequest(final String employeeId, final String fbId){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleLogin ="/login";
		String responseString ;
		JSONObject response = null ;
		JSONObject postBody = new JSONObject();
		try {	
			postBody.put("employee_id", employeeId);
			postBody.put("facebook_id", fbId);
			String postBodyString = postBody.toString();
			final String jsonString = httpAdapter.sendPostRequest(postBodyString, moduleLogin);
			response = new JSONObject(jsonString);
		}catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		responseString = response.toString();
		return responseString;
	}
}
