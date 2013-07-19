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
import com.maretska.attendance.ReimburseManager;

public class ReimburseService extends ServerResource{

	private static final String EMPLOYEE_ID = "employee_id";
	private static final String REIMBURSE_DETAIL = "detail";
	private static final String CASH_ADVANCE = "cash_advance";
	private static final String REIMBURSE_TYPE = "type";
	private static final String REIMBURSE_ID = "reimbursement_id";
	private static final String STATUS_REIMBURSEMENT = "status";
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

	/***
	 * @author suryo_p
	 * @param entity
	 * @return String with jsonObject format
	 */
	@Post("json")
	public String reimburseService(String entity){
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
		ReimburseManager reimburseManager = new ReimburseManager();

		try {
			JSONObject request = new JSONObject(entity);

			if(request.has(EMPLOYEE_ID) && request.has(STATUS_REIMBURSEMENT) && request.has(REIMBURSE_DETAIL) && request.has(REIMBURSE_TYPE) && request.has(CASH_ADVANCE)){
				JSONArray reimburseDetailInArray = request.getJSONArray(REIMBURSE_DETAIL);
				String employeeId = request.getString(EMPLOYEE_ID);
				String cashAdvance = request.getString(CASH_ADVANCE);
				String reimburseType = request.getString(REIMBURSE_TYPE);
				String status = request.getString(STATUS_REIMBURSEMENT);
				String assignTo = request.getString(ASSIGN_TO);

				// input data reimbursement
				jsonObject = reimburseManager.inputDataReimburse(employeeId, cashAdvance, reimburseType, status, assignTo, reimburseDetailInArray);
			}else if(request.has(REIMBURSE_ID) && request.has(STATUS_REIMBURSEMENT) && request.has(EMPLOYEE_ID)){
				String reimbursementId = request.getString(REIMBURSE_ID);
				String statusReimbursement = request.getString(STATUS_REIMBURSEMENT);
				String employeeId = request.getString(EMPLOYEE_ID);
				String assignTo = request.getString(ASSIGN_TO);

				// update status reimbursement
				jsonObject = reimburseManager.updateReimbursementStatus(reimbursementId, statusReimbursement, employeeId, assignTo);
			}else if(request.has(REIMBURSE_ID)){
				String reimbursementId = request.getString(REIMBURSE_ID);

				// get content of reimbursement
				jsonObject = reimburseManager.getReimbursementDataEmployee(reimbursementId);
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
