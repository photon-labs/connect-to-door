package com.maretska.attendance.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.data.Form;
import org.restlet.representation.Representation;
import org.restlet.resource.Options;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import com.maretska.attendance.AttendanceException;
import com.maretska.attendance.AttendanceReportManager;

public class AttandanceReportService extends ServerResource{

	private static final String STATUS = "status";
	private static final String MONTH = "month";

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
	 * handle before adjustment, after adjustment and adjustment request for Attendance Report
	 * @param entity
	 * @return response JSONArray in String
	 */
	@Post("json")
	public String attendanceReport(String entity){
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
		AttendanceReportManager attendanceReportManager = new AttendanceReportManager();

		try {
			JSONObject request = new JSONObject(entity);

			if(request.has(STATUS) && request.has(MONTH)){
				String statusAdjustment = request.getString(STATUS);
				String requestedMonth = request.getString(MONTH);
				jsonObject = attendanceReportManager.getAttendanceReport(statusAdjustment, requestedMonth);
			}else{
				jsonObject.put("status", "error");
				jsonObject.put("message", "bad request");
			}

			response = jsonObject.toString();

		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return response;
	}
}