Clazz.createPackage("com.attendance.widget.module.reimbursement");
Clazz.com.attendance.widget.module.reimbursement.AttendanceReimbursementFooter = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceReimbursement/attendanceReimbursementFooter.tmp",
	name : "attendanceReimbursementFooter",
	defaultContainer : "reimbursement\\:footer",
	attendanceReimbursementPrintListener:null,
	reimbursementStatus : null,
	CookieAPI: null,
	dataList : [],
	mask : null,
	SignOutAndBackListener : null,
	statusSignature : null,
	insertMasterDetailListener : null,

	initialize : function(config){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.reimbursementStatus = this.CookieAPI.getReimbursementStatus();
		this.selectFooterUIByReimbursementStatus();
		this.attendanceReimbursementPrintListener = new Clazz.com.attendance.widget.listener.PrintReimbursementCompleteListener();
		this.SignOutAndBackListener = new Clazz.com.attendance.widget.listener.SignOutAndBackListener();
		this.insertMasterDetailListener = new Clazz.com.attendance.widget.listener.InsertMasterDetailListener();
	},

	bindUI: function(){
		var self = this;
		var authority = this.CookieAPI.getAuthority();
		$('.attendance-reimbursement-print').click(function(){
			self.insertMasterDetailListener.clearidRequestLocalStorage();
			self.SignOutAndBackListener.buttonBackClick()
		});

		$('.attendance-reimbursement-back').click(function(){
			self.SignOutAndBackListener.buttonBackClick()
		});


		$('.attendance-reimbursement-submit-build-apm').click(function(){
			var statusEditList = self.CookieAPI.getStatusEditReimburseList();
			if(statusEditList == "false" || statusEditList == null){
				var totalListData = $('.attendance-reimbursement-ul').length;
				self.statusSignature = self.CookieAPI.getAdminReimbursementSignature();
				if(self.statusSignature === "true" &&
						$('.attendance-reimbursement-submitted-approval-dropdown').text() != "" &&
						$('.attendance-reimbursement-ul').eq(0).find("attendance-reimbursement-content-no , .attendance-reimbursement-detail-content-text").text() !=""){
					self.insertMasterDetailListener.insertMasterAndDetail();
				}
				else{
					var dropDownApp = $('.attendance-reimbursement-submitted-approval-dropdown').text();
					self.alertEmptySignature(self.statusSignature, dropDownApp);
					if(totalListData == 0){
						self.alertEmptyBox();

					}
				}
			}
		});
		$('.attendance-reimbursement-submit-build').click(function(){
			var statusEditList = self.CookieAPI.getStatusEditReimburseList();
			if(statusEditList == "false" || statusEditList == null){
				var totalListData = $('.attendance-reimbursement-ul').length;
				self.statusSignature = self.CookieAPI.getAdminReimbursementSignature();
				if(self.statusSignature === "true" && $('.attendance-reimbursement-submitted-approval-dropdown').text() != "" &&
						$('.attendance-reimbursement-ul').eq(0).find("attendance-reimbursement-content-no , .attendance-reimbursement-detail-content-text").text() !=""){
					self.insertMasterDetailListener.insertMasterAndDetail();
				}
				else{
					var dropDownApp = $('.attendance-reimbursement-submitted-approval-dropdown').text();
					self.alertEmptySignature(self.statusSignature, dropDownApp);
					if(totalListData == 0){
						self.alertEmptyBox();
					}
				}
			}
		});

		$('.attendance-reimbursement-submit-apm').click(function(){
			self.statusSignature = self.CookieAPI.getAdminReimbursementSignature();
			if(self.statusSignature === "true" && $('.attendance-reimbursement-submitted-approval-dropdown').text() != ""){
				self.insertMasterDetailListener.updateStatusSubmitAPM();	
			}
			else{
				var dropDownApp = $('.attendance-reimbursement-submitted-approval-dropdown').text();
				self.alertEmptySignature(self.statusSignature, dropDownApp);
			}
		});

		$('.attendance-reimbursement-approve').click(function(){
			self.statusSignature = self.CookieAPI.getAdminReimbursementSignature();
			if(self.statusSignature === "true"){
				self.insertMasterDetailListener.updateStatusComplete();
			}
			else{
				var dropDownApp = $('.attendance-reimbursement-submitted-approval-dropdown').text();
				self.alertEmptySignature(self.statusSignature, dropDownApp);
			}
		});

		$('.attendance-reimbursement-decline-apm').click(function(){
			self.insertMasterDetailListener.updateStatusDecline();
		});

		$('.attendance-reimbursement-decline-gm').click(function(){
			self.insertMasterDetailListener.updateStatusDecline();
		});
	},

	selectFooterUIByReimbursementStatus : function(){
		var self = this;
		require(["lib/handlebars-1.0.0.beta.6"],function(){
			Handlebars.registerHelper('if-build',function(opt){
				if(self.reimbursementStatus == "build"){
					return opt.fn(this);
				}
				else{
				}
			});
			Handlebars.registerHelper('if-build-apm',function(opt){
				if(self.reimbursementStatus == "build-apm"){
					return opt.fn(this);
				}
				else{
				}
			});
			Handlebars.registerHelper('if-apm',function(opt){
				if(self.reimbursementStatus == "apm"){
					return opt.fn(this);
				}
				else{
				}
			});
			Handlebars.registerHelper('if-gm',function(opt){
				if(self.reimbursementStatus == "gm"){
					return opt.fn(this);
				}
				else{
				}
			});
			Handlebars.registerHelper('if-gm-apm',function(opt){
				if(self.reimbursementStatus == "gm-apm"){
					return opt.fn(this);
				}
				else{
				}
			});
			Handlebars.registerHelper('if-complete',function(opt){
				if(self.reimbursementStatus == "complete"){
					return opt.fn(this);
				}
				else{
				}
			});
			Handlebars.registerHelper('if-complete-apm',function(opt){
				if(self.reimbursementStatus == "complete-apm"){
					return opt.fn(this);
				}
				else{
				}
			});
		});
	},

	saveListToObject : function(){
		var self = this;
		var i = 0;	
		var objectList = null;
		this.dataList = [];
		$('.attendance-reimbursement-ul').each(function(){
			var date = $('.attendance-reimbursement-ul').eq(i).find('.attendance-reimbursement-content-date .attendance-reimbursement-detail-content-text').text();
			var description = $('.attendance-reimbursement-ul').eq(i).find('.attendance-reimbursement-content-description .attendance-reimbursement-detail-content-text').text();
			var quantity = $('.attendance-reimbursement-ul').eq(i).find('.attendance-reimbursement-content-quantity .attendance-reimbursement-detail-content-text').text();
			var cost = $('.attendance-reimbursement-ul').eq(i).find('.attendance-reimbursement-content-cost .attendance-reimbursement-detail-content-text').text();

			objectList={date:date, desc:description ,qty:quantity, cst:cost , cash:cashAdvance};
			self.dataList.push(objectList);

			++i;
		});
		var cashAdvance = $('.attendance-reimbursement-sub-content-detail .attendance-reimbursement-sub-content-detail-cash').text();
		this.CookieAPI.clearListDataReimburse();
		this.CookieAPI.saveCashAdvance(cashAdvance)
		this.CookieAPI.saveListDataReimburse(this.dataList);
	},

	alertEmptySignature:function(statusSignature , dropDownApp){
		var self = this;	
		var date = $('.attendance-reimbursement-itemized-input-date').val();
		var description = $('.attendance-reimbursement-itemized-input-description').val();
		var quantity = $('.attendance-reimbursement-itemized-input-quantity').val();
		var cost = $('.attendance-reimbursement-itemized-input-cost').val();
		var cashAdvance = $('.attendance-reimbursement-itemized-input-cash-advance').val();
		var dropDown = $('.attendance-reimbursement-input-dropdown').val();
		var statusSignature = self.CookieAPI.getAdminReimbursementSignature();

		if(statusSignature == "false"){
			$(".insert-reimbursement-warning").addClass("attendance-form-visible");
		}

		if(dropDownApp == ""){
			$('.attendance-reimbursement-submitted-approval-dropdown').addClass('reimbursement-alert-input-type-box');
		}else{
			$('.attendance-reimbursement-submitted-approval-dropdown').removeClass('reimbursement-alert-input-type-box');
		}

	},

	alertEmptyBox:function(){

		var quantity = $('.attendance-reimbursement-itemized-input-quantity').val();
		var cost = $('.attendance-reimbursement-itemized-input-cost').val();
		var cashAdvance = $('.attendance-reimbursement-itemized-input-cash-advance').val();
		var description = $('.attendance-reimbursement-itemized-input-description').val();
		var date = $('.attendance-reimbursement-itemized-input-date').val();
		var dropDown = $('.attendance-reimbursement-input-dropdown').val();

		if (dropDown == ""){
			$('.attendance-reimbursement-input-dropdown').addClass('reimbursement-alert-input-type-box');
		}else{
			$('.attendance-reimbursement-input-dropdown').removeClass('reimbursement-alert-input-type-box');
		}

		if (description == ""){
			$('.attendance-reimbursement-itemized-input-description').addClass('reimbursement-alert-input-long-box');
		}else{
			$('.attendance-reimbursement-itemized-input-description').removeClass('reimbursement-alert-input-long-box');
		}

		if (quantity == ""){
			$('.attendance-reimbursement-itemized-input-quantity').addClass('reimbursement-alert-input-long-box');
		}else{
			$('.attendance-reimbursement-itemized-input-quantity').removeClass('reimbursement-alert-input-long-box');
		}

		if (cost == ""){
			$('.attendance-reimbursement-itemized-input-cost').addClass('reimbursement-alert-input-long-box');
		}else{
			$('.attendance-reimbursement-itemized-input-cost').removeClass('reimbursement-alert-input-long-box');
		}

		if (cashAdvance == ""){
			$('.attendance-reimbursement-itemized-input-cash-advance').addClass('reimbursement-alert-input-long-box');
		}else{
			$('.attendance-reimbursement-itemized-input-cash-advance').removeClass('reimbursement-alert-input-long-box');
		}

		if (date == ""){
			$('.attendance-reimbursement-itemized-input-date').addClass('reimbursement-alert-input-currency-box');
		}else{
			$('.attendance-reimbursement-itemized-input-date').removeClass('reimbursement-alert-input-currency-box');
		}
	},

});