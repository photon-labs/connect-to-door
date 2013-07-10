package com.photon.connecttodoor.utils;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.SharedPreferences;

public class Utility {

	public static void savePreference(String key, String value, Context context){
		SharedPreferences sharedPreferences = context.getSharedPreferences("com.photon.connecttodoor", Context.MODE_PRIVATE);
		SharedPreferences.Editor editor = sharedPreferences.edit();
		editor.putString(key, value);
		editor.commit();
	}

	public static String loadStringPreferences(String key, Context context){
		SharedPreferences sharedPreferences = context.getSharedPreferences("com.photon.connecttodoor", Context.MODE_PRIVATE);
		return sharedPreferences.getString(key, "");
	}
	
	public static void alertMessage(String message, Context context){
		AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(context);

		// set title
		alertDialogBuilder.setTitle("Alert");

		// set dialog message
		alertDialogBuilder
		.setMessage(message)
		.setCancelable(false)
		.setPositiveButton("Yes",new DialogInterface.OnClickListener() {
			public void onClick(DialogInterface dialog,int id) {
				// if this button is clicked, close
				// current activity
				dialog.dismiss();
			}
		});

		// create alert dialog
		AlertDialog alertDialog = alertDialogBuilder.create();

		// show it
		alertDialog.show();
	}
	
}
