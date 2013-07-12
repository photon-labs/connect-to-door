package com.photon.connecttodoor.activity;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

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
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.controller.SignatureLinkService;
import com.photon.connecttodoor.datamodel.ProfileModel;
import com.photon.connecttodoor.datamodel.SignatureLinkModel;

public class ReimburseActivity extends MainActivity{

	private String reimbursementCategory[] = {"Meal", "Transportation", "Utility" };
	private String approvalCategory[] = {"Penfen Fealty","Kurnia Sari","Dimas Isharmaya","Namira","Joko Irwansyah"};
	Spinner dropDownCategory, dropDownApprovalCategory;
	ImageButton backButton,insertSignature;
	private EditText voucherDate;
	private ImageView startFromDateImage,signature;
	private  TextView txtEmpName,txtEmpId,txtProjectId,currentDate;
	ProfileModel profileDataModel;
	SignatureLinkModel signatureDataModel;

	@SuppressLint("NewApi")
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.reimburse_form);
		backButton = (ImageButton)findViewById(R.id.backButton);
		startFromDateImage = (ImageView)findViewById(R.id.startFromDateImage);
		signature = (ImageView)findViewById(R.id.signature);
		insertSignature = (ImageButton)findViewById(R.id.insertSignature);
		voucherDate = (EditText)findViewById(R.id.voucher_date);
		dropDownApprovalCategory =(Spinner)findViewById(R.id.spinnerCategorySubmitTo);
		dropDownCategory = (Spinner)findViewById(R.id.spinnerCategory);
		txtEmpName = (TextView)findViewById(R.id.employee_name);
		txtEmpId = (TextView)findViewById(R.id.employee_id);
		txtProjectId = (TextView)findViewById(R.id.project_id);
		currentDate = (TextView)findViewById(R.id.dateNow);

		setDropDownApprovalCategory();
		setDropDownReimbursmentCategory();
		getCurrentDate();
		if (android.os.Build.VERSION.SDK_INT > 9) { 
			StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build(); StrictMode.setThreadPolicy(policy); 
		}
		getResponseFromProfileModel();
		setupdateUIRembursment();
		actionButton();
		
	}

	private void actionButton(){
		backButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToVoucherPage();
			}
		});

		startFromDateImage.setOnClickListener(new OnClickListener() {

			@SuppressWarnings("deprecation")
			@Override
			public void onClick(View v) {
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
	private void setDropDownApprovalCategory() {
		createDropdownCategory(this,approvalCategory, dropDownApprovalCategory);
	}

	private void setDropDownReimbursmentCategory() {
		createDropdownCategory(this,reimbursementCategory, dropDownCategory);
	}


	/** Callback received when the user "picks" a date in the dialog */
	private DatePickerDialog.OnDateSetListener pDateSetListener =
			new DatePickerDialog.OnDateSetListener() {

		@Override
		public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
			pYear = year;
			pMonth = monthOfYear;
			pDay = dayOfMonth;
			voucherDate.setText(getDateEditText());
		}
	};
	/**
	 * Create Date for startDate editText and untilDate editText 
	 * @return getDateEditText as StringBuilder
	 */

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
	private void goToVoucherPage(){
		Intent voucherPage = new Intent(ReimburseActivity.this, VoucherActivity.class);
		startActivity(voucherPage);
	}

	private void getResponseFromProfileModel(){
		String responseProfil = loadStringPreferences("responseProfile", getApplicationContext());
		profileDataModel = new ProfileModel();
		try {
			profileDataModel.parseJSON(responseProfil);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private void setupdateUIRembursment(){
		txtEmpName.setText(profileDataModel.getEmployeeName());
		txtEmpId.setText(profileDataModel.getEmployeeId());
		txtProjectId.setText(profileDataModel.getProjectId());
		currentDate.setText(getDateEditText());
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

	private void showSignatureImage(){
		String urlImage= signatureDataModel.getUrlSignature();
		Bitmap bimage=  getBitmapFromURL(urlImage);
		signature.setImageBitmap(bimage);
		insertSignature.setVisibility(View.GONE);
	}

	private class CallServiceSignatureLink extends AsyncTask<Void, Void, String> {

		private ProgressDialog dialog;

		protected void onPreExecute() {
			this.dialog = ProgressDialog.show(ReimburseActivity.this,
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
