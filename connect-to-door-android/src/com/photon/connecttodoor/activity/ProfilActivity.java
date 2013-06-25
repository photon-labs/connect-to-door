package com.photon.connecttodoor.activity;

import com.photon.connecttodoor.R;

import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ImageButton;
import android.app.Activity;
import android.content.Intent;

public class ProfilActivity extends Activity {
	
	private ImageButton attendanceButton,voucherButton,signOutButton; 
	

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profil);
        attendanceButton = (ImageButton)findViewById(R.id.attendancebutton);
        voucherButton = (ImageButton)findViewById(R.id.voucherbutton);
        signOutButton = (ImageButton)findViewById(R.id.signOutButton);
        
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
