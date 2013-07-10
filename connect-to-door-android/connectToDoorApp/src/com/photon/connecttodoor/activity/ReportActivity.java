package com.photon.connecttodoor.activity;

import java.util.Calendar;

import org.json.JSONException;

import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.AdapterView.OnItemSelectedListener;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.controller.ReportAttendanceService;
import com.photon.connecttodoor.datamodel.ReportAttendanceModel;
import com.photon.connecttodoor.uiadapter.ListGeneratedReportArrayAdapter;

public class ReportActivity extends Activity {

	private String category[] = {"Before Adjustment", "Adjustment", "After Adjustment" };
	Spinner dropDownCategory;
	String selectCategory;
	private String attendanceStatus = "before";
	private ListView attendanceAdminReport;
	private Button signOutButton ;
	private Button backButton, searchButton ;
	private EditText startFromDateTxt;
	private ImageView startFromDateImage;
	private int pYear;
	private int pMonth;
	private int pDay;

	static final int DATE_DIALOG_ID = 0;
	private static final String BEFORE = "before";
	private static final String ADJUSTMENT = "adjustment";
	private static final String AFTER = "after";
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_report);
		signOutButton = (Button)findViewById(R.id.signout_button);
		backButton = (Button)findViewById(R.id.back_button);
		startFromDateImage = (ImageView)findViewById(R.id.dateReportId);
		startFromDateTxt = (EditText)findViewById(R.id.inputDateReport);
		searchButton = (Button)findViewById(R.id.search_button);
		attendanceAdminReport = (ListView) findViewById(R.id.table_report_attendance);	
		dropDownCategory = (Spinner)findViewById(R.id.spinnerCategory);

		ArrayAdapter adapter = new ArrayAdapter(this,android.R.layout.simple_spinner_item, category);
		adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		dropDownCategory.setAdapter(adapter);
		
		dropDownCategory.setOnItemSelectedListener(new OnItemSelectedListener() {

			@Override
			public void onItemSelected(AdapterView<?> arg0, View arg1, int arg2, long arg3){
				selectCategory = dropDownCategory.getSelectedItem().toString();
				try {
					if(selectCategory.equalsIgnoreCase("Before Adjustment")){
						attendanceStatus = BEFORE;
					}else if(selectCategory.equalsIgnoreCase("Adjustment")){
						attendanceStatus = ADJUSTMENT;
					}else if(selectCategory.equalsIgnoreCase("After Adjustment")){
						attendanceStatus = AFTER;
					}
				}catch(NumberFormatException nfe) {
					System.out.println("Could not parse " + nfe);
				} 
			}

			@Override
			public void onNothingSelected(AdapterView<?> arg0) {
			}
		});

		signOutButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToLoginPage();

			}
		});

		backButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToAttendancePage();

			}
		});

		startFromDateImage.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				getCurrentDate();
				showDialog(DATE_DIALOG_ID);
			}
		});
		
		searchButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				new CallServiceAttendanceReportTask().execute();
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
			startFromDateTxt.setText(getDateEditText());
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

	private class CallServiceAttendanceReportTask extends AsyncTask<Void, Void, String> {

		private ProgressDialog dialog;

		protected void onPreExecute() {
			this.dialog = ProgressDialog.show(ReportActivity.this,
					"List Process", "Please Wait...", true);
		}

		@Override
		protected String doInBackground(Void... params) {
			// TODO Auto-generated method stub
			String startDateParam = changeFormatDate(startFromDateTxt.getText().toString());
			ReportAttendanceService reportAttendanceService = new ReportAttendanceService();
			String response = reportAttendanceService.handleRequestReportAttendance(attendanceStatus,startDateParam);
			return response;
		}

		protected void onPostExecute(String result) {
			ReportAttendanceModel reportModel = new ReportAttendanceModel(result);
			try {
				reportModel.parseSource();
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			ListGeneratedReportArrayAdapter tableReport = new ListGeneratedReportArrayAdapter(ReportActivity.this,reportModel.getReportAttendanceList());
			attendanceAdminReport.setAdapter(tableReport);
			tableReport.notifyDataSetChanged();
			this.dialog.dismiss();
		}
	}

	private void goToAttendancePage(){
		Intent attendancePage = new Intent(ReportActivity.this,WelcomeScreenActivity.class);
		startActivity(attendancePage);
	}

	private void goToLoginPage(){
		Intent loginPage = new Intent(ReportActivity.this,LoginActivity.class);
		startActivity(loginPage);
	}

}
