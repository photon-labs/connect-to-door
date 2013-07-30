package com.photon.connecttodoor.activity;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import org.json.JSONException;

import android.annotation.SuppressLint;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.StrictMode;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.controller.SignatureLinkService;
import com.photon.connecttodoor.datamodel.ProfileModel;
import com.photon.connecttodoor.datamodel.RequestListModel;
import com.photon.connecttodoor.datamodel.RequestModel;
import com.photon.connecttodoor.datamodel.SignatureLinkModel;
import com.photon.connecttodoor.uiadapter.ListGeneratedRequestArrayAdapter;

@SuppressLint("NewApi")
public class RequestActivity extends MainActivity{
	private TextView empName, empID, dateNow, requestVoucherDate;
	private String requestCategory[] = {"Building","Communication", "Consumption","Depreciation", "Electricity","Equipment", "Fixed Asset",
			"Fixed Asset Insurance", "Hosting", "Internet", "Maintenance", "Miscellanous", "Postage", "Profesional", "Recruiting", "Rent", "Stationary", "Tax", "Transportation"};
	private String approvalCategory[] = {"Mohammad Daud","Dodik Purnomo"}; 
	ImageView requestEntryDate, signature;
	SignatureLinkModel signatureDataModel;
	ProfileModel profileDataModel;
	Button  backButton, saveButton;
	ImageButton insertSignature;
	Spinner requestList, approvalList;
	private EditText requestCost, requestQuantity, requestDesc;
	String date, desc, quantity, cost;
	ArrayList<RequestListModel> reqArrayList;
	ListView requestListView;
	RequestModel requestParam;
	
	
	protected void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_request_voucher);
		signature = (ImageView)findViewById(R.id.requestSignature);
		empName = (TextView)findViewById(R.id.employee_name);
		empID = (TextView)findViewById(R.id.employee_id);
		backButton = (Button)findViewById(R.id.backButton);
		saveButton = (Button)findViewById(R.id.save_button);
		requestList = (Spinner)findViewById(R.id.requestCategory);
		approvalList = (Spinner)findViewById(R.id.approvalPersonList);
		dateNow = (TextView)findViewById(R.id.requestDate);
		requestVoucherDate = (TextView)findViewById(R.id.requestVoucherDate);
		requestEntryDate = (ImageView)findViewById(R.id.requestEntryDate);
		insertSignature = (ImageButton)findViewById(R.id.insertButton);
		requestCost = (EditText)findViewById(R.id.requestCost);
		requestQuantity = (EditText)findViewById(R.id.requestQuantity);
		requestDesc = (EditText)findViewById(R.id.requestDescription);
		requestListView = (ListView)findViewById(R.id.table_request_list);
		reqArrayList = new ArrayList<RequestListModel>();
		requestParam = new RequestModel();
		
		if (android.os.Build.VERSION.SDK_INT > 9) { 
			StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build(); StrictMode.setThreadPolicy(policy); 
		}
		actionButton();
		getCurrentDate();
		getResponseFromProfileModel();
		setUpdateUI();
		setRequestDropDown();
		setApprovalListDropDown();
	}
	
	private void actionButton() {
		backButton.setOnClickListener(new OnClickListener() {
			public void onClick(View v) {
				goToVoucherPage();
			}
		});
		
		saveButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				onSaveRequestState();
			}
		});
		
		requestEntryDate.setOnClickListener(new OnClickListener() {
			
			@SuppressWarnings("deprecation")
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				getCurrentDate();
				showDialog(DATE_DIALOG_ID);
			}
		});
		insertSignature.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				new CallServiceSignatureLink().execute();
			}
		});
	}
	
	private void goToVoucherPage() {
		Intent voucherPage = new Intent(this, VoucherActivity.class);
		startActivity(voucherPage);
	}
	
	private void getResponseFromProfileModel() {
		String responseProfil = loadStringPreferences("responseProfile", getApplicationContext());
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
			requestVoucherDate.setText(getDateEditText());
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
		empID.setText(profileDataModel.getEmployeeId());
		dateNow.setText(getDateEditText());
	}
	
	private void setRequestDropDown() {
		createDropdownCategory(this, requestCategory, requestList);
	}
	
	private void setApprovalListDropDown() {
		createDropdownCategory(this, approvalCategory, approvalList);
	}
	
	private void showSignatureImage(){
		String urlImage= signatureDataModel.getUrlSignature();
		Bitmap bimage=  getBitmapFromURL(urlImage);
		signature.setImageBitmap(bimage);
		insertSignature.setVisibility(View.GONE);
	}
	
	public static Bitmap getBitmapFromURL(String src) {
		try {
			URL url = new URL(src);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setDoInput(true);
			connection.connect();
			InputStream input = connection.getInputStream();
			Bitmap myBitmap = BitmapFactory.decodeStream(input);
			return myBitmap;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	private void onSaveRequestState() {
		String cost = requestCost.getText().toString();
		String desc = requestDesc.getText().toString();
		String quantity = requestQuantity.getText().toString();
		String date = requestVoucherDate.getText().toString();
		RequestListModel modelRequestItemList = new RequestListModel();
		modelRequestItemList.setQuantity(quantity);
		modelRequestItemList.setCost(cost);
		modelRequestItemList.setDescription(desc);
		modelRequestItemList.setDate(date);
		
		requestParam.addToList(modelRequestItemList);
		// TODO Auto-generated method stub
		ListGeneratedRequestArrayAdapter reqArrayAdapter = new ListGeneratedRequestArrayAdapter(RequestActivity.this, requestParam.getRequestListModel());
		requestListView.setAdapter(reqArrayAdapter);
		reqArrayAdapter.notifyDataSetChanged();
		
	}
	
	private class CallServiceSignatureLink extends AsyncTask<Void, Void, String> {

		private ProgressDialog dialog;

		protected void onPreExecute() {
			this.dialog = ProgressDialog.show(RequestActivity.this,
					"On Process", "Please Wait...", true);
		}

		@Override
		protected String doInBackground(Void... params) {
			String employeeId = profileDataModel.getEmployeeId();
			SignatureLinkService signatureLinkService = new SignatureLinkService();
			String response = signatureLinkService.handleSignatureLinkService(employeeId);
			return response;
		}

		protected void onPostExecute(String result) {
			signatureDataModel = new SignatureLinkModel();
			try {
				signatureDataModel.parseJSON(result);
				showSignatureImage();
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			this.dialog.dismiss();
		}
	}

}
