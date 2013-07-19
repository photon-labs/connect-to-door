Clazz.createPackage("com.attendance.widget.listener");
Clazz.com.attendance.widget.listener.DeclineApproveAndPrintListener = Clazz.extend(Clazz.Widget, {
	CookieAPI : null,
	selectedListListener : null,
	SignOutAndBackListener : null,
	inputRequestAPI : null,
	loadingMask : null,
	UpdateStatusRequestAPI : null,
	
	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
		this.SignOutAndBackListener = new Clazz.com.attendance.widget.listener.SignOutAndBackListener();
		require(["api/InputRequestAPI" , "api/UpdateStatusRequestAPI"],function(){
			self.UpdateStatusRequestAPI = new Clazz.com.attendance.api.UpdateStatusRequestAPI();
			self.inputRequestAPI = new Clazz.com.attendance.api.InputRequestAPI();
		});
		
	},

	/**
	 * @author andhika_p
	 * set status approve voucher request in localstorage
	 */
	backAndSaveStatusVoucher : function(){
		$("request\\:approve-decline-print-button").empty();
		this.saveListToObject();
	},

	/**
	 * @author andhika_p
	 * pop page and remove credential about voucher request
	 */
	backAndRemoveCredential : function(){
		this.clearidRequestLocalStorage();			
	},

	/**
	 * @author andhika_p
	 * looping list and save the data to local storage in object 
	 */
	saveListToObject : function(){
		var self = this;
		var indexLoop = 0;	
		var objectList = null;
		this.dataList = [];
		$('.attendance-ul-request').each(function(){
			var request = $('.attendance-ul-request').eq(indexLoop).find('.request-list-detail-content-request .attendance-list-detail-content-text').text();
			var description = $('.attendance-ul-request').eq(indexLoop).find('.request-list-detail-content-description .attendance-list-detail-content-text').text();
			var quantity = $('.attendance-ul-request').eq(indexLoop).find('.request-list-detail-content-quantity .attendance-list-detail-content-text').text().replace(/,/g, '');
			var cost = $('.attendance-ul-request').eq(indexLoop).find('.request-list-detail-content-cost .attendance-list-detail-content-text').text().replace(/,/g, '');
			var currency= $('.attendance-request-item-input-currency-value .request-currency-by-value').text();
			var currencyText = null;
			if(currency == "Dollar (USD)"){
				currencyText = "US$";
			}
			else if(currency == "Rupiah (IDR)"){
				currencyText = "Rp";
			}

			objectList={param_request_type :request, param_desc:description ,param_qty:quantity, param_cost:cost, param_currency:currencyText};
			self.dataList.push(objectList);

			++indexLoop;
		});
		this.sendRequestToAPI(this.dataList);
	},

	sendRequestToAPI : function(dataList){
		var self = this;
		var employeeID = this.CookieAPI.getUserIdEmployee();
		var date = this.getCurrentDate();
		
		var signTo = self.CookieAPI.getAssignTo();
		this.loadingMask.showLoading();
		this.inputRequestAPI.inputRequest(employeeID, date, dataList, signTo, function(response){
			if(response.status == "Success" || response.status == "success"){
				self.loadingMask.removeLoading();
				self.clearidRequestLocalStorage();
			}else{
				self.loadingMask.removeLoading();
				require(["widget/common/ErrorAlert"],function(){
					var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText : response.message});
					errorAlert.showAlert("nonIdle");
					self.SignOutAndBackListener.buttonBackClick();	
				});
			}
			
		});
	},
	
	updateStatusRequest : function(status){
		var self = this;
		var employeeID = this.CookieAPI.getUserIdEmployee();
		var date = this.getCurrentDate();
		var idRequest = this.CookieAPI.getRequest();		
		
		var signTo = self.CookieAPI.getAssignTo();
		
		this.loadingMask.showLoading();
		this.UpdateStatusRequestAPI.UpdateRequestStatus (idRequest, employeeID, date, status, signTo, function(response){
			if(response.status == "success" || response.status == "Success"){
				self.loadingMask.removeLoading();
				self.clearidRequestLocalStorage();
			}else{
				self.loadingMask.removeLoading();
				require(["widget/common/ErrorAlert"],function(){
					var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText : response.message});
					errorAlert.showAlert("nonIdle");
					self.clearidRequestLocalStorage();
				});
			}
			
		});
	},
	
	
	approveStatusRequest : function(status){
		var self = this;
		var employeeID = this.CookieAPI.getUserIdEmployee();
		var date = this.getCurrentDate();
		var idRequest = this.CookieAPI.getRequest();		
		
		var signTo = $('.attendance-request-id .request-by-value-finish').text();
		
		this.loadingMask.showLoading();
		this.UpdateStatusRequestAPI.UpdateRequestStatus (idRequest, employeeID, date, status, signTo, function(response){
			if(response.status == "success" || response.status == "Success"){
				self.loadingMask.removeLoading();
				self.clearidRequestLocalStorage();
			}else{
				self.loadingMask.removeLoading();
				require(["widget/common/ErrorAlert"],function(){
					var errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText : response.message});
					errorAlert.showAlert("nonIdle");
					self.clearidRequestLocalStorage();
				});
			}
			
		});
	},
	/**
	 * @author andhika_p
	 * @return Current date with dd-mm-yyyy format
	 */
	getCurrentDate : function(){
		var date = new Date();
		var curr_date = date.getDate();
		if(curr_date.toString.length = 0){
			curr_date = '0'+ curr_date.toString;
		}
		
		var curr_month = date.getMonth()+1;
		if(curr_month.toString.length = 1){
			curr_month = '0'+ curr_month;
		}
		
		var curr_year = date.getFullYear();
		var fullDate = curr_date + '-' + curr_month + '-' + curr_year;
		return fullDate;
	},
	
	/**
	 * @author andhika_p
	 * print page and clear voucher status, voucher signature, admin signature and data list in local storage
	 */
	printPage : function(){
		this.CookieAPI.saveGMVoucherSignature("false");
		this.CookieAPI.saveAdminVoucherSignature("false");
		this.CookieAPI.clearListDataRequest();
	},
	
	clearRequestLocalStorage : function(){
		this.CookieAPI.saveAdminVoucherSignature("false");
		this.CookieAPI.saveGMVoucherSignature("false");
		this.CookieAPI.clearListDataRequest();
		this.CookieAPI.clearRequest();
	},
	
	clearidRequestLocalStorage : function(){
		this.CookieAPI.clearRequest();
		this.CookieAPI.clearListDataRequest();
		this.CookieAPI.saveGMVoucherSignature("false");
		this.CookieAPI.saveAdminVoucherSignature("false");
		this.SignOutAndBackListener.buttonBackClick();	
	}

});