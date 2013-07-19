package com.maretska.attendance.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.data.Form;
import org.restlet.representation.Representation;
import org.restlet.resource.Options;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import com.maretska.attendance.AttendanceException;
import com.maretska.attendance.UpdateCheckInOutManager;

public class UpdateCheckInOutService extends ServerResource{

	private static final String EMPLOYEE_ID = "employee_id";
	private static final String PRESENCE_ID = "presenceId";
	private static final String CHECK_IN = "checkIn";
	private static final String CHECK_OUT = "checkOut";

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
	 * @param entity
	 * @return String with jsonObject format
	 */
	@Post("json")
	public String updateCheckInOut(String entity){
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
		String employeeId;
		String presenceId;
		String checkIn;
		String checkOut;
		JSONObject jsonObject = new JSONObject();
		UpdateCheckInOutManager updateCheckInOutManager = new UpdateCheckInOutManager();

		try {
			JSONObject request = new JSONObject(entity);

			if(request.has(EMPLOYEE_ID) && request.has(PRESENCE_ID) && request.has(CHECK_IN) && request.has(CHECK_OUT)){
				employeeId = request.getString(EMPLOYEE_ID);
				presenceId = request.getString(PRESENCE_ID);
				checkIn = request.getString(CHECK_IN);
				checkOut = request.getString(CHECK_OUT);

				jsonObject = updateCheckInOutManager.doUpdate(employeeId, presenceId, checkIn, checkOut);
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
