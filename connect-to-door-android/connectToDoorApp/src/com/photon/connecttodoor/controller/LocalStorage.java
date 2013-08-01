package com.photon.connecttodoor.controller;

import android.content.Context;
import android.content.SharedPreferences;

public class LocalStorage {
	/**
	 * save value to internal storage
	 * Store private primitive data in key-value pairs.
	 * @param key 
	 * @param value
	 * @param context
	 */
	public void savePreference(String key, String value, Context context){
		SharedPreferences sharedPreferences = context.getSharedPreferences("com.photon.connecttodoor", Context.MODE_PRIVATE);
		SharedPreferences.Editor editor = sharedPreferences.edit();
		editor.putString(key, value);
		editor.commit();
	}

	/**
	 * get value in internal storage
	 * @param key
	 * @param context
	 * @return
	 */
	public String loadStringPreferences(String key, Context context){
		SharedPreferences sharedPreferences = context.getSharedPreferences("com.photon.connecttodoor", Context.MODE_PRIVATE);
		return sharedPreferences.getString(key, "");
	}
}
