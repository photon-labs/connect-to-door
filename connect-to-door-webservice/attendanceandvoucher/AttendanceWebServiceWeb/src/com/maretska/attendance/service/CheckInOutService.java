package com.maretska.attendance.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.data.Form;
import org.restlet.representation.Representation;
import org.restlet.resource.Options;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import com.maretska.attendance.AttendanceException;
import com.maretska.attendance.CheckInOutManager;

public class CheckInOutService extends ServerResource{

	private static final String EMPLOYEE_ID = "employee_id";
	private static final String STATUS = "status";

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

	/***
	 * @author suryo_p
	 * handle check-in and check-out request
	 * @param entity
	 * @return response JSONObject in String
	 */
	@Post("json")
	public String checkInAttendance(String entity){
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
		String checkInOutStatus;
		JSONObject jsonObject = new JSONObject();
		CheckInOutManager checkInOutManager = new CheckInOutManager();
		String employeeId;

		try{
			JSONObject request = new JSONObject(entity);

			if(request.has(EMPLOYEE_ID) && request.has(STATUS)){
				employeeId = request.getString(EMPLOYEE_ID);
				checkInOutStatus = request.getString(STATUS);
				jsonObject = checkInOutManager.doCheckInOut(employeeId, checkInOutStatus);
			}else{
				jsonObject.put("status", "error");
				jsonObject.put("message", "bad request");
			}

			response = jsonObject.toString();

		}catch(JSONException e){
			throw new AttendanceException(e);
		}

		return response;
	}
}
