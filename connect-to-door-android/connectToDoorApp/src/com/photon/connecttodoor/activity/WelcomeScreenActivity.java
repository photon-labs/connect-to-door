package com.photon.connecttodoor.activity;

import org.json.JSONException;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.controller.ProfileService;
import com.photon.connecttodoor.datamodel.LoginDataModel;
import com.photon.connecttodoor.utils.ApplicationConstant;
import com.photon.connecttodoor.utils.Utility;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;
import android.widget.TextView;

public class WelcomeScreenActivity extends Activity {

	private ImageButton profilButton;
	private ImageButton voucherButton;
	private ImageButton dailyButton;
	private ImageButton checkInButton;
	private ImageButton checkOutButton;
	private ImageButton attendanceListButton;
	private ImageButton attendanceReportButton;
	private ImageButton attendanceFormButton;
	private ImageButton signOutButton;
	private TextView checkInText;
	private TextView checkOutText;
	private TextView currentTime;
	private Boolean isCheckIn = true;
	private Boolean isCheckOut = true;
	private TextView username;
	LoginDataModel loginDataModel;
	private static final String ADMIN = "Admin";
	private static final String EMPLOYEE_ID = "employeeId";
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.welcome_screen);
		attendanceListButton = (ImageButton)findViewById(R.id.attandanceListButton);
		dailyButton = (ImageButton)findViewById(R.id.dailyAttandanceButton);
		profilButton = (ImageButton) findViewById(R.id.profileButton);
		voucherButton = (ImageButton) findViewById(R.id.voucherButton);
		checkInButton = (ImageButton) findViewById(R.id.checkInButton);
		checkOutButton = (ImageButton) findViewById(R.id.checkOutButton);
		attendanceReportButton = (ImageButton) findViewById(R.id.attandanceReportButton);
		attendanceFormButton = (ImageButton) findViewById(R.id.attandanceFormButton);
		signOutButton = (ImageButton)findViewById(R.id.signOutButton);
		checkInText = (TextView) findViewById(R.id.checkInText);
		checkOutText = (TextView) findViewById(R.id.checkOutText);
		currentTime = (TextView) findViewById(R.id.currentTime);
		username = (TextView) findViewById(R.id.username);

		String datalogin = Utility.loadStringPreferences("responseLogin", getApplicationContext());
		if(!datalogin.equalsIgnoreCase("")){
			loginDataModel = new LoginDataModel();
			try {
				loginDataModel.parseJSON(datalogin);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		setUIWelcomeScreen();

		checkInButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				if(isCheckIn){
					checkInText.setVisibility(View.VISIBLE);
					currentTime.setVisibility(View.VISIBLE);
					checkOutText.setVisibility(View.GONE);
					isCheckIn = false;
				}

			}
		});

		checkOutButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				if(isCheckOut){
					checkInText.setVisibility(View.GONE);
					checkOutText.setVisibility(View.VISIBLE);
					currentTime.setText("20:00");
					isCheckOut = false;
				}

			}
		});

		dailyButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToDailyAttandancePage();
			}
		});

		voucherButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToVoucherPage();

			}
		});

		profilButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				new CallServiceProfileTask().execute();
			}
		});
		attendanceListButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToAttendancePage();

			}
		});
		attendanceReportButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToReportPage();

			}
		});
		attendanceFormButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToFormPage();

			}
		});

		signOutButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				LoginActivity.onClickLogout();
				goToLoginPage();
			}
		});
	}
	private void setUIWelcomeScreen(){
		username.setText(loginDataModel.getUsername());
		String previlage = loginDataModel.getPrevilage();
		if(previlage.equals(ADMIN)){
			attendanceReportButton.setVisibility(View.VISIBLE);
			attendanceFormButton.setVisibility(View.VISIBLE);
		}else{
			attendanceReportButton.setVisibility(View.GONE);
			attendanceFormButton.setVisibility(View.GONE);
		}
	}
	
	private class CallServiceProfileTask extends AsyncTask<Void, Void, String> {

		private ProgressDialog dialog;

		protected void onPreExecute() {
			this.dialog = ProgressDialog.show(WelcomeScreenActivity.this,
					"Profile Process", "Please Wait...", true);
		}

		@Override
		protected String doInBackground(Void... params) {
			// TODO Auto-generated method stub
			String employeeId = Utility.loadStringPreferences(EMPLOYEE_ID, getApplicationContext());
			String searchParameter = ApplicationConstant.EMPLOYEE_ID;
			ProfileService profileService = new ProfileService();
			String response = profileService.handleProfileRequest(searchParameter, employeeId);
			return response;
		}

		protected void onPostExecute(String result) {
			Utility.savePreference("responseProfile", result, getApplicationContext());
			goToProfilPage();
			this.dialog.dismiss();
		}
	}
	
	private void goToAttendancePage(){
		Intent intentAttandanceList = new Intent(WelcomeScreenActivity.this, AttendanceListActivity.class);
		startActivity(intentAttandanceList);
	}
	private void goToDailyAttandancePage(){
		Intent intentDailyAttandance = new Intent(WelcomeScreenActivity.this, DailyAttendanceActivity.class);
		startActivity(intentDailyAttandance);
	}
	private void goToProfilPage(){
		Intent intentProfilPage = new Intent(WelcomeScreenActivity.this, ProfilActivity.class);
		startActivity(intentProfilPage);
	}
	private void goToVoucherPage(){
		Intent intentVoucherPage = new Intent(WelcomeScreenActivity.this, VoucherActivity.class);
		startActivity(intentVoucherPage);
	}
	private void goToReportPage(){
		Intent intentReportPage = new Intent(WelcomeScreenActivity.this, ReportActivity.class);
		startActivity(intentReportPage);
	}
	private void goToFormPage(){
		Intent intentFormPage = new Intent(WelcomeScreenActivity.this,AttendanceFormActivity.class);
		startActivity(intentFormPage);
	}
	private void goToLoginPage(){
		Intent loginPage = new Intent(WelcomeScreenActivity.this,LoginActivity.class);
		startActivity(loginPage);
	}
}
