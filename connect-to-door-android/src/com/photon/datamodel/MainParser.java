package com.photon.datamodel;

import org.json.JSONException;
import org.json.JSONObject;

public abstract class MainParser {
	
	public JSONObject jsonObject;

	public MainParser(JSONObject jsonObject) {
		this.jsonObject = jsonObject;
	}
	
	public MainParser(String jsonString){
		try {
			this.jsonObject = new JSONObject(jsonString);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			throw new RuntimeException();
		}
	}
	
	public String toJSONString(){
		return jsonObject.toString();
	}
	
	public abstract void parseSource() throws JSONException;

}
