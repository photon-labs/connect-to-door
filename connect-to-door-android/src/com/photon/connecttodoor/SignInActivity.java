package com.photon.connecttodoor;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class SignInActivity extends Activity {
	
	private Button signInButton;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_sign_in);
		
		signInButton = (Button)findViewById(R.id.buttonSignIn);
		signInButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				goToWelcomePage();
			}
		});
	}		
		public void goToWelcomePage(){
			Intent welcomePage = new Intent(SignInActivity.this, WelcomeScreenActivity.class);
			startActivity(welcomePage);
		}

}
