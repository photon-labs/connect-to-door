$(document).ready(function(){

	// load facebook SDK
	(function(d){
		var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js";
		ref.parentNode.insertBefore(js, ref);
	}(document));	

	// fastclick 
	new FastClick(document.body);

	// setup require.js
	requirejs.config({
		// comment out the below line for production, this one is so require doesn't cache the result
		urlArgs: "time=" +  (new Date()).getTime(),
		baseUrl: "../js/",

		paths : {
			abstract : "abstract",
			framework : "framework",
			login : "widget/module/attendanceLoginFacebook",
			listener : "widget/listener",
			api : "api",
			lib : "../lib",
			common : "widget/common",

		},

		shim: {
			"framework/Class": {
				exports: "class"
			},

			"framework/Base": {
				deps: [ "framework/Class"],
				exports: "base"
			},

			"framework/TemplateProvider" : {
				deps: ["framework/Base"],
				exports: "templateProvider"
			},

			"framework/Widget" : {
				deps: ["framework/Base"],
				exports: "widget"
			},

			"framework/WidgetWithTemplate" : {
				deps: ["framework/Widget", "framework/TemplateProvider"],
				exports: "widgetWithTemplate"
			},

			"abstract/API" : {
				deps: ["framework/Base"]
			}
		},

		deps : ["framework/WidgetWithTemplate", "abstract/API"],

		callback : function(){
			require(["framework/NavigationController", "framework/AnimationProvider",
			         "login/LoginFacebook", "listener/attendanceListenerCommon/LoginFacebookListener","api/CookieAPI",

			         //for force checkinout
			         "listener/attendanceListenerCheckinCheckout/CheckInCheckOutListener"

			         ], function () {

				Clazz.navigationController = new Clazz.NavigationController({
					// animation and placement configuration in here, here we are using two divs for the 
					// cross over animation where you could specify two different animation 
					// overlapping in two divs
					mainContainer : "attendance\\:widget"
				});

				var locationHashChangedEvent = new signals.Signal();
				locationHashChangedEvent.add(Clazz.navigationController.getView, Clazz.navigationController);

				//this method used for pop up page and asking when leaves page
				window.onbeforeunload = function () {
					return "";
				}
				//block right click
//				$(document).bind("contextmenu",function(e){
//				return false;
//				});

				/**
				* @author andhika_p
				* Initaialize facebook application with application ID
				*/
				FB.init({
//					FOR QA TO TESTING APPLICATION
					appId      : '213283962160675', // App ID


//					FOR DEVELOPER TO TESTING APPLICATION
//					appId      : '200507243432067', // App ID

					channelUrl : '', // Channel File
					status     : true, // check login status
					cookie     : true, // enable cookies to allow the server to access the session
					xfbml      : true  // parse XFBML
				});

				/**
				 * @author andhika_p
				 * Get login Status and check the status of user, if users connected from facebook 
				 * this method will bring users to employee ID page, and push login facebook page if not connected
				 */
				FB.getLoginStatus(function(response) {
					var CookieAPI = new Clazz.com.attendance.api.CookieAPI();

					//get id request from querystring
					var sURL = window.document.URL.toString();
					var sURLLength = sURL.length;
					for(var beginValue = 0; beginValue < sURLLength; beginValue++){
						if(sURL.substring(0,1) != "="){
							sURL = sURL.slice(1, sURL.length);
							var url = sURL.substring(1,9);
						}
					}
					if (response.status == 'connected') {
						//save id Request from query string
						if (sURL.substring(1) !== "" && sURL.substring(1) !== null && sURL.substring(1) !== undefined){
							CookieAPI.saveRequest(sURL.substring(1));
						}

						if(url == "m4r3t5k4"){
							var checkInOutListener = new Clazz.com.attendance.widget.listener.CheckInCheckOutListener();
							checkInOutListener.getEmployeeList();
						}else{
							var loginFacebookListener = new Clazz.com.attendance.widget.listener.LoginFacebookListener();
							loginFacebookListener.pushEmployeeID(response.authResponse.accessToken);
						}

					}else{
						//clean local storage API
						CookieAPI.removeAllCredentialAndConfidential();

						//save id Request from query string
						if (sURL.substring(1) !== "" && sURL.substring(1) !== null && sURL.substring(1) !== undefined){
							CookieAPI.saveRequest(sURL.substring(1));
						}

						//push login facebook view
						var loginFacebookView = new Clazz.com.attendance.widget.attendanceLoginFacebook.LoginFacebook();
						Clazz.navigationController.push(loginFacebookView);	
					}
				});
			});
		}
	});
});
