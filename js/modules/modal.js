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
