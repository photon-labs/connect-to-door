package com.photon.connecttodoor;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class VoucherActivity extends Activity {
	
	private Button signOutButton,backButton;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_voucher);
		
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
	public void goToLoginPage(){
		Intent logInPage = new Intent(VoucherActivity.this, LoginActivity.class);
		startActivity(logInPage);
	}
	
	public void goToAttandace(){
		Intent attandancePage = new Intent(VoucherActivity.this, WelcomeScreenActivity.class);
		startActivity(attandancePage);
	}
}
