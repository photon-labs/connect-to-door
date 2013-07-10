package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

import com.photon.connecttodoor.utils.ApplicationConstant;

public class DeleteAccountService {
	public String handleDeleteAccountRequest(final String status, final String employeeID){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleDeleteAccount = ApplicationConstant.MODULE_CREATE_EDIT_DELETE_ACCOUNT;
		String responseString ;
		JSONObject response = null ;
		JSONObject postBody = new JSONObject();
		try {	
			postBody.put("status", status);
			postBody.put("employee_id", employeeID);
			String postBodyString = postBody.toString();
			final String jsonString = httpAdapter.sendPostRequest(postBodyString, moduleDeleteAccount);
			response = new JSONObject(jsonString);
		}catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		responseString = response.toString();
		return responseString;
	}
}
