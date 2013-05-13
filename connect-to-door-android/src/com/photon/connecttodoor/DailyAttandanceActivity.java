package com.photon.connecttodoor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.json.JSONException;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ListView;

import com.photon.datamodel.DailyAttendanceModel;
import com.photon.uiadapter.ListGeneratedReportArrayAdapter;

public class DailyAttandanceActivity extends Activity{

	private ImageButton backButton;
	private ImageButton signOutButton;
	private EditText startFromDateTxt;
	private ListView dailyReport;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.daily_attandance);
		backButton = (ImageButton) findViewById(R.id.backButton);
		signOutButton = (ImageButton) findViewById(R.id.signOutButton);
		startFromDateTxt = (EditText)findViewById(R.id.startFromDateTxt);
		dailyReport = (ListView) findViewById(R.id.table_report);
		
		String response = LoadAccount(R.raw.daily);
		
		DailyAttendanceModel dailyModel = new DailyAttendanceModel(response);

		try {
			dailyModel.parseSource();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		ListGeneratedReportArrayAdapter tableReport = new ListGeneratedReportArrayAdapter(this,dailyModel.getDailyAttendanceListModels());
		dailyReport.setAdapter(tableReport);

		backButton.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				goToWelcomePage();
			}
		});

		signOutButton.setOnClickListener(new OnClickListener() {	
			@Override
			public void onClick(View v) {
				goToLoginPage();
			}
		});
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
                Log.i("JSON", line);
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

	private void goToWelcomePage(){
		Intent intentWelcomeScreen = new Intent(DailyAttandanceActivity.this, WelcomeScreenActivity.class);
		startActivity(intentWelcomeScreen);
	}

	private void goToLoginPage(){
		Intent intentLoginPage = new Intent(DailyAttandanceActivity.this, LoginActivity.class);
		startActivity(intentLoginPage);
	}
}
