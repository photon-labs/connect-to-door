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
import com.maretska.attendance.AttendanceReportManager;


@Controller
@RequestMapping("/report")

public class AttandanceReportService {

	private static final String STATUS = "status";
	private static final String MONTH = "month";

	/***
	 * @author suryo_p
	 * handle before adjustment, after adjustment and adjustment request for Attendance Report
	 * @param entity
	 * @return response JSONArray in String
	 */

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String attendanceReport(@RequestBody String entity, HttpServletResponse servletResponse){

		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 
		
		String response = null;
		JSONObject jsonObject = new JSONObject();
		AttendanceReportManager attendanceReportManager = new AttendanceReportManager();

		try {
			JSONObject request = new JSONObject(entity);

			if(request.has(STATUS) && request.has(MONTH)){
				String statusAdjustment = request.getString(STATUS);
				String requestedMonth = request.getString(MONTH);
				jsonObject = attendanceReportManager.getAttendanceReport(statusAdjustment, requestedMonth);
			}else{
				jsonObject.put("status", "error");
				jsonObject.put("message", "bad request");
			}

			response = jsonObject.toString();

		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return response;
	}
}