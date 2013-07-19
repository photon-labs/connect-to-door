package com.maretska.attendance.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.data.Form;
import org.restlet.representation.Representation;
import org.restlet.resource.Options;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import com.maretska.attendance.AttendanceException;
import com.maretska.attendance.UpdateStatusRequestManager;

/**
 * @author irawati_a
 * update status request 
 */
public class UpdateStatusRequestService extends ServerResource{

	private static final String REQUEST_ID = "param_request_id";
	private static final String EMPLOYEE_ID = "param_employee_id";
	private static final String DATE = "param_date";
	private static final String STATUS = "param_status";
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
	 * @return String with jsonArray format
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
		UpdateStatusRequestManager updateStatusRequest = new UpdateStatusRequestManager();

		try{
			JSONObject request = new JSONObject(Entity);

			if(request.has(EMPLOYEE_ID) && request.has(DATE) && request.has(REQUEST_ID) 
					&& request.has(STATUS) && request.has(ASSIGN_TO)){
				String requestId = request.getString(REQUEST_ID);
				String employeeId = request.getString(EMPLOYEE_ID);
				String date = request.getString(DATE);
				String status = request.getString(STATUS);
				String assignTo = request.getString(ASSIGN_TO);

				jsonObj = updateStatusRequest.updateStatusRequest(requestId, employeeId, date, status, assignTo);
			}else{
				jsonObj.put("status","Error");
				jsonObj.put("message","parameter is not complete");
			}

			response = jsonObj.toString();

		}catch(JSONException e){
			throw new AttendanceException(e);
		}

		return response;
	}

}
