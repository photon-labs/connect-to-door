package com.photon.connecttodoor.activity;

import java.util.Calendar;

import com.photon.connecttodoor.R;

import android.app.Activity;
import android.app.DatePickerDialog;
import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ArrayAdapter;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.Spinner;

public class ReimburseActivity extends Activity{

	private String reimbursementCategory[] = {"Meal", "Transportation", "Utility" };
	private String approvalCategory[] = {"Penfen Fealty","Kurnia Sari","Dimas Isharmaya","Namira","Joko Irwansyah"};
	Spinner dropDownCategory, dropDownApprovalCategory;
	ImageButton backButton;
	private EditText voucherDate;
	private ImageView startFromDateImage;
	private int pYear;
	private int pMonth;
	private int pDay;

	static final int DATE_DIALOG_ID = 0;


	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.reimburse_form);
		backButton = (ImageButton)findViewById(R.id.backButton);
		startFromDateImage = (ImageView)findViewById(R.id.startFromDateImage);
		voucherDate = (EditText)findViewById(R.id.voucher_date);
		dropDownApprovalCategory =(Spinner)findViewById(R.id.spinnerCategorySubmitTo);
		dropDownCategory = (Spinner)findViewById(R.id.spinnerCategory);

		ArrayAdapter approvalAdapter = new ArrayAdapter(this,android.R.layout.simple_spinner_item, approvalCategory);
		approvalAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		dropDownApprovalCategory.setAdapter(approvalAdapter);

		ArrayAdapter adapter = new ArrayAdapter(this,android.R.layout.simple_spinner_item, reimbursementCategory);
		adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		dropDownCategory.setAdapter(adapter);

		backButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				goToVoucherPage();
			}
		});

		startFromDateImage.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				getCurrentDate();
				showDialog(DATE_DIALOG_ID);
			}
		});
	}

	private void getCurrentDate(){
		final Calendar cal = Calendar.getInstance();
		pYear = cal.get(Calendar.YEAR);
		pMonth = cal.get(Calendar.MONTH);
		pDay = cal.get(Calendar.DAY_OF_MONTH);
	}

	/** Callback received when the user "picks" a date in the dialog */
	private DatePickerDialog.OnDateSetListener pDateSetListener =
			new DatePickerDialog.OnDateSetListener() {

		@Override
		public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
			pYear = year;
			pMonth = monthOfYear;
			pDay = dayOfMonth;
			voucherDate.setText(getDateEditText());
		}
	};
	/**
	 * Create Date for startDate editText and untilDate editText 
	 * @return getDateEditText as StringBuilder
	 */
	private StringBuilder getDateEditText(){
		// Month is 0 based so add 1
		String pMonthString = String.valueOf((pMonth+1)).trim().toString();
		String pDayString = String.valueOf(pDay).trim().toString();
		String pYearString = String.valueOf(pYear).trim().toString();

		if(pMonthString.length() < 2){
			pMonthString = "0"+pMonthString;
		}

		if(pDayString.length() < 2){
			pDayString = "0"+pDayString;
		}

		return new StringBuilder()
		.append(pDayString).append("-")
		.append(pMonthString).append("-")
		.append(pYearString).append("");
	}

	@Override
	protected Dialog onCreateDialog(int id) {
		switch (id) {
		case DATE_DIALOG_ID:
			return new DatePickerDialog(this,
					pDateSetListener,
					pYear, pMonth, pDay);
		}

		return null;
	}

	private String changeFormatDate(String date){
		String [] formatDate = date.split("-");
		String day = formatDate[0];
		String month = formatDate[1];
		String year = formatDate[2];
		return year+"-"+month+"-"+day;
	}

	private void goToVoucherPage(){
		Intent voucherPage = new Intent(ReimburseActivity.this, VoucherActivity.class);
		startActivity(voucherPage);
	}
}
