package com.photon.connecttodoor.datamodel;

import org.json.JSONException;
import org.json.JSONObject;

public class CheckPresentModel {
	String checkout;
	String checkin;
	String presenceId;
	String employeeId;
	public String getCheckout() {
		return checkout;
	}
	public void setCheckout(String checkout) {
		this.checkout = checkout;
	}
	public String getCheckin() {
		return checkin;
	}
	public void setCheckin(String checkin) {
		this.checkin = checkin;
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
	
	public void parseSource(String response) throws JSONException {
		JSONObject responseObject = new JSONObject(response);
		if(responseObject.has("check_out")){
			this.setCheckout(responseObject.getString("check_out"));
		}
		if(responseObject.has("check_in")){
			this.setCheckin(responseObject.getString("check_in"));
		}
		if(responseObject.has("presence_id")){
			this.setPresenceId(responseObject.getString("presence_id"));
		}
		if(responseObject.has("employee_id")){
			this.setEmployeeId(responseObject.getString("employee_id"));
		}
	}
}
