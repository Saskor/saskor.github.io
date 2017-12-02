/*popUp handler*/
(function () {
	var callbackLinks = document.querySelectorAll("[data-click-function]");
	var shadow = document.querySelector(".shadow");
	var popUp = document.querySelector(".popup-callback-form");
	var popUpCloser = popUp.querySelector(".callback-form__top-close");
	for(var i = 0; i < callbackLinks.length; i++)	{
			callbackLinks[i].onclick = function () {
				shadow.style.display = "block";
				popUp.style.display = "block";
			};
		}
	window.onclick = function (event) {
		var target = event.target;
		if(target.className == "shadow" ) {
			shadow.style.display = "";		
			popUp.style.display = "";
		}

		if(target.className == "callback-form__top-close" ) {
			shadow.style.display = "";		
			popUp.style.display = "";
		}

		if (target.className == "callback-form__top-close-ico") {
			target = target.parentNode;
		  shadow.style.display = "";		
			popUp.style.display = "";
	  }	  
	};
})();