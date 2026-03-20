// Array de los productos de la tienda
const productos = [
  {
    id: 1,
    nombre: "Lámpara",
    precio: 45,
    categoria: "Hogar",
    stock: 12,
  },
  {
    id: 2,
    nombre: "Silla de Roble",
    precio: 120,
    categoria: "Muebles",
    stock: 5,
  },
  {
    id: 3,
    nombre: "Reloj Minimal",
    precio: 85,
    categoria: "Accesorios",
    stock: 0,
  },
  {
    id: 4,
    nombre: "Escritorio Studio",
    precio: 210,
    categoria: "Muebles",
    stock: 3,
  },
  {
    id: 5,
    nombre: "Velas con aroma",
    precio: 18,
    categoria: "Hogar",
    stock: 20,
  },
  {
    id: 6,
    nombre: "Cuaderno Eco",
    precio: 12,
    categoria: "Papelería",
    stock: 50,
  },
];

// Mapa para las secciones de la página: sección[nombre] = descripción
const seccionesInfo = new Map([
  [
    "home",
    "Bienvenido a mi tienda con colecciones para un estilo de vida minimalista.",
  ],
  ["shop", "Nuestros productos esenciales."],
  ["contact", "Estamos aquí para escucharte."],
]);

// Obtener todas las categorias disponibles
const categoriasUnicas = new Set(productos.map((p) => p.categoria));

// Elementos del DOM
const navContainer = document.getElementById("navbar");
const appContainer = document.getElementById("app");

// Funcion para limpiar el contenedor principal de la app
function clearApp() {
  while (appContainer.firstChild) {
    appContainer.removeChild(appContainer.firstChild);
  }
}

// Construir la barra de navegación
function buildNav() {
  const navItems = ["Home", "Shop", "Contact"];
  for (const item of navItems) {
    const link = document.createElement("a");
    link.textContent = item;
    link.onclick = () => navigateTo(item.toLowerCase());
    navContainer.appendChild(link);
  }
}

// Vincular las secciones usando un switch
function navigateTo(section) {
  clearApp(); // Limpiar contenedor

  // Add a hero section common to all
  const hero = document.createElement("div");
  hero.className = "hero";

  const title = document.createElement("h1");
  title.textContent = section.toUpperCase();
  hero.appendChild(title);

  const description = document.createElement("p");
  description.textContent = seccionesInfo.get(section);
  hero.appendChild(description);

  appContainer.appendChild(hero);

  // Dynamic routing logic
  switch (section) {
    case "home":
      renderHome();
      break;
    case "shop":
      renderShop();
      break;
    case "contact":
      renderContact();
      break;
    default:
      renderHome();
  }
}

// Renderizar la página principal
function renderHome() {
  const banner = document.createElement("div");
  banner.innerHTML = `<p style="text-align: center; font-style: italic;">"Menos es más."</p>`;
  appContainer.appendChild(banner);
}

// Renderizar la sección de la tienda
function renderShop() {
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 0; i < productos.length; i++) {
    const product = productos[i];

    if (product.stock >= 0) {
      const card = document.createElement("div");
      card.className = "card";

      const stockStatus =
        product.stock === 0
          ? '<span style="color: red; font-size: 0.7rem;"> (Agotado)</span>'
          : "";

      card.innerHTML = `
                <span class="category">${product.categoria}</span>
                <h3>${product.nombre}${stockStatus}</h3>
                <p class="price">$${product.precio}</p>
                <button ${product.stock === 0 ? 'disabled style="opacity: 0.5"' : ""}>
                    ${product.stock > 0 ? "Añadir" : "Sin Stock"}
                </button>
            `;
      grid.appendChild(card);
    }
  }
  appContainer.appendChild(grid);
}

// Renderizar la sección de contacto
function renderContact() {
  const form = document.createElement("form");
  form.className = "contact-form";
  form.innerHTML = `
        <input type="text" placeholder="Nombre completo" required>
        <input type="email" placeholder="Correo electrónico" required>
        <textarea placeholder="Mensaje" rows="5" required></textarea>
        <button type="submit">Enviar Mensaje</button>
    `;

  form.onsubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado. Nos pondremos en contacto pronto.");
  };

  appContainer.appendChild(form);
}

function init() {
  buildNav();
  navigateTo("home");
}

init();
