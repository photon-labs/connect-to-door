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
import com.maretska.attendance.AttendanceListManager;

/**
 * @author irawati_a
 * get attendance list employees
 */

@Controller
@RequestMapping("/attendance-list")

public class AttendanceListService {
	private static final String USER_NAME = "user_name";
	private static final String PROJECT_ID = "project_id";
	private static final String EMPLOYEE_ID = "employee_id";
	private static final String DATE_START = "date_start";
	private static final String DATE_END = "date_end";
	private static final String DATE = "date";

	/**
	 * @param entity
	 * @return String with jsonArray format
	 */

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String AttendanceList(@RequestBody String entity, HttpServletResponse servletResponse){
		
		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 
		
		String response;
		JSONObject jsonObj = new JSONObject();
		AttendanceListManager attendanceListManager = new AttendanceListManager();
		String dateStart = null;
		String dateEnd = null;
		String searchBy = null;
		String status = null;

		try{
			JSONObject request = new JSONObject(entity);

			if(request.has(DATE_START) && request.has(DATE_END)){
				if(request.has(USER_NAME)){
					searchBy = request.getString(USER_NAME);
					status = USER_NAME;
				}else if(request.has(PROJECT_ID)){
					searchBy = request.getString(PROJECT_ID);
					status = PROJECT_ID;
				}else if(request.has(EMPLOYEE_ID)){
					searchBy = request.getString(EMPLOYEE_ID);
					status = EMPLOYEE_ID;
				}else {
					searchBy = null;
					status = DATE;
				}
				dateStart = request.getString(DATE_START);
				dateEnd = request.getString(DATE_END);

				jsonObj = attendanceListManager.accountSearchBy(dateStart, dateEnd, searchBy, status);
			}else {
				jsonObj.put("status","Error");
				jsonObj.put("message","Please check your input. Input is not complete");
			}

			response = jsonObj.toString();

		}catch(JSONException e){
			throw new AttendanceException(e);
		}

		return response;
	}
}