package com.photon.connecttodoor.activity;

import org.json.JSONException;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.controller.LoginService;
import com.photon.connecttodoor.controller.ProfileService;
import com.photon.connecttodoor.datamodel.LoginDataModel;
import com.photon.connecttodoor.utils.ApplicationConstant;
import com.photon.connecttodoor.utils.Utility;

public class SignInActivity extends Activity {

	private Button signInButton;
	private EditText signInEditText;
	private static final String EMPLOYEE_ID = "employeeId";
	private static final String FACEBOOK_ID = "facebookId";

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
					new CallServiceLoginTask().execute();
					new CallServiceProfileTask().execute();
				}else{
					Utility.alertMessage("Please input your employee id",SignInActivity.this);
				}
			}
		});
	}		
	public void goToWelcomePage(){
		Intent welcomePage = new Intent(SignInActivity.this, WelcomeScreenActivity.class);
		startActivity(welcomePage);
	}

	private class CallServiceLoginTask extends AsyncTask<Void, Void, String> {

		private ProgressDialog dialog;

		protected void onPreExecute() {
			this.dialog = ProgressDialog.show(SignInActivity.this,
					"Login Process", "Please Wait...", true);
		}

		@Override
		protected String doInBackground(Void... params) {
			// TODO Auto-generated method stub
			String employeeId = signInEditText.getText().toString();
			Utility.savePreference(EMPLOYEE_ID, employeeId, getApplicationContext());
			String fbId = Utility.loadStringPreferences(FACEBOOK_ID, getApplicationContext());
			LoginService loginService = new LoginService();
			String response = loginService.handleLoginRequest(employeeId, fbId);
			return response;
		}

		protected void onPostExecute(String result) {
			Utility.savePreference("responseLogin", result, getApplicationContext());
			String response = result;
			LoginDataModel loginDataModel = new LoginDataModel();
			try {
				loginDataModel.parseJSON(response);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if(loginDataModel.getStatus().equalsIgnoreCase("success")){
				goToWelcomePage();
			}else{
				Utility.alertMessage(ApplicationConstant.ERR_LOGIN_FAIL,SignInActivity.this);
			}
			this.dialog.dismiss();
		}
	}
	
	private class CallServiceProfileTask extends AsyncTask<Void, Void, String> {

		protected void onPreExecute() {
		
		}

		@Override
		protected String doInBackground(Void... params) {
			// TODO Auto-generated method stub
			String employeeId = signInEditText.getText().toString();
			String searchParameter = ApplicationConstant.EMPLOYEE_ID;
			ProfileService profileService = new ProfileService();
			String response = profileService.handleProfileRequest(searchParameter, employeeId);
			return response;
		}

		protected void onPostExecute(String result) {
			Utility.savePreference("responseProfile", result, getApplicationContext());
		}
	}

}
