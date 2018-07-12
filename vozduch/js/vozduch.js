(function () {
	$(function() {	
		
		viewPortWidthDefiner();
		stickyHeader();
		featuresTitlePopupDisplayHide(document.querySelector('.features__title-popup'), document.querySelector('.features__title_dashed-text'));
		featuresTitlePopupDisplayHide(document.querySelector('.features__subtitle-popup'), document.querySelector('.features__subtitle-paragraph-note'));
		featuresTitlePopupDisplayHide(document.querySelector('.work-stages__popup'), document.querySelector('.work-stages__list-item:first-child .work-stages__list-item-title'));
		changeBackColor();
		highlightingDiaghramBlocks();
		getYearInFooter();
		animateFooterBlocks();

		$(window).resize(function(){
			viewPortWidthDefiner();			
		});		

		/*-------------------------
		--VIEWPORT WIDTH DEFINER---
		-------------------------*/
		var viewPortWidthType;
		function viewPortWidthDefiner() {
			if ($(window).width() > 1279) {
				viewPortWidthType = 'big';
			} else if (($(window).width() > 1023) && ($(window).width() < 1280)) {
				viewPortWidthType = 'medium';
			}	else {
				viewPortWidthType = 'min';
			}	
		}
		/*-----------------------------
		--VIEWPORT WIDTH DEFINER END---
		-----------------------------*/

		/*--------------------------
		-------STICKY HEADER--------
		--------------------------*/
		function stickyHeader() {
			var sticky = $('.header');
			var stickyHeight = sticky.height();
			var parentWidth = sticky.parent().width();

			if ($(window).scrollTop() > stickyHeight) {      
		    	sticky.addClass('header_fixed');
		    }
		    else {
		    	sticky.removeClass('header_fixed');
		    }

			sticky.width(parentWidth);
			$(window).scroll(function(){
		    if ($(window).scrollTop() > stickyHeight) {      
		    	sticky.addClass('header_fixed');
		    }
		    else {
		    	sticky.removeClass('header_fixed');
		    }
			});

			var resizeTimeout;
			$(window).resize(function(){
				resizeThrottler();
			});

			function resizeThrottler() {
		    // ignore resize events as long as an actualResizeHandler execution is in the queue
		    if ( !resizeTimeout ) {
		      resizeTimeout = setTimeout(function() {
		        resizeTimeout = null;
		        actualResizeHandler();
		     
		       // The actualResizeHandler will execute at a rate of 15fps
		       }, 100);
		    }
		  }	
		  
		  function actualResizeHandler() {
		    var parentWidth = sticky.parent().width();
		    sticky.width(parentWidth);
		  }
		}
		/*-----------------------------
		------STICKY HEADER END--------
		------------------------------*/
		

	  function getYearInFooter() {
	  	var currentYear = new Date().getFullYear();
	  	var footerSpanforYearInsertion = document.querySelector('.footer__copyright-text');
	  	    footerSpanforYearInsertion.innerHTML = '&copy; 2008—'+currentYear+' VZDH';
	  }

	  /*----------------------
	  ---POPUP DISPLAY HIDE---
	  ----------------------*/
	  function featuresTitlePopupDisplayHide(popUpBlock, trigger) {
	  	// hover event listener
	  		var clickTarget;
	  		var mouseTarget;
	  		var popUpBlockMouseover;
	  		var targetMouseOver;

	  		trigger.addEventListener('mouseover', function() {
	  		var target = event.target;
	  		
	  		if (viewPortWidthType == 'big') {
	  			if (target == this) {
	  				handler('add');
	  				mouseTarget = target;
	  				targetMouseOver = true;
	  			}	else {
	  				while (target != this) {
					    target = target.parentNode;
					    if (target == this) {
					    	handler('add');
					    	mouseTarget = target;
					    	targetMouseOver = true;
					    	break;
					  	}
					  }
					}
  			}

	  	});

	  	trigger.addEventListener('mouseout', function() {
	  		var target = event.target;
	  		var relatedTarget = event.relatedTarget;
	  		var returnMouseOut;
	  		
	  		if (viewPortWidthType == 'big') {
	  			if (!mouseTarget) return;
	  			if (target == popUpBlock && relatedTarget != trigger) {
	  				return;
	  			}
		  		if (relatedTarget) { // может быть relatedTarget = null
				    while (relatedTarget) {
				      // идём по цепочке родителей и проверяем,
				      // если переход внутрь currentElem - игнорируем это событие
				      if (relatedTarget == mouseTarget) return;
				      if (relatedTarget == document.body) {
				      	targetMouseOver = false;
				      	setTimeout(function(){
	    						if (popUpBlockMouseover) {
	    							return;
	    						} else {
	    							handler('remove');
	    						}
				      	}, 300); /*setTimeout end*/
				      }
				      if (!relatedTarget.classList[0]) return;
				      if (relatedTarget.classList[0] == popUpBlock.classList[0]) return;
				      relatedTarget = relatedTarget.parentNode;
				    }				    				    
				  }
				}
	  	});

	  	popUpBlock.addEventListener('mouseover', function() {
	  		if (viewPortWidthType == 'big') {
	  			popUpBlockMouseover = 1;
	  			targetMouseOver = false;
	  		}
	  	});

	  	popUpBlock.addEventListener('mouseout', function() {
	    	var target = event.target;
	    	var relatedTarget = event.relatedTarget;
	    	popUpBlockMouseover = 0;
	    	if (viewPortWidthType == 'big') {
		    	if (relatedTarget) { // может быть relatedTarget = null
				    while (relatedTarget) {
				      // идём по цепочке родителей и проверяем,
				      // если переход внутрь currentElem - игнорируем это событие
				      if (relatedTarget == trigger || relatedTarget == popUpBlock) return;
				      if (relatedTarget == document.body) {
				      	setTimeout(function(){
	    						if (targetMouseOver || popUpBlockMouseover) {
	    							return;
	    						} else {
	    							handler('remove');
	    						}
				      	}, 300); /*setTimeout end*/
				      	break;
				      };
				      relatedTarget = relatedTarget.parentNode;
				    }
					}
				}
	    });

	  	// click event listener
	  	trigger.addEventListener('click', function() {
	  		var target = event.target;
	  		
	  		if (viewPortWidthType == 'medium') {
	  			if (target == this) {
	  				clickTarget = target;
	  				handler('toggle');
	  			}	else {
	  				while (target != this) {
					    target = target.parentNode;
					    if (target == this) {
					    	clickTarget = target;
						    handler('toggle');
						    break;
					  	}
					  }
					}
  			}
	  	});

	  	document.body.addEventListener('click', function() {
	  		var target = event.target;
	  		
	  		if (viewPortWidthType == 'medium') {
	  			while (target != clickTarget) {
	  				if (target == popUpBlock) {
	  					return;
	  				}

	  				if (target == document.body) {
					    handler('remove');
					    break;
				  	}				    
				    target = target.parentNode;				    
					}					
  			}
	  	});

	  	// esc keyUp event listener
	  	document.addEventListener('keyup', function() {
	  		if (viewPortWidthType == 'medium' && event.keyCode == 27) {
	  			if (!clickTarget) return;
	  			target = clickTarget;	  			
					handler('remove');
				}
	  	});

	  	popUpBlock.addEventListener('transitionend',function() {
				if (!popUpBlock.classList.contains('popup_visible-no-transparent')) {
					popUpBlock.classList.remove('popup_visible-transparent');
				}
			});
	  		  	
	  	var newTargetClassName;
			function handler(addRemoveToggle){
				switch (addRemoveToggle) {					
				  case 'add':				  
				    popUpBlock.classList.add('popup_visible-transparent');
				    setTimeout(function() {
				    	popUpBlock.classList.add('popup_visible-no-transparent');
				    }, 20);
				    
				    break;
				  case 'remove':
				    popUpBlock.classList.remove('popup_visible-no-transparent');
				    break;
				  case 'toggle':
				    if (popUpBlock.classList.contains('popup_visible-transparent')){
				    	handler('remove');
				    } else {
				    	handler('add');
				    }
				    break;
				}				
	  	}
	  }

	  /*--------------------------
	  ---POPUP DISPLAY HIDE END---
	  --------------------------*/

	  /*---------------------
	  ---CHANGE BACK COLOR---
	  ---------------------*/
	  function changeBackColor() {
	  	var blockWithChangeBackColor = $('.expertise');
	  	var newTextColor = 'expertise_new-text-color';
	  	var trigger = $('.diagrams');
	  	var triggerTopCoord = trigger.offset().top;
	  	var newBack = $('.dark-blue-gradient-new-back');
	  	var windowScrollTop = $(window).scrollTop();
		  var viewportHeight = $(window).height();

		  newBackAddRemove(windowScrollTop, viewportHeight);

	  	$(window).scroll(function(){
	  		var windowScrollTop = $(window).scrollTop();
		  	var viewportHeight = $(window).height();

		  	newBackAddRemove(windowScrollTop, viewportHeight);
		  			  			  	
	  	});

	  	function newBackAddRemove(windowScrollTop, viewportHeight) {
		  		if ( windowScrollTop > (triggerTopCoord - (viewportHeight*0.75)) ) {
		  		newBack.addClass('dark-blue-gradient-new-back_no-transparent');
		  		blockWithChangeBackColor.addClass(newTextColor);
			  	} else {
			  		newBack.removeClass('dark-blue-gradient-new-back_no-transparent');
			  		blockWithChangeBackColor.removeClass(newTextColor);
			  	}
		  	}
	  	
	  }
	  /*-------------------------
	  ---CHANGE BACK COLOR END---
	  -------------------------*/

	  /*-------------------------------
	  ---HIGHLIGHTING DIAGRAM BLOCKS---
	  -------------------------------*/

	  function highlightingDiaghramBlocks() {
	  	var diagrams = document.querySelector('.diagrams .container');
	  	var diagramsListItems = diagrams.getElementsByTagName('li');
	  	var show;
	  	var e;	  	
	  	
	  	diagrams.addEventListener('mouseover', function(){
	  		e = event;
	  		if (viewPortWidthType == 'big') {
	  			show = true;
	  			mouseOverHandler(e);
	  		}		  		
	  	});

	  	diagrams.addEventListener('mouseout', function(){
	  		e = event;
	  		if (viewPortWidthType == 'big') {
	  			mouseOverHandler(e);
	  		}		  		
	  	});	
  		 
  		diagrams.addEventListener('click', function(){
	  		e = event;
	  		if (viewPortWidthType == 'medium') {
	  			mouseOverHandler(e);
	  		}
	  	});

	  	document.body.addEventListener('keyup', function(){
	  		e = event;
	  		if (viewPortWidthType == 'medium' && event.keyCode == 27 &&
	  		 (($(window).scrollTop() > $('.diagrams').offset().top) &&
	  		  ($(window).scrollTop() < $('.work-stages').offset().top))) {
	  			mouseOverHandler(e);
	  		}		  		
	  	});	

	  	var clickEventTarget;
	  	function mouseOverHandler(e) {
	  		var target = e.target;
	  		var eventType = e.type;
	  		if (eventType == 'keyup') {	  		 	
	  		 	target = clickEventTarget;  		 	
		  	}

		 		while (target != diagrams) {
			    if (target.tagName == 'LI') {
			    	if (eventType == 'mouseover') {
		  			showfunc();
		  		}	else if (eventType == 'mouseout') {
		  			hidefunc();
		  		}	else if (eventType == 'click') {
		  			clickEventTarget = target;
		  			togglefunc();
		  		}	else if (eventType == 'keyup') {
		  		 	hidefunc();		  		 	
		  		}	else {
		  		 	return;
		  		}			    	
			    	// нашли элемент, который нас интересует!
			    	return;
			    }
			    target = target.parentNode;
			  }

			  function showfunc() {
		  		for (var i = 0; i < diagramsListItems.length; i++) {
			  		diagramsListItems[i].classList.add('diagrams__diagram-item_semi-transparent');
		      	if (diagramsListItems[i].classList[2] == target.classList[2]) {
		      		diagramsListItems[i].classList.add('diagrams__diagram-item_no-transparent');
		      	}
		      }
		  	}

		  	function hidefunc() {
		  		for (var i = 0; i < diagramsListItems.length; i++) {
			  		diagramsListItems[i].classList.remove('diagrams__diagram-item_semi-transparent');
		      	diagramsListItems[i].classList.remove('diagrams__diagram-item_no-transparent');
		      	
		      }
			  }

			  function togglefunc() {
			  	if (!target.classList.contains('diagrams__diagram-item_no-transparent')) {
			  		for (var i = 0; i < diagramsListItems.length; i++) {
			  		diagramsListItems[i].classList.remove('diagrams__diagram-item_semi-transparent');
		      	diagramsListItems[i].classList.remove('diagrams__diagram-item_no-transparent');		      	
		      }

			  	}
		  		for (var j = 0; j < diagramsListItems.length; j++) {
			  		diagramsListItems[j].classList.toggle('diagrams__diagram-item_semi-transparent');
		      	if (diagramsListItems[j].classList[2] == target.classList[2]) {
		      		diagramsListItems[j].classList.toggle('diagrams__diagram-item_no-transparent');
		      	}
		      }
		  	}
	  	}
		}
		/*-----------------------------------
	  ---HIGHLIGHTING DIAGRAM BLOCKS END---
	  -----------------------------------*/

	  /*-------------------------
	  ---ANIMATE FOOTER BLOCKS---
	  -------------------------*/
	  function animateFooterBlocks() {
	  	var trigger = $('.work-stages__list');
	  	var triggerJs = document.querySelector('.work-stages__list');
	  	var triggerTopCoord = trigger.offset().top;

	  	horizScrollAnimateHandler();

	  	$(window).scroll(function(){
	  		horizScrollAnimateHandler();		  	
	  	});

	  	$(window).resize(function(){
	  		horizScrollAnimateHandler();	  		
	  	});

	  	function horizScrollAnimateHandler() {
	  		if (window.innerWidth > 1279) {	  			
	  			var triggerWidth = trigger.width();
		  		var windowScrollTop = $(window).scrollTop();
			  	var viewportHeight = $(window).height();
			  	var viewportWIdth = $(window).width();
			  	var triggerHeight = trigger.height()+16;
			  	var fixedHeaderHeight = $('.header').height();
			  	var triggerHeightDistance = (viewportHeight -(50 + fixedHeaderHeight));  	
			  	var triggerJsTop = triggerJs.getBoundingClientRect().top-16;
			  	var triggerHeightDistancePercentage = (viewportHeight-triggerJsTop) / triggerHeightDistance;
			  	var translateX;

			  	if ( windowScrollTop > (triggerTopCoord - 16 - viewportHeight) ) {
			  		if (triggerHeightDistancePercentage > 1) {
			  			translateX = (triggerWidth + 20) * 1 * -1;
			  			trigger.css({ transform: 'translateX(' + translateX + 'px)'});
			  			return;
			  		}
			  		translateX = (triggerWidth + 20) * triggerHeightDistancePercentage * -1;
			  		trigger.css({ transform: 'translateX(' + translateX + 'px)'});
			  	}
		  	} else {
		  		trigger.css({ transform: ''});
			  			return;
		  	}		  	
	  	}
	  	
	  }
	  /*-----------------------------
	  ---ANIMATE FOOTER BLOCKS END---
	  -----------------------------*/

	});  
/*----------------------
---WINDOW ON LOAD END---
----------------------*/
})();

