package com.photon.connecttodoor.uiadapter;

import java.util.ArrayList;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.datamodel.AttendanceListModel;

public class ListGeneratedAttendanceListArrayAdapter extends BaseAdapter {

	private final Context context;
	private ArrayList<AttendanceListModel> values;

	public ListGeneratedAttendanceListArrayAdapter(Context context,ArrayList<AttendanceListModel> arrayList){
		//super(context, textViewResourceId);
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
	public View getView(int position, View convertView, ViewGroup parent) {
		// TODO Auto-generated method stub
		LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		convertView = inflater.inflate(R.layout.text_table_attendancelist, null);
		TextView numberTextView = (TextView) convertView.findViewById(R.id.no_att_text);
		TextView nameTextView = (TextView) convertView.findViewById(R.id.name__att_text);
		TextView employeeId = (TextView) convertView.findViewById(R.id.employee_att_text);
		TextView projectId = (TextView) convertView.findViewById(R.id.project_att_text);
		TextView totalAttendance = (TextView) convertView.findViewById(R.id.total_att_text);
		TextView totalWorking = (TextView) convertView.findViewById(R.id.total_working_text);
		TextView totalLeave = (TextView) convertView.findViewById(R.id.total_leave_text);
		TextView avgWorkingHour = (TextView) convertView.findViewById(R.id.avg_working_text);
		convertView.setBackgroundColor(position % 2 == 0 ? Color.WHITE : Color.parseColor("#cfe9d0"));

		numberTextView.setText(values.get(position).getNumber());
		nameTextView.setText(values.get(position).getName());
		employeeId.setText(values.get(position).getEmployeeId());
		projectId.setText(values.get(position).getProjectId());
		totalAttendance.setText(values.get(position).getTotalAttendance());
		totalWorking.setText(values.get(position).getTotalWorking());
		totalLeave.setText(values.get(position).getTotalLeave());
		avgWorkingHour.setText(values.get(position).getAvgWorkingHour());
		
		return convertView;
	}
	

}
