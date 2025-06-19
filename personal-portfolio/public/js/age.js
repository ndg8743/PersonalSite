// Age calculation using dayjs - Nathan's actual birth date
let ageEl = document.getElementById("age");

function updateAge() {
    if (ageEl && window.dayjs) {
        let time = window.dayjs().diff(window.dayjs('2003-10-08'), 'year', true);
        ageEl.innerText = time.toString().substring(0, 12);
    }
}

// Start age updates when dayjs is available
if (window.dayjs) {
    setInterval(updateAge, 50);
} else {
    // Wait for dayjs to load
    window.addEventListener('load', () => {
        if (window.dayjs) {
            setInterval(updateAge, 50);
        }
    });
}
