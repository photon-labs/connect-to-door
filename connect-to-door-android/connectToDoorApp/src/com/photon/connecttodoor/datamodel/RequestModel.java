package com.photon.connecttodoor.datamodel;

import java.util.ArrayList;

public class RequestModel {
	private ArrayList<RequestListModel> requestListModel = new ArrayList<RequestListModel>();

	public ArrayList<RequestListModel> getRequestListModel() {
		return requestListModel;
	}

	public void setRequestListModel(ArrayList<RequestListModel> requestListModel) {
		this.requestListModel = requestListModel;
	}
	public void addToList(RequestListModel requestListData){
		requestListModel.add(requestListData);
	}
	
}
