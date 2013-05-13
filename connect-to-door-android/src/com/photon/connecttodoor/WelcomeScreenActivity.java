package com.photon.connecttodoor;

import org.w3c.dom.Text;

import android.app.Activity;
import android.content.Intent;
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
	private TextView checkInText;
	private TextView checkOutText;
	private TextView currentTime;
	private Boolean isCheckIn = true;
	private Boolean isCheckOut = true;

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
		checkInText = (TextView) findViewById(R.id.checkInText);
		checkOutText = (TextView) findViewById(R.id.checkOutText);
		currentTime = (TextView) findViewById(R.id.currentTime);

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
				goToProfilPage();
			}
		});
		attendanceListButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToAttendancePage();

			}
		});
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
}
