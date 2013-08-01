package com.photon.connecttodoor.uiadapter;

import java.util.ArrayList;

import android.content.Context;
import android.graphics.Color;
import android.os.AsyncTask;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnKeyListener;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.EditText;
import android.widget.TextView;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.controller.LocalStorage;
import com.photon.connecttodoor.controller.UpdateCheckInOutService;
import com.photon.connecttodoor.datamodel.DailyAttendanceListModel;

public class ListGeneratedDailyArrayAdapter extends BaseAdapter {
	String presenceId;
	String checkIn;
	String checkOut;
	String inputCheckIn;
	String inputCheckOut;
	String updateCheckIn;
	String updateCheckOut;
	private final Context context;
	private ArrayList<DailyAttendanceListModel> values;
	UpdateData updateData;

	public ListGeneratedDailyArrayAdapter(Context context ,ArrayList<DailyAttendanceListModel> arrayList) {

		this.context = context;
		this.values = arrayList;
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return values.size();
	}


	@Override
	public Object getItem(int position) {
		// TODO Auto-generated method stub
		return values.get(position);
	}


	@Override
	public long getItemId(int position) {
		// TODO Auto-generated method stub
		return position;
	}


	@Override
	public View getView(final int position, View convertView, ViewGroup parent) {

		LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		convertView = inflater.inflate(R.layout.text_table_daily_attendance, null);
		TextView numberTextView = (TextView) convertView.findViewById(R.id.number_text);
		TextView nameTextView = (TextView) convertView.findViewById(R.id.name_text);
		final TextView checkInTextView = (TextView) convertView.findViewById(R.id.check_in_text);
		final TextView checkOutTextView = (TextView) convertView.findViewById(R.id.check_out_text);
		final EditText editCheckInUpdate = (EditText) convertView.findViewById(R.id.edt_check_in_text);
		final EditText editCheckOutUpdate = (EditText) convertView.findViewById(R.id.edt_check_out_text);
		convertView.setBackgroundColor(position % 2 == 0 ? Color.WHITE : Color.parseColor("#cfe9d0"));

		int number = position+1;
		numberTextView.setText(""+number);
		nameTextView.setText(values.get(position).getName());
		checkInTextView.setText(values.get(position).getCheckIn());
		checkOutTextView.setText(values.get(position).getCheckOut());
		LocalStorage localstorage = new LocalStorage();
		String admin = localstorage.loadStringPreferences("previlege", context.getApplicationContext());

		if(admin.equals("Admin")){
			checkInTextView.setOnClickListener(new OnClickListener() {

				@Override
				public void onClick(View v) {
					// TODO Auto-generated method stub
					checkInTextView.setVisibility(View.GONE);
					editCheckInUpdate.setVisibility(View.VISIBLE);
					checkOutTextView.setVisibility(View.VISIBLE);
					editCheckOutUpdate.setVisibility(View.GONE);
					presenceId = values.get(position).getPresentId();
				}
			});

			checkOutTextView.setOnClickListener(new OnClickListener() {

				@Override
				public void onClick(View v) {
					// TODO Auto-generated method stub
					checkOutTextView.setVisibility(View.GONE);
					editCheckOutUpdate.setVisibility(View.VISIBLE);
					checkInTextView.setVisibility(View.VISIBLE);
					editCheckInUpdate.setVisibility(View.GONE);
					presenceId = values.get(position).getPresentId();
				}
			});


			editCheckInUpdate.setOnKeyListener(new OnKeyListener() {

				@Override
				public boolean onKey(View v, int keyCode, KeyEvent event) {

					{
						if(event.getAction() == KeyEvent.ACTION_DOWN)
						{
							if(keyCode == KeyEvent.KEYCODE_ENTER)
							{
								checkIn = values.get(position).getCheckIn().toString();
								checkOut = values.get(position).getCheckOut().toString();
								inputCheckIn = editCheckInUpdate.getText().toString();
								inputCheckOut = editCheckOutUpdate.getText().toString();
								updateCheckIn = inputCheckIn;
								updateCheckOut = inputCheckOut;
								values.get(position).setCheckIn(updateCheckIn);
								values.get(position).setCheckOut(updateCheckOut);
								checkInTextView.setText(values.get(position).getCheckIn());
								checkOutTextView.setText(values.get(position).getCheckOut());
								checkInTextView.setVisibility(View.VISIBLE);
								checkOutTextView.setVisibility(View.VISIBLE);
								new CallServiceAttendanceReportTask().execute();
								return true;
							}
						}
					}
					return false;
				}
			});

		}
		return convertView;
	}

	private class CallServiceAttendanceReportTask extends AsyncTask<Void, Void, String> {

		protected void onPreExecute() {

		}

		@Override
		protected String doInBackground(Void... params) {
			LocalStorage localstorage = new LocalStorage();
			String presentIds = presenceId;
			String employeeId = localstorage.loadStringPreferences("employeeId", context.getApplicationContext());
			String updateTimeCheckIn = updateCheckIn;
			String updateTimeCheckOut = updateCheckOut;
			String date = localstorage.loadStringPreferences("date", context.getApplicationContext());
			UpdateCheckInOutService updateCheckInOutService = new UpdateCheckInOutService();
			String response = updateCheckInOutService.handleUpdateCheckInOutRequest(employeeId, presentIds, updateTimeCheckIn, updateTimeCheckOut, date);
			return response;
		}

		protected void onPostExecute(String result) {
			updateData.onDataUpdated();
		}
	}

	public void setDataUpdated(UpdateData data){
		this.updateData = data;
	}
	public interface UpdateData {
		public void onDataUpdated();
	}
}
