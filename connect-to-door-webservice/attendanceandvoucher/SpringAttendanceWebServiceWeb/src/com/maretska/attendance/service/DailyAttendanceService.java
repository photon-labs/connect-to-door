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
import com.maretska.attendance.DailyAttendanceManager;


@Controller
@RequestMapping("/daily-attendance")
public class DailyAttendanceService{

	private static final String EMPLOYEE_ID = "employee_id";
	private static final String DATE = "date";
	/***
	 * @author suryo_p
	 * @param entity
	 * @return String with jsonObject format
	 */
	
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String dailyAttendance(@RequestBody String entity, HttpServletResponse servletResponse){

		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 

		
        String response = null;
		String employeeId;
		String date;
		JSONObject jsonObject = new JSONObject();
		DailyAttendanceManager dailyAttendanceManager = new DailyAttendanceManager();

		try {
			JSONObject request = new JSONObject(entity);

			if(request.has(EMPLOYEE_ID) && request.has(DATE)){
				employeeId = request.getString(EMPLOYEE_ID);
				date = request.getString(DATE);

				jsonObject = dailyAttendanceManager.getDailyAttendance(employeeId, date);
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

