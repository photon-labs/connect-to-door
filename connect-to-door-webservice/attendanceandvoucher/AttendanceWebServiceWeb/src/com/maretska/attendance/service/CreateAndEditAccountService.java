package com.maretska.attendance.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.restlet.data.Form;
import org.restlet.representation.Representation;
import org.restlet.resource.Options;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import com.maretska.attendance.AttendanceException;
import com.maretska.attendance.CreateAndEditAccountManager;

public class CreateAndEditAccountService extends ServerResource{

	private static final String STATUS = "status";
	private static final String EMPLOYEE_ID = "employee_id";

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
	 * handle "create" and "edit" account request
	 * @param entity
	 * @return response JSONObject in String
	 */
	@Post("json")
	public String accountService(String entity){
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
		CreateAndEditAccountManager createAndEditAccountManager = new CreateAndEditAccountManager();

		try {
			JSONObject request = new JSONObject(entity);
			String statusAccount = request.getString(STATUS);

			if(statusAccount.equals("create")){
				jsonObject = createAndEditAccountManager.createAccount(request);
			}else if(statusAccount.equals("update")){
				jsonObject = createAndEditAccountManager.editAccount(request);
			}else if(statusAccount.equals("delete")){
				String employeeId = request.getString(EMPLOYEE_ID);
				jsonObject = createAndEditAccountManager.deactivateAccount(employeeId);
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
