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

export default tabs;
