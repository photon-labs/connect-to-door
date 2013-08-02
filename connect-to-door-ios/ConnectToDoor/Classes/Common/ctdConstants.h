//
//  ctdConstants.h
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <Foundation/Foundation.h>

//alert
#ifndef ConnectToDoor_ctdConstant_h
#define ConnectToDoor_ctdConstant_h



#endif

#define MESSAGE_NO_INTERNET_CONNECTION @"The Internet connection appears to be offline. Please check your internet connection and try again."
#define MESSAGE_EXCEPTION @"Sorry, something went wrong. We'll be back up and running shortly."
#define MESSAGE_EMPTY_FIELD_EID @"Please input your employee id"
#define MESSAGE_INVALID_EMPLOYEE_ID @"Sorry, Your Employee ID is not match with Your Facebook Account"
#define MESSAGE_ERROR_ALREADY_CHECKIN @"Sorry, You have Already Check-In"
#define MESSAGE_ERROR_ALREADY_CHECKOUT @"Sorry, You have Already Check-Out"
#define MESSAGE_ERROR_EMPTY_DATE @"Please pick the start date and end date"
#define MESSAGE_UNDER_CONSTRUCTION @"Sorry this feature is under development"

//server URL
#define URLSERVER @"http://172.17.10.165:8080/AttendanceWebService/api/"

//code for request
#define STATUS_CODE_ERROR @"400"

//module for request
#define MODULE_LOGIN @"login"
#define MODULE_CHECKOUT_CHECKIN @"check-in-out"
#define MODULE_ATT_LIST @"attendance-list"
#define MODULE_CREATE_EDIT_DELETE_ACCOUNT @"create-edit-account"
#define MODULE_DAILY_ATT @"daily-attendance"
#define MODULE_PROFILE @"profile"
#define MODULE_REPORT @"report"
#define MODULE_SIGNATURE_LINK @"signature"
#define MODULE_UPDATE_CHECKIN_OUT @"update-check-in-out"
#define MODULE_REIMBURSEMENT @"reimburse"

//this variable for common string
#define CHECKIN @"checkIn"
#define CHECKOUT @"checkOut"
#define CHECKSTATUS @"check-status"

#define DATE_START @"dateStart"
#define DATE_END @"dateEnd"

#define DATE_STRING @"Date"
#define NAME_STRING @"Name"
#define PROJECT_ID_STRING @"Project ID"
#define EMPLOYEE_ID_STRING @"Employee ID"

//facebook key on local storage/nsuserdefaults & response object key
#define kUserFaceBookId @"facebookID"
#define kNameUserFaceBook @"nameUserFacebook"
#define kEmployeeId @"employeeID"
#define kPresenceId @"presenceId"

#define EMPLOYEE_ID_PARAMETER @"employee_id"
#define SEARCH_BY_PARAMTER @"search_by"
#define USERNAME_PARAMETER @"username"

#define MESSAGE_KEY @"message"
#define STATUS_KEY @"status"
#define ISADMIN_KEY @"isAdmin"

#define CHECK_IN_KEY @"checkIn"
#define CHECK_OUT_KEY @"checkOut"

#define CHECK_OUT_STATUS_KEY @"check_out"
#define CHECK_IN_STATUS_KEY @"check_in"

#define PRESENCE_ID_KEY @"presence_id"
#define EMPLOYEE_ID_KEY @"employee_id"
#define STATUS_KEY @"status"
#define PROJECT_ID_KEY @"project_id"
#define DATA_KEY @"data"

#define MATERNITY_KEY @"maternity"
#define C_OFF_KEY @"c_off"
#define ANNUAL_KEY @"annual"
#define CONDOLENCES_KEY @"condolences"
#define EMPLOYEE_NAME_KEY @"employee_name"
#define ONSITE_KEY @"onsite"
#define PATERNITY_KEY @"paternity"
#define PROFILE_USERNAME_KEY @"user_name"
#define AUTHORITY_KEY @"authority"
#define MARRIED_KEY @"married"
#define GENDER_KEY @"gender"
#define SICK_KEY @"sick"
#define EMAIL_PHOTON_KEY @"employee_email_photon"
#define FACEBOOK_ID_KEY @"facebook_id"
#define START_WORK_KEY @"employee_start_work"
#define SIGNATURE_KEY @"signature"

#define TOTAL_ATTENDANCE_KEY @"total_attendance"
#define AVERAGE_WORKING_HOUR_KEY @"average_working_hour"
#define TOTAL_WORKING @"total_working"
#define TOTAL_LEAVE @"total_leave"
#define DATE_START_KEY @"date_start"
#define DATE_END_KEY @"date_end"
#define DATE_KEY @"date"

#define EMPLOYEE_DATA_KEY @"employee_data"
#define ADMIN_KEY @"admin"
