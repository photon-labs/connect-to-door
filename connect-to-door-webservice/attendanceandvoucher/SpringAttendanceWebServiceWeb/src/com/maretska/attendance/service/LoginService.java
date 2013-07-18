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
import com.maretska.attendance.LoginManager;

/***
 * @author suryo_p
 * Validate the employee's ID and employee facebook's email from request
 */
@Controller
@RequestMapping("/login")
public class LoginService {

	private static final String EMPLOYEE_ID = "employee_id";
	private static final String FACEBOOK_ID = "facebook_id";

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
		String facebookId = null;
		JSONObject jsonObject = new JSONObject();
		LoginManager loginManager = new LoginManager();

		try {
			JSONObject request = new JSONObject(entity);

			if(request.has(EMPLOYEE_ID) && request.has(FACEBOOK_ID)){
				employeeId = request.getString(EMPLOYEE_ID);
				facebookId = request.getString(FACEBOOK_ID);

				jsonObject = loginManager.login(employeeId, facebookId);
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
