Clazz.createPackage("com.attendance.widget.module.request");
Clazz.com.attendance.widget.module.request.SubmittedBySignature = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceRequest/attendanceRequestSubmittedBy.tmp",
	name : "attendanceRequestSubmittedBy",
	defaultContainer : "request\\:submitted-by",
	voucherStatus : null,
	CookieAPI : null,
	employeeSignature : null,
	readInputListener : null,
	/**
	 * @author andhika_p
	 * initialize construct object and fill data
	 */
	initialize : function(config){
		var self = this;
		this.voucherStatus = config.voucherStatus;
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		this.readInputListener = new Clazz.com.attendance.widget.listener.ReadInputListener();
		
		//get voucher status
		var idRequest = this.CookieAPI.getRequest();
		if (idRequest !== "" && idRequest !== null && idRequest !== undefined){
			self.employeeSignature = config.employeeSignature;
		}
		this.selectUIByvoucherStatus();
	},

	bindUI: function(){
		var self = this;
		if (this.employeeSignature !== null){
			$(".attendance-request-submitted-by-signature").css("background-image","url('"+ self.employeeSignature +"')");
			$(".attendance-request-submitted-by-signature").css("background-size", "contain");
		}
		this.marginController();
		this.pushSignatureImage();
	},

	/**
	 * @author andhika_p
	 * this method used for select ui with handlebars, when voucher status is "build" or etc
	 * this method 
	 */
	selectUIByvoucherStatus : function(){
		var self = this;
		require(["lib/handlebars-1.0.0.beta.6"],function(){
			Handlebars.registerHelper('if-status-build',function(opt){
				if(self.employeeSignature !== null){
					return opt.fn(this);
				}
			});
		});
	},

	/**
	 * @author andhika_p
	 * change position of this template if condition of voucher status changed
	 */
	marginController : function(){
		if(this.employeeSignature == null){
			$(".attendance-request-submitted-by").css("margin-top","113px")
		}
		else{
			$(".attendance-request-submitted-by").css("margin-top","80px")

		}
	},

	/**
	 * @author andhika_p
	 * this method used for push image to the template and save status Admin signature 
	 * to local storage with "true" status
	 */
	pushSignatureImage : function(){
		var self = this;
		$('.attendance-request-submitted-by-insert-button').click(function(){
			$('.attendance-request-submitted-by-insert-button').remove();
			self.readInputListener.getSignatureFromAPI();
		});
	},

	getImageSignature : function(url){
		$('.attendance-request-submitted-by-insert-button').remove();
		$('.attendance-request-submitted-by-alert').remove();		
		$(".attendance-request-submitted-by-signature").css("background-image","url('"+ url +"')");
		$(".attendance-request-submitted-by-signature").css("background-size","contain");
	},
	
});