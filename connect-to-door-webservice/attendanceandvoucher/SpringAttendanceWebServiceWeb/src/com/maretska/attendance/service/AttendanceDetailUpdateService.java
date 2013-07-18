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

import com.maretska.attendance.AttendanceDetailUpdateManager;
import com.maretska.attendance.AttendanceException;

/**
 * @author irawati_a
 * update attendance details
 */

@Controller
@RequestMapping("/attendance-detail-update")

public class AttendanceDetailUpdateService{

	private static final String EMPLOYEE_ID = "param_emp_id";
	private static final String ADMIN_ID = "param_admin";
	private static final String EMPLOYEE_DETAIL = "employee_detail";

	/**
	 * @param entity
	 * @return String with jsonArray format
	 */
	
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String AttendanceDetail(@RequestBody String entity, HttpServletResponse servletResponse){
		
		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 

		String response = null;
		JSONObject jsonObj = new JSONObject();

		AttendanceDetailUpdateManager attendanceDetailUpdateManager = new AttendanceDetailUpdateManager();

		try{
			JSONObject request = new JSONObject(entity);

			if(request.has(EMPLOYEE_ID) && request.has(ADMIN_ID) && request.has(EMPLOYEE_DETAIL)){
				String employeeId = request.getString(EMPLOYEE_ID);
				String adminId = request.getString(ADMIN_ID);
				JSONArray employeeDetail = request.getJSONArray(EMPLOYEE_DETAIL);
				jsonObj = attendanceDetailUpdateManager.attendanceDetailUpdate(employeeId, adminId, employeeDetail);
			}else {
				jsonObj.put("status","Error");
				jsonObj.put("message","Bad Request");
			}

			response = jsonObj.toString();

		}catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return response;
	}

}
