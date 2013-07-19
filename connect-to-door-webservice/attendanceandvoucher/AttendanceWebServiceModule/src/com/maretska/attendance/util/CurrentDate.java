package com.maretska.attendance.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class CurrentDate {

	/**
	 * @author suryo_p
	 * get the current date in format YYYYMMDD (without space or hyphen)
	 * @return String currentDate in format YYYYMMDD (without space or hyphen)
	 */
	public String getCurrentDate(){
		Calendar cal = Calendar.getInstance();
		String dateFormat = "yyyyMMdd";
		SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
		String currentDate = sdf.format(cal.getTime());

		return currentDate;
	}

	/**
	 * @author suryo_p
	 * get the current date in format YYYY-MM-DD
	 * @return String currentDate in format YYYY-MM-DD
	 */
	public String getDate(){
		Calendar cal = Calendar.getInstance();
		String dateFormat = "yyyy-MM-dd";
		SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
		String currentDate = sdf.format(cal.getTime());

		return currentDate;
	}

	/**
	 * @author suryo_p
	 * get the current date in format DD-MM-YYYY
	 * @return String currentDate in format DD-MM-YYYY
	 */
	public String getDateAsc(){
		Calendar cal = Calendar.getInstance();
		String dateFormat = "dd-MM-yyyy";
		SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
		String currentDate = sdf.format(cal.getTime());

		return currentDate;
	}

	/**
	 * @author suryo_p
	 * get the current time
	 * @return String currentTime in format YYYY-MM-DD(space)HH:MM
	 */
	public String getCurrentTime(){
		Calendar cal = Calendar.getInstance();
		String dateFormat = "yyyy-MM-dd HH:mm";
		SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
		String currentTime = sdf.format(cal.getTime());

		return currentTime;
	}
}
