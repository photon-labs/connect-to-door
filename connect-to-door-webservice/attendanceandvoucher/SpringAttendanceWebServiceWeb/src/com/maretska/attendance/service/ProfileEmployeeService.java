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
import com.maretska.attendance.ProfileManager;

@Controller
@RequestMapping("/profile")
public class ProfileEmployeeService {

	private static final String EMPLOYEE_ID = "employee_id";
	private static final String USERNAME = "username";
	private static final String SEARCH_BY = "search_by";

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String lgetEmployeeProfile(@RequestBody String entity, HttpServletResponse servletResponse){

		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 


		String response = null;
		JSONObject jsonObject = new JSONObject();
		ProfileManager profileManager = new ProfileManager();

		try{
			JSONObject request = new JSONObject(entity);

			if(request.has(SEARCH_BY) && request.has(EMPLOYEE_ID)){
				String employeeId = request.getString(EMPLOYEE_ID);
				String searchBy = request.getString(SEARCH_BY);
				jsonObject = profileManager.getProfileEmployee(employeeId, searchBy);
			}else if(request.has(SEARCH_BY) && request.has(USERNAME)){
				String username = request.getString(USERNAME);
				String searchBy = request.getString(SEARCH_BY);
				jsonObject = profileManager.getProfileEmployee(username, searchBy);
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
