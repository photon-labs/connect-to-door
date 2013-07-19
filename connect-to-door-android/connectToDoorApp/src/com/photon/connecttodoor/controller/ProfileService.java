package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

import com.photon.connecttodoor.utils.ApplicationConstant;

public class ProfileService {
	public static final String EMPLOYEE_ID = "employee_id";
	/**
	 * @author fadli_m
	 * handle profile request
	 * @param searchParameter
	 * @param value
	 * @return
	 */
	public String handleProfileRequest(final String searchParameter, final String value){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleProfile = ApplicationConstant.MODULE_PROFILE;
		String responseString = null;
		JSONObject response = null;
		JSONObject postBody = new JSONObject();
		try {	
			if(searchParameter.equalsIgnoreCase(EMPLOYEE_ID)){
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
		if(response != null){
			responseString = response.toString();
		}
		return responseString;

	}

}
