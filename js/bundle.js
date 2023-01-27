/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

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

module.exports = calculator;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

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

	const getResource = async (url) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getResource("http://localhost:3000/menu").then((data) => {
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

module.exports = cards;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
	// Forms

	const forms = document.querySelectorAll("form");
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

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: data,
		});

		return res.json();
	};

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

			postData("http://localhost:3000/requests", json)
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
		showModal();

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
			hideModal();
		}, 4000);
	}
}

module.exports = forms;


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
	//Modal window

	const modalTrigger = document.querySelectorAll("[data-modal]");
	const modal = document.querySelector(".modal");

	function showModal() {
		modal.classList.add("show");
		modal.classList.remove("hide");
		document.body.style.overflow = "hidden";
		clearInterval(modalTimerId);
	}

	function hideModal() {
		modal.classList.add("hide");
		modal.classList.remove("show");
		document.body.style.overflow = "";
	}

	modalTrigger.forEach((btn) => {
		btn.addEventListener("click", showModal);
	});

	modal.addEventListener("click", (event) => {
		if (
			event.target === modal ||
			event.target.getAttribute("data-close") == ""
		) {
			hideModal();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.code === "Escape" && modal.classList.contains("show")) {
			hideModal();
		}
	});

	const modalTimerId = setTimeout(showModal, 50000);

	function showModalByScroll() {
		if (
			window.scrollY + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1
		) {
			showModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
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

	const slides = document.querySelectorAll(".offer__slide");
	const prev = document.querySelector(".offer__slider-prev");
	const next = document.querySelector(".offer__slider-next");
	const total = document.querySelector("#total");
	const current = document.querySelector("#current");
	const slider = document.querySelector(".offer__slider");
	const slidesWrapper = document.querySelector(".offer__slider-wrapper");
	const width = window.getComputedStyle(slidesWrapper).width;
	const slidesField = document.querySelector(".offer__slider-inner");
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

module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
	//Tabs

	const tabs = document.querySelectorAll(".tabheader__item");
	const tabsContent = document.querySelectorAll(".tabcontent");
	const tabsParent = document.querySelector(".tabheader__items");

	function hideTabsContent() {
		tabsContent.forEach((tab) => {
			tab.classList.add("hide");
			tab.classList.remove("show", "fade");
		});
		tabs.forEach((tab) => {
			tab.classList.remove("tabheader__item_active");
		});
	}

	function showTabsContent(i = 0) {
		tabsContent[i].classList.remove("hide");
		tabsContent[i].classList.add("show", "fade");
		tabs[i].classList.add("tabheader__item_active");
	}

	hideTabsContent();
	showTabsContent();

	tabsParent.addEventListener("click", (event) => {
		const target = event.target;

		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((item, i) => {
				if (item === target) {
					hideTabsContent();
					showTabsContent(i);
				}
			});
		}
	});
}

module.exports = tabs;


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
	//Timer

	const finalDate = new Date("2023-03-20");

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

	setClock(".timer", finalDate);
}

module.exports = timer;


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener("DOMContentLoaded", function () {
	const calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
	const cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
	const forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
	const modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
	const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
	const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
	const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

	calculator();
	cards();
	forms();
	modal();
	slider();
	tabs();
	timer();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map