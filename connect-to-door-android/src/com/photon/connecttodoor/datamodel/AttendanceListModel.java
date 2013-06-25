package com.photon.connecttodoor.datamodel;

import org.json.JSONException;
import org.json.JSONObject;

public class AttendanceListModel extends MainParser {
	private String number;
	private String name;
	private String employeeId;
	private String projectId;
	private String totalAttendance;
	private String totalWorking;
	private String totalLeave;
	private String avgWorkingHour;


	public AttendanceListModel(JSONObject jsonObject) {
		super(jsonObject);
		// TODO Auto-generated constructor stub
	}
	public AttendanceListModel(String jsonString) {
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
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public String getProjectId() {
		return projectId;
	}
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	public String getTotalAttendance() {
		return totalAttendance;
	}
	public void setTotalAttendance(String totalAttendance) {
		this.totalAttendance = totalAttendance;
	}
	public String getTotalWorking() {
		return totalWorking;
	}
	public void setTotalWorking(String totalWorking) {
		this.totalWorking = totalWorking;
	}
	public String getTotalLeave() {
		return totalLeave;
	}
	public void setTotalLeave(String totalLeave) {
		this.totalLeave = totalLeave;
	}
	public String getAvgWorkingHour() {
		return avgWorkingHour;
	}
	public void setAvgWorkingHour(String avgWorkingHour) {
		this.avgWorkingHour = avgWorkingHour;
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
		if(jsonObject.has("employeeId")){
			String employeeId = jsonObject.getString("employeeId");
			this.setEmployeeId(employeeId);
		}
		if(jsonObject.has("project_id")){
			String projectId = jsonObject.getString("project_id");
			this.setProjectId(projectId);
		}
		if(jsonObject.has("total_attendance")){
			String totalAttendance = jsonObject.getString("total_attendance");
			this.setTotalAttendance(totalAttendance);
		}
		if(jsonObject.has("total_working")){
			String totalWorking = jsonObject.getString("total_working");
			this.setTotalWorking(totalWorking);
		}
		if(jsonObject.has("total_leave")){
			String totalLeave = jsonObject.getString("total_leave");
			this.setTotalLeave(totalLeave);
		}
		if(jsonObject.has("avg_working_hour")){
			String avgWorkingHour = jsonObject.getString("avg_working_hour");
			this.setAvgWorkingHour(avgWorkingHour);
		}
	}

}
