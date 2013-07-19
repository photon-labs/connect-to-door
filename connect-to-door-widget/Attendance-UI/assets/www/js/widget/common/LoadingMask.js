Clazz.createPackage("com.attendance.widget.common");

Clazz.com.attendance.widget.common.LoadingMask = Clazz.extend(Clazz.Widget, {
	mainContent : null,

	initialize : function(config){
	},

	/**
	 * @author andhika_p
	 * This method is used to get customize loading layout.
	 * @returns mainContent is main layout that contain loading screen and image.
	 */
	getWidgetContent : function() {
		this.mainContent = $('<div class="avs-loading-main"></div>');
		var loadingImage = $('<div class="avs-loading-image"></div>');
		this.mainContent.append(loadingImage);
		return this.mainContent;
	},

	/**
	 * @author andhika_p
	 * remove customize loading layout.
	 */
	removeLoading : function() {
		var self = this;
		$('.avs-loading-mask-main').remove();
	},

	/**
	 * @author andhika_p
	 * show customize loading layout.
	 */
	showLoading: function(statusIdle){
		var self = this;
		var maskMain = $('div.avs-loading-mask-main');
		if(maskMain.length == 0) {
			maskMain = $('<div class="avs-loading-mask-main"></div>');
			maskMain.append(this.getWidgetContent());
			//append loading on main container
			$(".attendance-dom").append(maskMain);
		} 
		maskMain.show();
	},

	/**
	 * @author andhika_p
	 * Refer to Widget.js
	 */
	renderUI : function() {
		return this.getWidgetContent();
	}
});
