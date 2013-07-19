package com.maretska.attendance.service;

import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.maretska.attendance.AttendanceException;
import com.maretska.attendance.ReimburseManager;

@Controller
@RequestMapping("/reimburse")

public class ReimburseService{

	private static final String EMPLOYEE_ID = "employee_id";
	private static final String REIMBURSE_DETAIL = "detail";
	private static final String CASH_ADVANCE = "cash_advance";
	private static final String REIMBURSE_TYPE = "type";
	private static final String REIMBURSE_ID = "reimbursement_id";
	private static final String STATUS_REIMBURSEMENT = "status";
	private static final String ASSIGN_TO = "assign_to";

	/***
	 * @author suryo_p
	 * @param entity
	 * @return String with jsonObject format
	 */

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String reimburseService(@RequestBody String entity, HttpServletResponse servletResponse){

		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 

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
