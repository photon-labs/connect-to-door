Clazz.createPackage("com.attendance.widget.module.profile");
Clazz.com.attendance.widget.module.profile.PersonInformation = Clazz.extend(Clazz.WidgetWithTemplate, {
	templateUrl  : "../template/attendanceProfile/personInformation.tmp",
	defaultContainer : 'attendance\\:person-information',

	//listener
	imageFacebookListener : null,
	personInformationListener : null,
	
	//local storage
	CookieAPI : null,

	data : {},
	
	/**
	 * @author andhika_p
	 * initialize construct object
	 */
	initialize : function(config){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
		
		//get person information from API
		this.personInformationListener = new Clazz.com.attendance.widget.listener.PersonInformationListener();
		
	},

	bindUI : function(){
		this.GetImageFacebook();
		this.personInformationListener.getPersonInformationFromAPI();
	},
	
	/**
	 * @author andhika_p
	 * this method used to get image from facebook API
	 */
	GetImageFacebook : function(){
		var usernameFacebook = this.CookieAPI.getUsernameFB();
		$('.attendance-image-profile').css("background-image","url('http://graph.facebook.com/"+usernameFacebook+"/picture?type=normal')");
	},

	getPersonInformation : function(data){
		$('.attendance-profile-title-name .attendance-font-14-white-value').text(data.name);
		$('.attendance-profile-title-employee-id .attendance-font-14-white-value').text(data.employeeID);
		$('.attendance-profile-title-project-id .attendance-font-14-white-value').text(data.projectID);
		$('.attendance-profile-title-position .attendance-font-14-white-value').text(data.position);
		$('.attendance-profile-title-start-working .attendance-font-14-white-value').text(data.startWorking);
		$('.attendance-profile-title-email-address .attendance-font-14-white-value').text(data.emailAddress);
		
		$('.attendance-line-text-annual-leave .attendance-font-20-black-value').text(data.annual);
		$('.attendance-line-text-coff .attendance-font-20-black-value').text(data.coff);
		$('.attendance-line-text-condolences .attendance-font-20-black-value').text(data.condolences);
		$('.attendance-line-text-married .attendance-font-20-black-value').text(data.married);
		$('.attendance-line-text-maternity .attendance-font-20-black-value').text(data.maternity);
		$('.attendance-line-text-paternity .attendance-font-20-black-value').text(data.paternity);
		$('.attendance-line-text-onsite .attendance-font-20-black-value').text(data.onSite);
		$('.attendance-line-text-sick .attendance-font-20-black-value').text(data.sick);
	},

});