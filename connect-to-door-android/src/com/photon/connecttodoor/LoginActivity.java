package com.photon.connecttodoor;

import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.app.Activity;
import android.content.Intent;

public class LoginActivity extends Activity {
	
	private Button facebookButton;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_login);
		
		facebookButton = (Button)findViewById(R.id.signin_button);
		facebookButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				goToSignInPage();
				
			}
		});
	}
	public void goToSignInPage(){
		Intent signInPage = new Intent(LoginActivity.this, SignInActivity.class);
		startActivity(signInPage);
	}

}
