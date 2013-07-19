Clazz.createPackage("com.attendance.widget.module.checkInCheckOut");                                                   

Clazz.com.attendance.widget.module.checkInCheckOut.AttendanceCheckInCheckout = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceCheckInCheckOut/attendanceCheckInCheckOut.tmp",                              
	name : "force_checkinout",                                                                                         

	dropDownListener : null,                                                                                           
	filterPanelListener : null,                                                                                        
	listFilterPanel : null,                                                                                            
	CheckIn : "checkIn",                                                                                               
	CheckOut :"checkOut",                                                                                              
	dataEmployee : null,   
	checkInoutListener : null,
	listEmployeeArray : null,
	listDataEmployeeArray : null,
	mask : null,
	forceUpdateCheckInOutListener : null,


	initialize : function(config){
		var self = this;
		require(["widget/common/AttendanceMask", "widget/listener/attendanceListenerCheckinCheckout/ForceCheckInOutListener"],function(){
			self.mask = new Clazz.com.attendance.widget.common.AttendanceMask();
			self.forceUpdateCheckInOutListener = new Clazz.com.attendance.widget.listener.ForceCheckInOutListener();
		});	

		this.listEmployeeArray = config.listEmployeeArray;
		this.listDataEmployeeArray = config.listDataEmployeeArray;
	},                                                                                                                 

	bindUI : function(){                                                                                               
		var self = this;                                                                                               
		$(".content-dd").hide();                                                                                       
		this.doAutoComplete();
		this.datepickerController();                                                                                   
		this.timepickerController();                                                                                   
		$(".attendance-form-button-save").click(function(){                                                            
			self.updateCheckInOut();                                                                                   
		});                                                                                                            
	},                                                                                                                 


	timepickerController : function(){                                                                                 
		$(".attendance-list-time-start").timepicker();                                                                 
		$(".attendance-list-time-end").timepicker();                                                                   
	},                                                                                                                 

	datepickerController : function(){                                                                                 
		var currentDate = this.getCurrentDate();                                                                       

		$( ".attendance-list-date-start" ).datepicker({                                                                
			maxDate : currentDate,                                                                                     
			dateFormat : "dd/mm/yy",                                                                                   
			onClose: function( selectedDate ) {                                                                        
				if (selectedDate !== "" && selectedDate !== null ){                                                    
					$(".attendance-list-date-start ").removeClass("highlight-list-date");                              
					var selectedDate = $(".attendance-list-date-start ").val();                                        
					$(".attendance-list-date-until").val(selectedDate);                                                
				}                                                                                                      
			}                                                                                                          
		});                                                                                                            

		$(".attendance-list-date-start").click(function(){                                                             
			$( ".date-from-content .ui-datepicker-trigger").click();                                                   
		});                                                                                                            
	},                                                                                                                 

	getCurrentDate: function(){                                                                                        
		var d = new Date();                                                                                            
		var curr_date = d.getDate();                                                                                   
		var curr_month = d.getMonth()+1;                                                                               
		var curr_year = d.getFullYear();                                                                               

		return (curr_date +'/'+curr_month+'/'+curr_year);                                                              
	},

	doAutoComplete : function(){ 
		$(".attendance-search-input-text-checkinout").autocomplete({
			source: this.listEmployeeArray,
			autoFocus : false,
			minLength: 3
		});

//		$(".attendance-search-input-text-checkinout").suggest(this.listEmployeeArray, {
//		suggestionColor   : '#cccccc',
//		moreIndicatorClass: 'suggest-more',
//		moreIndicatorText : '&hellip;'
//		});

	},                                                                                                                  

	updateCheckInOut : function(){
		var self = this;
		var date = $(".attendance-list-date-start").val();                                                             
		var timeCheckIn = $(".attendance-list-time-start").val();                                                      
		var timeCheckOut = $(".attendance-list-time-end").val();                                                       
		var name = $(".attendance-search-input-text-checkinout").val();                                                           
		if(date == "" && timeCheckIn == "" && timeCheckOut == "" && name == ""){                                       
			alert("Please fill the data");                                                                             
		}                                                                                                              
		else if(date == "" ){                                                                                          
			alert("Please fill the date column");                                                                      
		}                                                                                                              
		else if(timeCheckIn == "" ){                                                                                   
			alert("Please fill the time check in column");                                                             
		}                                                                                                              
		else if(timeCheckOut == "" ){                                                                                  
			alert("Please fill the time check out column");                                                            
		}                                                                                                              
		else if(name == "" ){                                                                                          
			alert("Please fill the name column");                                                                      
		}                                                                                                              
		else{
			this.mask.showMask();
			var day = date.substring(0,2);
			var month = date.substring(3,5);
			var year = date.substring(6,10);
			var dateCheckIn = year+"-"+month+"-"+day+" "+timeCheckIn;
			var dateCheckOut = year+"-"+month+"-"+day+" "+timeCheckOut;
			var dateEdit =year+month+day;

			for ( var i = 0; i < this.listDataEmployeeArray.length; i++) {
				if(name == this.listDataEmployeeArray[i].employee_name){
					var EmployeeID = this.listDataEmployeeArray[i].employee_id;
					break;
				}
			}
			this.forceUpdateCheckInOutListener.updatingCheckInOut(EmployeeID,dateCheckIn,dateEdit,dateCheckOut, function(response){
				if(response.status == "success"){
					$(".attendance-list-date-start").val("");                                                             
					$(".attendance-list-time-start").val("");                                                      
					$(".attendance-list-time-end").val("");                                                       
					$(".attendance-search-input-text-checkinout").val("");
					$(".attendance-list-date-until").val("");

					alert(response.status);

					function onConfirmBrowser(text){
						var button = window.confirm(text);
						if(button==true){
							FB.logout(function(response) {
								// user is now logged out
							});
							var win = window.open("","_self"); /* url = "" or "about:blank"; target="_self" */
							win.close();

						}
						self.mask.removeMask();
					}
					onConfirmBrowser("Do You want to process and log out? press cancel to continue input data");
				}else{
					alert(response.message);
					self.mask.removeMask();
				}
			});

			
		}
	}                                                                                                                  
});                                                                                                                    