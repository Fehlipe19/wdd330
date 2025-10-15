import { getSpellsData, getSpecificSpell, dndURL } from "./api.mjs";

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
    console.log(linkPage);
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
  console.log(spellsList);
  //   const specificSpell = getSpecificSpell(spell.url);

  spellsList.results.forEach((spell) => {
    const spellCard = document.createElement("div");
    spellCard.classList.add("spell-card");
    spellCard.innerHTML = `
      <h3>${spell.name}</h3>
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
