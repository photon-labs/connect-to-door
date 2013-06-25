package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginService {
	public String handleLoginRequest(final String postBody, final String url){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String responseString ;
		JSONObject response = null ;
		try {	
			final String jsonString = httpAdapter.sendPostRequest(postBody, url);
			response = new JSONObject(jsonString);
		}catch (JSONException e) {

		}
		responseString = response.toString();
		return responseString;
	}
}
