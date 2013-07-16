package com.photon.connecttodoor.activity;

import org.json.JSONException;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;
import android.widget.TextView;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.controller.CheckInOutService;
import com.photon.connecttodoor.datamodel.CheckPresentModel;
import com.photon.connecttodoor.datamodel.LoginDataModel;
import com.photon.connecttodoor.utils.ApplicationConstant;

public class WelcomeScreenActivity extends MainActivity {

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
	private TextView username;
	LoginDataModel loginDataModel;
	private static final String ADMIN = "Admin";
	private static final String EMPLOYEE_ID = "employeeId";
	CheckPresentModel checkPresentModel;
	String status;
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
		status = "check-status";

		checkPresentModel = new CheckPresentModel();

		/**check internet connection before check attendance status */
		if(connectionAvailable()){
			setDataLogin();
			setUIWelcomeScreen();
			new CallServiceCheckInOut().execute();
		}else{
			alertMessage(ApplicationConstant.NO_INTERNET_CONNECTION, WelcomeScreenActivity.this);
		}

		actionButton();
	}

	private void actionButton(){
		checkInButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				if(connectionAvailable()){
					status = "checkIn";
					new CallServiceCheckInOut().execute();
				}else{
					alertMessage(ApplicationConstant.NO_INTERNET_CONNECTION, WelcomeScreenActivity.this);
				}
			}
		});

		checkOutButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				if(connectionAvailable()){
					status = "checkOut";
					new CallServiceCheckInOut().execute();
				}else{
					alertMessage(ApplicationConstant.NO_INTERNET_CONNECTION, WelcomeScreenActivity.this);
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
				goToProfilPage();
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
				/**check internet connection before sign out application */
				if(connectionAvailable()){
					LoginActivity.onClickLogout();
					goToLoginPage();
				}else{
					alertMessage(ApplicationConstant.NO_INTERNET_CONNECTION, WelcomeScreenActivity.this);
				}
			}
		});
	}

	private void setDataLogin(){
		String datalogin = loadStringPreferences("responseLogin", getApplicationContext());
		if(!datalogin.equalsIgnoreCase("")){
			loginDataModel = new LoginDataModel();
			try {
				loginDataModel.parseJSON(datalogin);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	private void updateViewCheckInSucces(){
		String currentdate = checkPresentModel.getCheck_in();
		if(checkPresentModel.getStatus().equals("success")){
			checkInText.setVisibility(View.VISIBLE);
			String checkInTime = splitCurrentTime(currentdate);
			currentTime.setText(checkInTime);
			currentTime.setVisibility(View.VISIBLE);
			checkOutText.setVisibility(View.GONE);
		}else{
			String message = checkPresentModel.getMessage();
			alertMessage(message, WelcomeScreenActivity.this);
		}
	}

	private void updateViewCheckOutSucces(){
		String currentdate = checkPresentModel.getCheck_out();
		if(checkPresentModel.getStatus().equals("success")){
			checkOutText.setVisibility(View.VISIBLE);
			String checkOutTime = splitCurrentTime(currentdate);
			currentTime.setText(checkOutTime);
			currentTime.setVisibility(View.VISIBLE);
			checkInText.setVisibility(View.GONE);
		}else{
			String message = checkPresentModel.getMessage();
			alertMessage(message, WelcomeScreenActivity.this);
		}
	}

	private void checkPresentstatus(){
		String currentdate = null;
		if (!checkPresentModel.getCheckoutPresent().equals("") && checkPresentModel.getCheckoutPresent() != null){
			currentdate = checkPresentModel.getCheckoutPresent();
			checkOutText.setVisibility(View.VISIBLE);
			currentTime.setText(currentdate);
			currentTime.setVisibility(View.VISIBLE);
			checkInText.setVisibility(View.GONE);
		}else{
			currentdate = checkPresentModel.getCheckinPresent();
			checkInText.setVisibility(View.VISIBLE);
			currentTime.setText(currentdate);
			currentTime.setVisibility(View.VISIBLE);
			checkOutText.setVisibility(View.GONE);
		}

	}
	private void setUIDefaultStatus(){
		checkInText.setVisibility(View.INVISIBLE);
		checkOutText.setVisibility(View.INVISIBLE);
		currentTime.setVisibility(View.INVISIBLE);
	}

	private String splitCurrentTime(String currentTime){
		String [] formatTime = currentTime.split(" ");
		String time = formatTime[1];
		String [] checkInTime = time.split(":");
		String hours = checkInTime[0];
		String minutes = checkInTime[1];
		String currentTimes = hours+":"+minutes;
		return currentTimes;
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

	private class CallServiceCheckInOut extends AsyncTask<Void, Void, String> {

		private ProgressDialog dialog;

		protected void onPreExecute() {
			this.dialog = ProgressDialog.show(WelcomeScreenActivity.this,
					"On Process", "Please Wait...", true);
		}

		@Override
		protected String doInBackground(Void... params) {
			// TODO Auto-generated method stub
			String employeeId = loadStringPreferences(EMPLOYEE_ID, getApplicationContext());
			CheckInOutService checkInService = new CheckInOutService();
			String response = checkInService.handleCheckInRequest(employeeId, status);
			return response;
		}

		protected void onPostExecute(String result) {
			String response = result;
			if(response != null){
				if(!response.equals("{}")){
					try {
						checkPresentModel.parseSource(response);
						if(status == "checkIn"){
							updateViewCheckInSucces();
						}else if(status == "checkOut"){
							updateViewCheckOutSucces();
						}else{
							checkPresentstatus();
						}
					} catch (JSONException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}else{
					setUIDefaultStatus();
				}
			}
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
