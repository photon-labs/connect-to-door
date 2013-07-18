Clazz.createPackage("com.attendance.listener.common");
Clazz.com.attendance.listener.common.RequestAndReimburseStorage = Clazz.extend(Clazz.Widget, {
	CookieAPI : null,
	loadingMask : null,
	requestItemVoucherAPI : null,
	pushRequestListener : null,
	PushReimbursementListener : null,
	voucherType : null,

	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
		require(["api/RequestItemVoucherAPI"],function(){
			self.requestItemVoucherAPI = new Clazz.com.attendance.api.RequestItemVoucherAPI();
		});
		this.pushRequestListener = new Clazz.com.attendance.widget.listener.PushRequestListener();
		this.PushReimbursementListener = new Clazz.com.attendance.widget.listener.PushReimbursementListener();
	},

	getItemVoucher:function(voucherId){
		var self = this;
		var authority = this.CookieAPI.getAuthority();
		if(voucherId.substring(0,3) == "req" ){
			if(authority == "Finance" || authority == "General Manager" || authority == "Super Admin" ){
				self.voucherType = "request";
				self.getItemFromAPI(voucherId);
			}
		}else{
			self.voucherType = "reimbursement";
			self.getItemFromAPI(voucherId);
		}
	},

	getItemFromAPI : function(idValue){
		var self = this;
		this.loadingMask.showLoading();
		this.requestItemVoucherAPI.requestValue(self.voucherType, idValue, function(response){
			if(response.status == "success" || response.status == "Success"){
				self.loadingMask.removeLoading();
				if(idValue.substring(0,3) == "req"){
					var statusAuthorize = self.emailAuthorityConfiguration(response.employee_details.assign_to);
				}else{
					var statusAuthorize = self.emailAuthorityConfiguration(response.assign_to);
				}
				
				if(idValue.substring(0,3) == "req" && statusAuthorize == "true"){
					self.pushRequestListener.pushRequest(response);
					self.loadingMask.removeLoading();
				}else if(idValue.substring(0,3) == "rem" && statusAuthorize == "true"){
					self.loadingMask.removeLoading();
					self.PushReimbursementListener.pushReimbursement(response);
				}else{
					self.CookieAPI.clearRequest();
					self.errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText : "Your not authorized"});
					self.errorAlert.showAlert("nonIdle");
				}

			}else{
				self.loadingMask.removeLoading();
				self.CookieAPI.clearRequest();
				self.errorAlert = new Clazz.com.attendance.widget.common.ErrorAlert({errorText : response.message});
				self.errorAlert.showAlert("nonIdle");
			}
		});
	},

	emailAuthorityConfiguration : function(reimbursementAssignTo){
		var employeeID = this.CookieAPI.getUserIdEmployee();
		var statusAuthorize = "false";
		if(reimbursementAssignTo == employeeID || employeeID == 'I0067' || employeeID == 'I0015' || employeeID == 'I0016'){
			statusAuthorize = "true"
		}
		return statusAuthorize;
	},


})