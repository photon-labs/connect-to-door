Clazz.createPackage("com.attendance.widget.listener");

Clazz.com.attendance.widget.listener.DeleteListener = Clazz.extend(Clazz.Widget, {
	statusEdit : true,
	statusCreate : true,
	DeleteListener:null,

	initialize : function(){
		this.DeleteListener = new Clazz.com.attendance.widget.listener.DeleteListener();
	},

	buttonEditAcc:function(){
	},

	buttonSearch:function(){
	},	
	
	//check search input text when empty
	checkSearchInputText : function(modeSearch){},


});
