Clazz.createPackage("com.attendance.abstract");

Clazz.com.attendance.abstract.API = Clazz.extend(Clazz.Base,{

//	pc bowo
//	apiHost: "192.168.2.216",
	
//	pc ade
//	apiHost: "192.168.2.145",
	
//	pc bowo
//	apiHost: "192.168.2.241",
	
	
	apiHost: "172.17.10.165",
	
	apiPort: "8080",
	
	initialize : function(config) {
		this.config = config;
		this.url = "http://" + this.apiHost + ":" + this.apiPort + "/AttendanceWebService/api";
	},

	ajaxPostRequest : function(module, postBody, callbackFunction) {
		console.log("MODULE === "+module);
		console.log("POST BODY === "+JSON.stringify(postBody));
		var url = this.url;
		$.ajax({
			url : url+module,
			data : JSON.stringify(postBody),
			contentType: 'application/json',
			header : {
				'Access-Control-Allow-Headers' : 'x-requested-with',
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			type : "POST",
			dataType : "json",

			success : function(response, e ,xhr) {
				if(callbackFunction !== null) {
					callbackFunction(response);
				}
			},

			error : function(jqXHR, textStatus, errorThrown) {
				var errorJSON = {"status":"error", "message" : "Service not found"};
				//check if status of ajax request is not abort and then call callbackfunction
				if(callbackFunction !== null && !jqXHR.statusText !== null) {
					callbackFunction(errorJSON);
				}
			}
		});
	},

});
