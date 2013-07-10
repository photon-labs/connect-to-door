package com.photon.connecttodoor.datamodel;

import org.json.JSONException;
import org.json.JSONObject;

public class CheckPresentModel {
	String checkoutPresent;
	String checkinPresent;
	String presenceId;
	String employeeId;
	String message;
	String status;
	String check_in;
	String check_out;
	public String getCheckoutPresent() {
		return checkoutPresent;
	}
	public void setCheckoutPresent(String checkoutPresent) {
		this.checkoutPresent = checkoutPresent;
	}
	public String getCheckinPresent() {
		return checkinPresent;
	}
	public void setCheckinPresent(String checkinPresent) {
		this.checkinPresent = checkinPresent;
	}
	public String getPresenceId() {
		return presenceId;
	}
	public void setPresenceId(String presenceId) {
		this.presenceId = presenceId;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCheck_in() {
		return check_in;
	}
	public void setCheck_in(String check_in) {
		this.check_in = check_in;
	}
	public String getCheck_out() {
		return check_out;
	}
	public void setCheck_out(String check_out) {
		this.check_out = check_out;
	}
	
	public void parseSource(String response) throws JSONException {
		JSONObject responseObject = new JSONObject(response);
		if(responseObject.has("check_out")){
			this.setCheckoutPresent(responseObject.getString("check_out"));
		}
		if(responseObject.has("check_in")){
			this.setCheckinPresent(responseObject.getString("check_in"));
		}
		if(responseObject.has("presence_id")){
			this.setPresenceId(responseObject.getString("presence_id"));
		}
		if(responseObject.has("employee_id")){
			this.setEmployeeId(responseObject.getString("employee_id"));
		}
		if(responseObject.has("message")){
			this.setMessage(responseObject.getString("message"));
		}
		if(responseObject.has("status")){
			this.setStatus(responseObject.getString("status"));
		}
		if(responseObject.has("checkOut")){
			this.setCheck_out(responseObject.getString("checkOut"));
		}
		if(responseObject.has("checkIn")){
			this.setCheck_in(responseObject.getString("checkIn"));
		}
	}
}
