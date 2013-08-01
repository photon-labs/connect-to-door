package com.photon.connecttodoor.activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.utils.ApplicationConstant;

public class VoucherActivity extends MainActivity {

	private Button signOutButton,backButton, reimburseButton,requestButton;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_voucher);
		reimburseButton = (Button)findViewById(R.id.voucherreimbursement_button);
		signOutButton = (Button)findViewById(R.id.signout_button);
		requestButton = (Button)findViewById(R.id.voucherrequest_button);
		backButton = (Button)findViewById(R.id.back_button);
		actionButton();
	}

	private void actionButton(){
		reimburseButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToReimbursePage();
			}
		});
		requestButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToRequestPage();
			}
		});
		signOutButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				/**check internet connection before sign out application */
				if(hasConnectionAvailable()){
					LoginActivity.onClickLogout();
					goToLoginPage();
				}else{
					alertMessage(ApplicationConstant.NO_INTERNET_CONNECTION, VoucherActivity.this);
				}
			}
		});
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
		finish();
	}

	private void goToRequestPage(){
		Intent requestPage = new Intent(VoucherActivity.this,RequestActivity.class);
		startActivity(requestPage);
		finish();
	}

	public void goToLoginPage(){
		Intent logInPage = new Intent(VoucherActivity.this, LoginActivity.class);
		startActivity(logInPage);
		finish();
	}

	public void goToAttandace(){
		Intent attandancePage = new Intent(VoucherActivity.this, WelcomeScreenActivity.class);
		startActivity(attandancePage);
		finish();
	}
	@Override
	public void onBackPressed() {
		Intent attandancePage = new Intent(VoucherActivity.this, WelcomeScreenActivity.class);
		startActivity(attandancePage);
		finish();
	}
}
