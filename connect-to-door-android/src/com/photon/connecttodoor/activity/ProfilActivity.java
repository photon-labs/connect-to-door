package com.photon.connecttodoor.activity;

import org.json.JSONException;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;
import android.widget.TextView;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.datamodel.ProfileModel;
import com.photon.connecttodoor.utils.Utility;

public class ProfilActivity extends Activity {

	private ImageButton attendanceButton,voucherButton,signOutButton; 
	private TextView name,employeeId,projectId,role,startWorking,emailAddress,annual,
					 coof,condolances,married,maternity,paternity,onsite,sick;
	ProfileModel profileDataModel;

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
		
		String dataProfile = Utility.loadStringPreferences("responseProfile", getApplicationContext());
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
		annual.setText(profileDataModel.getAnnual()+" Days");
		coof.setText(profileDataModel.getcOff()+" Days");
		condolances.setText(profileDataModel.getCondolences()+" Days");
		married.setText(profileDataModel.getMarried()+" Days");
		maternity.setText(profileDataModel.getMaternity()+" Days");
		paternity.setText(profileDataModel.getPaternity()+" Days");
		onsite.setText(profileDataModel.getOnsite()+" Days");
		sick.setText(profileDataModel.getSick()+" Days");
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
