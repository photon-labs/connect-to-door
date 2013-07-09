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
import com.photon.connecttodoor.datamodel.LoginDataModel;
import com.photon.connecttodoor.utils.Utility;

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
					new CallServiceLoginTask().execute();
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
			Utility.savePreference("employeeId", employeeId, getApplicationContext());
			String fbId = Utility.loadStringPreferences("facebookId", getApplicationContext());
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
				alertMessage("Login failed");
			}
			this.dialog.dismiss();
		}
	}

}
