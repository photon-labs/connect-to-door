package com.photon.connecttodoor.datamodel;

import org.json.JSONException;
import org.json.JSONObject;

public class ProfileModel {
	String maternity;
	String cOff;
	String annual;
	String condolences;
	String employeeName;
	String onsite;
	String paternity;
	String username;
	String authority;
	String married;
	String projectId;
	String gender;
	String sick;
	String employeeEmail;
	String facebookId;
	String employeeId;
	String employeeStartWork;
	String signature;
	public String getMaternity() {
		return maternity;
	}
	public void setMaternity(String maternity) {
		this.maternity = maternity;
	}
	public String getcOff() {
		return cOff;
	}
	public void setcOff(String cOff) {
		this.cOff = cOff;
	}
	public String getAnnual() {
		return annual;
	}
	public void setAnnual(String annual) {
		this.annual = annual;
	}
	public String getCondolences() {
		return condolences;
	}
	public void setCondolences(String condolences) {
		this.condolences = condolences;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getOnsite() {
		return onsite;
	}
	public void setOnsite(String onsite) {
		this.onsite = onsite;
	}
	public String getPaternity() {
		return paternity;
	}
	public void setPaternity(String paternity) {
		this.paternity = paternity;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public String getMarried() {
		return married;
	}
	public void setMarried(String married) {
		this.married = married;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getSick() {
		return sick;
	}
	public void setSick(String sick) {
		this.sick = sick;
	}
	public String getEmployeeEmail() {
		return employeeEmail;
	}
	public void setEmployeeEmail(String employeeEmail) {
		this.employeeEmail = employeeEmail;
	}
	public String getFacebookId() {
		return facebookId;
	}
	public void setFacebookId(String facebookId) {
		this.facebookId = facebookId;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public String getEmployeeStartWork() {
		return employeeStartWork;
	}
	public void setEmployeeStartWork(String employeeStartWork) {
		this.employeeStartWork = employeeStartWork;
	}
	public String getSignature() {
		return signature;
	}
	public void setSignature(String signature) {
		this.signature = signature;
	}
	
	public void parseJSON(String response) throws JSONException{
		JSONObject responseObject = new JSONObject(response);
		if (responseObject.has("maternity")){
			this.setMaternity(responseObject.getString("maternity"));
		}
		if (responseObject.has("c_off")){
			this.setcOff(responseObject.getString("c_off"));
		}
		if (responseObject.has("annual")){
			this.setAnnual(responseObject.getString("annual"));
		}
		if (responseObject.has("condolences")){
			this.setCondolences(responseObject.getString("condolences"));
		}
		if (responseObject.has("employee_name")){
			this.setEmployeeName(responseObject.getString("employee_name"));
		}
		if (responseObject.has("onsite")){
			this.setOnsite(responseObject.getString("onsite"));
		}
		if (responseObject.has("paternity")){
			this.setPaternity(responseObject.getString("paternity"));
		}
		if (responseObject.has("married")){
			this.setMarried(responseObject.getString("married"));
		}
		if (responseObject.has("project_id")){
			this.setProjectId(responseObject.getString("project_id"));
		}
		if (responseObject.has("sick")){
			this.setSick(responseObject.getString("sick"));
		}
		if (responseObject.has("employee_email_photon")){
			this.setEmployeeEmail(responseObject.getString("employee_email_photon"));
		}
		if (responseObject.has("employee_id")){
			this.setEmployeeId(responseObject.getString("employee_id"));
		}
		if (responseObject.has("employee_start_work")){
			this.setEmployeeStartWork(responseObject.getString("employee_start_work"));
		}
		if (responseObject.has("authority")){
			this.setAuthority(responseObject.getString("authority"));
		}
		if (responseObject.has("facebook_id")){
			this.setFacebookId(responseObject.getString("facebook_id"));
		}
		if (responseObject.has("signature")){
			this.setSignature(responseObject.getString("signature"));
		}
		if (responseObject.has("gender")){
			this.setGender(responseObject.getString("gender"));
		}
		if (responseObject.has("user_name")){
			this.setUsername(responseObject.getString("user_name"));
		}
		
	}
}
