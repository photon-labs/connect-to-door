Clazz.createPackage("com.attendance.widget.common");

Clazz.com.attendance.widget.common.PrintDataIntoCsv = Clazz.extend(Clazz.Widget, {

	print : function(objArray){
		
		var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

		var str = '';

		for (var i = 0; i < array.length; i++) {
			var line = '';

			for (var index in array[i]) {
				line += array[i][index] + ',';
			}

			line.slice(0,line.Length-1); 

			str += line + '\r\n';
		}
		window.open( "data:text/csv;charset=utf-8," + escape(str))
	}
	
});