"use strict";

(function () {
	var menu = document.querySelector(".header-bottom__nav");
	
	menu.onmouseover = function(event) {
  	var target = event.target;
		var lastSublist = document.querySelector("ul.header-bottom__subnav-list.header-bottom__subnav-list_add");
  	if (target.tagName != 'A') return;
	
  	if(target.nextElementSibling === null) return;
  	if(target.nextElementSibling == lastSublist) {
  	 	return;
  	 }
  	var wrapperLeft = document.querySelector(".header-bottom .wrapper-inner").getBoundingClientRect().left;
  	var targetCoords = target.getBoundingClientRect();
  	var subListCoords = targetCoords.left - wrapperLeft + ((target.offsetWidth) /2)-(target.nextElementSibling.offsetWidth/2);
  	if (subListCoords < 0) {
      target.nextElementSibling.style.left = 10+"px";
      return;
    }
  	 
  	target.nextElementSibling.style.left = subListCoords+"px";
	};
})();
