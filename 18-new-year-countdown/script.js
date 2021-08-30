const days = document.querySelector("#days"),
  hours = document.querySelector("#hours"),
  minutes = document.querySelector("#minutes"),
  seconds = document.querySelector("#seconds"),
  countdown = document.querySelector("#countdown"),
  year = document.querySelector("#year"),
  loading = document.querySelector("#loading");
// import end

const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

// Set background year
year.innerText = currentYear + 1;

// Update CountDown time
function updateCountdown() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const d = Math.floor(diff / 1000 / 60 / 60 / 24);
  const h = Math.floor(diff / 1000 / 60 / 60) % 24;
  const m = Math.floor(diff / 1000 / 60) % 60;
  const s = Math.floor(diff / 1000) % 60;

  // Add values to DOM
  days.innerText = d;
  hours.innerText = h < 10 ? `0${h}` : h;
  minutes.innerText = m < 10 ? `0${m}` : m;
  seconds.innerText = s < 10 ? `0${s}` : s;
}

// Show spinner before countdown
setTimeout(() => {
  loading.remove();
  countdown.style.display = "flex";
}, 1000);

// Run every second
setInterval(updateCountdown, 1000);
