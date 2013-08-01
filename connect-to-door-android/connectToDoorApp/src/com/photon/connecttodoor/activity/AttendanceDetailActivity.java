package com.photon.connecttodoor.activity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.utils.ApplicationConstant;

public class AttendanceDetailActivity extends MainActivity {

	Button backButton;
	Button signOutButton;
	TextView nameText, employeeIdText, projectIdText;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_attendance_detail);

		backButton = (Button)findViewById(R.id.back_buttonattdetail);
		signOutButton = (Button)findViewById(R.id.signout_buttonattdetail);
		nameText = (TextView)findViewById(R.id.NameDynamicsDetail);
		employeeIdText = (TextView)findViewById(R.id.employeeIdDynamicsDetail);
		projectIdText = (TextView)findViewById(R.id.projectIdDynamicsDetail);
		
		this.actionButton();
		Intent intent = getIntent();
		
		String name = intent.getStringExtra("name");
		String employeeId = intent.getStringExtra("employeeId");
		String projectId = intent.getStringExtra("projectId");
		
		nameText.setText(name);
		employeeIdText.setText(employeeId);
		projectIdText.setText(projectId);
	}
	private void actionButton(){
		/**
		 * onClick back button
		 */
		backButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				goToAttendanceListPage();
			}
		});
		/**
		 * onClick sign out button
		 */
		signOutButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				/**check internet connection before sign out application */
				if(hasConnectionAvailable()){
					LoginActivity.onClickLogout();
					goToLogin();
				}else{
					alertMessage(ApplicationConstant.NO_INTERNET_CONNECTION, AttendanceDetailActivity.this);
				}
			}
		});

	}
	/**
	 * launch attendance list page
	 */
	private void goToAttendanceListPage(){
		finish();
	}
	/**
	 * launch login page
	 */
	private void goToLogin(){
		Intent intentLoginPage = new Intent(AttendanceDetailActivity.this, LoginActivity.class);
		startActivity(intentLoginPage);
		finish();
	}

}