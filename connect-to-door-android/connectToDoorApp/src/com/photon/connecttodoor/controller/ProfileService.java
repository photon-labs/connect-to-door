package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

public class ProfileService {
	public String handleProfileRequest(final String searchParameter, final String value){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleProfile ="/profile";
		String responseString ;
		JSONObject response = null ;
		JSONObject postBody = new JSONObject();
		try {	
			if(searchParameter.equalsIgnoreCase("employee_id")){
				postBody.put("employee_id", value);
				postBody.put("search_by", searchParameter);
			}else{
				postBody.put("username", value);
				postBody.put("search_by", searchParameter);
			}
		
			String postBodyString = postBody.toString();
			final String jsonString = httpAdapter.sendPostRequest(postBodyString, moduleProfile);
			response = new JSONObject(jsonString);
		}catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		responseString = response.toString();
		return responseString;

	}

}
