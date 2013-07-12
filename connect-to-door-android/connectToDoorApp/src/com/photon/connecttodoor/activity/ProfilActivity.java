package com.photon.connecttodoor.activity;

import org.json.JSONException;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;
import android.widget.TextView;

import com.facebook.widget.ProfilePictureView;
import com.photon.connecttodoor.R;
import com.photon.connecttodoor.datamodel.ProfileModel;

public class ProfilActivity extends MainActivity {

	private ImageButton attendanceButton,voucherButton,signOutButton; 
	private ProfilePictureView imageProfile;
	private TextView name,employeeId,projectId,role,startWorking,emailAddress,annual,
	coof,condolances,married,maternity,paternity,onsite,sick;
	ProfileModel profileDataModel;
	private static final String DAYS = " Days"; 
	private static final String FACEBOOK_ID = "facebookId";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_profil);
		attendanceButton = (ImageButton)findViewById(R.id.attendancebutton);
		voucherButton = (ImageButton)findViewById(R.id.voucherbutton);
		signOutButton = (ImageButton)findViewById(R.id.signOutButton);
		name = (TextView)findViewById(R.id.nameDynamicsProfile);
		employeeId = (TextView)findViewById(R.id.employeeIdDynamicsProfile);
		projectId = (TextView)findViewById(R.id.projectIdDynamicsProfile);
		role = (TextView)findViewById(R.id.roleDynamicsProfile);
		startWorking = (TextView)findViewById(R.id.dateworkingDynamicsProfile);
		emailAddress = (TextView)findViewById(R.id.emailDynamicsProfile);
		annual = (TextView)findViewById(R.id.annualLeaveInfoDynamicsProfile);
		coof = (TextView)findViewById(R.id.coffInfoDynamicsProfile);
		condolances = (TextView)findViewById(R.id.condLeaveInfoDynamicsProfile);
		married = (TextView)findViewById(R.id.marriedInfoDynamicsProfile);
		maternity = (TextView)findViewById(R.id.maternityInfoDynamicsProfile);
		paternity = (TextView)findViewById(R.id.paternityInfoDynamicsProfile);
		onsite = (TextView)findViewById(R.id.onsiteInfoDynamicsProfile);
		sick = (TextView)findViewById(R.id.sickInfoDynamicsProfile);
		imageProfile =(ProfilePictureView)findViewById(R.id.photoProfile);

		String dataProfile = loadStringPreferences("responseProfile", getApplicationContext());
		if(!dataProfile.equalsIgnoreCase("")){
			profileDataModel = new ProfileModel();
			try {
				profileDataModel.parseJSON(dataProfile);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		setDataToUI();

		attendanceButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToAttendancePage();

			}
		});

		voucherButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToVoucherPage();

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

	private void setDataToUI (){
		name.setText(": "+profileDataModel.getEmployeeName());
		employeeId.setText(": "+profileDataModel.getEmployeeId());
		projectId.setText(": "+profileDataModel.getProjectId());
		role.setText(": "+profileDataModel.getAuthority());
		startWorking.setText(": "+profileDataModel.getEmployeeStartWork());
		emailAddress.setText(": "+profileDataModel.getEmployeeEmail());
		annual.setText(profileDataModel.getAnnual()+DAYS);
		coof.setText(profileDataModel.getcOff()+DAYS);
		condolances.setText(profileDataModel.getCondolences()+DAYS);
		married.setText(profileDataModel.getMarried()+DAYS);
		maternity.setText(profileDataModel.getMaternity()+DAYS);
		paternity.setText(profileDataModel.getPaternity()+DAYS);
		onsite.setText(profileDataModel.getOnsite()+DAYS);
		sick.setText(profileDataModel.getSick()+DAYS);
		String fbId = loadStringPreferences(FACEBOOK_ID, getApplicationContext());
		imageProfile.setProfileId(fbId);
	}

	private void goToAttendancePage(){
		Intent attendancePage = new Intent(ProfilActivity.this,WelcomeScreenActivity.class);
		startActivity(attendancePage);
	}

	private void goToVoucherPage(){
		Intent voucherPage = new Intent(ProfilActivity.this,VoucherActivity.class);
		startActivity(voucherPage);
	}

	private void goToLoginPage(){
		Intent loginPage = new Intent(ProfilActivity.this,LoginActivity.class);
		startActivity(loginPage);
	}


}
