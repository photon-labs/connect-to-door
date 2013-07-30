package com.photon.connecttodoor.datamodel;


public class RequestListModel {
	private String number;
	private String date;
	private String description;
	private String quantity;
	private String cost;

	public String getNumber(){
		return number;
	}
	
	public void setNumber(String number){
		this.number = number;
	}
	
	public String getDate(){
		return date;
	}
	
	public void setDate(String date){
		this.date = date;
	}
	
	public String getDescription(){
		return description;
	}
	
	public void setDescription(String description){
		this.description = description;
	}
	
	public String getQuantity(){
		return quantity;
	}
	
	public void setQuantity(String quantity){
		this.quantity = quantity;
	}
	
	public String getCost(){
		return cost;
	}
	
	public void setCost(String cost){
		this.cost = cost;
	}
	
}
