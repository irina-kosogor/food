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

export default timer;
