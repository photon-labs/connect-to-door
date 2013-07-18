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
import com.maretska.attendance.SignatureManager;


@Controller
@RequestMapping("/signature")

public class SignatureService{

	private static final String EMPLOYEE_ID = "employee_id";

	/***
	 * @author suryo_p
	 * @param entity
	 * @return String with jsonObject format
	 */

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String reimburseService(@RequestBody String entity, HttpServletResponse servletResponse){

		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 

		String response = null;
		JSONObject jsonObject = new JSONObject();
		SignatureManager signatureManager = new SignatureManager();

		try {
			JSONObject request = new JSONObject(entity);

			if(request.has(EMPLOYEE_ID)){
				String employeeId = request.getString(EMPLOYEE_ID);
				jsonObject = signatureManager.getSignatureEmployee(employeeId);
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

