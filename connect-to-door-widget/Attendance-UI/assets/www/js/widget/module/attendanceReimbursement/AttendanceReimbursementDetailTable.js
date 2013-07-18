Clazz.createPackage("com.attendance.widget.module.attendanceReimbursement");

Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementDetailTable = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl: "../template/attendanceReimbursement/attendanceReimbursementTable.tmp",
	defaultContainer : "attendance\\:reimbursement-table",
	
	numberItemInput:0,
	subTotal:0,
	total:0,
	totalCost : 0,
	CookieAPI:null,
	indexList:null,
	cashAdvance:null,
	
	data : {itemReimbuse : []},
	CookieAPI : null,
	saveButtonListener:null,

	initialize : function(config){
		var self = this;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		var requestID = this.CookieAPI.getRequest();
		if(requestID !== null && requestID !== undefined && requestID !== ""){
			self.data.itemReimbuse = config.data;
			self.insertComma(self.data.itemReimbuse);
		}else{
			self.data.itemReimbuse = {};
		}

		this.saveButtonListener = new Clazz.com.attendance.widget.listener.AttendanceReimbursementSaveButton();
		this.cashAdvance = this.CookieAPI.getCashAdvance();
		this.ResetListUI();
	},

	bindUI : function(){
		var self = this;
		this.reNumberingList();	
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
		if (this.data !== null && this.data !== undefined){	
			self.calculateTotalCost();	
			$('.attendance-reimbursement-sub-content-detail .attendance-reimbursement-sub-content-detail-cash').text(0);
			self.calculateTotal();		
			$('.attendance-reimbursement-sub-content-detail').css("text-align", "right");
			$('.attendance-reimbursement-sub-content-detail').css("margin-left", "-23px");
		}
	},

	/**
	 * @author dhika_p
	 * function to reset list table
	 */
	ResetListUI : function(){
		$('.attendance-reimbursement-content-table').empty();
	},


	reNumberingList : function(){
		var number = 0;	
		$('.attendance-reimbursement-content-no .attendance-reimbursement-detail-content-text').empty();
		$('.attendance-reimbursement-ul').each(function(){
			$('.attendance-reimbursement-ul').eq(number).find('.attendance-reimbursement-content-no .attendance-reimbursement-detail-content-text').append(++number);
		});
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
			if(cash == "null"){cash = 0}
			var total = parseInt(sub) - parseInt(cash);
			$('.attendance-reimbursement-sub-content-detail .attendance-reimbursement-sub-content-detail-total').text((total+"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		}
	},

	/**
	 * @author dhika_p
	 * function to calculate total cost
	 */
	calculateTotalCost : function(){
		var self = this;
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
	
	insertComma : function(data){
		for(var index in data){
			data[index].cost = data[index].cost.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			data[index].quantity = data[index].quantity.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}
	},
});
