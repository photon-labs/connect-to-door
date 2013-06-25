package com.photon.connecttodoor.datamodel;

import org.json.JSONException;
import org.json.JSONObject;

public class ReportAttendanceListModel extends MainParser{

	private String number ;
	private String name ;
	private String employeeId ;
	private String annual ;
	private String coff ;
	private String condolances ;
	private String married ;
	private String maternity ;
	private String onsite ;
	private String paternity ;
	private String sick ;




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


	public String getAnnual() {
		return annual;
	}


	public void setAnnual(String annual) {
		this.annual = annual;
	}


	public String getCoff() {
		return coff;
	}


	public void setCoff(String coff) {
		this.coff = coff;
	}


	public String getCondolances() {
		return condolances;
	}


	public void setCondolances(String condolances) {
		this.condolances = condolances;
	}


	public String getMarried() {
		return married;
	}


	public void setMarried(String married) {
		this.married = married;
	}


	public String getMaternity() {
		return maternity;
	}


	public void setMaternity(String maternity) {
		this.maternity = maternity;
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


	public String getSick() {
		return sick;
	}


	public void setSick(String sick) {
		this.sick = sick;
	}


	public ReportAttendanceListModel(String jsonString) {
		super(jsonString);
		// TODO Auto-generated constructor stub
	}


	public ReportAttendanceListModel(JSONObject jsonObject) {
		super(jsonObject);
		// TODO Auto-generated constructor stub
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
		if(jsonObject.has("annual")){
			String annual = jsonObject.getString("annual");
			this.setAnnual(annual);
		}
		if(jsonObject.has("coff")){
			String coff = jsonObject.getString("coff");
			this.setCoff(coff);
		}
		if(jsonObject.has("condolences")){
			String condolences = jsonObject.getString("condolences");
			this.setCondolances(condolences);
		}
		if(jsonObject.has("married")){
			String married = jsonObject.getString("married");
			this.setMarried(married);
		}
		if(jsonObject.has("maternity")){
			String maternity = jsonObject.getString("maternity");
			this.setMaternity(maternity);
		}
		if(jsonObject.has("onsite")){
			String onsite = jsonObject.getString("onsite");
			this.setOnsite(onsite);
		}
		if(jsonObject.has("paternity")){
			String paternity = jsonObject.getString("paternity");
			this.setPaternity(paternity);
		}
		if(jsonObject.has("sick")){
			String sick = jsonObject.getString("sick");
			this.setSick(sick);
		}
	}

}
