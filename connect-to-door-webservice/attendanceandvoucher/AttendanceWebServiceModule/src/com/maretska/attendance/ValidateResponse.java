package com.maretska.attendance;

public class ValidateResponse {
	public boolean isValidateResponse(int result){
		boolean isValidate = false;
		if(result >= 1){
			isValidate = true;
		}
		return isValidate;
	}
}
