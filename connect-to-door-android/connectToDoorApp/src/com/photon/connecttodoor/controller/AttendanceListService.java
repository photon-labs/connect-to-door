package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

import com.photon.connecttodoor.utils.ApplicationConstant;

public class AttendanceListService {
	public static final String USERNAME = "username";
	public static final String EMPLOYEEID = "employeeID";
	public static final String PROJECTID = "projectID";
	/***
	 * @author febrianto_s
	 * handle request for attendance list
	 * @param searchParameter : category drop down menu
	 * @param searchingValue : input text by category
	 * @param dateStart : TYPE OF DATE (dd-mm-YYYY)
	 * @param dateEnd : TYPE OF DATE (dd-mm-YYYY)
	 * @return
	 */
	public String handleRequestAttendanceList (final String searchParameter, final String searchingValue, final String dateStart, final String dateEnd){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleAttendanceList = ApplicationConstant.MODULE_ATT_LIST;
		String responseString ;
		JSONObject response = null ;
		JSONObject postBody = new JSONObject();
		try {	
			if(searchParameter.equalsIgnoreCase(USERNAME)){
				postBody.put("user_name", searchingValue);
				postBody.put("date_start", dateStart);
				postBody.put("date_end", dateEnd);
			}else if(searchParameter.equalsIgnoreCase(EMPLOYEEID)){
				postBody.put("employee_id", searchingValue);
				postBody.put("date_start", dateStart);
				postBody.put("date_end", dateEnd);
			}else if(searchParameter.equalsIgnoreCase(PROJECTID)){
				postBody.put("project_id", searchingValue);
				postBody.put("date_start", dateStart);
				postBody.put("date_end", dateEnd);
			}else{
				postBody.put("date_start", dateStart);
				postBody.put("date_end", dateEnd);
			}
			String postBodyString = postBody.toString();
			final String jsonString = httpAdapter.sendPostRequest(postBodyString, moduleAttendanceList);
			response = new JSONObject(jsonString);
		}catch (JSONException e) {
			e.printStackTrace();
		}
		responseString = response.toString();
		return responseString;
	}
}
