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

export {showModal};
export {hideModal};
export default modal;