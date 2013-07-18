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
import com.maretska.attendance.AttendanceRequestManager;

/**
 * @author irawati_a
 * Update request details and get request ID
 */

@Controller
@RequestMapping ("/attendance-request")
public class AttendanceRequestService{
	private static final String EMPLOYEE_ID = "param_emp_id";
	private static final String DATE = "param_date";
	private static final String DETAILS_FORM = "details_form";
	private static final String ASSIGN_TO = "assign_to";



	/**
	 * @param entity
	 * @return String with jsonObject format
	 */
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String RequestForm(@RequestBody String entity, HttpServletResponse servletResponse){

		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 

		String response;
		JSONObject jsonObj = new JSONObject();
		AttendanceRequestManager requestFromManager = new AttendanceRequestManager();

		try{
			JSONObject request = new JSONObject(entity);

			if(request.has(EMPLOYEE_ID) && request.has(DATE) && request.has(DETAILS_FORM) && request.has(ASSIGN_TO)){
				String employeeId = request.getString(EMPLOYEE_ID);
				String date = request.getString(DATE);
				String assignTo = request.getString(ASSIGN_TO);
				JSONArray detailsJsonArray = request.getJSONArray(DETAILS_FORM);

				jsonObj = requestFromManager.requestForm(employeeId, date, assignTo, detailsJsonArray);
			}else{
				jsonObj.put("status","Error");
				jsonObj.put("message","Parameter is not complete");
			}

			response = jsonObj.toString();

		}catch(JSONException e){
			throw new AttendanceException(e);
		}

		return response;
	}
}
