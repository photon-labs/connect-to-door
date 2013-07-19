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
import com.maretska.attendance.ListRecipientManager;

@Controller
@RequestMapping("/list-recipients")

public class ListRecipientService{

	private static final String PARAMETER = "parameter";

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
		String parameterRequest = null;
		JSONObject jsonObject = new JSONObject();
		ListRecipientManager listRecipientManager = new ListRecipientManager();

		try {
			JSONObject request = new JSONObject(entity);

			if(request.has(PARAMETER)){
				parameterRequest = request.getString(PARAMETER);

				jsonObject = listRecipientManager.getListOfRecipients(parameterRequest);
			}else{
				jsonObject.put("status", "error");
				jsonObject.put("message", "Bad Request");
			}

			response = jsonObject.toString();

		} catch (JSONException e) {
			throw new AttendanceException(e);
		}

		return response;
	}
}
