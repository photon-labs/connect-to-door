Clazz.createPackage("com.attendance.widget.listener");

Clazz.com.attendance.widget.listener.PrintReimbursementCompleteListener = Clazz.extend(Clazz.Widget, {
	
	/**
	 * @author dede_pu
	 * function to print page
	 */
	printReimbursementComplete : function() {
		window.print();
	},

});
