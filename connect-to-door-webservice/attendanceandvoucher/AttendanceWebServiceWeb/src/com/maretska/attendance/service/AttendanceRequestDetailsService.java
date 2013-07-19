package com.maretska.attendance.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.data.Form;
import org.restlet.representation.Representation;
import org.restlet.resource.Options;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import com.maretska.attendance.AttendanceException;
import com.maretska.attendance.AttendanceRequestDetailsManager;

/**
 * @author irawati_a
 * get employee details 
 */

public class AttendanceRequestDetailsService extends ServerResource{
	private static final String REQUEST_ID = "param_request_id";

	@Options
	public void doOptions(Representation entity) {
		headers();
	}

	/**
	 * @param entity
	 * @return String with jsonObject format
	 */
	@Post("json")
	public String RequestForm(String Entity){
		headers();

		String response;
		JSONObject jsonObj = new JSONObject();
		AttendanceRequestDetailsManager requestDetailsManager = new AttendanceRequestDetailsManager();

		try{
			JSONObject request = new JSONObject(Entity);

			if(request.has(REQUEST_ID)){
				String requestId = request.getString(REQUEST_ID);
				
				jsonObj = requestDetailsManager.requestDetails(requestId);
			}else{
				jsonObj.put("status","Error");
			}

			response = jsonObj.toString();

		}catch(JSONException e){
			throw new AttendanceException(e);
		}

		return response;
	}
	
	public void headers(){
		Form responseHeaders = (Form) getResponse().getAttributes().get("org.restlet.http.headers");
		if (responseHeaders == null) {
			responseHeaders = new Form();
			getResponse().getAttributes().put("org.restlet.http.headers", responseHeaders);
		}
		responseHeaders.add("Access-Control-Allow-Origin", "*");
		responseHeaders.add("Access-Control-Allow-Methods", "POST,OPTIONS");
		responseHeaders.add("Access-Control-Allow-Headers", "Content-Type");
		responseHeaders.add("Access-Control-Allow-Credentials", "false");
		responseHeaders.add("Access-Control-Max-Age", "60");
	}
}
