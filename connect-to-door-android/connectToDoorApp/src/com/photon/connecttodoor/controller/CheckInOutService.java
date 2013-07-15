package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

import com.photon.connecttodoor.utils.ApplicationConstant;

public class CheckInOutService {
	/**
	 * @author febrianto_s
	 * handle request for check in/out
	 * @param employeeId
	 * @param status : "checkIn","checkOut","check-status"
	 * @return
	 */
	public String handleCheckInRequest(final String employeeId, final String status){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleCheckinOut = ApplicationConstant.MODULE_CHECK_IN_OUT;
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
