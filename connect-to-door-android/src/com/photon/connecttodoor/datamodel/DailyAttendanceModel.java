package com.photon.connecttodoor.datamodel;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class DailyAttendanceModel extends MainParser{
	
	private ArrayList<DailyAttendanceListModel> dailyAttendanceListModels;
	
	public DailyAttendanceModel(JSONObject jsonObject) {
		super(jsonObject);
		// TODO Auto-generated constructor stub
	}

	public DailyAttendanceModel(String jsonString) {
		super(jsonString);
		// TODO Auto-generated constructor stub
	}
	
	public ArrayList<DailyAttendanceListModel> getDailyAttendanceListModels() {
		return dailyAttendanceListModels;
	}

	public void setDailyAttendanceListModels(
			ArrayList<DailyAttendanceListModel> dailyAttendanceListModels) {
		this.dailyAttendanceListModels = dailyAttendanceListModels;
	}

	@Override
	public void parseSource() throws JSONException {
		// TODO Auto-generated method stub
		if(jsonObject.has("attendance")){
			JSONArray dailyAttendanceJSONArray = jsonObject.getJSONArray("attendance");
			ArrayList<DailyAttendanceListModel> dailyAttendanceArr = new ArrayList<DailyAttendanceListModel>();

			for(int i=0;i<dailyAttendanceJSONArray.length();i++){
				JSONObject dailyAttendanceObject = dailyAttendanceJSONArray.getJSONObject(i);
				DailyAttendanceListModel dailyAttendanceListModel = new DailyAttendanceListModel(dailyAttendanceObject);
				dailyAttendanceListModel.parseSource();
				dailyAttendanceArr.add(dailyAttendanceListModel);
			}

			this.setDailyAttendanceListModels(dailyAttendanceArr);
			
		}
	}

}
