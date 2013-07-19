package com.maretska.attendance.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.data.Form;
import org.restlet.representation.Representation;
import org.restlet.resource.Options;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import com.maretska.attendance.AttendanceException;
import com.maretska.attendance.AttendanceRequestManager;

/**
 * @author irawati_a
 * Update request details and get request ID
 */
public class AttendanceRequestService extends ServerResource{
	private static final String EMPLOYEE_ID = "param_emp_id";
	private static final String DATE = "param_date";
	private static final String DETAILS_FORM = "details_form";
	private static final String ASSIGN_TO = "assign_to";

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

	/**
	 * @param entity
	 * @return String with jsonObject format
	 */
	@Post("json")
	public String RequestForm(String Entity){
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

		String response;
		JSONObject jsonObj = new JSONObject();
		AttendanceRequestManager requestFromManager = new AttendanceRequestManager();

		try{
			JSONObject request = new JSONObject(Entity);

			if(request.has(EMPLOYEE_ID) && request.has(DATE) && request.has(DETAILS_FORM) && request.has(ASSIGN_TO)){
				String employeeId = request.getString(EMPLOYEE_ID);
				String date = request.getString(DATE);
				String assignTo = request.getString(ASSIGN_TO);
				JSONArray detailsJsonArray = request.getJSONArray(DETAILS_FORM);

				jsonObj = requestFromManager.requestForm(employeeId, date, assignTo, detailsJsonArray);
			}else{
				jsonObj.put("status","Error");
				jsonObj.put("message","Parameter is not complete");
			}

			response = jsonObj.toString();

		}catch(JSONException e){
			throw new AttendanceException(e);
		}

		return response;
	}
}
