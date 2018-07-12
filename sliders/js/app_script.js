	"use strict";
	
	window.onload = function () {
		var manIconBlocks = document.querySelectorAll('.horizontal-slider_man-icon-block');
		var sliderElem = document.querySelector('.horizontal-slider__slider-body');
		var thumbElem = document.querySelector('.horizontal-slider__slider-drag-btn');
		var sliderLeftPositionPersentage;
		var newLeft;
		
		loadPageState();
		thumbElem.onmousedown = function(e) {
			var thumbCoords = getCoords(thumbElem);
			var shiftX = e.pageX - thumbCoords.left;
			// shiftY здесь не нужен, слайдер двигается только по горизонтали
			var sliderCoords = getCoords(sliderElem);

			document.onmousemove =	function(e) {
				//	вычесть координату родителя, т.к. position: relative
				newLeft = e.pageX - shiftX - sliderCoords.left;

				// курсор ушёл вне слайдера
				if (newLeft < 0) {
					newLeft = 0;
				}
				var rightEdge = sliderElem.offsetWidth;
				if (newLeft > rightEdge) {
					newLeft = rightEdge;
				}

				thumbElem.style.left = newLeft + 'px';
				/*my code*/
				sliderLeftPositionPersentage = Math.round(newLeft * 100 / sliderElem.offsetWidth);
				thumbElem.innerHTML =	sliderLeftPositionPersentage;
				manIconBlocksMakeVisible();
			};

			document.onmouseup = function() {
				document.onmousemove = document.onmouseup = null;
				savePageState();
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

		function manIconBlocksMakeVisible(local) {
			var manIconForVisibility;
			if (localStorage.distributedClientsCounter == undefined) {
				manIconForVisibility = 0;
			} else {
				if(local) {
					manIconForVisibility = Math.round(localStorage.distributedClientsCounter / 10);
				} else {
					manIconForVisibility = Math.round(sliderLeftPositionPersentage / 10);
				}
			}
				for (var i = 0; i < manIconBlocks.length; i++) {
					if(i+1 <= manIconForVisibility){
						manIconBlocks[i].classList.remove("unvisible");
						manIconBlocks[i].classList.add("visible");
					} else {
						manIconBlocks[i].classList.add("unvisible");
					}
				}
		}

		function loadPageState() {
			if (localStorage.distributedClientsCounter == undefined) {
				thumbElem.innerHTML = 0;
			}
			thumbElem.innerHTML = localStorage.distributedClientsCounter;
			thumbElem.style.left = localStorage.sliderLeftPosition + 'px';
			manIconBlocksMakeVisible(true);
		}

		function savePageState() {
			localStorage.distributedClientsCounter = sliderLeftPositionPersentage;
			localStorage.sliderLeftPosition = newLeft;
		}

 };












	
	

		

