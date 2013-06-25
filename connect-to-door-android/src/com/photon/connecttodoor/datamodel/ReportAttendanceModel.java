package com.photon.connecttodoor.datamodel;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


public class ReportAttendanceModel extends MainParser{
	
	private ArrayList<ReportAttendanceListModel> reportAttendanceList ;

	public ArrayList<ReportAttendanceListModel> getReportAttendanceList() {
		return reportAttendanceList;
	}

	public void setReportAttendanceList(
			ArrayList<ReportAttendanceListModel> reportAttendanceList) {
		this.reportAttendanceList = reportAttendanceList;
	}

	public ReportAttendanceModel(String jsonObject) {
		super(jsonObject);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void parseSource() throws JSONException {
		// TODO Auto-generated method stub
		
		if(jsonObject.has("attendance")){
			JSONArray reportAttendanceJSONArray = jsonObject.getJSONArray("attendance");
			ArrayList<ReportAttendanceListModel> reportAttendanceArr = new ArrayList<ReportAttendanceListModel>();
			
			for(int i=0;i<reportAttendanceJSONArray.length();i++){
				JSONObject reportAttendanceObject = reportAttendanceJSONArray.getJSONObject(i);
				ReportAttendanceListModel reportAttendanceListModel = new ReportAttendanceListModel(reportAttendanceObject);
				reportAttendanceListModel.parseSource();
				reportAttendanceArr.add(reportAttendanceListModel);
			}
			this.setReportAttendanceList(reportAttendanceArr);
		}
		
	}
	
}