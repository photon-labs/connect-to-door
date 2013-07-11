package com.photon.connecttodoor.activity;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Calendar;

import org.json.JSONException;

import android.annotation.SuppressLint;
import android.app.Activity;
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
import android.widget.ArrayAdapter;
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
import com.photon.connecttodoor.utils.Utility;

public class ReimburseActivity extends Activity{

	private String reimbursementCategory[] = {"Meal", "Transportation", "Utility" };
	private String approvalCategory[] = {"Penfen Fealty","Kurnia Sari","Dimas Isharmaya","Namira","Joko Irwansyah"};
	Spinner dropDownCategory, dropDownApprovalCategory;
	ImageButton backButton,insertSignature;
	private EditText voucherDate;
	private ImageView startFromDateImage,signature;
	private int pYear;
	private int pMonth;
	private int pDay;
	private  TextView txtEmpName,txtEmpId,txtProjectId,currentDate;
	static final int DATE_DIALOG_ID = 0;
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
		ArrayAdapter approvalAdapter = new ArrayAdapter(this,android.R.layout.simple_spinner_item, approvalCategory);
		approvalAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		dropDownApprovalCategory.setAdapter(approvalAdapter);

		ArrayAdapter adapter = new ArrayAdapter(this,android.R.layout.simple_spinner_item, reimbursementCategory);
		adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		dropDownCategory.setAdapter(adapter);
		getCurrentDate();
		if (android.os.Build.VERSION.SDK_INT > 9) { 
			StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build(); StrictMode.setThreadPolicy(policy); 
		}
		getResponseFromProfileModel();
		setupdateUIRembursment();
		backButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToVoucherPage();
			}
		});

		startFromDateImage.setOnClickListener(new OnClickListener() {

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

	private void getCurrentDate(){
		final Calendar cal = Calendar.getInstance();
		pYear = cal.get(Calendar.YEAR);
		pMonth = cal.get(Calendar.MONTH);
		pDay = cal.get(Calendar.DAY_OF_MONTH);
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
	private StringBuilder getDateEditText(){
		// Month is 0 based so add 1
		String pMonthString = String.valueOf((pMonth+1)).trim().toString();
		String pDayString = String.valueOf(pDay).trim().toString();
		String pYearString = String.valueOf(pYear).trim().toString();

		if(pMonthString.length() < 2){
			pMonthString = "0"+pMonthString;
		}

		if(pDayString.length() < 2){
			pDayString = "0"+pDayString;
		}

		return new StringBuilder()
		.append(pDayString).append("-")
		.append(pMonthString).append("-")
		.append(pYearString).append("");
	}

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

	private String changeFormatDate(String date){
		String [] formatDate = date.split("-");
		String day = formatDate[0];
		String month = formatDate[1];
		String year = formatDate[2];
		return year+"-"+month+"-"+day;
	}

	private void goToVoucherPage(){
		Intent voucherPage = new Intent(ReimburseActivity.this, VoucherActivity.class);
		startActivity(voucherPage);
	}

	private void getResponseFromProfileModel(){
		String responseProfil = Utility.loadStringPreferences("responseProfile", getApplicationContext());
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
