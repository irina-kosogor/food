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
