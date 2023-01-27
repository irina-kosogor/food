/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
	// Calculator

	const result = document.querySelector(".calculating__result span");

	let gender;
	let height;
	let weight;
	let age;
	let ratio;

	if (localStorage.getItem("gender")) {
		gender = localStorage.getItem("gender");
	} else {
		gender = "female";
		localStorage.setItem("gender", "female");
	}

	if (localStorage.getItem("ratio")) {
		ratio = localStorage.getItem("ratio");
	} else {
		ratio = 1.375;
		localStorage.setItem("ratio", 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((element) => {
			element.classList.remove(activeClass);
			if (element.getAttribute("id") === localStorage.getItem("gender")) {
				element.classList.add(activeClass);
			}
			if (
				element.getAttribute("data-ratio") === localStorage.getItem("ratio")
			) {
				element.classList.add(activeClass);
			}
		});
	}

	initLocalSettings("#gender div", "calculating__choose-item_active");
	initLocalSettings(
		".calculating__choose_big div",
		"calculating__choose-item_active"
	);

	function calcTotalCalories() {
		if (!gender || !height || !weight || !age || !ratio) {
			return;
		}

		if (gender === "female") {
			result.textContent = Math.round(
				(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
			);
		} else {
			result.textContent = Math.round(
				(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
			);
		}
	}

	calcTotalCalories();

	function getStaticData(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach((element) => {
			element.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {
					ratio = +e.target.getAttribute("data-ratio");
					localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
				} else {
					gender = e.target.getAttribute("id");
					localStorage.setItem("gender", e.target.getAttribute("id"));
				}

				elements.forEach((element) => element.classList.remove(activeClass));

				e.target.classList.add(activeClass);

				calcTotalCalories();
			});
		});
	}

	getStaticData("#gender div", "calculating__choose-item_active");
	getStaticData(
		".calculating__choose_big div",
		"calculating__choose-item_active"
	);

	function getDynamicData(selector) {
		const input = document.querySelector(selector);

		input.addEventListener("input", () => {
			if (input.value.match(/\D/g)) {
				input.style.border = "1px solid red";
			} else {
				input.style.border = "none";
			}

			switch (input.getAttribute("id")) {
				case "height":
					height = +input.value;
					break;
				case "weight":
					weight = +input.value;
					break;
				case "age":
					age = +input.value;
					break;
			}

			calcTotalCalories();
		});
	}

	getDynamicData("#height");
	getDynamicData("#weight");
	getDynamicData("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
	//Menu By Classes

	class MenuCard {
		constructor(src, alt, subtitle, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.subtitle = subtitle;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.transer = 45;
			this.parent = document.querySelector(parentSelector);
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.transer;
		}

		render() {
			const element = document.createElement("div");

			if (this.classes.length === 0) {
				this.element = "menu__item";
				element.classList.add(this.element);
			} else {
				this.classes.forEach((className) => element.classList.add(className));
			}

			element.innerHTML = `
      
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.subtitle}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>
      
      `;
			this.parent.append(element);
		}
	}

	(0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then((data) => {
		data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(
				img,
				altimg,
				title,
				descr,
				price,
				".menu .container"
			).render();
		});
	});

	//Get request with axios for educational purpose
	// axios.get('http://localhost:3000/menu').then(response => {
	//   response.data.forEach(({img, altimg, title, descr, price}) => {
	//     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	//   });
	// });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
	// Forms

	const forms = document.querySelectorAll(formSelector);
	const message = {
		loading: "img/form/spinner.svg",
		success: "Success",
		failure: "Something went wrong",
	};

	// XMLHttpReqest is used for educational purposes

	// forms.forEach((item) => postData(item));

	// function postData(form) {
	//   form.addEventListener("submit", (e) => {
	//     e.preventDefault();

	//     const statusMessage = document.createElement('img');
	//     statusMessage.src = message.loading;
	//     statusMessage.style.cssText = `
	//       display: block;
	//       margin: 0 auto;
	//     `;
	//     form.insertAdjacentElement('afterend', statusMessage);

	//     const request = new XMLHttpRequest();
	//     request.open("POST", "server.php");

	//     request.setRequestHeader("Content-type", "application/json; charset=utf-8");
	//     const formData = new FormData(form);

	//     const obj = {};
	//     formData.forEach((value, key) => {
	//       obj[key] = value;
	//     });

	//     const json = JSON.stringify(obj);

	//     request.send(json);

	//     request.addEventListener("load", () => {
	//       if (request.status === 200) {
	//         console.log(request.response);
	//         showThanksModal(message.success);
	//         form.reset();
	//         statusMessage.remove()  ;
	//       } else {
	//         showThanksModal(message.failure);
	//       }
	//     });
	//   });
	// }

	// function showThanksModal(message) {
	//   const prevModalDialog = document.querySelector('.modal__dialog');

	//   prevModalDialog.classList.add('hide');
	//   showModal();

	//   const thanksModal = document.createElement('div');
	//   thanksModal.classList.add('modal__dialog');
	//   thanksModal.innerHTML = `
	//     <div class="modal__content">
	//       <div data-close class="modal__close">&times;</div>
	//       <div class="modal__title">${message}</div>
	//     </div>
	//   `;

	//   document.querySelector('.modal').append(thanksModal);
	//   setTimeout(() => {
	//     thanksModal.remove();
	//     prevModalDialog.classList.add('show');
	//     prevModalDialog.classList.remove('hide');
	//     hideModal();
	//   }, 4000);
	// }

	// Fetch API

	forms.forEach((item) => bindPostData(item));

	function bindPostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			const statusMessage = document.createElement("img");
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
			form.insertAdjacentElement("afterend", statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
				// .then((data) => data.text()) //data transformation is no longer needed
				.then((data) => {
					console.log(data);
					showThanksModal(message.success);
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
					statusMessage.remove();
				});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector(".modal__dialog");

		prevModalDialog.classList.add("hide");
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);

		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

		document.querySelector(".modal").append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			// prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove("hide");
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.hideModal)('.modal');
		}, 4000);
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "hideModal": () => (/* binding */ hideModal),
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
function showModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add("show");
	modal.classList.remove("hide");
	document.body.style.overflow = "hidden";

	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

function hideModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add("hide");
	modal.classList.remove("show");
	document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	//Modal window

	const modalTrigger = document.querySelectorAll(triggerSelector);
	const modal = document.querySelector(modalSelector);

	modalTrigger.forEach((btn) => {
		btn.addEventListener("click", () => showModal(modalSelector, modalTimerId));
	});

	modal.addEventListener("click", (event) => {
		if (
			event.target === modal ||
			event.target.getAttribute("data-close") == ""
		) {
			hideModal(modalSelector);
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.code === "Escape" && modal.classList.contains("show")) {
			hideModal(modalSelector);
		}
	});


	function showModalByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			showModal(modalSelector, modalTimerId);
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	window.addEventListener("scroll", showModalByScroll);
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	
	// Slider Version #1

	// const prev = document.querySelector('.offer__slider-prev');
	// const next = document.querySelector('.offer__slider-next');
	// const slides = document.querySelectorAll('.offer__slide');
	// const current = document.querySelector('#current');
	// const total = document.querySelector('#total');
	// let slideIndex = 1;

	// showSlide(slideIndex);

	// function addZero(num) {
	//   return num < 10 ? `0${num}` : num;
	// }

	// total.innerHTML = addZero(slides.length);

	// function showSlide(n) {
	//   if (n > slides.length) {
	//     slideIndex = 1;
	//   }
	//   if (n < 1) {
	//     slideIndex = slides.length;
	//   }

	//   current.innerHTML = addZero(slideIndex);

	//   slides.forEach((slide, i) => slide.classList.add('hide'));

	//   (slides[slideIndex - 1]).classList.remove('hide');

	// }

	// function plusSlides(n) {
	//   showSlide(slideIndex += n);
	// }

	// next.addEventListener('click', () => {
	//   plusSlides(1);
	//   current.innerHTML = addZero(slideIndex);
	// });

	// prev.addEventListener('click', () => {
	//   plusSlides(-1);
	//   current.innerHTML = addZero(slideIndex);
	// });

	// Slider Version #2

	let offset = 0;
	let slideIndex = 1;

	const slides = document.querySelectorAll(slide);
	const slider = document.querySelector(container);
	const next = document.querySelector(nextArrow);
	const prev = document.querySelector(prevArrow);
	const total = document.querySelector(totalCounter);
	const current = document.querySelector(currentCounter);
	const slidesWrapper = document.querySelector(wrapper);
	const width = window.getComputedStyle(slidesWrapper).width;
	const slidesField = document.querySelector(field);
	const dots = [];

	function addZero(num) {
		return num < 10 ? `0${num}` : num;
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, "");
	}

	total.textContent = addZero(slides.length);
	current.textContent = addZero(slideIndex);

	slidesField.style.cssText = `
    width: ${100 * slides.length}%;
    display: flex;
    transition: 0.5s all;
  `;

	slidesWrapper.style.overflow = "hidden";

	slides.forEach((slide) => (slide.style.width = width));

	next.addEventListener("click", () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		current.textContent = addZero(slideIndex);
		toggleDotOpacity();
	});

	prev.addEventListener("click", () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		current.textContent = addZero(slideIndex);
		toggleDotOpacity();
	});

	// Slides navigation

	slider.style.position = "relative";

	const indicators = document.createElement("ol");
	indicators.classList.add("carousel-indicators");
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement("li");
		dot.setAttribute("data-slide-to", i + 1);
		dot.classList.add("dot");

		if (i == 0) {
			dot.style.opacity = 1;
		}

		indicators.append(dot);
		dots.push(dot);
	}

	function toggleDotOpacity() {
		dots.forEach((dot) => (dot.style.opacity = 0.5));
		dots[slideIndex - 1].style.opacity = 1;
	}

	dots.forEach((dot) => {
		dot.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute("data-slide-to");

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			current.textContent = addZero(slideIndex);
			toggleDotOpacity();
		});
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	//Tabs

	const tabs = document.querySelectorAll(tabsSelector);
	const tabsContent = document.querySelectorAll(tabsContentSelector);
	const tabsParent = document.querySelector(tabsParentSelector);

	function hideTabsContent() {
		tabsContent.forEach((tab) => {
			tab.classList.add("hide");
			tab.classList.remove("show", "fade");
		});
		tabs.forEach((tab) => {
			tab.classList.remove(activeClass);
		});
	}

	function showTabsContent(i = 0) {
		tabsContent[i].classList.remove("hide");
		tabsContent[i].classList.add("show", "fade");
		tabs[i].classList.add(activeClass);
	}

	hideTabsContent();
	showTabsContent();

	tabsParent.addEventListener("click", (event) => {
		const target = event.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (item === target) {
					hideTabsContent();
					showTabsContent(i);
				}
			});
		}
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
	//Timer

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		const timeDifferenceTotal =
			Date.parse(endtime) - Date.parse(new Date());

		if (timeDifferenceTotal <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(timeDifferenceTotal / (1000 * 60 * 60 * 24));
			hours = Math.floor((timeDifferenceTotal / (1000 * 60 * 60)) % 24);
			minutes = Math.floor((timeDifferenceTotal / (1000 * 60)) % 60);
			seconds = Math.floor((timeDifferenceTotal / 1000) % 60);
		}

		return {
			timeDifferenceTotal,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return "0" + num;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector("#days");
		const hours = timer.querySelector("#hours");
		const minutes = timer.querySelector("#minutes");
		const seconds = timer.querySelector("#seconds");
		const timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.timeDifferenceTotal <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: data,
    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener("DOMContentLoaded", () =>  {

	const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.showModal)(".modal", modalTimerId), 50000);

	(0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])("form", modalTimerId);
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])("[data-modal]", ".modal", modalTimerId);
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
		container: ".offer__slider", 
		slide: ".offer__slide", 
		nextArrow: ".offer__slider-next", 
		prevArrow: ".offer__slider-prev", 
		totalCounter: "#total", 
		currentCounter: "#current", 
		wrapper: ".offer__slider-wrapper", 
		field: ".offer__slider-inner"
	});
	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])(".timer", "2023-03-20");
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map