Clazz.createPackage("com.attendance.widget.listener");

Clazz.com.attendance.widget.listener.AttendanceReimbursementSaveButton = Clazz.extend(Clazz.Widget, {
	numberItemInput:0,
	subTotal:0,
	total:0,
	CookieAPI:null,
	indexList:null,

	initialize : function (){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.CookieAPI.saveStatusEditReimburseList(false);
	},

	/**
	 * @author dhika_p
	 * function to save data from input itemized
	 */
	onButtonSaveClick:function(){
		var self = this;
		var dropDownValue = this.CookieAPI.getDropDownValueReimbursement();
		var date = $('.attendance-reimbursement-itemized-input-date').val();
		var description = $('.attendance-reimbursement-itemized-input-description').val();
		var quantity = $('.attendance-reimbursement-itemized-input-quantity').val();
		var cost = $('.attendance-reimbursement-itemized-input-cost').val();
		var cashAdvance = $('.attendance-reimbursement-itemized-input-cash-advance').val();
		var dropDown = $('.attendance-reimbursement-input-dropdown').val();
		$('.attendance-reimbursement-input-dropdown').attr("readonly",true);

		cost = this.removeZeroCost(cost);
		quantity = this.removeZeroQuantity(quantity);
		cashAdvance = this.removeZeroCashAdvance(cashAdvance);

		if (self.alertEmptyBox(quantity , cost , cashAdvance , description , date , dropDown) == 0){

			$('.attendance-reimbursement-dropdown-mask').css("visibility","visible");
			$('.attendance-reimbursement-dropdown-text-right').text(dropDownValue);

			if(this.CookieAPI.getStatusEditReimburseList() == "true"){
				$('.attendance-reimbursement-ul').eq(self.indexList).find('.attendance-reimbursement-content-date .attendance-reimbursement-detail-content-text').text(date);
				$('.attendance-reimbursement-ul').eq(self.indexList).find('.attendance-reimbursement-content-description .attendance-reimbursement-detail-content-text').text(description);
				$('.attendance-reimbursement-ul').eq(self.indexList).find('.attendance-reimbursement-content-quantity .attendance-reimbursement-detail-content-text').text(quantity);
				$('.attendance-reimbursement-ul').eq(self.indexList).find('.attendance-reimbursement-content-cost .attendance-reimbursement-detail-content-text').text(cost.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				$('.attendance-reimbursement-ul').eq(self.indexList).find('.attendance-reimbursement-content-cash-advance .attendance-reimbursement-detail-content-text').text(cashAdvance.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				this.CookieAPI.saveStatusEditReimburseList("false");
				this.calculateTotalCost();
				this.calculateTotal();
			}
			else{
				this.numberItemInput = this.numberItemInput + 1;

				var ul = $('<ul class="attendance-reimbursement-ul"></ul>');
				var divNo = $('<li class="attendance-reimbursement-content-no"><div class="attendance-reimbursement-detail-content-text">'+this.numberItemInput+'</div></li>');
				var divDate = $('<li class="attendance-reimbursement-content-date"><div class="attendance-reimbursement-detail-content-text">'+date+'</div></li>');
				var divDescription = $('<li class="attendance-reimbursement-content-description"><div class="attendance-reimbursement-detail-content-text">'+description+'</div></li>');
				var divQuantity = $('<li class="attendance-reimbursement-content-quantity"><div class="attendance-reimbursement-detail-content-text">'+quantity+'</div></li>');

				var divCost= $('<li class="attendance-reimbursement-content-cost"><div class="reimbursement-rp">Rp.</div><div class="attendance-reimbursement-detail-content-text">'+cost.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+'</div><div class="reimbursement-dec">.-</div></li>');
				ul.append(divNo);
				ul.append(divDate);
				ul.append(divDescription);
				ul.append(divQuantity);
				ul.append(divCost);
				$('.jspPane').append(ul);

				$('.attendance-reimbursement-sub-content-detail').css("text-align", "right");
				$('.attendance-reimbursement-sub-content-detail').css("margin-left", "-23px");
				$('.reimbursement-detail-rp').text("Rp.");
				$('.reimbursement-detail-dec').text(".-");
				$('.attendance-reimbursement-sub-content-detail-cash').text(cashAdvance.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));	
				this.calculateTotalCost();
				this.calculateTotal();
				this.reNumberingList();
			}
			$('.attendance-reimbursement-itemized-input-description').val("");
			$('.attendance-reimbursement-itemized-input-date').val("");
			$('.attendance-reimbursement-itemized-input-quantity').val("");
			$('.attendance-reimbursement-itemized-input-cost').val("");
			$('.attendance-reimbursement-itemized-input-cash-advance').attr("readonly",true);				

			$('.attendance-reimbursement-input-dropdown').removeClass('reimbursement-alert-input-type-box');
			$('.attendance-reimbursement-itemized-input-description').removeClass('reimbursement-alert-input-long-box');
			$('.attendance-reimbursement-itemized-input-quantity').removeClass('reimbursement-alert-input-long-box');
			$('.attendance-reimbursement-itemized-input-cost').removeClass('reimbursement-alert-input-long-box');
			$('.attendance-reimbursement-itemized-input-cash-advance').removeClass('reimbursement-alert-input-long-box');
			$('.attendance-reimbursement-itemized-input-date').removeClass('reimbursement-alert-input-currency-box');

		}			

		$('.attendance-reimbursement-ul').css("cursor","pointer");

		$('.attendance-reimbursement-ul').eq(self.numberItemInput-1).click(function(){
			self.highlightSelected(this);
		});

		//unhighlight when click document
		self.unHighlightsList(this);


		$('.attendance-reimbursement-table-button-remove').click(function(){
			if (self.CookieAPI.getStatusEditReimburseList()=="false"){
				self.removeListTable();
			}
		});

		$('.attendance-reimbursement-table-button-edit').click(function(){
			if (self.CookieAPI.getStatusEditReimburseList()=="false"){
				self.editListTable();
			}
		});
	},

	/**
	 * @author dhika_p
	 * function to set alert empty box
	 */
	alertEmptyBox:function(quantity , cost , cashAdvance , description , date , dropDown){
		var valid= 0;
		var intRegex = /^\d+$/;

		if (dropDown == ""){
			$('.attendance-reimbursement-input-dropdown').addClass('reimbursement-alert-input-type-box');
			valid=valid+1;
		}else{
			$('.attendance-reimbursement-input-dropdown').removeClass('reimbursement-alert-input-type-box');
			valid=valid+0;
		}

		if (description == ""){
			$('.attendance-reimbursement-itemized-input-description').addClass('reimbursement-alert-input-long-box');
			valid=valid+1;
		}else{
			$('.attendance-reimbursement-itemized-input-description').removeClass('reimbursement-alert-input-long-box');
			valid=valid+0;
		}

		if (quantity == "" || !intRegex.test(quantity) ){
			$('.attendance-reimbursement-itemized-input-quantity').addClass('reimbursement-alert-input-long-box');
			valid=valid+1;
		}else{
			$('.attendance-reimbursement-itemized-input-quantity').removeClass('reimbursement-alert-input-long-box');
			valid=valid+0;
		}

		if (cost == "" || !intRegex.test(cost) ){
			$('.attendance-reimbursement-itemized-input-cost').addClass('reimbursement-alert-input-long-box');
			valid=valid+1;
		}else{
			$('.attendance-reimbursement-itemized-input-cost').removeClass('reimbursement-alert-input-long-box');
			valid=valid+0;
		}

		if (cashAdvance == "" || !intRegex.test(cashAdvance) ){
			$('.attendance-reimbursement-itemized-input-cash-advance').addClass('reimbursement-alert-input-long-box');
			valid=valid+1;
		}else{
			$('.attendance-reimbursement-itemized-input-cash-advance').removeClass('reimbursement-alert-input-long-box');
			valid=valid+0;
		}

		if (date == ""){
			$('.attendance-reimbursement-itemized-input-date').addClass('reimbursement-alert-input-currency-box');
			valid=valid+1;
		}else{
			$('.attendance-reimbursement-itemized-input-date').removeClass('reimbursement-alert-input-currency-box');
			valid=valid+0;
		}
		return valid;
	},

	/**
	 * @author dhika_p
	 * function to set highlight selected list table
	 */
	highlightSelected : function(selectedUl){
		var statusEditList = this.CookieAPI.getStatusEditReimburseList();
		if(statusEditList == "false" || statusEditList == null){
			var indexUl = $('.attendance-reimbursement-ul');
			$('.attendance-reimbursement-content-no , .attendance-reimbursement-content-date , .attendance-reimbursement-content-description , .attendance-reimbursement-content-quantity , .attendance-reimbursement-content-cost').removeClass('request-list-highlight');
			$('.attendance-reimbursement-ul').eq(indexUl.index(selectedUl)).find('.attendance-reimbursement-content-no , .attendance-reimbursement-content-date , .attendance-reimbursement-content-description , .attendance-reimbursement-content-quantity , .attendance-reimbursement-content-cost').addClass('request-list-highlight');

			this.CookieAPI.saveIndexSelectedItemReimburse(indexUl.index(selectedUl));
		}
	},

	/**
	 * @author dhika_p
	 * function to remove selected list table
	 */
	removeListTable : function (){	
		var self = this;
		this.indexList = this.CookieAPI.getIndexSelectedItemListReimburse();
		if (this.indexList != "" && this.indexList != null){
			quantity =  $('.attendance-reimbursement-ul').eq(this.indexList).find('.attendance-reimbursement-content-quantity .attendance-reimbursement-detail-content-text').text();
			selectedCost = $('.attendance-reimbursement-ul').eq(this.indexList).find('.attendance-reimbursement-content-cost .attendance-reimbursement-detail-content-text').text();
			minusCost = parseInt(selectedCost.replace(/,/g, ''))*parseInt(quantity);
			$('.attendance-reimbursement-content-no .attendance-reimbursement-detail-content-text').empty();
			$('.attendance-reimbursement-ul').eq(this.indexList).remove();
			var i = 0;	
			$('.attendance-reimbursement-ul').each(function(){
				$('.attendance-reimbursement-ul').eq(i).find('.attendance-reimbursement-content-no .attendance-reimbursement-detail-content-text').append(++i +'.');
			});
			this.CookieAPI.saveIndexSelectedItemReimburse("");

			//minus cost
			totalCost = $(".attendance-reimbursement-sub-content-detail .attendance-reimbursement-sub-content-detail-sub").text().replace(/,/g, '');
			totalCost = parseInt(totalCost) - parseInt(minusCost);
			//update cost
			$(".attendance-reimbursement-sub-content-detail .attendance-reimbursement-sub-content-detail-sub").text((totalCost+"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
			//this.calculateTotalCost();
			this.calculateTotal();
			this.reNumberingList();
			self.numberItemInput = self.numberItemInput - 1;
		}

		if ($('.attendance-reimbursement-ul').eq(0).find("attendance-reimbursement-content-no , .attendance-reimbursement-detail-content-text").text()==""){
			$('.attendance-reimbursement-itemized-input-cash-advance').attr("readonly",false);	
			$('.attendance-reimbursement-itemized-input-cash-advance').val("0");
			$('.attendance-reimbursement-sub-content-detail .attendance-reimbursement-sub-content-detail-cash').text("0");

			$('.attendance-reimbursement-dropdown-mask').css("visibility","hidden");
			self.resetReimbursementType();
		}
	},

	/**
	 * @author dhika_p
	 * function to edit list table
	 */
	editListTable : function(){
		var self = this ;
		this.indexList = this.CookieAPI.getIndexSelectedItemListReimburse();
		if (this.indexList !== null && this.indexList !== ""){
			var date= $('.attendance-reimbursement-ul').eq(this.indexList).find('.attendance-reimbursement-content-date .attendance-reimbursement-detail-content-text').text();
			var desc= $('.attendance-reimbursement-ul').eq(this.indexList).find('.attendance-reimbursement-content-description .attendance-reimbursement-detail-content-text').text();
			var quantity= $('.attendance-reimbursement-ul').eq(this.indexList).find('.attendance-reimbursement-content-quantity .attendance-reimbursement-detail-content-text').text();
			var cost= $('.attendance-reimbursement-ul').eq(this.indexList).find('.attendance-reimbursement-content-cost .attendance-reimbursement-detail-content-text').text();
			var cashAdv= $('.attendance-reimbursement-sub-content-detail-cash').text();

			cost = this.removeZeroCost(cost);
			quantity = this.removeZeroQuantity(quantity);
			cashAdv = this.removeZeroCashAdvance(cashAdv);

			$('.attendance-reimbursement-itemized-input-date').val(date);
			$('.attendance-reimbursement-itemized-input-description').val(desc);
			$('.attendance-reimbursement-itemized-input-quantity').val(quantity);
			$('.attendance-reimbursement-itemized-input-cost').val(cost.replace(/,/g, ''));
			$('.attendance-reimbursement-itemized-input-cash-advance').val(cashAdv.replace(/,/g, ''));
			$('.attendance-reimbursement-input-dropdown').removeClass('reimbursement-alert-input-type-box');
			$('.attendance-reimbursement-itemized-input-description').removeClass('reimbursement-alert-input-long-box');
			$('.attendance-reimbursement-itemized-input-quantity').removeClass('reimbursement-alert-input-long-box');
			$('.attendance-reimbursement-itemized-input-cost').removeClass('reimbursement-alert-input-long-box');
			$('.attendance-reimbursement-itemized-input-cash-advance').removeClass('reimbursement-alert-input-long-box');
			$('.attendance-reimbursement-itemized-input-date').removeClass('reimbursement-alert-input-currency-box');

			//save status edit
			this.CookieAPI.saveStatusEditReimburseList("true");
		}
	},

	/**
	 * @author dhika_p
	 * function to calculate total cost
	 */
	calculateTotalCost : function(){
		//re-calculate
		var i = 0;	
		self.totalCost = 0;
		var cost = null;
		var quantity = null;
		$('.attendance-reimbursement-ul').each(function(){
			cost =  $('.attendance-reimbursement-ul').eq(i++).find('.attendance-reimbursement-content-cost .attendance-reimbursement-detail-content-text').text().replace(/,/g, '');
			quantity = $('.attendance-reimbursement-ul').eq(i-1).find('.attendance-reimbursement-content-quantity .attendance-reimbursement-detail-content-text').text();
			self.totalCost = self.totalCost + (parseInt(quantity)*parseInt(cost));
			$('.attendance-reimbursement-ul').eq(i-1).find('.attendance-reimbursement-content-cost .attendance-reimbursement-detail-content-text').text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		});
		//update total cost
		$(".attendance-reimbursement-sub-content-detail .attendance-reimbursement-sub-content-detail-sub").text((self.totalCost+"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	},

	/**
	 * @author dhika_p
	 * function to calculate total
	 */
	calculateTotal:function(){
		var sub = $('.attendance-reimbursement-sub-content-detail .attendance-reimbursement-sub-content-detail-sub').text().replace(/,/g, '');
		var cash = $('.attendance-reimbursement-sub-content-detail .attendance-reimbursement-sub-content-detail-cash').text().replace(/,/g, '');
		if (sub == "0"){
			$('.attendance-reimbursement-sub-content-detail .attendance-reimbursement-sub-content-detail-total').text("0");
		}
		else{
			var total = parseInt(sub) - parseInt(cash);
			$('.attendance-reimbursement-sub-content-detail .attendance-reimbursement-sub-content-detail-total').text((total+"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		}
	},


	removeZeroQuantity : function(quantity){
		var quantityLength = quantity.length;
		for(var beginValue = 0; beginValue < quantityLength; beginValue++){
			if(quantity.substring(0,1) == 0){
				quantity = quantity.slice(1, quantity.length);
			}
		}
		$('.attendance-reimbursement-itemized-input-text .attendance-reimbursement-itemized-input-quantity').val(quantity);
		return quantity;
	},

	removeZeroCost : function(cost){
		var costLength = cost.length;
		for(var beginValue = 0; beginValue < costLength; beginValue++){
			if(cost.substring(0,1) == 0){
				cost = cost.slice(1, cost.length);
			}
		}
		$('.attendance-reimbursement-itemized-input-text .attendance-reimbursement-itemized-input-cost').val(cost);
		return cost;
	},

	removeZeroCashAdvance : function(cashAdvance){
		var cashAdvanceLength = cashAdvance.length;
		if(cashAdvanceLength != "1"){
			for(var beginValue = 0; beginValue < cashAdvanceLength; beginValue++){
				if(cashAdvance.length != 1 ){
					if(cashAdvance.substring(0,1) == 0){
						cashAdvance = cashAdvance.slice(1, cashAdvance.length);
					}
				}

			}
		}
		$('.attendance-reimbursement-itemized-input-text .attendance-reimbursement-itemized-input-cash-advance').val(cashAdvance);
		return cashAdvance;

	},
	reNumberingList : function(){
		var number = 0;	
		$('.attendance-reimbursement-content-no .attendance-reimbursement-detail-content-text').empty();
		$('.attendance-reimbursement-ul').each(function(){
			$('.attendance-reimbursement-ul').eq(number).find('.attendance-reimbursement-content-no .attendance-reimbursement-detail-content-text').append(++number);
		});
	},

	/**
	 * @author andhika_p
	 * unhighlight list when click body
	 */
	unHighlightsList : function(selectedUl){
		var self = this;
		$('.attendance-reimbursement-ul').eq(self.numberItemInput-1).click(function(event){
			$(document).one('click',function(){
				var statusEditList = self.CookieAPI.getStatusEditReimburseList();
				if((statusEditList == "false" || statusEditList == null)){
					$('.attendance-reimbursement-content-no , .attendance-reimbursement-content-date , .attendance-reimbursement-content-description , .attendance-reimbursement-content-quantity , .attendance-reimbursement-content-cost').removeClass('request-list-highlight');
					self.CookieAPI.saveIndexSelectedItemReimburse("");
				}
			});
			event.stopPropagation();		
		});

	},

	resetReimbursementType : function(){
		$('.attendance-reimbursement-input-dropdown').val("");
	}
});
