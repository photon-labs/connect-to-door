package com.photon.connecttodoor.activity;

import org.json.JSONException;
import org.json.JSONObject;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.controller.LoginService;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

public class SignInActivity extends Activity {

	private Button signInButton;
	private EditText signInEditText;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_sign_in);

		signInEditText = (EditText)findViewById(R.id.edit_message);
		signInButton = (Button)findViewById(R.id.buttonSignIn);
		signInButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				int empty = 0;
				if(signInEditText.getText().length() != empty){
					goToWelcomePage();
				}else{
					alertMessage("Please input your employee id");
				}
			}
		});
	}		
	public void goToWelcomePage(){
		Intent welcomePage = new Intent(SignInActivity.this, WelcomeScreenActivity.class);
		startActivity(welcomePage);
	}

	private void alertMessage(String message){
		AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(SignInActivity.this);

		// set title
		alertDialogBuilder.setTitle("Alert");

		// set dialog message
		alertDialogBuilder
		.setMessage(message)
		.setCancelable(false)
		.setPositiveButton("Yes",new DialogInterface.OnClickListener() {
			public void onClick(DialogInterface dialog,int id) {
				// if this button is clicked, close
				// current activity
				dialog.dismiss();
			}
		});
		
		// create alert dialog
		AlertDialog alertDialog = alertDialogBuilder.create();

		// show it
		alertDialog.show();
	}
	
}