package com.maretska.attendance.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.data.Form;
import org.restlet.representation.Representation;
import org.restlet.resource.Options;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import com.maretska.attendance.AttendanceException;
import com.maretska.attendance.ProfileManager;

public class ProfileEmployeeService extends ServerResource{

	private static final String EMPLOYEE_ID = "employee_id";
	private static final String USERNAME = "username";
	private static final String SEARCH_BY = "search_by";

	@Options
	public void doOptions(Representation entity) {
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

	@Post("json")
	public String getEmployeeProfile(String entity){
		Form responseHeaders = (Form) getResponse().getAttributes().get("org.restlet.http.headers");
		if (responseHeaders == null) {
			responseHeaders = new Form();
			getResponse().getAttributes().put("org.restlet.http.headers", responseHeaders);
		}
		responseHeaders.add("Access-Control-Allow-Origin", "*");
		responseHeaders.add("Access-Control-Allow-Methods", "POST");
		responseHeaders.add("Access-Control-Max-Age", "1728000");
		responseHeaders.add("Access-Control-Allow-Headers", "Content-Type");
		responseHeaders.add("Access-Control-Allow-Credentials", "false");

		String response = null;
		JSONObject jsonObject = new JSONObject();
		ProfileManager profileManager = new ProfileManager();

		try{
			JSONObject request = new JSONObject(entity);

			if(request.has(SEARCH_BY) && request.has(EMPLOYEE_ID)){
				String employeeId = request.getString(EMPLOYEE_ID);
				String searchBy = request.getString(SEARCH_BY);
				jsonObject = profileManager.getProfileEmployee(employeeId, searchBy);
			}else if(request.has(SEARCH_BY) && request.has(USERNAME)){
				String username = request.getString(USERNAME);
				String searchBy = request.getString(SEARCH_BY);
				jsonObject = profileManager.getProfileEmployee(username, searchBy);
			}else{
				jsonObject.put("status", "Error");
				jsonObject.put("message", "Bad Request");
			}

			response = jsonObject.toString();

		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return response;
	}
}
