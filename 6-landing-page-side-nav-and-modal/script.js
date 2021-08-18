const toggle = document.querySelector("#toggle");
const closeBtn = document.querySelector("#close");
const openBtn = document.querySelector("#open");
const modal = document.querySelector("#modal");

// Toggle nav
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// Show modal
openBtn.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

// Hide modal
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

// Hide moddal on outside click
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);
