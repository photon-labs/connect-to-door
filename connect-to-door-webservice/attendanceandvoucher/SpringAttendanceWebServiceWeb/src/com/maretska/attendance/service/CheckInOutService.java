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
import com.maretska.attendance.CheckInOutManager;

@Controller
@RequestMapping("/check-in-out")
public class CheckInOutService{

	private static final String EMPLOYEE_ID = "employee_id";
	private static final String STATUS = "status";
	
	/***
	 * @author suryo_p
	 * handle check-in and check-out request
	 * @param entity
	 * @return response JSONObject in String
	 */

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String checkInAttendance(@RequestBody String entity, HttpServletResponse servletResponse){

		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 
			
		String response;
		String checkInOutStatus;
		JSONObject jsonObject = new JSONObject();
		CheckInOutManager checkInOutManager = new CheckInOutManager();
		String employeeId;

		try{
			JSONObject request = new JSONObject(entity);

			if(request.has(EMPLOYEE_ID) && request.has(STATUS)){
				employeeId = request.getString(EMPLOYEE_ID);
				checkInOutStatus = request.getString(STATUS);
				jsonObject = checkInOutManager.doCheckInOut(employeeId, checkInOutStatus);
			}else{
				jsonObject.put("status", "error");
				jsonObject.put("message", "bad request");
			}

			response = jsonObject.toString();

		}catch(JSONException e){
			throw new AttendanceException(e);
		}

		return response;
	}
}

