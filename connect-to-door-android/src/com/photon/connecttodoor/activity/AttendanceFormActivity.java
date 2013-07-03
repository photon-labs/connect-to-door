package com.photon.connecttodoor.activity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Spinner;

import com.photon.connecttodoor.R;

public class AttendanceFormActivity extends Activity {

	private String category[] = {"Name", "Employee ID", "Project ID" };
	Spinner dropDownCategory;
	private Button createButton, backButton, signOutButton;
	private EditText editTextName, editTextEmployee, editTextProject, editTextStartWork,
	editTextEmail, editTextAnnual, editTextMarried, editTextPaternity,
	editTextCoff, editTextMaternity, editTextSick, editTextCondolences, editTextOnsite;
	private ImageButton imageCalendar;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_attendace_form);

		dropDownCategory = (Spinner)findViewById(R.id.spinnerCategory);

		ArrayAdapter adapter = new ArrayAdapter(this,android.R.layout.simple_spinner_item, category);
		adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
		dropDownCategory.setAdapter(adapter);

		backButton = (Button)findViewById(R.id.back_button);
		signOutButton = (Button)findViewById(R.id.signout_button);
		createButton = (Button)findViewById(R.id.button_create);
		imageCalendar = (ImageButton)findViewById(R.id.image_button_calendar);
		editTextName = (EditText)findViewById(R.id.edit_text_name);
		editTextEmployee = (EditText)findViewById(R.id.edit_text_employee);
		editTextEmail = (EditText)findViewById(R.id.edit_text_email);
		editTextStartWork = (EditText)findViewById(R.id.edit_text_start_working);
		editTextProject = (EditText)findViewById(R.id.edit_text_project);
		editTextAnnual = (EditText)findViewById(R.id.edit_text_annual);
		editTextMarried = (EditText)findViewById(R.id.edit_text_married);
		editTextPaternity = (EditText)findViewById(R.id.edit_text_paternity);
		editTextMaternity = (EditText)findViewById(R.id.edit_text_maternity);
		editTextSick = (EditText)findViewById(R.id.edit_text_sick);
		editTextCoff = (EditText)findViewById(R.id.edit_text_coff);
		editTextCondolences = (EditText)findViewById(R.id.edit_text_condolences);
		editTextOnsite = (EditText)findViewById(R.id.edit_text_onsite);

		//onClick for create account button
		createButton.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				imageCalendar.setBackgroundResource(R.drawable.icon_calendar_start_working);
				editTextName.setBackgroundResource(R.drawable.box_add_text_n_e_p_active);
				editTextName.setEnabled(true);
				editTextEmployee.setBackgroundResource(R.drawable.box_add_text_n_e_p_active);
				editTextEmployee.setEnabled(true);
				editTextProject.setBackgroundResource(R.drawable.box_add_text_n_e_p_active);
				editTextProject.setEnabled(true);
				editTextStartWork.setBackgroundResource(R.drawable.box_add_text_form_start_working_active);
				editTextStartWork.setEnabled(true);
				editTextEmail.setBackgroundResource(R.drawable.box_add_text_form_email_active);
				editTextEmail.setEnabled(true);
				editTextAnnual.setBackgroundResource(R.drawable.box_add_text_form_small_active);
				editTextAnnual.setEnabled(true);
				editTextMarried.setBackgroundResource(R.drawable.box_add_text_form_small_active);
				editTextMarried.setEnabled(true);
				editTextPaternity.setBackgroundResource(R.drawable.box_add_text_form_small_active);
				editTextPaternity.setEnabled(true);
				editTextCoff.setBackgroundResource(R.drawable.box_add_text_form_small_active);
				editTextCoff.setEnabled(true);
				editTextMaternity.setBackgroundResource(R.drawable.box_add_text_form_small_active);
				editTextMaternity.setEnabled(true);
				editTextCondolences.setBackgroundResource(R.drawable.box_add_text_form_small_active);
				editTextCondolences.setEnabled(true);
				editTextSick.setBackgroundResource(R.drawable.box_add_text_form_small_active);
				editTextSick.setEnabled(true);
				editTextOnsite.setBackgroundResource(R.drawable.box_add_text_form_small_active);
				editTextOnsite.setEnabled(true);			
			}
		});

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

	private void goToWelcomePage(){
		Intent intentWelcomeScreen = new Intent(AttendanceFormActivity.this, WelcomeScreenActivity.class);
		startActivity(intentWelcomeScreen);
	}

	private void goToLoginPage(){
		Intent intentLoginPage = new Intent(AttendanceFormActivity.this, LoginActivity.class);
		startActivity(intentLoginPage);
	}
}
