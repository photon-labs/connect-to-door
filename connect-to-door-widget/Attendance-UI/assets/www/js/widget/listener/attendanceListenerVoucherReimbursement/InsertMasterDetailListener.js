Clazz.createPackage("com.attendance.widget.listener");

Clazz.com.attendance.widget.listener.InsertMasterDetailListener = Clazz.extend(Clazz.Widget, {
	CookieAPI : null,
	insertMasterDetailListener : null,
	updateStatusReimbursementAPI: null,
	loadingMask : null,
	signOutAndBackListener : null,
	
	initialize : function(){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.insertMasterDetailListener = new Clazz.com.attendance.api.InputReimbursementAPI();
		this.updateStatusReimbursementAPI = new Clazz.com.attendance.api.UpdateStatusReimbursementAPI();
		this.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
		this.signOutAndBackListener = new Clazz.com.attendance.widget.listener.SignOutAndBackListener();
	},
	
	getEmployeeAuthority : function(status){
		var statusAuthority = this.CookieAPI.getAuthority();
		return statusAuthority;
	},
	
	/**
	 * @author dhika_p
	 * function to insert master and detail reimbursement
	 */
	insertMasterAndDetail : function() {
		var self = this;
		var indexLoop = 0;	
		var objectList = null;
		this.detailList = [];		
		var employeeId = this.CookieAPI.getUserIdEmployee();
		var cashAdvance =$('.attendance-reimbursement-itemized-input-cash-advance').val();
		var reimbursementType = $('.attendance-reimbursement-input-dropdown').val();
		$('.attendance-reimbursement-ul').each(function(){
			var description = $('.attendance-reimbursement-ul').eq(indexLoop).find('.attendance-reimbursement-content-description .attendance-reimbursement-detail-content-text').text();
			var quantity = $('.attendance-reimbursement-ul').eq(indexLoop).find('.attendance-reimbursement-content-quantity .attendance-reimbursement-detail-content-text').text().replace(/,/g, '');
			var cost = $('.attendance-reimbursement-ul').eq(indexLoop).find('.attendance-reimbursement-content-cost .attendance-reimbursement-detail-content-text').text().replace(/,/g, '');
			var date = $('.attendance-reimbursement-ul').eq(indexLoop).find('.attendance-reimbursement-content-date .attendance-reimbursement-detail-content-text').text();
			objectList={description :description, quantity:quantity ,cost:cost ,date:date};
			self.detailList.push(objectList);
			++indexLoop;
			
		});
		var statusEmployeeAuthority = this.getEmployeeAuthority();
		if(statusEmployeeAuthority == "General Manager"
			|| statusEmployeeAuthority == "Admin"
				|| statusEmployeeAuthority == "Finance"
					|| statusEmployeeAuthority == "Super Admin"
						|| statusEmployeeAuthority == "Project Manager"){
			statusReimbursement = "gm-apm";
		}
		else{
			statusReimbursement = "apm";
		}
		
		var assignTo = this.CookieAPI.getAssignTo();
		this.loadingMask.showLoading();
		this.insertMasterDetailListener.insertMasterDetailReimbursement(employeeId, cashAdvance , reimbursementType, this.detailList, statusReimbursement, assignTo, function(response){
			if(response.status =="success"){
				self.loadingMask.removeLoading();
				$("reimbursement\\:footer").empty();
				self.CookieAPI.saveAdminReimbursementSignature("false");
				self.clearidRequestLocalStorage();
				Clazz.navigationController.pop();
			}else{
				self.CookieAPI.saveAdminReimbursementSignature("false");
				self.loadingMask.removeLoading();
				Clazz.navigationController.pop();
				self.loadingMask.removeLoading();
			}
		});
	},

	
	updateStatusSubmitAPM : function(){
		var self = this;
		var assignTo = null;
		var assignTo = this.CookieAPI.getAssignTo();

		this.loadingMask.showLoading();
		var statusReimburse = "gm";
		var employeeID = this.CookieAPI.getUserIdEmployee();
		var reimbursement_id = this.CookieAPI.getRequest();
		this.updateStatusReimbursementAPI.UpdateReimbursementStatus(reimbursement_id, statusReimburse, employeeID, assignTo,function(response){
			if(response.status == "success"){
				self.loadingMask.removeLoading();
				$("reimbursement\\:footer").empty();
				self.CookieAPI.saveAdminReimbursementSignature("false");
				self.clearidRequestLocalStorage();
				self.signOutAndBackListener.buttonBackClick()
			}else{
				self.CookieAPI.saveAdminReimbursementSignature("false");
				self.loadingMask.removeLoading();
				self.signOutAndBackListener.buttonBackClick()
			}
		});

	},
	
	
	updateStatusComplete : function(){
		var self = this;
		var assignTo = $('.attendance-reimbursement-top-text-employee-id').text();
		var reimbursementStatus = this.CookieAPI.getReimbursementStatus();
		var statusReimburse = null;
		if(reimbursementStatus == "gm-apm"){
			statusReimburse = "complete-apm";
		}
		else{
			statusReimburse = "complete";
		}
		
		this.loadingMask.showLoading();
		var employeeID = this.CookieAPI.getUserIdEmployee();
		var reimbursement_id = this.CookieAPI.getRequest();
		this.updateStatusReimbursementAPI.UpdateReimbursementStatus(reimbursement_id, statusReimburse, employeeID, assignTo,function(response){
			if(response.status == "success"){
				self.loadingMask.removeLoading();
				$("reimbursement\\:footer").empty();
				self.CookieAPI.saveAdminReimbursementSignature("false");
				self.clearidRequestLocalStorage();
				self.signOutAndBackListener.buttonBackClick()
			}else{
				self.CookieAPI.saveAdminReimbursementSignature("false");
				self.loadingMask.removeLoading();
				self.signOutAndBackListener.buttonBackClick()
			}
		});
		
	},
	
	
	updateStatusDecline : function(){
		var self = this;
		var assignTo = $('.attendance-reimbursement-top-text-employee-id').text();
		this.loadingMask.showLoading();
		var statusReimburse = "decline";
		var employeeID = this.CookieAPI.getUserIdEmployee();
		var reimbursement_id = this.CookieAPI.getRequest();
		this.updateStatusReimbursementAPI.UpdateReimbursementStatus(reimbursement_id, statusReimburse, employeeID, assignTo,function(response){
			if(response.status == "success"){
				$("reimbursement\\:footer").empty();
				self.loadingMask.removeLoading();
				self.CookieAPI.saveAdminReimbursementSignature("false");
				self.clearidRequestLocalStorage();
				self.signOutAndBackListener.buttonBackClick()
			}else{
				self.CookieAPI.saveAdminReimbursementSignature("false");
				self.loadingMask.removeLoading();
				self.signOutAndBackListener.buttonBackClick()
			}
		});
	},
	
	clearidRequestLocalStorage : function(){
		this.CookieAPI.clearRequest();
	}

});
