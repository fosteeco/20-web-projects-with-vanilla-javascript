const cardsContainer = document.querySelector("#cards-container"),
  prevBtn = document.querySelector("#prev"),
  nextBtn = document.querySelector("#next"),
  currentEl = document.querySelector("#current"),
  showBtn = document.querySelector("#show"),
  hideBtn = document.querySelector("#hide"),
  questionEl = document.querySelector("#question"),
  answerEl = document.querySelector("#answer"),
  addCardBtn = document.querySelector("#add-card"),
  clearBtn = document.querySelector("#clear"),
  addContainer = document.querySelector("#add-container");
// import end

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// Store card data
// const cardsData = [
//   {
//     question: "What must a araible begin with? ",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];

// Create all cards
function createCards() {
  cardsData.forEach((data, idx) => createCard(data, idx));
}

// Create a single card in the DOM
function createCard(data, idx) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (idx === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="inner-card-front">
        <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
        <p>${data.answer}</p>
    </div>
  </div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards == null ? [] : cards;
}

// Add card to local storage
function setCardsData() {
  localStorage.setItem("cards", JSON.stringify(cardsData));
  window.location.reload();
}

createCards();

// Event Listeners

// Next Btn
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";

  currentActiveCard += 1;

  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// Prev Btn
prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";

  currentActiveCard -= 1;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

// Show add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));

// Hide add container
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Add new Card
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() === "" || answer.trim() === "") {
    alert("Please enter a question and answer");
    return;
  }
  const newCard = { question, answer };
  createCard(newCard);
  questionEl.value = "";
  answerEl.value = "";

  addContainer.classList.remove("show");
  cardsData.push(newCard);
  setCardsData();
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
