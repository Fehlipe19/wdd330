import { getSpellsData, getSpecificSpell, getClassSpellsData, getCharacterData } from "./api.mjs";
import { setLocalStorage, getLocalStorage } from "./storage.mjs";

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  toggleMobileMenu();

  //   wayfinding();

  //   searchProducts();
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export function wayfinding() {
  const path = window.location.pathname;
  const page = path.split("/").pop();
  //   console.log(path);

  const navLinks = document.querySelectorAll(".nav-link");
  //   console.log(navLinks);

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    // console.log(linkPage);
    if (linkPage === page) {
      link.classList.add("active");
    }
  });
}

function toggleMobileMenu() {
  const menuButton = document.querySelector("#ham-menu");
  const navList = document.querySelector("ul");

  menuButton.addEventListener("click", () => {
    navList.classList.toggle("open");
    menuButton.classList.toggle("active");
  });
}

export async function createSpellCard() {
  const spellsList = await getSpellsData();
  //   const specificSpell = await getSpecificSpell("/api/2014/spells/acid-arrow");
  // console.log(spellsList);
  //   const specificSpell = getSpecificSpell(spell.url);

  spellsList.results.forEach((spell) => {
    const spellCard = document.createElement("div");
    spellCard.classList.add("spell-card");
    spellCard.innerHTML = `
      <h2>${spell.name}</h2>
      <button class="details">Details</button>
      `;
    document.querySelector("#spells-container").appendChild(spellCard);
    const detailsButton = spellCard.querySelector(".details");
    detailsButton.addEventListener("click", () => {
      displaySpellDialog(spell);
    });
  });
  //   console.log(spellsList);
}

async function displaySpellDialog(spell) {
  const displayDialog = document.getElementById("spell-dialog");

  displayDialog.innerHTML = "";
  const specificSpell = await getSpecificSpell(spell.url);

  let classList = [];

  // code below gives me erros
  //   specificSpell.classes.forEach((class) => {
  //     classList.push(class.name);
  //   });

  specificSpell.classes.forEach((cls) => {
    classList.push(cls.name);
  });

  displayDialog.innerHTML = `
  <button id="closeModal">❌</button>
    <h2><span>${specificSpell.name}</span></h2>
    <div class="spell-info">
    <p><span>Range: </span>${specificSpell.range}</p>
    <p><span>Description: </span>${specificSpell.desc}</p>
    <p><span>Classes: </span>${classList}</p>
    </div>
    `;
  displayDialog.showModal();
  closeModal.addEventListener("click", () => {
    displayDialog.close();
  });
}

export async function createCharacterCard() {
  const characterList = await getCharacterData();
  characterList.forEach((character) => {
    const characterCard = document.createElement("div");
    characterCard.classList.add("character-card");

    characterCard.innerHTML = `
    <h2>${character.name}</h2>
    <h3>${character.class}</h3>
    <p><span>Stats: </span>${character.primary_stat}, ${character.secondary_stat}</p>
    <p><span>HitDie: </span>${character.hit_die}</p>
    <img loading="lazy" src="../${character.imageURL}" alt="Fantasy ${character.class}">
    `;
    document.querySelector("#generated-characters").appendChild(characterCard);
  });
}

export function createCharacterDialog() {
  const characterDialog = document.getElementById("character-dialog");
  characterDialog.innerHTML = `
  <button id="closeModal">❌</button>
  <form id="character-form">
    <label for="name">Name:
      <input type="text" id="name" name="name" required>
    </label>
    <label for="class">Class:
      <select id="class" name="class" required>
        <option value="" disabled selected>Select a class</option>
        <option class="class-option" value="Barbarian">Barbarian</option>
        <option class="class-option" value="Bard">Bard</option>
        <option class="class-option" value="Cleric">Cleric</option>
        <option class="class-option" value="Druid">Druid</option>
        <option class="class-option" value="Fighter">Fighter</option>
        <option class="class-option" value="Monk">Monk</option>
        <option class="class-option" value="Paladin">Paladin</option>
        <option class="class-option" value="Ranger">Ranger</option>
        <option class="class-option" value="Rogue">Rogue</option>
        <option class="class-option" value="Sorcerer">Sorcerer</option>
        <option class="class-option" value="Warlock">Warlock</option>
        <option class="class-option" value="Wizard">Wizard</option>
      </select>
    </label>
    <fieldset id="spells-fieldset">
        <legend>Select Spells</legend>
        <div id="spells-selection"></div>
    </fieldset>
    <input type="submit" id="create-character" value="Create Character">
  </form>
  `;
  generateOptions();
  characterDialog.showModal();
  submitForm();
  closeModal.addEventListener("click", () => {
    characterDialog.close();
  });
}

function generateOptions() {
  document.querySelector("#class").addEventListener("input", () => {
    // console.log("clicked");
    document.getElementById("spells-selection").innerHTML = "";
    spellsByClass();
  });
}

//dynamically generate spell selection based on class selected
async function spellsByClass() {
  const spellsList = await getSpellsData();
  const searchValue = document.getElementById("class").value;
  // const spellIndexes = [];
  const spellByClass = await getSpellClass(searchValue);

  spellByClass.forEach((spell) => {
    const optionLabel = document.createElement("label");
    const options = document.createElement("input");

    options.setAttribute("type", "checkbox");
    options.setAttribute("name", "spells");
    options.setAttribute("value", spell);
    optionLabel.appendChild(options);
    optionLabel.appendChild(document.createTextNode(spell));
    document.getElementById("spells-selection").appendChild(optionLabel);
    // options.value = spell;
    // options.textContent = spell;
    // document.getElementById("spells").appendChild(options);
  });
}

async function getSpellClass(searchValue) {
  const specificSpell = await getClassSpellsData(searchValue.toLowerCase());
  let list = [];
  specificSpell.results.forEach((spell) => {
    list.push(spell.name);
  });
  // console.log(list);
  return list;
}

//Prevent default submission
function submitForm() {
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    // const characterData = {};
    const inputName = event.target.querySelector("#name");
    const selectedClass = event.target.querySelector("select");
    const selectedSpells = event.target.querySelectorAll("input[type='checkbox']:checked");

    // console.log(selectedClass.value);
    let spellList = [];

    // console.log(selectedSpells);
    selectedSpells.forEach((spell) => {
      spellList.push(spell.value);
    });
    const characterObject = createCharacterObject(inputName.value, selectedClass.value, spellList);
    // console.log(characterObject);
    //Check characters already created.
    const characterList = getLocalStorage("characterList") || [];
    characterList.push(characterObject);
    setLocalStorage("characterList", characterList);

    createOwnedCharactersList();

    // let character = {};
  });
}

function createCharacterObject(name, charClass, spellList) {
  const characterData = {};
  characterData.name = name;
  characterData.class = charClass;
  characterData.spells = spellList;

  return characterData;
}

export function createOwnedCharactersList() {
  const ownedCharactersContainer = document.querySelector("#owned-characters");
  const characters = getLocalStorage("characterList");
  ownedCharactersContainer.innerHTML = "";

  if (characters === null || characters.length === 0 || characters === undefined) {
    ownedCharactersContainer.innerHTML = `
    <h1>You don't own any characters</h1>
    `;
  } else {
    characters.forEach((character) => {
      const characterCard = document.createElement("div");
      characterCard.classList.add("character-card");

      characterCard.innerHTML = `
        <h2>${character.name}</h2>
        <h3>${character.class}</h3>
        <p><span>Spells: </span>${character.spells}</p>
      `;
      ownedCharactersContainer.appendChild(characterCard);
    });
  }
}
