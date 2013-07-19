Clazz.createPackage("com.attendance.widget.module.request");
Clazz.com.attendance.widget.module.request.ApproveDeclinePrintButton = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceRequest/attendanceRequestApproveDeclineAndPrintButton.tmp",
	name : "attendanceRequestDeclineAndPrintButton",
	defaultContainer : "request\\:approve-decline-print-button",
	errorAlert : null,
	
	//local storage
	CookieAPI : null,
	
	//voucher status from API
	voucherStatus : null,
	
	approveBackPrintListener : null,
	SignOutAndBackListener : null,
	/**
	 * @author andhika_p
	 * initialize construct object and fill data
	 */
	initialize : function(config){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.approveBackPrintListener = new Clazz.com.attendance.widget.listener.DeclineApproveAndPrintListener();
		this.SignOutAndBackListener = new Clazz.com.attendance.widget.listener.SignOutAndBackListener();
		this.voucherStatus = config.voucherStatus;
		this.selectUIByvoucherStatus();
	},

	bindUI: function(){
		var self = this;
		$('.request-back-button').click(function(){
			self.SignOutAndBackListener.buttonBackClick();
		});
		$('.request-submit-button').click(function(){
			var totalListData = $('.attendance-ul-request').length;
			var approveName = $('.attendance-request-submitted-approval-dropdown').text();
			var statusSignature = self.getStatusAdminSignature();
			var statusEdit = self.CookieAPI.getStatusEditRequestList();
			if (statusSignature == "true" && totalListData !== 0 && approveName !== "" && statusEdit !== "true"){
				self.approveBackPrintListener.backAndSaveStatusVoucher();
			}
			
			self.showAlertSignatureAndGMBox(statusSignature,approveName);
			
			if(totalListData == 0){
				self.showAlertInputBox();
			}
		});

		$('.request-approve-button').click(function(){
			var statusSignature = self.getStatusGMSignature();
			if (statusSignature == "true"){
				self.approveBackPrintListener.approveStatusRequest("finish");
			}
			self.showAlertSignatureGM();
//			else{
//				$(".attendance-request-submitted-approval-signature-approve").addClass("request-alert-signature-box");
//			}
		});
		$('.request-decline-button').click(function(){
			self.approveBackPrintListener.updateStatusRequest("decline");
		});

		$('.request-print-button').click(function(){
			self.approveBackPrintListener.backAndRemoveCredential();
		});
		
		this.clearLocalStorage();
	},
	
	
	clearLocalStorage : function(){
		var self = this;
		if(this.voucherStatus == "finish"){
			self.approveBackPrintListener.clearRequestLocalStorage();
		}
	},
	
	/**
	 * @author andhika_p
	 * this method used for select ui with handlebars, when voucher status is "build" or etc
	 */
	selectUIByvoucherStatus : function(){
		var self = this;
		require(["lib/handlebars-1.0.0.beta.6"],function(){
			Handlebars.registerHelper('if-status-build',function(opt){
				if(self.voucherStatus == "build"){
					return opt.fn(this);
				}
				else{
				}
			});
			Handlebars.registerHelper('if-status-approve',function(opt){
				if(self.voucherStatus == "approve"){
					return opt.fn(this);
				}
				else{
				}
			});
			Handlebars.registerHelper('if-status-finish',function(opt){
				if(self.voucherStatus == "finish"){
					return opt.fn(this);
				}
				else{
				}
			});
			
		});
	},
	/**
	 * @author andhika_p
	 * get status admin signature from local storage API
	 */
	getStatusAdminSignature : function(){
		var statusSignature = this.CookieAPI.getAdminVoucherSignature();
		return statusSignature;
	},

	/**
	 * @author andhika_p
	 * get status GM signature from local storage API
	 */
	getStatusGMSignature : function(){
		var statusSignature = this.CookieAPI.getGMVoucherSignature();
		return statusSignature;
	},
	
	/**
	 * @author andhika_p
	 * show alert when submitted and approval box empty
	 */
	showAlertSignatureAndGMBox : function(statusSignature,approveName){
		if(statusSignature == "false"){
			$(".attendance-request-submitted-by-alert").css("visibility","visible");
		}else{
			$(".attendance-request-submitted-by-alert").css("visibility","hidden");
		}

		if(approveName == ""){
			$(".attendance-request-submitted-approval-dropdown").addClass("request-alert-input-type-box");
		}else{
			$(".attendance-request-submitted-approval-dropdown").removeClass("request-alert-input-type-box");
		}

	},
	
	showAlertSignatureGM : function(){
			$(".attendance-request-approve-by-alert").css("visibility","visible");
	},

	/**
	 * @author andhika_p
	 * show alert when input box is empty
	 */
	showAlertInputBox : function(){
		var request= $('.type-text-value').text();
		var desc= $('.attendance-request-item-input-description-value .request-by-value').val();
		var quantity= $('.attendance-request-item-input-quantity-value .request-by-value').val();
		var cost= $('.attendance-request-item-input-cost-value .request-by-value').val();
		var currency= $('.attendance-request-item-input-currency-value .request-currency-by-value').text();

		if(request == ""){
			$('.type-text-value').addClass("request-alert-input-type-box");
		}else{
			$('.type-text-value').removeClass("request-alert-input-type-box");
		}

		if(desc == ""){
			$('.attendance-request-item-input-description-value .request-by-value').addClass("request-alert-input-long-box");
		}else{
			$('.attendance-request-item-input-description-value .request-by-value').removeClass("request-alert-input-long-box");
		}

		if(quantity == ""){
			$('.attendance-request-item-input-quantity-value .request-by-value').addClass("request-alert-input-long-box");
		}else{
			$('.attendance-request-item-input-quantity-value .request-by-value').removeClass("request-alert-input-long-box");
		}

		if(cost == ""){
			$('.attendance-request-item-input-cost-value .request-by-value').addClass("request-alert-input-long-box");
		}else{
			$('.attendance-request-item-input-cost-value .request-by-value').removeClass("request-alert-input-long-box");
		}

		if(currency == ""){
			$('.attendance-request-item-input-currency-value .request-currency-by-value').addClass("request-alert-input-currency-box");
		}else{
			$('.attendance-request-item-input-currency-value .request-currency-by-value').removeClass("request-alert-input-currency-box");
		}
	},
});