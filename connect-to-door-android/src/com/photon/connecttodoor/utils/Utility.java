package com.photon.connecttodoor.utils;

import android.content.Context;
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
	
}
