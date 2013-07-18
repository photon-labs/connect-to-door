package com.photon.connecttodoor.activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

import com.facebook.LoggingBehavior;
import com.facebook.Request;
import com.facebook.Response;
import com.facebook.Session;
import com.facebook.SessionState;
import com.facebook.Settings;
import com.facebook.model.GraphUser;
import com.photon.connecttodoor.R;
import com.photon.connecttodoor.utils.ApplicationConstant;

public class LoginActivity extends MainActivity {
	private Button facebookButton;

	private Session.StatusCallback statusCallback = new SessionStatusCallback();
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_login);
		facebookButton = (Button)findViewById(R.id.signin_button);

		Settings.addLoggingBehavior(LoggingBehavior.INCLUDE_ACCESS_TOKENS);

		Session session = Session.getActiveSession();
		if (session == null) {
			if (savedInstanceState != null) {
				session = Session.restoreSession(this, null, statusCallback, savedInstanceState);
			}
			if (session == null) {
				session = new Session(this);
			}
			Session.setActiveSession(session);
			if (session.getState().equals(SessionState.CREATED_TOKEN_LOADED)) {
				session.openForRead(new Session.OpenRequest(this).setCallback(statusCallback));
			}
		}

		updateView();
	}
	@Override
	public void onStart() {
		super.onStart();
		Session.getActiveSession().addCallback(statusCallback);
	}

	@Override
	public void onStop() {
		super.onStop();
		Session.getActiveSession().removeCallback(statusCallback);
	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		Session.getActiveSession().onActivityResult(this, requestCode, resultCode, data);
	}

	@Override
	protected void onSaveInstanceState(Bundle outState) {
		super.onSaveInstanceState(outState);
		Session session = Session.getActiveSession();
		Session.saveSession(session, outState);
	}

	private void updateView() {
		final Session session = Session.getActiveSession();
		if (session.isOpened()) {
			Request request = Request.newMeRequest(session, new Request.GraphUserCallback() {

				@Override
				public void onCompleted(GraphUser user, Response response) {
					// TODO Auto-generated method stub
					if (session == Session.getActiveSession()) {
						if (user != null) {
							savePreference("facebookId", user.getId(), getApplicationContext());
						}   

					}   
				}   
			}); 
			Request.executeBatchAsync(request);
			goToSignInPage();
		} else {
			facebookButton.setOnClickListener(new OnClickListener() {
				public void onClick(View view) { onClickLogin(); }
			});
		}
	}
	private void onClickLogin() {
		if(connectionAvailable()){
			Session session = Session.getActiveSession();
			if (!session.isOpened() && !session.isClosed()) {
				session.openForRead(new Session.OpenRequest(this).setCallback(statusCallback));
			} else {
				Session.openActiveSession(this, true, statusCallback);
			}
		}else{
			alertMessage(ApplicationConstant.NO_INTERNET_CONNECTION, this);
		}

	}

	public static void onClickLogout() {
		Session session = Session.getActiveSession();
		if (!session.isClosed()) {
			session.closeAndClearTokenInformation();
		}
	}
	public void goToSignInPage(){
		Intent signInPage = new Intent(LoginActivity.this, SignInActivity.class);
		startActivity(signInPage);
		finish();
	}
	private class SessionStatusCallback implements Session.StatusCallback {
		@Override
		public void call(Session session, SessionState state, Exception exception) {
			updateView();
		}
	}
}
