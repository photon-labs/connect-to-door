package com.photon.connecttodoor.activity;

import org.json.JSONException;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.controller.LocalStorage;
import com.photon.connecttodoor.controller.LoginService;
import com.photon.connecttodoor.controller.ProfileService;
import com.photon.connecttodoor.datamodel.LoginDataModel;
import com.photon.connecttodoor.utils.ApplicationConstant;

public class SignInActivity extends MainActivity {

	private Button signInButton;
	private EditText signInEditText;
	LocalStorage localStorage;
	private static final String EMPLOYEE_ID = "employeeId";
	private static final String FACEBOOK_ID = "facebookId";

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_sign_in);

		signInEditText = (EditText)findViewById(R.id.edit_message);
		signInButton = (Button)findViewById(R.id.buttonSignIn);
		localStorage = new LocalStorage();
		actionButton();
	}		
	private void actionButton(){
		/**
		 * onClick to menu attendance
		 * this action do two request,login request and profile request
		 */
		signInButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				int empty = 0;
				if(hasConnectionAvailable()){
					if(signInEditText.getText().length() != empty){
						new CallServiceLoginTask().execute();
						new CallServiceProfileTask().execute();
					}else{
						alertMessage(ApplicationConstant.ERR_INPUT_EMP_ID,SignInActivity.this);
					}
				}else{
					alertMessage(ApplicationConstant.NO_INTERNET_CONNECTION, SignInActivity.this);
				}
			}
		});
	}
	/**
	 * launch menu attendance
	 */
	public void goToWelcomePage(){
		Intent welcomePage = new Intent(SignInActivity.this, WelcomeScreenActivity.class);
		startActivity(welcomePage);
		finish();
	}

	/**
	 * request login service
	 * in do background throws two parameter that is employee id and facebook id
	 */
	private class CallServiceLoginTask extends AsyncTask<Void, Void, String> {

		private ProgressDialog dialog;

		protected void onPreExecute() {
			this.dialog = ProgressDialog.show(SignInActivity.this,
					"Login Process", "Please Wait...", true);
		}

		@Override
		protected String doInBackground(Void... params) {
			String employeeId = signInEditText.getText().toString();
			localStorage.savePreference(EMPLOYEE_ID, employeeId, getApplicationContext());
			String fbId = localStorage.loadStringPreferences(FACEBOOK_ID, getApplicationContext());
			LoginService loginService = new LoginService();
			String response = loginService.handleLoginRequest(employeeId, fbId);
			return response;
		}

		protected void onPostExecute(String result) {
			if (result != null){
				localStorage.savePreference("responseLogin", result, getApplicationContext());
				String response = result;
				LoginDataModel loginDataModel = new LoginDataModel();
				try {
					loginDataModel.parseJSON(response);
				} catch (JSONException e) {
					e.printStackTrace();
				}

				if(loginDataModel.getStatus().equalsIgnoreCase("success")){
					goToWelcomePage();
				}else{
					alertMessage(ApplicationConstant.ERR_LOGIN_FAIL,SignInActivity.this);
				}
			}
			this.dialog.dismiss();
		}
	}
	/**
	 * request profile service
	 * in do background throws two parameter that is employee id and search parameter
	 */
	private class CallServiceProfileTask extends AsyncTask<Void, Void, String> {

		protected void onPreExecute() {
			// TODO Auto-generated method stub
		}

		@Override
		protected String doInBackground(Void... params) {
			String employeeId = signInEditText.getText().toString();
			String searchParameter = ApplicationConstant.EMPLOYEE_ID;
			ProfileService profileService = new ProfileService();
			String response = profileService.handleProfileRequest(searchParameter, employeeId);
			return response;
		}

		protected void onPostExecute(String result) {
			if(result != null){
				localStorage.savePreference("responseProfile", result, getApplicationContext());
			}
		}
	}

}
