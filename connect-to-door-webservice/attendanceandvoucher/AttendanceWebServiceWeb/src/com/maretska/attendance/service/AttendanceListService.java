package com.maretska.attendance.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.data.Form;
import org.restlet.representation.Representation;
import org.restlet.resource.Options;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import com.maretska.attendance.AttendanceException;
import com.maretska.attendance.AttendanceListManager;

/**
 * @author irawati_a
 * get attendance list employees
 */
public class AttendanceListService extends ServerResource{
	private static final String USER_NAME = "user_name";
	private static final String PROJECT_ID = "project_id";
	private static final String EMPLOYEE_ID = "employee_id";
	private static final String DATE_START = "date_start";
	private static final String DATE_END = "date_end";
	private static final String DATE = "date";

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
	 * @return String with jsonArray format
	 */
	@Post("json")
	public String AttendanceList(String entity){
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
		AttendanceListManager attendanceListManager = new AttendanceListManager();
		String dateStart = null;
		String dateEnd = null;
		String searchBy = null;
		String status = null;

		try{
			JSONObject request = new JSONObject(entity);

			if(request.has(DATE_START) && request.has(DATE_END)){
				if(request.has(USER_NAME)){
					searchBy = request.getString(USER_NAME);
					status = USER_NAME;
				}else if(request.has(PROJECT_ID)){
					searchBy = request.getString(PROJECT_ID);
					status = PROJECT_ID;
				}else if(request.has(EMPLOYEE_ID)){
					searchBy = request.getString(EMPLOYEE_ID);
					status = EMPLOYEE_ID;
				}else {
					searchBy = null;
					status = DATE;
				}
				dateStart = request.getString(DATE_START);
				dateEnd = request.getString(DATE_END);

				jsonObj = attendanceListManager.accountSearchBy(dateStart, dateEnd, searchBy, status);
			}else {
				jsonObj.put("status","Error");
				jsonObj.put("message","Please check your input. Input is not complete");
			}

			response = jsonObj.toString();

		}catch(JSONException e){
			throw new AttendanceException(e);
		}

		return response;
	}
}