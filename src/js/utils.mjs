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
