Clazz.createPackage("com.attendance.api");

Clazz.com.attendance.api.CookieAPI = Clazz.extend(Clazz.com.attendance.abstract.API,{
	/**
	 * @author suryo_p
	 * ref : http://docs.phonegap.com/en/1.7.0/cordova_storage_storage.md.html#Storage
	 */
	keyToken : "keyToken",
	keyUsernameFB : "keyUsernameFB",
	keyUserIDFB : "keyUserIDFB",
	keyUserIdEmployee : "keyUserIdEmployee",
	keyButtonSaveStatus : "keyButtonSaveStatus",
	keyPageAttendanceReport:"keyPageAttendanceReport",
	keyAttendanceTime : "keyAttendanceTime",
	keyAttendanceCheck : "keyAttendanceCheck",
	keyDataEmployee:"keyDataEmployee",
	keyVoucherStatus : "keyVoucherStatus",
	keyDataAttendanceForm : "keyDataAttendanceForm",
	keyAdminVoucherSignature : "keyAdminVoucherSignature",
	keyGMVoucherSignature : "keyGMVoucherSignature",
	keyReimbursementStatus : "keyReimbursementStatus",
	keyFormButtonClicked : "keyFormButtonClicked",
	keyIndexSelectedItemList : "keyIndexSelectedItemList",	
	keyAPMReimbursementSignature : "keyAPMReimbursementSignature",
	keyGMReimbursementSignature : "keyGMReimbursementSignature",
	keyIndexSelectedItemList : "keyIndexSelectedItemList",
	keyStatusEditRequestList : "keyStatusEditRequestList",
	keyAdminReimbursementSignature:"keyAdminReimbursementSignature",
	keyListDataRequest : "keyListDataRequest",
	keyStatusClickButton : "keyStatusClickButton",
	keyDropDownValueReimbursement : "keyDropDownValueReimbursement",
	keyCashAdvance : "keyCashAdvance",
	keyStatusEditReimburseList:"keyStatusEditReimburseList",
	keyIndexSelectedItemListReimburse:"keyIndexSelectedItemListReimburse",
	keyListDataReimburse:"keyListDataReimburse",
	keyCurrentDate : "keyCurrentDate",
	keyEmailAddressFB : "keyEmailAddressFB",
	keyAuthority : "keyAuthority",
	keyIDRequest : "keyIDRequest",
	keyIdAssignTo : "keyIdAssignTo",
	
	/**
	 * @author suryo_p
	 * get token from Facebook API that is saved in local storage before.
	 */
	getToken : function(){
		var token = $.cookie(this.keyToken);
		var parseData = (token)?token:null;
		return parseData;
	},

	/**
	 * @author suryo_p
	 * Login token from Facebook API will be saved in local storage.
	 */
	saveToken : function(token){
		$.cookie(this.keyToken, token);
	},

	/**
	 * @author suryo_p
	 * Clear token from Facebook API.
	 * */
	clearToken : function() {
		$.removeCookie(this.keyToken);
	},

	/**
	 * @author andhika_p
	 * get username from Facebook API that is saved in local storage before.
	 */
	getUsernameFB : function(){
		var username = $.cookie(this.keyUsernameFB);
		var parseData = (username)?username:null;
		return parseData;
	},

	/**
	 * @author andhika_p
	 * save Username from Facebook API
	 */
	saveUsernameFB : function(username){
		$.cookie(this.keyUsernameFB, username);
	},

	/**
	 * @author andhika_p
	 * Clear username Facebook in local storage.
	 * */
	clearUsernameFB : function(){
		$.removeCookie(this.keyUsernameFB);
	},

	/**
	 * @author andhika_p
	 * get user ID from Facebook API that is saved in local storage before.
	 */
	getIDFB : function(){
		var userID = $.cookie(this.keyUserIDFB);
		var parseData = (userID)?userID:null;
		return parseData;

	},

	/**
	 * @author andhika_p
	 * save user ID from Facebook API, and that will be saved in local storage.
	 */
	saveUserIDFB : function(userID){
		$.cookie(this.keyUserIDFB, userID);
	},

	/**
	 * @author andhika_p
	 * Clear user ID Facebook in local storage.
	 * */
	clearUserIDFB : function(){
		$.removeCookie(this.keyUserIDFB);
	},

	/**
	 * @author dede_pu
	 * Get employee id from login employee that is saved in local storage before.
	 */
	getUserIdEmployee : function(){
		var userIdEmployee = $.cookie(this.keyUserIdEmployee);
		var parseData = (userIdEmployee)?userIdEmployee:null;
		return parseData;
	},

	/**
	 * @author dede_pu
	 * Login employee id from login employee will be saved in local storage.
	 */
	saveUserIdEmployee : function(userIdEmployee){
		$.cookie(this.keyUserIdEmployee, userIdEmployee);
	},

	/**
	 * @author dede_pu
	 * Clear employee id from login employee.
	 * */
	clearUserIdEmployee : function() {
		$.removeCookie(this.keyUserIdEmployee);
	},

	/**
	 * @author dhika_p
	 * get value button save status.
	 * */
	getIsEnableButtonSave : function(){
		var buttonSaveStatus = $.cookie(this.keyButtonSaveStatus);
		var parseData = (buttonSaveStatus)?buttonSaveStatus:null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save value button save status.
	 * */
	saveIsEnableButtonSave:function(buttonSaveStatus){
		$.cookie(this.keyButtonSaveStatus, buttonSaveStatus);
	},

	/**
	 * @author dhika_p
	 * clear value button save status.
	 * */
	clearIsEnableButtonSave : function() {
		$.removeCookie(this.keyButtonSaveStatus);
	},

	/**
	 * @author dhika_p
	 * get page of attendance report table.
	 * */
	getPageAttendanceReport : function(){
		var pageAttendanceReport = $.cookie(this.keyPageAttendanceReport);
		var parseData = (pageAttendanceReport)?pageAttendanceReport:null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save page of attendance report table.
	 * */
	savePageAttendanceReport:function(pageAttendanceReport){
		$.cookie(this.keyPageAttendanceReport, pageAttendanceReport);
	},

	/**
	 * @author dhika_p
	 * clear page of attendance report table.
	 * */
	clearPageAttendanceReport : function() {
		$.removeCookie(this.keyPageAttendanceReport);
	},	

	/**
	 * @author dede_pu
	 * get attendanceTime from Attendance page that is saved in local storage before.
	 */
	getAttendanceTime : function(){
		var attendanceTime = $.cookie(this.keyAttendanceTime);
		var parseData = (attendanceTime)?attendanceTime:null;
		return parseData;
	},

	/**
	 * @author dede_pu
	 * attendanceTime from Attendance page will be saved in local storage.
	 */
	saveAttendanceTime : function(attendanceTime){
		$.cookie(this.keyAttendanceTime, attendanceTime);
	},

	/**
	 * @author dede_pu
	 * Clear attendanceTime from Attendance page.
	 * */
	clearAttendanceTime : function() {
		$.removeCookie(this.keyAttendanceTime);
	},

	/**
	 * @author dede_pu
	 * get attendanceCheck from Attendance page that is saved in local storage before.
	 */
	getAttendanceCheck : function(){
		var attendanceCheck = $.cookie(this.keyAttendanceCheck);
		var parseData = (attendanceCheck)?attendanceCheck:null;
		return parseData;
	},

	/**
	 * @author dede_pu
	 * attendanceCheck from Attendance page will be saved in local storage.
	 */
	saveAttendanceCheck : function(attendanceCheck){
		$.cookie(this.keyAttendanceCheck, attendanceCheck);
	},

	/**
	 * @author dede_pu
	 * Clear attendanceCheck from Attendance page.
	 * */
	clearAttendanceCheck : function() {
		$.removeCookie(this.keyAttendanceCheck);
	},

	/**
	 * @author dhika_p
	 * get data employe attendance report.
	 * */
	getDataEmployee : function(){
		var dataEmployee = $.cookie(this.keyDataEmployee);
		var parseData = (dataEmployee)?dataEmployee:null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save data employe attendance report.
	 * */
	saveDataEmployee:function(dataEmployee){
		$.cookie(this.keyDataEmployee, dataEmployee);
	},

	/**
	 * @author dhika_p
	 * clear data employe attendance report.
	 * */
	clearDataEmployee : function() {
		$.removeCookie(this.keyDataEmployee);
	},	

	/**
	 * @author andhika_p
	 * get data employe attendance report.
	 * */
	getVoucherStatus : function(){
		var voucherStatus = $.cookie(this.keyVoucherStatus);
		var parseData = (voucherStatus)?voucherStatus:null;
		return parseData;
	},

	/**
	 * @author andhika_p
	 * save data employe attendance report.
	 * */
	saveVoucherStatus : function(voucherStatus){
		$.cookie(this.keyVoucherStatus, voucherStatus);
	},

	/**
	 * @author andhika_p
	 * clear data employe attendance report.
	 * */
	clearVoucherStatus : function() {
		$.removeCookie(this.keyVoucherStatus);
	},

	/**
	 * @author dhika_p
	 * get data employe attendance report.
	 * */
	getDataAttendanceForm : function(){
		var dataAttendanceForm = $.cookie(this.keyDataAttendanceForm);
		var parseData = (dataAttendanceForm)?JSON.parse(dataAttendanceForm):null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save data employe attendance report.
	 * */
	saveDataAttendanceForm:function(dataAttendanceForm){
		$.cookie(this.keyDataAttendanceForm, JSON.stringify(dataAttendanceForm));
	},

	/**
	 * @author dhika_p
	 * clear data employe attendance report.
	 * */
	clearDataAttendanceForm : function() {
		$.removeCookie(this.keyDataAttendanceForm);
	},	

	/**
	 * @author dhika_p
	 * get clicked button attendance form.
	 * */
	getButtonClickedAttendanceForm : function(){
		var buttonClickedAttendanceForm = $.cookie(this.keyFormButtonClicked);
		var parseData = (buttonClickedAttendanceForm)?buttonClickedAttendanceForm:null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save clicked button attendance form.
	 * */
	saveButtonClickedAttendanceForm:function(buttonClickedAttendanceForm){
		$.cookie(this.keyFormButtonClicked, buttonClickedAttendanceForm);
	},

	/**
	 * @author dhika_p
	 * clear clicked button attendance form.
	 * */
	clearButtonClickedAttendanceForm : function() {
		$.removeCookie(this.keyFormButtonClicked);
	},	

	/**
	 * @author andhika_p
	 * get status of admin signature from local storage
	 */
	getAdminVoucherSignature : function(){
		var adminSignature = $.cookie(this.keyAdminVoucherSignature);
		var parseData = (adminSignature)?adminSignature:null;
		return parseData;
	},

	/**
	 * @author andhika_p
	 * save status of admin signature to local storage
	 */
	saveAdminVoucherSignature : function(status){
		$.cookie(this.keyAdminVoucherSignature , status);
	},

	/**
	 * @author andhika_p
	 * delete status of admin signature from local storage
	 */
	clearAdminVoucherSignature : function(){
		$.removeCookie(this.keyAdminVoucherSignature)
	},

	/**
	 * @author andhika_p
	 * get status of GM signature from local storage
	 */
	getGMVoucherSignature : function(){
		var adminSignature = $.cookie(this.keyGMVoucherSignature);
		var parseData = (adminSignature)?adminSignature:null;
		return parseData;
	},

	/**
	 * @author andhika_p
	 * save status of GM signature to local storage
	 */
	saveGMVoucherSignature: function(status){
		$.cookie(this.keyGMVoucherSignature , status);
	},

	/**
	 * @author andhika_p
	 * delete status of GM signature from local storage
	 */
	clearGMVoucherSignature : function(){
		$.removeCookie(this.keyGMVoucherSignature)
	},

	/**
	 * @author dede_pu
	 * get reimbursement status from local storage
	 */
	getReimbursementStatus : function(){
		var reimbursementStatus = $.cookie(this.keyReimbursementStatus);
		var parseData = (reimbursementStatus)?reimbursementStatus:null;
		return parseData;
	},

	/**
	 * @author dede_pu
	 * save reimbursement status to local storage
	 */
	saveReimbursementStatus: function(status){
		$.cookie(this.keyReimbursementStatus , status);
	},

	/**
	 * @author dede_pu
	 * delete reimbursement status from local storage
	 */
	clearReimbursementStatus : function(){
		$.removeCookie(this.keyReimbursementStatus)
	},


	/**
	 * @author andhika_p
	 * get index selected item list  from local storage
	 */
	getIndexSelectedItemList : function(){
		var selectedIndexList = $.cookie(this.keyIndexSelectedItemList);
		var parseData = (selectedIndexList)?selectedIndexList:null;
		return parseData;
	},

	/**
	 * @author andhika_p
	 * save index selected item list to local storage
	 */
	saveIndexSelectedItem : function(index){
		$.cookie(this.keyIndexSelectedItemList , index);
	},

	/**
	 * @author andhika_p
	 * clear index selected item list from local storage
	 */
	clearIndexSelectedItem : function(){
		$.removeCookie(this.keyIndexSelectedItemList);
	},

	/**
	 * @author dhika_p
	 * get status of admin reimbursement signature from local storage
	 */
	getAdminReimbursementSignature : function(){
		var adminReimbursementSignature = $.cookie(this.keyAdminReimbursementSignature);
		var parseData = (adminReimbursementSignature)?adminReimbursementSignature:null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save status of admin reimbursement signature from local storage
	 */
	saveAdminReimbursementSignature : function(status){
		$.cookie(this.keyAdminReimbursementSignature , status);
	},

	/**
	 * @author dhika_p
	 * delete status of admin reimbursement signature from local storage
	 */
	clearAdminReimbursementSignature : function(){
		$.removeCookie(this.keyAdminReimbursementSignature)
	},

	/**
	 * @author dhika_p
	 * get status of APM reimbursement signature from local storage
	 */
	getAPMReimbursementSignature : function(){
		var apmReimbursementSignature = $.cookie(this.keyAPMReimbursementSignature);
		var parseData = (apmReimbursementSignature)?apmReimbursementSignature:null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save status of APM reimbursement signature from local storage
	 */
	saveAPMReimbursementSignature : function(status){
		$.cookie(this.keyAPMReimbursementSignature , status);
	},

	/**
	 * @author dhika_p
	 * delete status of APM reimbursement signature from local storage
	 */
	clearAPMReimbursementSignature : function(){
		$.removeCookie(this.keyAPMReimbursementSignature)
	},

	/**
	 * @author dhika_p
	 * get status of GM reimbursement signature from local storage
	 */
	getGMReimbursementSignature : function(){
		var gmReimbursementSignature = $.cookie(this.keyGMReimbursementSignature);
		var parseData = (gmReimbursementSignature)?gmReimbursementSignature:null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save status of GM reimbursement signature from local storage
	 */
	saveGMReimbursementSignature : function(status){
		$.cookie(this.keyGMReimbursementSignature , status);
	},

	/**
	 * @author dhika_p
	 * delete status of GM reimbursement signature from local storage
	 */
	clearGMReimbursementSignature : function(){
		$.removeCookie(this.keyGMReimbursementSignature);
	},

	/**
	 * @author andhika_p
	 * get status edit request list  from local storage
	 */
	getStatusEditRequestList : function(){
		var statusEditRequestList = $.cookie(this.keyStatusEditRequestList);
		var parseData = (statusEditRequestList)?statusEditRequestList:null;
		return parseData;
	},

	/**
	 * @author andhika_p
	 * save status edit request list to local storage
	 */
	saveStatusEditRequestList : function(status){
		$.cookie(this.keyStatusEditRequestList, status);
	},

	/**
	 * @author andhika_p
	 * clear status edit request list from local storage
	 */
	clearStatusEditRequestList: function(){
		$.removeCookie(this.keyStatusEditRequestList);
	},
	
	/**
	 * @author dhika_p
	 * get status edit reimburse list  from local storage
	 */
	getStatusEditReimburseList : function(){
		var statusEditReimburseList = $.cookie(this.keyStatusEditReimburseList);
		var parseData = (statusEditReimburseList)?statusEditReimburseList:null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save status edit reimburse list to local storage
	 */
	saveStatusEditReimburseList : function(status){
		$.cookie(this.keyStatusEditReimburseList, status);
	},

	/**
	 * @author dhika_p
	 * clear status edit reimburse list from local storage
	 */
	clearStatusEditReimburseList: function(){
		$.removeCookie(this.keyStatusEditReimburseList);
	},
	
	
	/**
	 * @author dhika_p
	 * get status click button
	 */
	getStatusClickButton : function(){
		var statusClickButton = $.cookie(this.keyStatusClickButton);
		var parseData = (statusClickButton)?statusClickButton:null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save status click button
	 */
	saveStatusClickButton : function(status){
		$.cookie(this.keyStatusClickButton, status);
	},

	 /** 
	 * @author dhika_p
	 * clear status click button
	 */
	clearStatusClickButton: function(){
		$.removeCookie(this.keyStatusClickButton);
	},
	
	/**
	 * @author andhika_p
	 * get data request list  from local storage
	 */
	getListDataRequest : function(){
		var dataList = $.cookie(this.keyListDataRequest);
		var parseData = (dataList)?JSON.parse(dataList):null;
		return parseData;
	},

	/**
	 * @author andhika_p
	 * save data request list to local storage
	 */
	saveListDataRequest : function(data){
		$.cookie(this.keyListDataRequest, JSON.stringify(data));
	},

	/**
	 * @author andhika_p
	 * clear data request list from local storage
	 */
	clearListDataRequest: function(){
		$.removeCookie(this.keyListDataRequest);
	},	
	
	/**
	 * @author dhika_p
	 * get status click button
	 */
	getDropDownValueReimbursement : function(){
		var dropDownValue = $.cookie(this.keyDropDownValueReimbursement);
		var parseData = (dropDownValue)?dropDownValue:null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save status click button
	 */
	saveDropDownValueReimbursement : function(dropDownValue){
		$.cookie(this.keyDropDownValueReimbursement, dropDownValue);
	},

	 /** 
	 * @author dhika_p
	 * clear status click button
	 */
	clearDropDownValueReimbursement: function(){
		$.removeCookie(this.keyDropDownValueReimbursement);
	},
	
	/**
	 * @author dhika_p
	 * get CashAdvance
	 */
	getCashAdvance : function(){
		var cashAdvance = $.cookie(this.keyCashAdvance);
		var parseData = (cashAdvance)?cashAdvance:null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save CashAdvance
	 */
	saveCashAdvance : function(cashAdvance){
		$.cookie(this.keyCashAdvance, cashAdvance);
	},

	 /** 
	 * @author dhika_p
	 * clear CashAdvance
	 */
	clearCashAdvance: function(){
		$.removeCookie(this.keyCashAdvance);
	},
	
	/**
	 * @author dhika_p
	 * get index selected item list reimburse from local storage
	 */
	getIndexSelectedItemListReimburse : function(){
		var selectedIndexListReimburse = $.cookie(this.keyIndexSelectedItemListReimburse);
		var parseData = (selectedIndexListReimburse)?selectedIndexListReimburse:null;
		return parseData;
	},

	/**
	 * @author dhika_p
	 * save index selected item list reimburse to local storage
	 */
	saveIndexSelectedItemReimburse : function(index){
		$.cookie(this.keyIndexSelectedItemListReimburse , index);
	},

	/**
	 * @author dhika_p
	 * clear index selected item list reimburse from local storage
	 */
	clearIndexSelectedItemReimburse : function(){
		$.removeCookie(this.keyIndexSelectedItemListReimburse);
	},
	
	/**
	 * @author dhika_p
	 * get data reimburse list  from local storage
	 */
	getListDataReimburse : function(){
		var dataListReimburse = $.cookie(this.keyListDataReimburse);
		var parseData = (dataListReimburse)?JSON.parse(dataListReimburse):null;
		return parseData;
	},
	
	/**
	 * @author dhika_p
	 * save data reimburse list to local storage
	 */
	saveListDataReimburse : function(data){
		$.cookie(this.keyListDataReimburse, JSON.stringify(data));
	},

	/**
	 * @author dhika_p
	 * clear data reimburse list from local storage
	 */
	clearListDataReimburse : function(){
		$.removeCookie(this.keyListDataReimburse);
	},	
	
	
	/**
	 * @author andhika_p
	 * get current date  from local storage
	 */
	getCurrentDate : function(){
		var currentDate = $.cookie(this.keyCurrentDate);
		var parseData = (currentDate)?currentDate:null;
		return parseData;
	},

	/**
	 * @author andhika_p
	 * save current date to local storage
	 */
	saveCurrentDate : function(date){
		$.cookie(this.keyCurrentDate, date);
	},

	/**
	 * @author andhika_p
	 * clear current date from local storage
	 */
	clearCurrentDate : function(){
		$.removeCookie(this.keyCurrentDate);
	},	
	
	/**
	 * @author andhika_p
	 * get email facebook from local storage
	 */
	getEmailFacebook : function(){
		var emailFacebook = $.cookie(this.keyEmailAddressFB);
		var parseData = (emailFacebook)?emailFacebook:null;
		return parseData;
	},

	/**
	 * @author andhika_p
	 * save email facebook to local storage
	 */
	saveEmailFacebook : function(email){
		$.cookie(this.keyEmailAddressFB, email);
	},

	/**
	 * @author andhika_p
	 * clear email facebook from local storage
	 */
	clearEmailFacebook : function(){
		$.removeCookie(this.keyEmailAddressFB);
	},
	
	/**
	 * @author andhika_p
	 * get authorityfrom local storage
	 */
	getAuthority : function(){
		var authority = $.cookie(this.keyAuthority);
		var parseData = (authority)?authority:null;
		return parseData;
	},

	/**
	 * @author andhika_p
	 * save authority to local storage
	 */
	saveAuthority : function(authority){
		$.cookie(this.keyAuthority, authority);
	},

	/**
	 * @author andhika_p
	 * clear authority from local storage
	 */
	clearAuthority : function(){
		$.removeCookie(this.keyAuthority);
	},
	
	/**
	 * @author andhika_p
	 * get id request from local storage
	 */
	getRequest  : function(){
		var idRequest = $.cookie(this.keyIDRequest);
		var parseData = (idRequest)?idRequest:null;
		return parseData;
	},

	/**
	 * @author andhika_p
	 * save id request to local storage
	 */
	saveRequest  : function(idRequest){
		$.cookie(this.keyIDRequest, idRequest);
	},

	/**
	 * @author andhika_p
	 * clear id request from local storage
	 */
	clearRequest : function(){
		$.removeCookie(this.keyIDRequest);
	},
	
	/**
	 * @author andhika_p
	 * get id assign to from local storage
	 */
	getAssignTo  : function(){
		var idAssignTo = $.cookie(this.keyIdAssignTo);
		var parseData = (idAssignTo)?idAssignTo:null;
		return parseData;
	},

	/**
	 * @author andhika_p
	 * save id assign to local storage
	 */
	saveAssignTo  : function(idAssignTo){
		$.cookie(this.keyIdAssignTo, idAssignTo);
	},

	/**
	 * @author andhika_p
	 * clear id assign from local storage
	 */
	clearAssignTo : function(){
		$.removeCookie(this.keyIdAssignTo);
	},
	
	
	/***
	 * @author suryo_p
	 * remove all credential and confidential when logout from the application for security
	 */
	removeAllCredentialAndConfidential : function(){
		this.clearToken();
		this.clearUsernameFB();
		this.clearUserIDFB();
		this.clearUserIdEmployee();
		this.clearIsEnableButtonSave();
		this.clearPageAttendanceReport();
		this.clearAttendanceTime();
		this.clearAttendanceCheck();
		this.clearDataEmployee();
		this.clearDataAttendanceForm();
		this.clearGMVoucherSignature();
		this.clearAdminVoucherSignature();
		this.clearVoucherStatus();
		this.clearReimbursementStatus();
		this.clearButtonClickedAttendanceForm();
		this.clearIndexSelectedItem();
		this.clearAdminReimbursementSignature();
		this.clearAPMReimbursementSignature();
		this.clearGMReimbursementSignature();
		this.clearStatusEditRequestList();
		this.clearListDataRequest();
		this.clearStatusClickButton();
		this.clearDropDownValueReimbursement();
		this.clearCashAdvance();
		this.clearStatusEditReimburseList();
		this.clearIndexSelectedItemReimburse();
		this.clearListDataReimburse();
		this.clearCurrentDate();
		this.clearEmailFacebook();
		this.clearAuthority();
		this.clearRequest();
		this.clearAssignTo();
	},
});