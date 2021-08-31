const draggable_list = document.querySelector("#draggable-list"),
  check = document.querySelector("#check");
// end

const richestPeople = [
  "Jeff Bezos",
  "Elon Musk",
  "Bernard Arnault",
  "Bill Gates",
  "Mark Zuckerberg",
  "Warren Buffett",
  "Larry Ellison",
  "Larry Page",
  "Sergey Brin",
  "Mukesh Ambani",
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// const numbers = [1, 3, 110, 40, 3, 302];
// console.log(
//   numbers.sort(function (a, b) {
//     return a - b;
//   })
// );

// Insert list items into DOM
function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, idx) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", idx);
      listItem.innerHTML = `
        <span class="number">${idx + 1} </span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log("drag start");
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragOver(e) {
  // console.log("drag over");
  e.preventDefault();
}

function dragDrop() {
  // console.log("drag drop");
  const dragEndIndex = +this.getAttribute("data-index");
  console.log(dragEndIndex);
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function dragEnter() {
  // console.log("drag  enter");
  this.classList.add("over");
}

function dragLeave() {
  // console.log("drag leave");
  this.classList.remove("over");
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, idx) => {
    const personName = listItem.querySelector(".draggable").innerText.trim();

    if (personName !== richestPeople[idx]) {
      listItem.classList.add("wrong");
    } else {
      listItem.classList.remove("wrong");
      listItem.classList.add("right");
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);
