package com.maretska.attendance.service;

import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.maretska.attendance.AttendanceException;
import com.maretska.attendance.UpdateStatusRequestManager;

/**
 * @author irawati_a
 * update status request 
 */

@Controller
@RequestMapping ("/update-status-request")

public class UpdateStatusRequestService{

	private static final String REQUEST_ID = "param_request_id";
	private static final String EMPLOYEE_ID = "param_employee_id";
	private static final String DATE = "param_date";
	private static final String STATUS = "param_status";
	private static final String ASSIGN_TO = "assign_to";


	/**
	 * @param entity
	 * @return String with jsonArray format
	 */

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String RequestForm(@RequestBody String entity, HttpServletResponse servletResponse){

		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 

		String response;
		JSONObject jsonObj = new JSONObject();
		UpdateStatusRequestManager updateStatusRequest = new UpdateStatusRequestManager();

		try{
			JSONObject request = new JSONObject(entity);

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
