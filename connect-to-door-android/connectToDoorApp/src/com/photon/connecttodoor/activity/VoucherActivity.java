package com.photon.connecttodoor.activity;

import com.photon.connecttodoor.R;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class VoucherActivity extends Activity {
	
	private Button signOutButton,backButton, reimburseButton;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_voucher);
		reimburseButton = (Button)findViewById(R.id.voucherreimbursement_button);
		reimburseButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				goToReimbursePage();
			}
		});
		
		signOutButton = (Button)findViewById(R.id.signout_button);
		signOutButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
			goToLoginPage();
				
			}
		});
		backButton = (Button)findViewById(R.id.back_button);
		backButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				goToAttandace();
				
			}
		});
	}
	
	private void goToReimbursePage(){
		Intent reimbursePage = new Intent(VoucherActivity.this,ReimburseActivity.class);
		startActivity(reimbursePage);
	}
	
	public void goToLoginPage(){
		Intent logInPage = new Intent(VoucherActivity.this, LoginActivity.class);
		startActivity(logInPage);
	}
	
	public void goToAttandace(){
		Intent attandancePage = new Intent(VoucherActivity.this, WelcomeScreenActivity.class);
		startActivity(attandancePage);
	}
}
