Clazz.createPackage("com.attendance.widget.module.request");
Clazz.com.attendance.widget.module.request.RequestItemInput = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceRequest/attendanceRequestItemInput.tmp",
	name : "attendanceRequestItemInput",
	defaultContainer : "request\\:item-input",

	data : {},

	//listener
	ReadInputListener : null,
	dropDownControllerListener : null,
	
	initialize : function(config){
		this.dropDownControllerListener = new Clazz.com.attendance.widget.listener.DropDownControllerListener();
		this.ReadInputListener = new Clazz.com.attendance.widget.listener.ReadInputListener();
		this.data = this.ReadInputListener.dataSample;
	},

	bindUI: function(){
		var self = this;
		this.dropDownCurrencyController();
		this.showHideDropdownUI();
		this.validateQuantityAndCOstInput();
		$('.attendance-request-item-input-save-button').click(function(){
			self.ReadInputListener.readInput();
		});

	},
	
	/**
	 * @author dede_pu
	 * set dropdown selector name
	 */
	dropDownCurrencyController : function(){
		var self = this;
		var dropDownContentItem = $(".request-approval-dropdown-currency-item");
		var dropDownValue = $('.request-currency-by-value');
		var dropDownValueButton = $('.request-currency-by-value, .type-currency-arrow');
		var dropDownContent = $('.request-approval-dropdown-currency');
		dropDownContent.hide();
		
		dropDownValueButton.click(function(event){
			$('.request-list-detail-content-no,.request-list-detail-content-request,.request-list-detail-content-description,.request-list-detail-content-quantity,.request-list-detail-content-cost').removeClass('request-list-highlight');
			$('.attendance-request-dd-item-input').slideUp();
			$('.request-approval-dropdown-content').slideUp();
			self.dropDownControllerListener.dropDownController(dropDownContent, event);
		});
		
		dropDownContentItem.click(function(){
			self.dropDownControllerListener.dropDownSelectController(dropDownContent);
			var value = $(this).text();
			dropDownValue.text(value);
		});
	},
	
	/**
	 * @author andhika_p
	 * this method used for show and hide dropdown in template
	 */
	showHideDropdownUI : function(){
		var self = this;
		var dropDownContentItem = $(".dd-type-list-item-text");
		var dropDownValue = $('.type-text-value');
		var dropDownValueButton = $(".type-text-value, .type-down-arrow");
		var dropDownContent = $('.attendance-request-dd-item-input');
		dropDownContent.hide();
		
		dropDownValueButton.click(function(event){
			$('.request-approval-dropdown-content').slideUp();
			$('.request-approval-dropdown-currency').slideUp();
			self.dropDownControllerListener.dropDownController(dropDownContent, event);
		});
		
		dropDownContentItem.click(function(){
			self.dropDownControllerListener.dropDownSelectController(dropDownContent);
			var value = $(this).text();
			dropDownValue.text(value);
		});
		
	},
	
	/**
	 * @author andhika_p
	 * function to validate key press on quantity input and cost input.
	 */
	validateQuantityAndCOstInput : function(){
		var inputQuantity = $(".attendance-request-item-input-quantity-value .request-by-value");
		var inputCost = $(".attendance-request-item-input-cost-value .request-by-value");
		var self = this;
		var backspace = 8;
		var deleteButton = 46;
		var leftArrow = 37;
		var tab = 9;
		var zero = 48;
		var nine = 57;
		var space = 32;
		var dot = 46;

		inputQuantity.keypress(function(event){
			var backspace = 8;
			var deleteButton = 46;
			var leftArrow = 37;
			var tab = 9;
			var zero = 48;
			var nine = 57;
			var dot = 46;
			var percent = 37;
			var charcode = event ? event.which : event.keyCode;
			if (charcode == percent || charcode == dot){
				return false;
			}
			else if(charcode == backspace || charcode == deleteButton || charcode == leftArrow || charcode == tab){
				return true;
			}
			else if(charcode < zero || charcode > nine){
				return false;
			}
			else{
				return true;
			}
		});

		inputCost.keypress(function(event){
			var backspace = 8;
			var deleteButton = 46;
			var leftArrow = 37;
			var tab = 9;
			var zero = 48;
			var nine = 57;
			var dot = 46;
			var percent = 37;
			var charcode = event ? event.which : event.keyCode;
			if (charcode == percent || charcode == dot){
				return false;
			}
			else if(charcode == backspace || charcode == deleteButton || charcode == leftArrow || charcode == tab){
				return true;
			}
			else if(charcode < zero || charcode > nine){
				return false;
			}
			else{
				return true;
			}
		});
	},

});