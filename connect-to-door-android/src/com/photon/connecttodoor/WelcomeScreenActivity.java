package com.photon.connecttodoor;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;

public class WelcomeScreenActivity extends Activity {

	private ImageButton profilButton;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.welcome_screen);

		profilButton = (ImageButton) findViewById(R.id.profileButton);	
		profilButton.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				goToProfilPage();
			}
		});
	}

	public void goToProfilPage(){
		Intent intentProfilPage = new Intent(WelcomeScreenActivity.this, ProfilActivity.class);
		startActivity(intentProfilPage);
	}
}
