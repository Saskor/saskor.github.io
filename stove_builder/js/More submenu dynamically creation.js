(function () {
	window.onload = actualResizeHandler;
	window.onresize = resizeThrottler;
	var resizeTimeout;
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
    var elems = document.querySelectorAll("li[data-hidden-list-item]");
    var subElems = document.querySelectorAll(".header-bottom__subnav-item-add");
    var parentSubUl = document.querySelector(".header-bottom__subnav-list_add");
    for (var i = 0; i < elems.length; i++) {
			
    	var mainMenuItem = elems[i];
    	mainMenuItem.setAttribute("data-count", i);
    	var mainMenuItemVisible = !isHidden(elems[i]);
    	var subMenuItem = document.querySelector(".header-bottom__subnav-list_add li[data-count="+ "'" + i +"'" + "]");
    	var subMenuItemExist = !!subMenuItem;
    	    	
			if ((mainMenuItemVisible === true) && (subMenuItemExist === false)) {
				continue;
				
			} else if ((mainMenuItemVisible === false) && (subMenuItemExist === true)) {
				
				continue;
			} 
			else if ((mainMenuItemVisible === true) && (subMenuItemExist === true)) {
			  	
			  	parentSubUl.removeChild(subMenuItem);
			}	else if ((mainMenuItemVisible === false) && (subMenuItemExist === false)) {
			  
			  createSubLiElem(mainMenuItem);
			}

  	} 
  }

	function createSubLiElem(elem) {
					
		if (isHidden(elem)) {
			var subUl = document.querySelector(".header-bottom__subnav-list_add");
			var clonedNode = elem.cloneNode(true);

			var liSub = document.createElement("li");
			var elemDataCount = elem.getAttribute("data-count");
			liSub.setAttribute("data-count", elemDataCount);
			var liSubDataCount = +liSub.getAttribute("data-count");
			liSub.classList.add("header-bottom__subnav-item-add");
			liSub.classList.add("two");
			var liSubUl = document.createElement("ul");
			liSubUl.classList.add("header-bottom__subnav-child-list");
			var subSubLiFirst = document.createElement("li");
			subSubLiFirst.classList.add("header-bottom__subnav-child-item_first");
			
			var subSubLink = document.createElement("a");
			subSubLink.classList.add("header-bottom__subnav-child-link");

			subSubLink.href = clonedNode.querySelector("a").href;
			subSubLink.innerHTML = linkTextToUpCase(clonedNode);
			subSubLiFirst.appendChild(subSubLink);
			liSubUl.appendChild(subSubLiFirst);
						
			var elemsiLIInParentMenuItem = clonedNode.querySelectorAll("li");
			
			if(elemsiLIInParentMenuItem.length) {
					for (var i = 0; i < elemsiLIInParentMenuItem.length; i++) {
					var subSubLi = document.createElement("li");
					subSubLi.classList.add("header-bottom__subnav-child-item");
					subSubLi.innerHTML = '<a href="" class="header-bottom__subnav-child-link">' + elemsiLIInParentMenuItem[i].textContent + '</a>';
					liSubUl.appendChild(subSubLi);
				}
			}

			liSub.appendChild(liSubUl);
			

			if (subUl.children.length) {
				var subUlChildrenDataCount = +subUl.children[0].getAttribute("data-count");
				if (subUlChildrenDataCount == liSubDataCount +1) {
					subUl.insertBefore(liSub, subUl.children[0]);
					
				} else {
					subUl.appendChild(liSub);
					
				}
			} else {
				subUl.appendChild(liSub);
				
			}			
		}		
	}

	function isHidden(elem) {
 		return (!elem.offsetWidth && !elem.offsetHeight);
 	}

 	function linkTextToUpCase(clonedNode) {
		var clonedNodeLinkLetersArr = clonedNode.querySelector("a").innerHTML.trim().split("");
		var clonedNodeLinkFirstLeterToUpCase = clonedNodeLinkLetersArr[0].toUpperCase();
		var clonedNodeLinkLeters = clonedNodeLinkLetersArr.slice(1).join("");
		var clonedNodeLinkTextToUpCase = clonedNodeLinkFirstLeterToUpCase + clonedNodeLinkLeters;
		return clonedNodeLinkTextToUpCase;
	}

})();
