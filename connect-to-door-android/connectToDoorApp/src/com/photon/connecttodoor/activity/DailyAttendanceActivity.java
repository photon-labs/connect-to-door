package com.photon.connecttodoor.activity;

import org.json.JSONException;

import android.annotation.SuppressLint;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.ListView;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.controller.DailyAttendanceService;
import com.photon.connecttodoor.datamodel.DailyAttendanceModel;
import com.photon.connecttodoor.uiadapter.ListGeneratedDailyArrayAdapter;
import com.photon.connecttodoor.utils.ApplicationConstant;

@SuppressLint("NewApi")
public class DailyAttendanceActivity extends MainActivity{

	private ImageButton backButton;
	private ImageButton signOutButton;
	private EditText startFromDateTxt;
	private ImageView startFromDateImage;
	private ListView dailyReport;
	private static final String EMPLOYEE_ID = "employeeId";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.daily_attandance);
		backButton = (ImageButton) findViewById(R.id.backButton);
		signOutButton = (ImageButton) findViewById(R.id.signOutButton);
		startFromDateTxt = (EditText)findViewById(R.id.startFromDateTxt);
		startFromDateImage = (ImageView)findViewById(R.id.startFromDateImage);
		dailyReport = (ListView) findViewById(R.id.table_report);

		actionButton();
		getCurrentDate();
		startFromDateTxt.setText(getDateEditText());

		/**check internet connection before request for attendance list */
		if(connectionAvailable()){
			new CallServiceAttendanceListTask().execute(getDateEditText().toString());
		}else{
			alertMessage(ApplicationConstant.NO_INTERNET_CONNECTION, DailyAttendanceActivity.this);
		}

		dailyReport.setOverScrollMode(View.OVER_SCROLL_NEVER);
	}

	private void actionButton(){
		/**
		 * onClick back button
		 */
		backButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				goToWelcomePage();
			}
		});
		/**
		 * onClick sign out button
		 */
		signOutButton.setOnClickListener(new OnClickListener() {	
			@Override
			public void onClick(View v) {
				/**check internet connection before sign out application */
				if(connectionAvailable()){
					LoginActivity.onClickLogout();
					goToLoginPage();
				}else{
					alertMessage(ApplicationConstant.NO_INTERNET_CONNECTION, DailyAttendanceActivity.this);
				}
			}
		});
		/**
		 * onClick calendar button
		 */
		startFromDateImage.setOnClickListener(new OnClickListener() {

			@SuppressWarnings("deprecation")
			@Override
			public void onClick(View v) {
				getCurrentDate();
				showDialog(DATE_DIALOG_ID);
			}
		});
	}

	/** Callback received when the user "picks" a date in the dialog */
	private DatePickerDialog.OnDateSetListener pDateSetListener =
			new DatePickerDialog.OnDateSetListener() {

		@Override
		public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
			pYear = year;
			pMonth = monthOfYear;
			pDay = dayOfMonth;
			startFromDateTxt.setText(getDateEditText());

			/**check internet connection before request for attendance list */
			if(connectionAvailable()){
				new CallServiceAttendanceListTask().execute(getDateEditText().toString());
			}else{
				alertMessage(ApplicationConstant.NO_INTERNET_CONNECTION, DailyAttendanceActivity.this);
			}
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

	/**
	 * call request daily attendance
	 *
	 */
	private class CallServiceAttendanceListTask extends AsyncTask<String, Void, String> {

		private ProgressDialog dialog;

		protected void onPreExecute() {
			this.dialog = ProgressDialog.show(DailyAttendanceActivity.this,
					"List Process", "Please Wait...", true);
		}

		@Override
		protected String doInBackground(String... params) {
			// TODO Auto-generated method stub
			String searchValues = params[0];
			String employeeId = loadStringPreferences(EMPLOYEE_ID, getApplicationContext());
			String startDateParam = changeFormatDate(searchValues);
			DailyAttendanceService dailyAttendanceService = new DailyAttendanceService();
			String response = dailyAttendanceService.handleRequestDailyAttendance(employeeId,startDateParam);
			return response;
		}

		protected void onPostExecute(String result) {
			DailyAttendanceModel dailyModel = new DailyAttendanceModel(result);
			try {
				dailyModel.parseSource();
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			ListGeneratedDailyArrayAdapter tableReport = new ListGeneratedDailyArrayAdapter(DailyAttendanceActivity.this,dailyModel.getDailyAttendanceListModels());
			dailyReport.setAdapter(tableReport);
			tableReport.notifyDataSetChanged();
			this.dialog.dismiss();
		}
	}

	/**
	 * launch menu attendance
	 */
	private void goToWelcomePage(){
		Intent intentWelcomeScreen = new Intent(DailyAttendanceActivity.this, WelcomeScreenActivity.class);
		startActivity(intentWelcomeScreen);
	}

	/**
	 * launch login page
	 */
	private void goToLoginPage(){
		Intent intentLoginPage = new Intent(DailyAttendanceActivity.this, LoginActivity.class);
		startActivity(intentLoginPage);
	}
}
