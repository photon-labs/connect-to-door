Clazz.createPackage("com.attendance.widget.module.attendanceReimbursement");

Clazz.com.attendance.widget.module.attendanceReimbursement.AttendanceReimbursementItemized = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl: "../template/attendanceReimbursement/attendanceReimbursementItemized.tmp",
	attendanceReimbursementSaveButtonListener:null,
	/**
	 * @author dhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		this.attendanceReimbursementSaveButtonListener = new Clazz.com.attendance.widget.listener.AttendanceReimbursementSaveButton();
	},

	bindUI : function(){
		this.setDatePicker();
		var self = this;
		$('.attendance-reimbursement-itemized-input-cash-advance').val("0");
		var quantity = $ ('.attendance-reimbursement-itemized-input-quantity');
		var cost = $ ('.attendance-reimbursement-itemized-input-cost');
		var cashAdvance = $('.attendance-reimbursement-itemized-input-cash-advance');		

		$('.attendance-reimbursement-itemized-input-description').attr("maxlength","30");
		$('.attendance-reimbursement-itemized-input-quantity').attr("maxlength","5");
		$('.attendance-reimbursement-itemized-input-cost').attr("maxlength","10");
		$('.attendance-reimbursement-itemized-input-cash-advance').attr("maxlength","10");	


		quantity.keypress(function(event){
			return(self.numberOnlyKeyPress(event));
		});

		cost.keypress(function(event){
			return(self.numberOnlyKeyPress(event));
		});

		cashAdvance.keypress(function(event){
			return(self.numberOnlyKeyPress(event));
		});

		$('.attendance-reimbursement-button-save').click(function(){
			self.attendanceReimbursementSaveButtonListener.onButtonSaveClick();
		});
		
		$('.attendance-reimbursement-itemized-right .ui-datepicker-trigger').click(function(){
			$('.reimbursement-approval-dropdown-content-build').slideUp();
			$('.attendance-reimbursement-dropdown-master-content').slideUp();
		});

	},
	
	/**
	 * @author dhika_p
	 * function to set datepicker
	 */
	setDatePicker : function(){
		var currentDate = this.getCurrentDate()
		$(".attendance-reimbursement-itemized-input-date").click(function(e){
			$('.attendance-reimbursement-itemized-right .ui-datepicker-trigger').click();
		});

		$('.attendance-reimbursement-itemized-input-date').attr("readonly",true);
		$( ".attendance-reimbursement-itemized-input-date").datepicker({
			showOn: "button",
			dateFormat: 'dd/mm/yy',
			buttonImage: "../images/icon_calendar_start-working.png",
			buttonImageOnly: true,
			maxDate : currentDate,
		});	
	},
	
	/**
	 * @author andhika_p
	 * get current date with dd/mm/yyyy format
	 */
	getCurrentDate: function(){
		var d = new Date();
		var curr_date = d.getDate();
		var curr_month = d.getMonth()+1;
		var curr_year = d.getFullYear();

		return (curr_date +'/'+curr_month+'/'+curr_year);
	},

	/**
	 * @author dhika_p
	 * function to number only key press
	 */
	numberOnlyKeyPress : function(event){
		var backspace = 8;
		var deleteButton = 46;
		var leftArrow = 37;
		var tab = 09;
		var zero = 48;
		var nine = 57;
		var dot = 46;
		var percent = 37;
		var charcode = event ? event.which : event.charCode;
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
	},
	// default container place
	defaultContainer : "attendance\\:reimbursement-itemized"	
});
