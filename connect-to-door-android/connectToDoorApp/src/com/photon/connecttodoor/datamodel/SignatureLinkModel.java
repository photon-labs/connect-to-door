package com.photon.connecttodoor.datamodel;

import org.json.JSONException;
import org.json.JSONObject;

public class SignatureLinkModel {
	String status;
	String urlSignature;
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getUrlSignature() {
		return urlSignature;
	}
	public void setUrlSignature(String urlSignature) {
		this.urlSignature = urlSignature;
	}
	
	public void parseJSON(String response) throws JSONException{
		JSONObject responseObject = new JSONObject(response);
		if (responseObject.has("status")){
			this.setStatus(responseObject.getString("status"));
		}
		if (responseObject.has("signature")){
			this.setUrlSignature(responseObject.getString("signature"));
		}
	}
}
