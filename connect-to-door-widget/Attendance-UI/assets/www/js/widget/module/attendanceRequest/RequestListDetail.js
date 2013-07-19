Clazz.createPackage("com.attendance.widget.module.request");
Clazz.com.attendance.widget.module.request.RequestListDetail = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceRequest/attendanceRequestListDetail.tmp",
	name : "attendanceRequestItemList",
	defaultContainer : "request\\:item-list",
	data : {item : []},

	CookieAPI : null,
	selectedListListener : null,
	/**
	 * @author andhika_p
	 * initialize construct object and fill data
	 */
	initialize : function(config){
		var self = this;
		this.selectedListListener = new Clazz.com.attendance.widget.listener.SelectedListListener();
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		//get voucher status
		var idRequest = this.CookieAPI.getRequest();
		if (idRequest !== "" && idRequest !== null && idRequest !== undefined){
			self.data.item = config.data;
			self.insertComma(self.data.item);
		}else{
			self.data.item = {};
		}
	},
	
	bindUI: function(){
		this.setCursorList();
		var self = this;
		this.selectedListListener.reNumberingList();
		//theming scrollbar
		var pane = $('.scroll-pane');
		pane.jScrollPane(
				{
					showArrows: true,
					verticalArrowPositions: 'os',
					horizontalArrowPositions: 'os',
					autoReinitialise: true,
				}
		);

		//calculate total cost when data is not null
		if (this.data.item !== null && this.data.item !== undefined){
			self.calculateTotalCost();
			var currency = $('.attendance-ul-request').eq(0).find('.request-list-detail-content-cost .text-rp').text();
			$('.request-list-detail-footer-sum .text-rp').text(currency);
		}

		$('.attendance-request-remove-button').click(function(){
			self.selectedListListener.removeItemList();
		});

		$('.attendance-request-edit-button').click(function(){
			var statusEditList = self.CookieAPI.getStatusEditRequestList();
			if(statusEditList == "false" || statusEditList == null){
				self.selectedListListener.editList();
			}
		});
		$('.attendance-ul-request').click(function(){
			var voucherStatus = self.CookieAPI.getVoucherStatus();
			if(voucherStatus == "build"){
				self.highlightSelected(this);
			}
		});
	},

	setCursorList : function(){
		var voucherStatus = this.CookieAPI.getVoucherStatus();
		if(voucherStatus == "build"){
			$('.request-list-detail-content-no').addClass("cursor-pointer");
			$('.request-list-detail-content-request').addClass("cursor-pointer");
			$('.request-list-detail-content-description').addClass("cursor-pointer");
			$('.request-list-detail-content-quantity').addClass("cursor-pointer");
			$('.request-list-detail-content-cost').addClass("cursor-pointer");
		}else{
			$('.request-list-detail-content-no').removeClass("cursor-pointer");
			$('.request-list-detail-content-request').removeClass("cursor-pointer");
			$('.request-list-detail-content-description').removeClass("cursor-pointer");
			$('.request-list-detail-content-quantity').removeClass("cursor-pointer");
			$('.request-list-detail-content-cost').removeClass("cursor-pointer");
		}
	},


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
	 * highlight list when its selected
	 */
	highlightSelected : function(selectedUl){
		var indexUl = $('.attendance-ul-request');
		$('.request-list-detail-content-no,.request-list-detail-content-request,.request-list-detail-content-description,.request-list-detail-content-quantity,.request-list-detail-content-cost').removeClass('request-list-highlight');
		$('.attendance-ul-request').eq(indexUl.index(selectedUl)).find('.request-list-detail-content-no,.request-list-detail-content-request,.request-list-detail-content-description,.request-list-detail-content-quantity,.request-list-detail-content-cost').addClass('request-list-highlight');

		//save index to local storage
		this.CookieAPI.saveIndexSelectedItem(indexUl.index(selectedUl));
	},
	
	insertComma : function(data){
		for(var index in data){
			data[index].cost = data[index].cost.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			data[index].quantity = data[index].quantity.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}
	},

});