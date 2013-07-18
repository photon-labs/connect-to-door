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
import com.maretska.attendance.CreateAndEditAccountManager;

@Controller
@RequestMapping("/create-edit-account")

public class CreateAndEditAccountService{

	private static final String STATUS = "status";
	private static final String EMPLOYEE_ID = "employee_id";


	/***
	 * @author suryo_p
	 * handle "create" and "edit" account request
	 * @param entity
	 * @return response JSONObject in String
	 */
	@RequestMapping(method = RequestMethod.POST)
	public @ResponseBody String accountService(@RequestBody String entity, HttpServletResponse servletResponse){

		servletResponse.addHeader("Access-Control-Allow-Origin", "*");
		servletResponse.addHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
		servletResponse.addHeader("Access-Control-Allow-Headers", "content-type"); 

		String response = null;
		JSONObject jsonObject = new JSONObject();
		CreateAndEditAccountManager createAndEditAccountManager = new CreateAndEditAccountManager();

		try {
			JSONObject request = new JSONObject(entity);
			String statusAccount = request.getString(STATUS);

			if(statusAccount.equals("create")){
				jsonObject = createAndEditAccountManager.createAccount(request);
			}else if(statusAccount.equals("update")){
				jsonObject = createAndEditAccountManager.editAccount(request);
			}else if(statusAccount.equals("delete")){
				String employeeId = request.getString(EMPLOYEE_ID);
				jsonObject = createAndEditAccountManager.deactivateAccount(employeeId);
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
