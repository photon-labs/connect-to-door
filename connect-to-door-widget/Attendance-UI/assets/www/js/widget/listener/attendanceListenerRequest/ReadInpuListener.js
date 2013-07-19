Clazz.createPackage("com.attendance.widget.listener");
Clazz.com.attendance.widget.listener.ReadInputListener = Clazz.extend(Clazz.Widget, {
	//number item in list
	numberItemInput : 0,

	selectedListListener : null,
	CookieAPI : null,
	indexList : null,
	totalCost: 0,
	dataInput : {},
	getSignatureLinkAPI : null,
	loadingMask : null,
	profileAPI : null,
	getListAPMGMAPI : null,
	
	
	//data sample from API
	dataSample :{
		itemList : [
		            {item :"Building"},{item :"Maintenance"},{item :"Communication"},{item :"Miscellaneous"}
		            ,{item :"Consumption"},{item :"Postage"},{item :"Depreciation"},{item :"Professional"}
		            ,{item :"Electricity"},{item :"Recruiting"},{item :"Equipment"},{item :"Rent"}
		            ,{item :"Fixed Asset"},{item :"Stationary"},{item :"Fixed Asset Insurance"}
		            ,{item :"Tax"},{item :"Hosting"},{item :"Transportation"},{item :"Internet"}
		            ]
	},


	initialize : function(config){
		var self = this;
		this.selectedListListener = new Clazz.com.attendance.widget.listener.SelectedListListener();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.loadingMask = new Clazz.com.attendance.widget.common.LoadingMask();
		require(["api/GetSignatureLinkAPI","api/ProfileAPI","api/GetListAPMGMAPI"],function(){
			self.getSignatureLinkAPI = new Clazz.com.attendance.api.GetSignatureLinkAPI();
			self.profileAPI = new Clazz.com.attendance.api.ProfileAPI();
			self.getListAPMGMAPI = new Clazz.com.attendance.api.GetListAPMGMAPI();
		});
	},


	/**
	 * @author andhika_p
	 * read input from form input to list detail
	 */
	readInput : function(){
		var self = this;
		var request= $('.type-text-value').text();
		var desc= $('.attendance-request-item-input-description-value .request-by-value').val();
		var quantity= $('.attendance-request-item-input-quantity-value .request-by-value').val();
		var cost= $('.attendance-request-item-input-cost-value .request-by-value').val();
		var currency= $('.attendance-request-item-input-currency-value .request-currency-by-value').text();

		quantity = this.removeZeroQuantity(quantity);
		cost = this.removeZeroCost(cost);

		this.totalCost = this.totalCost + parseInt(cost);

		if(self.showAlertInputBox(request,desc,cost,quantity,currency) == 0){
			self.inputEditList(request,desc,cost,quantity,currency);
		}

	},

	/**
	 * @author andhika_p
	 * input item to list when edit or new input
	 */
	inputEditList : function(request,desc,cost,quantity,currency){
		this.indexList = this.CookieAPI.getIndexSelectedItemList();
		var self = this;
		if(this.CookieAPI.getStatusEditRequestList() == "true"){
			$('.attendance-ul-request').eq(self.indexList).find('.request-list-detail-content-request .attendance-list-detail-content-text').text(request);
			$('.attendance-ul-request').eq(self.indexList).find('.request-list-detail-content-description .attendance-list-detail-content-text').text(desc);
			$('.attendance-ul-request').eq(self.indexList).find('.request-list-detail-content-quantity .attendance-list-detail-content-text').text(quantity);
			$('.attendance-ul-request').eq(self.indexList).find('.request-list-detail-content-cost .attendance-list-detail-content-text').text(cost.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			this.CookieAPI.saveStatusEditRequestList("false");

			self.calculateTotalCost();
			self.clearInput(currency);
			self.selectedStatus = true
		}
		else{

			//delete default empty container
			self.deleteDefaultContainer();

			//to select currency when input first data
			var currencyText = null;
			if(currency == "Dollar (USD)"){
				currencyText = "US$";
			}
			else if(currency == "Rupiah (IDR)"){
				currencyText = "Rp";
			}

			var ul = $('<ul class="attendance-ul-request"></ul>');
			var divNo = $('<li class="request-list-detail-content-no"><div class="attendance-list-detail-content-text"></div></li>');
			var divRequest = $('<li class="request-list-detail-content-request"><div class="attendance-list-detail-content-text">'+request+'</div></li>');
			var divDescription = $('<li class="request-list-detail-content-description"><div class="attendance-list-detail-content-text">'+desc+'</div></li>');
			var divQuantity = $('<li class="request-list-detail-content-quantity"><div class="attendance-list-detail-content-text">'+quantity+'</div></li>');
			var divCost= $('<li class="request-list-detail-content-cost"><div class="text-rp">'+currencyText+'</div><div class="attendance-list-detail-content-text"> '+cost.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'</div><div class="text-dot-minus">.-</div></li>');

			ul.append(divNo);
			ul.append(divRequest);
			ul.append(divDescription);
			ul.append(divQuantity);
			ul.append(divCost);
			$('.jspPane').append(ul);

			//input total
			$(".request-list-detail-footer-sum .attendance-list-detail-footer-text").text(self.totalCost);

			$('.attendance-ul-request').eq(self.numberItemInput-1).click(function(){
				self.highlightSelected(this);
			});

			//unhighlights when click document
			self.unHighlightsList();

			//re-numbering list
			var i = 0;	
			$('.request-list-detail-content-no .attendance-list-detail-content-text').empty();
			$('.attendance-ul-request').each(function(){
				$('.attendance-ul-request').eq(i).find('.request-list-detail-content-no .attendance-list-detail-content-text').append(++i +'.');
			});
			self.calculateTotalCost();
			$(".request-list-detail-footer-sum .text-rp").text(currencyText);
			self.clearInput();

			//set cursor
			self.setCursorList();
		}
	},


	/**
	 * @author andhika_p
	 * highlight list when its selected
	 */
	highlightSelected : function(selectedUl){
		var statusEditList = this.CookieAPI.getStatusEditRequestList();
		this.selectList(statusEditList,selectedUl);
	},

	/**
	 * @author andhika_p
	 * clear value on the input form
	 */
	clearInput : function(currency){
		$('.type-text-value').text("");
		$('.attendance-request-item-input-description-value .request-by-value').val("");
		$('.attendance-request-item-input-quantity-value .request-by-value').val("");
		$('.attendance-request-item-input-cost-value .request-by-value').val("");
		$('.attendance-request-item-input-currency-value .request-currency-by-value').text(currency);
		$('.request-currency-mask').css("visibility","visible");


		$('.type-text-value').removeClass("request-alert-input-type-box");
		$('.attendance-request-item-input-description-value .request-by-value').removeClass("request-alert-input-long-box");
		$('.attendance-request-item-input-quantity-value .request-by-value').removeClass("request-alert-input-long-box");
		$('.attendance-request-item-input-cost-value .request-by-value').removeClass("request-alert-input-long-box");
		$('.attendance-request-item-input-currency-value .request-currency-by-value').removeClass("request-alert-input-currency-box");
	},

	/**
	 * @author andhika_p
	 * re calculate cost total
	 */
	calculateTotalCost : function(){
		//re-calculate
		var i = 0;	
		self.totalCost = 0;
		$('.attendance-ul-request').each(function(){
			var divValcost = $('.attendance-ul-request').eq(i++).find('.request-list-detail-content-cost .attendance-list-detail-content-text').text().replace(/,/g, '');
			var divValQuantity = $('.attendance-ul-request').eq(i-1).find('.request-list-detail-content-quantity .attendance-list-detail-content-text').text().replace(/,/g, '');
			var divValue = parseInt(divValcost) * parseInt(divValQuantity);
			self.totalCost = self.totalCost + divValue;
			$('.attendance-ul-request').eq(i-1).find('.request-list-detail-content-cost .attendance-list-detail-content-text').text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		});
		//update total cost
		$(".request-list-detail-footer-sum .attendance-list-detail-footer-text").text((self.totalCost+"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	},

	/**
	 * @author andhika_p
	 * highlight background when list selected
	 */
	selectList : function(statusEditList,selectedUl){
		if(statusEditList == "false" || statusEditList == null){
			var indexUl = $('.attendance-ul-request');
			$('.request-list-detail-content-no,.request-list-detail-content-request,.request-list-detail-content-description,.request-list-detail-content-quantity,.request-list-detail-content-cost').removeClass('request-list-highlight');
			$('.attendance-ul-request').eq(indexUl.index(selectedUl)).find('.request-list-detail-content-no,.request-list-detail-content-request,.request-list-detail-content-description,.request-list-detail-content-quantity,.request-list-detail-content-cost').addClass('request-list-highlight');

			//save index to local storage
			this.CookieAPI.saveIndexSelectedItem(indexUl.index(selectedUl));
		}
	},

	/**
	 * @author andhika_p
	 * show alert when input box is empty
	 */
	showAlertInputBox : function(request,desc,cost,quantity,currency){
		var valid= 0;
		var intRegex = /^\d+$/;

		if(request == ""){
			$('.type-text-value').addClass("request-alert-input-type-box");
			valid=valid+1;
		}else{
			$('.type-text-value').removeClass("request-alert-input-type-box");
			valid=valid+0;
		}

		if(desc == ""){
			$('.attendance-request-item-input-description-value .request-by-value').addClass("request-alert-input-long-box");
			valid=valid+1;
		}else{
			$('.attendance-request-item-input-description-value .request-by-value').removeClass("request-alert-input-long-box");
			valid=valid+0;
		}

		if(quantity == "" || !intRegex.test(quantity)){
			$('.attendance-request-item-input-quantity-value .request-by-value').addClass("request-alert-input-long-box");
			valid=valid+1;
		}else{
			$('.attendance-request-item-input-quantity-value .request-by-value').removeClass("request-alert-input-long-box");
			valid=valid+0;
		}

		if(cost == "" || !intRegex.test(cost)){
			$('.attendance-request-item-input-cost-value .request-by-value').addClass("request-alert-input-long-box");
			valid=valid+1;
		}else{
			$('.attendance-request-item-input-cost-value .request-by-value').removeClass("request-alert-input-long-box");
			valid=valid+0;
		}

		if(currency == ""){
			$('.attendance-request-item-input-currency-value .request-currency-by-value').addClass("request-alert-input-currency-box");
			valid=valid+1;
		}else{
			$('.attendance-request-item-input-currency-value .request-currency-by-value').removeClass("request-alert-input-currency-box");
			valid=valid+0;
		}
		return valid;
	},

	/**
	 * @author andhika_p
	 * remove zero in front of value of quantity
	 */
	removeZeroQuantity : function(quantity){
		var quantityLength = quantity.length;
		for(var beginValue = 0; beginValue < quantityLength; beginValue++){
			if(quantity.substring(0,1) == 0){
				quantity = quantity.slice(1, quantity.length);
			}
		}
		$('.attendance-request-item-input-quantity-value .request-by-value').val(quantity);
		return quantity;
	},

	/**
	 * @author andhika_p
	 * remove zero in front of value of cost
	 */
	removeZeroCost : function(cost){
		var costLength = cost.length;
		for(var beginValue = 0; beginValue < costLength; beginValue++){
			if(cost.substring(0,1) == 0){
				cost = cost.slice(1, cost.length);
			}
		}
		$('.attendance-request-item-input-cost-value .request-by-value').val(cost);
		return cost;
	},

	/**
	 * @author andhika_p
	 * clear default container list
	 */
	deleteDefaultContainer : function(){
		var value = $('.attendance-ul-request').eq(0).find('.request-list-detail-content-request .attendance-list-detail-content-text').text();
		if(value == ""){
			$('.jspPane').empty();
		}
	},

	/**
	 * @author andhika_p
	 * set cursor when list not empty
	 */
	setCursorList : function(){
		$('.request-list-detail-content-no').removeClass("cursor-pointer");
		$('.request-list-detail-content-request').removeClass("cursor-pointer");
		$('.request-list-detail-content-description').removeClass("cursor-pointer");
		$('.request-list-detail-content-quantity').removeClass("cursor-pointer");
		$('.request-list-detail-content-cost').removeClass("cursor-pointer");

		$('.request-list-detail-content-no').addClass("cursor-pointer");
		$('.request-list-detail-content-request').addClass("cursor-pointer");
		$('.request-list-detail-content-description').addClass("cursor-pointer");
		$('.request-list-detail-content-quantity').addClass("cursor-pointer");
		$('.request-list-detail-content-cost').addClass("cursor-pointer");

	},

	/**
	 * @author andhika_p
	 * unhighlight list when click body
	 */
	unHighlightsList : function(selectedUl){
		var self = this;
		$('.attendance-ul-request').eq(self.numberItemInput-1).click(function(event){
			$(document).one('click',function(){
				var statusEditList = self.CookieAPI.getStatusEditRequestList();
				if((statusEditList == "false" || statusEditList == null)){
					$('.request-list-detail-content-no,.request-list-detail-content-request,.request-list-detail-content-description,.request-list-detail-content-quantity,.request-list-detail-content-cost').removeClass('request-list-highlight');
					self.CookieAPI.saveIndexSelectedItem("");
				}
			});
			event.stopPropagation();		
		});

	},

	getSignatureFromAPI : function(){
		var self = this;
		var employeeID = this.CookieAPI.getUserIdEmployee();
		this.loadingMask.showLoading();
		this.getSignatureLinkAPI.getSignature(employeeID, function(response){
			if(response.status == "success"){
				self.loadingMask.removeLoading();
				self.CookieAPI.saveAdminVoucherSignature("true");
				submitedBy = new Clazz.com.attendance.widget.module.request.SubmittedBySignature({voucherStatus: null,employeeSignature : null});
				submitedBy.getImageSignature(response.signature);				
			}
		});
	},

	getGMSignatureFromAPI : function(voucherStatus,approveBy){
		var self = this;
		if (voucherStatus == "finish"){
			var employeeID = approveBy;
		}else{
			var employeeID = this.CookieAPI.getUserIdEmployee();
		}
		
		this.loadingMask.showLoading();
		this.getSignatureLinkAPI.getSignature(employeeID, function(response){
			if(response.status == "success"){
				self.loadingMask.removeLoading();
				self.CookieAPI.saveGMVoucherSignature("true");
				approveBy = new Clazz.com.attendance.widget.module.request.ApprovalNameAndSignature({voucherStatus: voucherStatus, employeeId : null});
				approveBy.setImageSignatureGM(response.signature);
			}
		});
	},

	getPersonInformationFromAPI : function(){
		var self = this;
		var employee_id = this.CookieAPI.getUserIdEmployee();
		var searchParameter = "employee_id"
			this.loadingMask.showLoading();
		this.profileAPI.getPersonInformation(searchParameter, employee_id,function(response){
			if (response.status == "success"){
				self.loadingMask.removeLoading();
				var data = {name : response.employee_name, employeeID : response.employee_id}
				var requestBy = new Clazz.com.attendance.widget.module.request.RequestBy ();
				requestBy.getPersonInformation(data);
			}
		});
	},
	

	getListFromAPI : function(authority){
		this.getListAPMGMAPI.getList(authority, function(response){
			if(response.status == "success"){
				var approvalNameAndSignature  = new Clazz.com.attendance.widget.module.request.ApprovalNameAndSignature({voucherStatus : null});
				approvalNameAndSignature.setDropdownItem(response.data);
			}
		});
	},
});