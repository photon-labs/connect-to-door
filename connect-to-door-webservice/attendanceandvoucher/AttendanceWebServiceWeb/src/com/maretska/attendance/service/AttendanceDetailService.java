package com.maretska.attendance.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.data.Form;
import org.restlet.representation.Representation;
import org.restlet.resource.Options;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import com.maretska.attendance.AttendanceDetailManager;
import com.maretska.attendance.AttendanceException;

/**
 * @author irawati_a
 * get attendance details employee
 */
public class AttendanceDetailService extends ServerResource{
	private static final String PARAM_DAY_START = "param_day_start";
	private static final String PARAM_DAY_END = "param_day_end";
	private static final String PARAM_EMPLOYEE_ID = "param_employee_id";

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
	public String AttendanceDetail(String entity){
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
		JSONObject jsonObj = new JSONObject();
		String paramEmployeeId;
		String paramDayStart;
		String paramDayEnd;

		AttendanceDetailManager attendanceDetailManager = new AttendanceDetailManager();

		try{
			JSONObject request = new JSONObject(entity);

			if(request.has(PARAM_EMPLOYEE_ID) && request.has(PARAM_DAY_START) && request.has(PARAM_DAY_END)){
				paramEmployeeId = request.getString(PARAM_EMPLOYEE_ID);
				paramDayStart = request.getString(PARAM_DAY_START);
				paramDayEnd = request.getString(PARAM_DAY_END);
				jsonObj = attendanceDetailManager.attendanceDetail(paramEmployeeId, paramDayStart, paramDayEnd);
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

}
