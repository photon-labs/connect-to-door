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
import com.maretska.attendance.AttendanceRequestDetailsManager;

/**
 * @author irawati_a
 * get employee details 
 */


@Controller
@RequestMapping("/attendance-request-details")

public class AttendanceRequestDetailsService{
	private static final String REQUEST_ID = "param_request_id";


	/**
	 * @param entity
	 * @return String with jsonObject format
	 */

	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String RequestForm(@RequestBody String entity, HttpServletResponse servletResponse){

		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 

		String response;
		JSONObject jsonObj = new JSONObject();
		AttendanceRequestDetailsManager requestDetailsManager = new AttendanceRequestDetailsManager();

		try{
			JSONObject request = new JSONObject(entity);

			if(request.has(REQUEST_ID)){
				String requestId = request.getString(REQUEST_ID);
				
				jsonObj = requestDetailsManager.requestDetails(requestId);
			}else{
				jsonObj.put("status","Error");
			}

			response = jsonObj.toString();

		}catch(JSONException e){
			throw new AttendanceException(e);
		}

		return response;
	}
}
