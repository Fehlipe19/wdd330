import { loadHeaderFooter, wayfinding, diceRoller, createCharacterDialog } from "./utils.mjs";

loadHeaderFooter();
diceRoller();
document.querySelector("#create-character-btn").addEventListener("click", () => {
  createCharacterDialog();
});

// const menuButton = document.querySelector("#ham-menu");
// const navList = document.querySelector("ul");

// menuButton.addEventListener("click", () => {
//   navList.classList.toggle("open");
//   menuButton.classList.toggle("active");
// });

// wayfinding();
