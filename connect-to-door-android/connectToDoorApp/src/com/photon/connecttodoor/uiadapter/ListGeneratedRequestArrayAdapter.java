package com.photon.connecttodoor.uiadapter;

import java.util.ArrayList;

import com.photon.connecttodoor.R;
import com.photon.connecttodoor.datamodel.RequestListModel;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

public class ListGeneratedRequestArrayAdapter extends BaseAdapter {
	private final Context context;
	private ArrayList<RequestListModel> values;
	
	public ListGeneratedRequestArrayAdapter(Context context, ArrayList<RequestListModel> arrayList) {
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
		convertView = inflater.inflate(R.layout.text_table_requestlist, null);
		TextView numberTextView = (TextView) convertView.findViewById(R.id.req_no);
		TextView dateTextView = (TextView) convertView.findViewById(R.id.req_date);
		TextView descTextView = (TextView) convertView.findViewById(R.id.req_desc);
		TextView quantityTextView = (TextView) convertView.findViewById(R.id.req_quantity);
		TextView costTextView = (TextView) convertView.findViewById(R.id.req_cost);
		convertView.setBackgroundColor(position % 2 == 0 ? Color.WHITE : Color.parseColor("#cfe9d0"));
		int number = position+1;
		numberTextView.setText(""+number);
		dateTextView.setText(values.get(position).getDate());
		descTextView.setText(values.get(position).getDescription());
		quantityTextView.setText(values.get(position).getQuantity());
		costTextView.setText(values.get(position).getCost());
		
		return convertView;
	}

}
