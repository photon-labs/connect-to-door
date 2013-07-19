package com.maretska.attendance.service;


import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.maretska.attendance.AttendanceDetailManager;
import com.maretska.attendance.AttendanceException;

/**
 * @author irawati_a
 * get attendance details employee
 */

@Controller
@RequestMapping("/attendance-detail")

public class AttendanceDetailService {
	private static final String PARAM_DAY_START = "param_day_start";
	private static final String PARAM_DAY_END = "param_day_end";
	private static final String PARAM_EMPLOYEE_ID = "param_employee_id";


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
		String paramEmployeeId;
		String paramDayStart;
		String paramDayEnd;
		JSONObject jsonObj = new JSONObject();

		AttendanceDetailManager attendanceDetailManager = new AttendanceDetailManager();

		try{
			JSONObject request = new JSONObject(entity);

			if(request.has(PARAM_EMPLOYEE_ID) && request.has(PARAM_DAY_START) && request.has(PARAM_DAY_END)){
				paramEmployeeId = request.getString(PARAM_EMPLOYEE_ID);
				paramDayStart = request.getString(PARAM_DAY_START);
				paramDayEnd = request.getString(PARAM_DAY_END);
				jsonObj = attendanceDetailManager.attendanceDetail(paramEmployeeId, paramDayStart, paramDayEnd);
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
