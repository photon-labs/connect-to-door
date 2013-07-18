Clazz.createPackage("com.attendance.widget.listener");
Clazz.com.attendance.widget.listener.SelectedListListener = Clazz.extend(Clazz.Widget, {
	indexList : null,
	CookieAPI : null,
	ReadInputListener : null ,

	initialize : function(config){
		this.CookieAPI = new Clazz.com.attendance.api.CookieAPI();
	},

	/**
	 * @author andhika_p
	 * check index when remove list item
	 */
	removeItemList : function(){
		var statusEditList = this.CookieAPI.getStatusEditRequestList();
		this.indexList = this.CookieAPI.getIndexSelectedItemList();
		if(this.indexList != "" && this.indexList != null){
			this.removeItem(statusEditList,this.indexList);
			if($('.attendance-ul-request').eq(0).find('.request-list-detail-content-request .attendance-list-detail-content-text').text()== ""){
				$('.request-currency-by-value').text("");
				$('.request-currency-mask').css("visibility","hidden");
				$(".request-list-detail-footer-sum .text-rp").text("");
			}
		}

	},

	/**
	 * @author andhika_p
	 * remove list item and update cost total
	 */
	removeItem : function(statusEditList,indexSelected){
		if(statusEditList == "false" || statusEditList == null){
			var minusQuantity = $('.attendance-ul-request').eq(indexSelected).find('.request-list-detail-content-quantity .attendance-list-detail-content-text').text();
			var minusCost = $('.attendance-ul-request').eq(indexSelected).find('.request-list-detail-content-cost .attendance-list-detail-content-text').text();
			$('.request-list-detail-content-no .attendance-list-detail-content-text').empty();
			$('.attendance-ul-request').eq(indexSelected).remove();
			//re-numbering list
			var i = 0;	
			$('.attendance-ul-request').each(function(){
				$('.attendance-ul-request').eq(i).find('.request-list-detail-content-no .attendance-list-detail-content-text').append(++i +'.');
			});

			this.CookieAPI.saveIndexSelectedItem("");

			//minus cost
			totalCost = $(".request-list-detail-footer-sum .attendance-list-detail-footer-text").text();
			var totalMinus =  parseInt(minusCost.replace(/,/g, '')) * parseInt( minusQuantity );
			totalCost = parseInt(totalCost.replace(/,/g, '')) - totalMinus;
			//update cost
			$(".request-list-detail-footer-sum .attendance-list-detail-footer-text").text((totalCost+"").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
		}

	},

	/**
	 * @author andhika_p
	 * edit list item and set local storage API to mode edit
	 */
	editList : function(){
		var self = this ;
		this.indexList = this.CookieAPI.getIndexSelectedItemList();
		if (this.indexList !== null && this.indexList !== ""){
			var request= $('.attendance-ul-request').eq(this.indexList).find('.request-list-detail-content-request .attendance-list-detail-content-text').text();
			var desc= $('.attendance-ul-request').eq(this.indexList).find('.request-list-detail-content-description .attendance-list-detail-content-text').text();
			var quantity= $('.attendance-ul-request').eq(this.indexList).find('.request-list-detail-content-quantity .attendance-list-detail-content-text').text();
			var cost= $('.attendance-ul-request').eq(this.indexList).find('.request-list-detail-content-cost .attendance-list-detail-content-text').text();


			$('.type-text-value').removeClass("request-alert-input-type-box");
			$('.attendance-request-item-input-description-value .request-by-value').removeClass("request-alert-input-long-box");
			$('.attendance-request-item-input-quantity-value .request-by-value').removeClass("request-alert-input-long-box");
			$('.attendance-request-item-input-cost-value .request-by-value').removeClass("request-alert-input-long-box");
			$('.attendance-request-item-input-currency-value .request-currency-by-value').removeClass("request-alert-input-currency-box");			
			$('.type-text-value').text(request);
			$('.attendance-request-item-input-description-value .request-by-value').val(desc);
			$('.attendance-request-item-input-quantity-value .request-by-value').val(quantity);
			$('.attendance-request-item-input-cost-value .request-by-value').val(cost.replace(/,|\s/g, ''));

			//save status edit
			self.CookieAPI.saveStatusEditRequestList("true");
		}
	},

	/**
	 * @author andhika_p
	 * renumbering list
	 */
	reNumberingList : function(){
		var number = 0;	
		$('.request-list-detail-content-no .attendance-list-detail-content-text').empty();
		$('.attendance-ul-request').each(function(){
			$('.attendance-ul-request').eq(number).find('.request-list-detail-content-no .attendance-list-detail-content-text').append(++number +'.');
		});
	},

});