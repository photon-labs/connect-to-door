package com.maretska.attendance.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.data.Form;
import org.restlet.representation.Representation;
import org.restlet.resource.Options;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import com.maretska.attendance.AttendanceDetailUpdateManager;
import com.maretska.attendance.AttendanceException;

/**
 * @author irawati_a
 * update attendance details
 */
public class AttendanceDetailUpdateService extends ServerResource{
	
	private static final String EMPLOYEE_ID = "param_emp_id";
	private static final String ADMIN_ID = "param_admin";
	private static final String EMPLOYEE_DETAIL = "employee_detail";
	
	@Options
	public void doOptions(Representation entity) {
		httpHeaders();
	}

	/**
	 * @param entity
	 * @return String with jsonArray format
	 */
	@Post("json")
	public String AttendanceDetail(String entity){
		httpHeaders();

		String response = null;
		JSONObject jsonObj = new JSONObject();
		
		AttendanceDetailUpdateManager attendanceDetailUpdateManager = new AttendanceDetailUpdateManager();

		try{
			JSONObject request = new JSONObject(entity);

			if(request.has(EMPLOYEE_ID) && request.has(ADMIN_ID) && request.has(EMPLOYEE_DETAIL)){
				String employeeId = request.getString(EMPLOYEE_ID);
				String adminId = request.getString(ADMIN_ID);
				JSONArray employeeDetail = request.getJSONArray(EMPLOYEE_DETAIL);
				jsonObj = attendanceDetailUpdateManager.attendanceDetailUpdate(employeeId, adminId, employeeDetail);
			}else {
				jsonObj.put("status","Error");
				jsonObj.put("message","Bad Request");
			}

			response = jsonObj.toString();

		}catch (JSONException e) {
			throw new AttendanceException(e);
		}


		return response;
	}
	private void httpHeaders() {
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
