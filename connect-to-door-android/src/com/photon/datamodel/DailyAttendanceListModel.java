package com.photon.datamodel;

import org.json.JSONException;
import org.json.JSONObject;

public class DailyAttendanceListModel extends MainParser{

	private String number;
	private String name;
	private String checkIn;
	private String checkOut;
	
	
	public DailyAttendanceListModel(JSONObject jsonObject) {
		super(jsonObject);
		// TODO Auto-generated constructor stub
	}

	public DailyAttendanceListModel(String jsonString) {
		super(jsonString);
		// TODO Auto-generated constructor stub
	}
	
	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCheckIn() {
		return checkIn;
	}

	public void setCheckIn(String checkIn) {
		this.checkIn = checkIn;
	}

	public String getCheckOut() {
		return checkOut;
	}

	public void setCheckOut(String checkOut) {
		this.checkOut = checkOut;
	}

	@Override
	public void parseSource() throws JSONException {
		// TODO Auto-generated method stub
		if(jsonObject.has("no")){
			String number = jsonObject.getString("no");
			this.setNumber(number);
		}
		if(jsonObject.has("name")){
			String name = jsonObject.getString("name");
			this.setName(name);
		}
		if(jsonObject.has("check_in")){
			String checkIn = jsonObject.getString("check_in");
			this.setCheckIn(checkIn);
		}
		if(jsonObject.has("check_out")){
			String checkOut = jsonObject.getString("check_out");
			this.setCheckOut(checkOut);
		}
	}

	
}
