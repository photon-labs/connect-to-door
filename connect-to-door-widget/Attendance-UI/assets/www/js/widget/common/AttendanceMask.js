Clazz.createPackage("com.attendance.widget.common");

Clazz.com.attendance.widget.common.AttendanceMask = Clazz.extend(Clazz.Widget, {
	mainContent : null,


	/**
	 * @author andhika_p
	 * to get customize mask layout.
	 * @returns mainContent is main layout that contain mask screen and image.
	 */
	getWidgetContent : function() {
		this.mainContent = $('<div class="avs-mask-main-load"></div>');
		return this.mainContent;
	},

	/**
	 * @author andhika_p
	 * to remove customize mask layout.
	 */
	removeMask : function() {
		$('.avs-mask-load').remove();
	},

	/**
	 * @author andhika_p
	 * to show customize mask layout.
	 */
	showMask: function(){
		var maskLoad = $('div.avs-mask-load');
		if(maskLoad.length == 0) {
			maskLoad = $('<div class="avs-mask-load"></div>');
			maskLoad.append(this.getWidgetContent());
			//append loading on main container
			$(".attendance-dom").append(maskLoad);
		} 

		maskLoad.show();

	},

	/**
	 * @author andhika_p
	 * Refer to Widget.js
	 */
	renderUI : function() {
		return this.getWidgetContent();
	}
});