package com.photon.connecttodoor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.json.JSONException;

import com.photon.datamodel.ReportAttendanceModel;
import com.photon.uiadapter.ListGeneratedDailyArrayAdapter;
import com.photon.uiadapter.ListGeneratedReportArrayAdapter;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.ListView;
import android.app.Activity;
import android.content.Intent;

public class ReportActivity extends Activity {
	
	private ListView attendanceAdminReport;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_report);
		
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
	
}
