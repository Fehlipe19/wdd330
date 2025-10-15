import { loadHeaderFooter, createCharacterCard, createCharacterDialog } from "./utils.mjs";

loadHeaderFooter();
createCharacterCard();
document.querySelector("#create-character-btn").addEventListener("click", () => {
  createCharacterDialog();
});
