package com.photon.connecttodoor.activity;

import org.json.JSONException;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.TextView;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.controller.LocalStorage;
import com.photon.connecttodoor.datamodel.ProfileModel;

public class RequestSubmittedActivity extends MainActivity{
	TextView empId, empName, dateNow;
	Button approveButton, declineButton;
	TextView reqSpinner;
	ProfileModel profileDataModel;
	
	protected void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_request_submitted);
		empId = (TextView)findViewById(R.id.employee_id);
		empName = (TextView)findViewById(R.id.employee_name);
		approveButton = (Button)findViewById(R.id.approveButton);
		declineButton = (Button)findViewById(R.id.declineButton);
		dateNow = (TextView)findViewById(R.id.reqSubmitDate);
		reqSpinner = (TextView)findViewById(R.id.reqSubmitCategory);
		actionButton();
		setCurrentDate();
		getResponseFromProfileModel();
		setUpdateUI();
		onGetDataIntent();
	}
	
	private void actionButton() {
		// TODO Auto-generated method stub
		declineButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				goBack();
			}
		});
	}
	private void goBack() {
		// TODO Auto-generated method stub
		Intent reqVoucher = new Intent(this, RequestActivity.class);
		startActivity(reqVoucher);
	}
	
	private void onGetDataIntent() {
		// TODO Auto-generated method stub
		Intent memo = getIntent();
		String memos = memo.getStringExtra("item");
		reqSpinner.setText(memos);
	}
	
	private void getResponseFromProfileModel() {
		LocalStorage localStorage = new LocalStorage();
		String responseProfil = localStorage.loadStringPreferences("responseProfile", getApplicationContext());
		profileDataModel = new ProfileModel();
		try {
			profileDataModel.parseJSON(responseProfil);
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
	private DatePickerDialog.OnDateSetListener pDateSetListener =
			new DatePickerDialog.OnDateSetListener() {

		@Override
		public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
			pYear = year;
			pMonth = monthOfYear;
			pDay = dayOfMonth;
		}
	};

	@Override
	protected Dialog onCreateDialog(int id) {
		switch (id) {
		case DATE_DIALOG_ID:
			return new DatePickerDialog(this,
					pDateSetListener,
					pYear, pMonth, pDay);
		}

		return null;
	}

	private void setUpdateUI() {
		empName.setText(profileDataModel.getEmployeeName());
		empId.setText(profileDataModel.getEmployeeId());
		dateNow.setText(getDateEditText());
	}
}
