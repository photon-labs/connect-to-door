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

/***
 * @author suryo_p
 * Validate the employee's ID and employee facebook's email from request
 */
@Controller
@RequestMapping("/force-login")
public class ForceCheckInOutService {

	private static final String EMPLOYEE_ID = "employee_id";
	private static final String DATE = "date";
	private static final String TIME_CHECKIN = "time_checkIn";
	private static final String TIME_CHECKOUT = "time_checkOut";

	/***
	 * @author suryo_p
	 * @param entity
	 * @return String with jsonObject format
	 */
	
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String loginAttendance(@RequestBody String entity, HttpServletResponse servletResponse){
        
		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 

		String response = null;
		String employeeId = null;
		String dateCheckInOut = null;
		String timeCheckIn = null;
		String timeCheckOut = null;
		JSONObject jsonObject = new JSONObject();
		CheckInOutManager checkInOutManager = new CheckInOutManager();

		try {
			JSONObject request = new JSONObject(entity);

			if(request.has(EMPLOYEE_ID) && request.has(DATE) && request.has(TIME_CHECKIN) &&
					request.has(TIME_CHECKOUT)){
				employeeId = request.getString(EMPLOYEE_ID);
				dateCheckInOut = request.getString(DATE);
				timeCheckIn = request.getString(TIME_CHECKIN);
				timeCheckOut = request.getString(TIME_CHECKOUT);

				jsonObject = checkInOutManager.forceCheckInOut(employeeId, dateCheckInOut, timeCheckIn, timeCheckOut);
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