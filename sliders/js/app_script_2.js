	'use strict';
	
 window.onload = function () {
	var distributedClientsCounter = document.querySelector('.clients-distributing-counter__counter');
			distributedClientsCounter.innerHTML = localStorage.distributedClientsCounter;
	var sliderElem = document.querySelector('.container');
	var thumbElem = document.querySelector('.horizontal-slider__slider-drag-btn');
	var distributedClientsCounterValue = parseInt(localStorage.distributedClientsCounter);
	var newLeft //drug button new left coord after button moved
	var distributedClientsCounterAfterDrug; //new distributedClientsCounterValue after drug buttons moved;
	var sliderCounterNewValue;
	var slidersCounterCollection = document.querySelectorAll('.horizontal-slider__slider-text_right');
	var drugButtonsCollection = document.querySelectorAll('.horizontal-slider__slider-drag-btn');

	loadPageState();

	sliderElem.onmousedown = function(event) {
		var target = event.target; // where user is clicked
		if (target.className != 'horizontal-slider__slider-drag-btn') return;
		var thumbCoords = getCoords(target);
		var shiftX = event.pageX - thumbCoords.left;
		var sliderCoords = getCoords(target.parentNode);
		/*code for remember clients counter value*/
		var sliderId = +target.id;
		
		var sliderCounter = slidersCounterCollection[sliderId]; /*text right from the slider */
		var sliderCounterValue = parseInt(sliderCounter.textContent);
		
		var sumOfOtherSidersCounterValues = 0;
		for (var i = 0; i < slidersCounterCollection.length; i++) {
			if (i == sliderId) {
				continue;
			}
			sumOfOtherSidersCounterValues += parseInt(slidersCounterCollection[i].textContent);
			
		}

		var sliderDragButtonLeft;
		if (isNaN(parseInt(target.style.left))) {
			sliderDragButtonLeft = 0;
		} else {
			sliderDragButtonLeft = parseInt(target.style.left);
		}
		var sliderDragButtonLeftFlag;
		var sliderWidth = target.parentNode.offsetWidth;
		var oneClientPerLeftPixels;

		if (sliderCounterValue == 0) {
			oneClientPerLeftPixels = sliderWidth / distributedClientsCounterValue;
			sliderDragButtonLeftFlag = false;
		} else {
			var oneClientPerPixelsRight = (sliderWidth - sliderDragButtonLeft) / distributedClientsCounterValue;
			var oneClientPerPixelsLeft = (sliderWidth - (sliderWidth - sliderDragButtonLeft)) / sliderCounterValue;
			sliderDragButtonLeftFlag = true;
		}

		var targetStyleLeft = parseInt(target.style.left);
		var targetFreezeRightMoves = false;
			

		document.onmousemove =	function(event) {
			//	вычесть координату родителя, т.к. position: relative
			newLeft = event.pageX - shiftX - sliderCoords.left;
			// курсор ушёл вне слайдера
			if (newLeft < 0) {
				newLeft = 0;
			}

			var rightEdge = sliderWidth;
			if (newLeft > rightEdge) {
				newLeft = rightEdge;
			}

			if (distributedClientsCounterAfterDrug == 0) {
				targetFreezeRightMoves = true;
			}

			if (targetFreezeRightMoves) {
				if (newLeft > targetStyleLeft && newLeft > rightEdge) {
					newLeft = rightEdge;
				}
				if (newLeft > targetStyleLeft && newLeft < rightEdge) {
					newLeft = targetStyleLeft;
				}
			}

			target.style.left = newLeft + 'px';
			/*my code*/
			
			if (sliderDragButtonLeftFlag){
				if(newLeft > sliderDragButtonLeft) {					
					sliderCounterNewValue = sliderCounterValue + ((newLeft - sliderDragButtonLeft) / oneClientPerPixelsRight);
				} else if (newLeft < sliderDragButtonLeft) {
					sliderCounterNewValue = newLeft / oneClientPerPixelsLeft;
				} else {
					sliderCounterNewValue = sliderCounterValue;
				}
			}

			if (!sliderDragButtonLeftFlag) {
				if(newLeft > sliderDragButtonLeft) {
					sliderCounterNewValue = newLeft / oneClientPerLeftPixels;
				} else if ((!sliderDragButtonLeftFlag) && newLeft < sliderDragButtonLeft) {
					sliderCounterNewValue = 0;
				} else {
					sliderCounterNewValue = 0;
				}
			}
			sliderCounterNewValue = Math.floor(sliderCounterNewValue);
			sliderCounter.innerHTML = sliderCounterNewValue;
			distributedClientsCounterAfterDrug = localStorage.distributedClientsCounter - (Math.floor(sliderCounterNewValue) + sumOfOtherSidersCounterValues);
			distributedClientsCounter.innerHTML = distributedClientsCounterAfterDrug;
			distributedClientsCounterValue = distributedClientsCounterAfterDrug;
		};

		document.onmouseup = function(e) {
			document.onmousemove = document.onmouseup = null;
			savePageState(e);
		};

		return false; // disable selection start (cursor change)
	};

	thumbElem.ondragstart = function() {
		return false;
	};

	function getCoords(elem) { // кроме IE8-
		var box = elem.getBoundingClientRect();

		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};

	}

	function savePageState(e) {
		var sliderCounters = [];
		var drugButtonsPositions = [];
		var sliderCountersSum = 0;
		for (var i = 0; i < 3; i++) {
			sliderCounters[i] = parseInt(slidersCounterCollection[i].textContent);
			drugButtonsPositions[i] = parseInt(drugButtonsCollection[i].style.left);
			sliderCountersSum += sliderCounters[i];
		}
		localStorage.distributedClientsCounter2 = distributedClientsCounterAfterDrug + sliderCountersSum;
		localStorage.distributedClientsCounterAfterDrug = distributedClientsCounterAfterDrug;
		localStorage.setItem("sliderCounters", JSON.stringify(sliderCounters));
		localStorage.setItem("drugButtonsPositions", JSON.stringify(drugButtonsPositions));
	}

	function loadPageState() {
		if (localStorage.distributedClientsCounter != localStorage.distributedClientsCounter2) {
			distributedClientsCounter.innerHTML = localStorage.distributedClientsCounter;
			return;
		}
		var sliderCounters = JSON.parse(localStorage.getItem("sliderCounters"));
		var drugButtonsPositions = JSON.parse(localStorage.getItem("drugButtonsPositions"));

		distributedClientsCounter.innerHTML = localStorage.distributedClientsCounterAfterDrug;
		distributedClientsCounterValue = localStorage.distributedClientsCounterAfterDrug;
		for (var i = 0; i <3; i++) {
			slidersCounterCollection[i].innerHTML = sliderCounters[i];
			drugButtonsCollection[i].style.left = drugButtonsPositions[i] + "px";
		}
	}

 };