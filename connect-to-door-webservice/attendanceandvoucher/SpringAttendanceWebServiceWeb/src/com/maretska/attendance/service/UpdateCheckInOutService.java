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
import com.maretska.attendance.UpdateCheckInOutManager;

@Controller
@RequestMapping("/update-check-in-out")
public class UpdateCheckInOutService {

	private static final String EMPLOYEE_ID = "employee_id";
	private static final String PRESENCE_ID = "presenceId";
	private static final String CHECK_IN = "checkIn";
	private static final String CHECK_OUT = "checkOut";
	private static final String DATE = "date";


	/***
	 * @author suryo_p
	 * @param entity
	 * @return String with jsonObject format
	 */
	
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String updateCheckInOut(@RequestBody String entity, HttpServletResponse servletResponse){
	
		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 

        
        String response = null;
		String employeeId;
		String presenceId;
		String checkIn;
		String checkOut;
		String dateRequestDailyAttendance;
		JSONObject jsonObject = new JSONObject();
		UpdateCheckInOutManager updateCheckInOutManager = new UpdateCheckInOutManager();

		try {
			JSONObject request = new JSONObject(entity);

			if(request.has(EMPLOYEE_ID) && request.has(PRESENCE_ID) && request.has(CHECK_IN) && request.has(CHECK_OUT)){
				employeeId = request.getString(EMPLOYEE_ID);
				presenceId = request.getString(PRESENCE_ID);
				checkIn = request.getString(CHECK_IN);
				checkOut = request.getString(CHECK_OUT);
				dateRequestDailyAttendance = request.getString(DATE);

				jsonObject = updateCheckInOutManager.doUpdate(employeeId, presenceId, checkIn, checkOut, dateRequestDailyAttendance);
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
