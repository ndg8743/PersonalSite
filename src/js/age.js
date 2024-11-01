let ageEl = document.getElementById("age");

setInterval(() => {
	let time = dayjs().diff(dayjs('2003-10-08'), 'year', true);
	ageEl.innerText = time.toString().substring(0, 12);
}, 50);
