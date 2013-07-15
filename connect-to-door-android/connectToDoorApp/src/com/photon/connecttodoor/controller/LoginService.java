package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

import com.photon.connecttodoor.utils.ApplicationConstant;

public class LoginService {
	/**
	 * @author febrianto_s
	 * handle login request
	 * @param employeeId
	 * @param fbId
	 * @return
	 */
	public String handleLoginRequest(final String employeeId, final String fbId){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleLogin = ApplicationConstant.MODULE_LOGIN;
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
