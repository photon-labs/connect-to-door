Clazz.createPackage("com.attendance.widget.listener");

Clazz.com.attendance.widget.listener.DropDownControllerListener = Clazz.extend(Clazz.Widget, {

	/**
	 * @author dede_pu
	 * function to mask select drop down
	 */
	dropDownSelectController : function(dropDownContent){
		dropDownContent.slideUp('500');
		
	},
	
	/**
	 * @author dede_pu
	 * function to drop down
	 */
	dropDownController : function(dropDownContent, event){
		dropDownContent.stop(true, true).slideToggle('500');
		$(document).one('click', function() {
			dropDownContent.slideUp('500');
		});
		event.stopPropagation();
	},
	
	/**
	 * @author dede_pu
	 * function to mask select drop down
	 */
	dropDownSelectControllerLargeScreen : function(dropDownContent){
		dropDownContent.slideUp('500');
		
	},
	
	/**
	 * @author dede_pu
	 * function to drop down
	 */
	dropDownControllerLargeScreen : function(dropDownContent, event){
		dropDownContent.stop(true, true).slideToggle('500');
		$(document).one('click', function() {
			dropDownContent.slideUp('500');
		});
		event.stopPropagation();

	},

});