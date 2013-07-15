package com.photon.connecttodoor.controller;

import org.json.JSONException;
import org.json.JSONObject;

import com.photon.connecttodoor.utils.ApplicationConstant;

public class CreateandEditAccountService {
	/**
	 * @author febrianto_s
	 * handle request for create and edit account
	 * @param status
	 * @param employeeID
	 * @param username
	 * @param projectID
	 * @param name
	 * @param emailPhoton
	 * @param facebookId
	 * @param startWork
	 * @param jobRole
	 * @param annual
	 * @param coff
	 * @param condolences
	 * @param married
	 * @param maternity
	 * @param paternity
	 * @param onsite
	 * @param sick
	 * @param dataURLSignature
	 * @param gender
	 * @return
	 */
	public String handleCreateandEditAccountRequest(final String status, final String employeeID, final String username, final String projectID, final String name, final String emailPhoton, final String facebookId, final String startWork, 
			final String jobRole, final String annual, final String coff,final String condolences, final String married, 
			final String maternity, final String paternity, final String onsite, final String sick, 
			final String dataURLSignature, final String gender){
		final HttpAdapter httpAdapter = new HttpAdapter();
		String moduleCreateEditAccount = ApplicationConstant.MODULE_CREATE_EDIT_DELETE_ACCOUNT;
		String responseString ;
		JSONObject response = null ;
		JSONObject postBody = new JSONObject();
		try {	
			postBody.put("status", status);
			postBody.put("employee_id", employeeID);
			postBody.put("username", username);
			postBody.put("project_id", projectID);
			postBody.put("name", name);
			postBody.put("email_photon", emailPhoton);
			postBody.put("facebook_id", facebookId);
			postBody.put("start_work", startWork);
			postBody.put("job_role", jobRole);
			postBody.put("annual", annual);
			postBody.put("c_off", coff);
			postBody.put("condolences", condolences);
			postBody.put("married", married);
			postBody.put("maternity", maternity);
			postBody.put("paternity", paternity);
			postBody.put("onsite", onsite);
			postBody.put("sick", sick);
			postBody.put("signature", dataURLSignature);
			postBody.put("gender", gender);
			String postBodyString = postBody.toString();
			final String jsonString = httpAdapter.sendPostRequest(postBodyString, moduleCreateEditAccount);
			response = new JSONObject(jsonString);
		}catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		responseString = response.toString();
		return responseString;
	}
}
