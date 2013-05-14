package com.photon.datamodel;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class AttendanceModel extends MainParser {

	private ArrayList<AttendanceListModel> attendanceListModels;

	public AttendanceModel(String jsonString) {
		super(jsonString);
		// TODO Auto-generated constructor stub
	}
	public ArrayList<AttendanceListModel> getAttendanceListModels() {
		return attendanceListModels;
	}
	public void setAttendanceListModels(
			ArrayList<AttendanceListModel> attendanceListModels) {
		this.attendanceListModels = attendanceListModels;
	}
	
	@Override
	public void parseSource() throws JSONException {
		// TODO Auto-generated method stub
		if(jsonObject.has("attendance")){
			JSONArray attendanceJSONArray = jsonObject.getJSONArray("attendance");
			ArrayList<AttendanceListModel> attendanceArr = new ArrayList<AttendanceListModel>();

			for(int i=0;i<attendanceJSONArray.length();i++){
				JSONObject attendanceObject = attendanceJSONArray.getJSONObject(i);
				AttendanceListModel attendanceListModel = new AttendanceListModel(attendanceObject);
				attendanceListModel.parseSource();
				attendanceArr.add(attendanceListModel);
			}

			this.setAttendanceListModels(attendanceArr);
			
		}
	}
	
}
