package com.photon.uiadapter;

import java.util.ArrayList;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.photon.connecttodoor.R;
import com.photon.datamodel.ReportAttendanceListModel;

public class ListGeneratedReportArrayAdapter extends BaseAdapter {

	private final Context context;
	private ArrayList<ReportAttendanceListModel> values;


	public ListGeneratedReportArrayAdapter(Context context ,ArrayList<ReportAttendanceListModel> arrayList) {
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

		LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		convertView = inflater.inflate(R.layout.text_table_report, null);
		TextView numberTextView = (TextView) convertView.findViewById(R.id.number_text);
		TextView nameTextView = (TextView) convertView.findViewById(R.id.name_text);
		TextView employeeId = (TextView) convertView.findViewById(R.id.employee_text);
		TextView annual = (TextView) convertView.findViewById(R.id.annual_text);
		TextView coff = (TextView) convertView.findViewById(R.id.coff_text);
		TextView condolences = (TextView) convertView.findViewById(R.id.condolances_text);
		TextView married = (TextView) convertView.findViewById(R.id.married_text);
		TextView maternity = (TextView) convertView.findViewById(R.id.maternity_text);
		TextView onsite = (TextView) convertView.findViewById(R.id.onsite_text);
		TextView paternity = (TextView) convertView.findViewById(R.id.paternity_text);
		TextView sick = (TextView) convertView.findViewById(R.id.sick_text);
		convertView.setBackgroundColor(position % 2 == 0 ? Color.WHITE : Color.parseColor("#cbe7f3"));

		numberTextView.setText(values.get(position).getNumber());
		nameTextView.setText(values.get(position).getName());
		employeeId.setText(values.get(position).getEmployeeId());
		annual.setText(values.get(position).getAnnual());
		coff.setText(values.get(position).getCoff());
		condolences.setText(values.get(position).getCondolances());
		married.setText(values.get(position).getMarried());
		maternity.setText(values.get(position).getMaternity());
		onsite.setText(values.get(position).getOnsite());
		paternity.setText(values.get(position).getPaternity());
		sick.setText(values.get(position).getSick());
		

		return convertView;
	}
}
