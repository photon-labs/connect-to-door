package com.photon.connecttodoor.activity;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.utils.ApplicationConstant;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class VoucherActivity extends MainActivity {

	private Button signOutButton,backButton, reimburseButton;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_voucher);
		reimburseButton = (Button)findViewById(R.id.voucherreimbursement_button);
		signOutButton = (Button)findViewById(R.id.signout_button);
		backButton = (Button)findViewById(R.id.back_button);
		actionButton();
	}

	private void actionButton(){
		/*	reimburseButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToReimbursePage();
			}
		}); */
		signOutButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				/**check internet connection before sign out application */
				if(connectionAvailable()){
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
