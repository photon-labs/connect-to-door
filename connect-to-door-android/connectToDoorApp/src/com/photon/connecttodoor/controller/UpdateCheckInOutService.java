package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

import com.photon.connecttodoor.utils.ApplicationConstant;

public class UpdateCheckInOutService {
	public String handleUpdateCheckInOutRequest(final String employeeId, final String presenceId, final String checkIn, final String checkOut, final String date){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleCheckinOut = ApplicationConstant.MODULE_UPDATE_CHECKIN_OUT;
		String responseString = null ;
		JSONObject response = null ;
		JSONObject postBody = new JSONObject();
		try {	
			postBody.put("employee_id", employeeId);
			postBody.put("presenceId", presenceId);
			postBody.put("checkIn", checkIn);
			postBody.put("checkOut", checkOut);
			postBody.put("date", date);
			String postBodyString = postBody.toString();
			final String jsonString = httpAdapter.sendPostRequest(postBodyString, moduleCheckinOut);
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
