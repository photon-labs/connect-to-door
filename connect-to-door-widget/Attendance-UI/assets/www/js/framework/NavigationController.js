// TODO: ongoing work
Clazz.NavigationController = Clazz.extend(
	Clazz.Base,
	{
		stack: [],
		indexMapping : {},

		isNative : false,
		isUsingAnimation : true,
		
		// used in single page single div or multi divs scenario
		mainContainer : null,
		currentIndex: -1,
		
		// unless there are two DIVs, only GoingIn animation is used
		pushAnimationTypeForGoingIn: null,
		pushAnimationTypeForGoingOut: null,
		
		popAnimationTypeForGoingIn: null,
		popAnimationTypeForGoingOut: null,
		
		jQueryContainer : null,
		
		initialize : function(config) {
			this.mainContainer = config.mainContainer;
			this.jQueryContainer = $(this.mainContainer);
		
			this.pushAnimationTypeForGoingIn = Clazz.ANIMATION_TYPE.FADE_IN;
			this.pushAnimationTypeForGoingOut = Clazz.ANIMATION_TYPE.SLIDE_LEFT;
			
			this.popAnimationTypeForGoingIn = Clazz.ANIMATION_TYPE.SLIDE_RIGHT;
			this.popAnimationTypeForGoingOut = Clazz.ANIMATION_TYPE.FADE_OUT;
		},
		
		pop : function(goBack) {
			if(goBack == null) {
				goBack = true;
			}
			
			var self = this;
			var page = this.stack.pop();
			
			var animationProviderMain = new Clazz.AnimationProvider( {
				isNative: self.isNative,
				container: page.element
			});
			
			if(!self.isNative){
				animationProviderMain.animate(this.popAnimationTypeForGoingOut, function(container) {
					container.remove();
					page = null;
					delete page;
				});
			} else {
				page.element.remove();
				page = null;
				delete page;
			}
			
			if(this.stack.length > 0) {
				var topPage = this.stack[this.stack.length-1];
				topPage.element.show();
				
				var animationProviderSub = new Clazz.AnimationProvider( {
					isNative: self.isNative,
					container: topPage.element
				});
					
				// call in transition on sub
				animationProviderSub.animate(this.popAnimationTypeForGoingIn, function(container) {
					container.css("z-index", 4);
					
					if(goBack) {
						history.back();
					}
					self.currentIndex = self.stack.length - 1;
				});
			}
		},
		
		push : function(view) {
			var self = this;
			
			// create top element for pushing
			var newDiv = $("<div></div>");
			
			// add absolute positioning
			newDiv.addClass("navigation-controler");
			
			self.jQueryContainer.append(newDiv);
		
			view.doMore = function(element) {
				if(self.stack.length > 0 && !self.isNative) {
					var topPage = self.stack[self.stack.length-1];
					
					// call onPause to save the state of this page
					topPage.view.onPause();
					
					var animationProviderSub = new Clazz.AnimationProvider( {
						isNative: self.isNative,
						container: topPage.element
					});
				
					 animationProviderSub.animate(self.pushAnimationTypeForGoingOut, function(container) {
						 container.hide();
						 container.css("z-index", 3);
					 });
				}
				
				var animationProviderMain = new Clazz.AnimationProvider( {
					isNative: self.isNative,
					container: newDiv
				});
				
				animationProviderMain.animate(self.pushAnimationTypeForGoingIn, function(container) {
					container.show();
					container.css("z-index", 4);
				});

				
				// update browser history
				var title = "#page" + self.stack.length;
				var name = view.name ? "#"  + view.name : title;
				
				// push into the stack
				var data = {
					view : view,
					element : newDiv
				};
				
				self.stack.push(data);
				self.currentIndex = self.stack.length - 1;
				self.indexMapping[name] = self.stack.length - 1;
				history.pushState({}, name, name);
			};
			
			// render in its default container
			view.render(newDiv);
		},
		
		getView: function(locationHash) {
			var index = this.indexMapping[locationHash];
				
			if(index != null) {
				var page = this.stack[index];
				
				if(this.currentIndex > index) {
					for(var i = this.currentIndex; i > index; i--) {
						var current = this.stack[i];
						
						// delete the mapping
						// update browser history
						var title = "#page" + i;
						var name = current.view.name ? "#"  + current.view.name : title;
						delete this.indexMapping[name];
						this.pop(false);
					}
				} 
				
				// call on resume on the current page
				page.view.onResume();
			} 
		}
	}
);

