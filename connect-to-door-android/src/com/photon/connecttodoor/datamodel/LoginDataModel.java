package com.photon.connecttodoor.datamodel;

import java.io.Serializable;

import org.json.JSONException;
import org.json.JSONObject;

public class LoginDataModel implements Serializable{
	String username;
	String previlage;
	String message;
	String status;
	private static final long serialVersionUID = 1L;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPrevilage() {
		return previlage;
	}
	public void setPrevilage(String previlage) {
		this.previlage = previlage;
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
	
	public void parseJSON(String response) throws JSONException{
		JSONObject responseObject = new JSONObject(response);
		if (responseObject.has("username")){
			this.setUsername(responseObject.getString("username"));
		}
		if (responseObject.has("isAdmin")){
			this.setPrevilage(responseObject.getString("isAdmin"));
		}
		if (responseObject.has("message")){
			this.setMessage(responseObject.getString("message"));
		}
		if (responseObject.has("status")){
			this.setStatus(responseObject.getString("status"));
		}
		
	}
}
