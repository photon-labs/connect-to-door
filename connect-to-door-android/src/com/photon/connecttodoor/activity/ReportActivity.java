package com.photon.connecttodoor.activity;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.json.JSONException;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ListView;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.datamodel.ReportAttendanceModel;
import com.photon.connecttodoor.uiadapter.ListGeneratedReportArrayAdapter;

public class ReportActivity extends Activity {

	private ListView attendanceAdminReport;
	private Button signOutButton ;
	private Button backButton ;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_report);
		signOutButton = (Button)findViewById(R.id.signout_button);
		backButton = (Button)findViewById(R.id.back_button);

		attendanceAdminReport = (ListView) findViewById(R.id.table_report_attendance);

		String response = LoadAccount(R.raw.daily);

		ReportAttendanceModel reportAttendance = new ReportAttendanceModel(response);

		try {
			reportAttendance.parseSource();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		ListGeneratedReportArrayAdapter tableReport = new ListGeneratedReportArrayAdapter(this,reportAttendance.getReportAttendanceList());
		attendanceAdminReport.setAdapter(tableReport);

		signOutButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToLoginPage();

			}
		});

		backButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToAttendancePage();

			}
		});
	}
	private void goToAttendancePage(){
		Intent attendancePage = new Intent(ReportActivity.this,WelcomeScreenActivity.class);
		startActivity(attendancePage);
	}

	private void goToLoginPage(){
		Intent loginPage = new Intent(ReportActivity.this,LoginActivity.class);
		startActivity(loginPage);
	}


	protected String LoadAccount(int resourceId) {
		// The InputStream opens the resourceId and sends it to the buffer
		InputStream is = this.getResources().openRawResource(resourceId);
		BufferedReader br = new BufferedReader(new InputStreamReader(is));
		String line;
		StringBuilder text = new StringBuilder();

		try {
			//While the BufferedReader readLine is not null
			while ((line = br.readLine()) != null) {
				text.append(line);
				text.append('\n');
			}    
			//Close the InputStream and BufferedReader
			is.close();
			br.close();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return text.toString();
	}

}
