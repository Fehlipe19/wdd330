import { loadHeaderFooter, createCharacterCard, createCharacterDialog, createOwnedCharactersList } from "./utils.mjs";

loadHeaderFooter();
createCharacterCard();
createOwnedCharactersList();
document.querySelector("#create-character-btn").addEventListener("click", () => {
  createCharacterDialog();
});
