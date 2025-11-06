const container = document.getElementById("productsContainer");
const cartCount = document.getElementById("cartCount");
const cartPopup = document.getElementById("cartPopup");
const cartList = document.getElementById("cartList");
const viewAllBtn = document.getElementById("viewAllBtn");
const cartIcon = document.getElementById("cartIcon");


document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = cart.index;
  }

  const cartItemsContainer = document.getElementById("cartItems");
  if (cartItemsContainer && cart.length > 0) {
    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
      <li class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <h4>${item.name}</h4>
          <p>Price: $${item.price}</p>
          <p>Qty: ${item.quantity}</p>
        </div>
      </li>`
      )
      .join("");
  }

  const favContainer = document.getElementById("favoriteItems");
  if (favContainer && favorites.length > 0) {
    favContainer.innerHTML = favorites
      .map(
        (f, index) => `
      <li class="fav-item">
        <img src="${f.image}" alt="${f.name}">
        <span>${f.name}</span>
        <button onclick="removeFavorite(${index})" class="fav-remove">
          <i class="fa-solid fa-heart-circle-xmark"></i>
        </button>
      </li>`
      )
      .join("");
  }
});


const products = [
  { name: "Golden Watch", price: 400, category: "Watches", image: "https://images.unsplash.com/photo-1636289039346-ac54cc941975?auto=format&fit=crop&q=80&w=600" },
  { name: "Silver Necklace", price: 150, category: "Necklace", image: "https://images.unsplash.com/photo-1610661022658-5068c4d8f286?auto=format&fit=crop&q=80&w=600" },
  { name: "Golden Earrings", price: 200, category: "Earrings", image: "https://images.unsplash.com/photo-1758995115555-766abbd9a491?auto=format&fit=crop&q=80&w=600" },
  { name: "Diamond Ring", price: 500, category: "Rings", image: "https://images.unsplash.com/photo-1589674668791-4889d2bba4c6?auto=format&fit=crop&q=80&w=600" },
  { name: "RoseGold Watch", price: 450, category: "Watches", image: "https://images.unsplash.com/photo-1587947330324-9180f3f1fe70?auto=format&fit=crop&q=80&w=600" },
  { name: "Black Necklace", price: 180, category: "Necklace", image: "https://images.unsplash.com/photo-1665275283091-d4dabb80bef1?auto=format&fit=crop&q=80&w=600" },
  { name: "Pearl Earrings", price: 220, category: "Earrings", image: "https://images.unsplash.com/photo-1579006370572-e51790bfe1e3?auto=format&fit=crop&q=80&w=600" },
  { name: "Silver Bracelet", price: 250, category: "Bracelets", image: "https://images.unsplash.com/photo-1725368844213-c167fe556f98?auto=format&fit=crop&q=80&w=600" },
  { name: "Luxury Ring", price: 600, category: "Rings", image: "https://images.unsplash.com/photo-1742240439165-60790db1ee93?auto=format&fit=crop&q=80&w=600" },
  { name: "Silver Ring", price: 440, category: "Rings", image: "https://images.pexels.com/photos/10361481/pexels-photo-10361481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { name: "Diamond Ring", price: 250, category: "Rings", image: "https://images.pexels.com/photos/9953654/pexels-photo-9953654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  { name: "Silver Watch", price: 350, category: "Watches", image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

renderProducts(products);
updateCartCount();

function renderProducts(items) {
  container.innerHTML = "";
  items.forEach(p => {
    const inCart = cart.find(item => item.name === p.name);
    const isFav = favorites.find(f => f.name === p.name);

    container.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Price: $${p.price}</p>
        <p>Category: ${p.category}</p>
        <div class="actions">
          <button class="cart-btn" onclick='toggleCart(${JSON.stringify(p).replace(/"/g, "&quot;")})'>
            ${inCart ? "Remove from Cart" : "Add to Cart"}
          </button>
          <button class="fav-btn ${isFav ? "active" : ""}" onclick='toggleFavorite(${JSON.stringify(p).replace(/"/g, "&quot;")})'>
            ${isFav ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    `;
  });
}

function toggleCart(product) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "register.html";
    return;
  }

  const existing = cart.find(p => p.name === product.name);
  if (existing) {
    cart = cart.filter(p => p.name !== product.name);
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderProducts(products);
  renderCartList();
}

function toggleFavorite(product) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "register.html";
    return;
  }

  const existing = favorites.find(f => f.name === product.name);
  if (existing) {
    favorites = favorites.filter(f => f.name !== product.name);
  } else {
    favorites.push(product);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderProducts(products);
  renderCartList();
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}

cartIcon.addEventListener("click", () => {
  cartPopup.classList.toggle("hidden");
  renderCartList();
});

function renderCartList() {
  cartList.innerHTML = "";
  const favList = document.getElementById("favoriteItems");
  favList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    cartList.innerHTML += `
      <li>
        ${item.name} - $${item.price} × ${item.quantity}
        <div>
          <button onclick="changeQty('${item.name}', 1)">+</button>
          <button onclick="changeQty('${item.name}', -1)">-</button>
        </div>
      </li>
    `;
  });

  document.getElementById("totalPrice").textContent = total.toFixed(2);

  favorites.forEach(f => {
    favList.innerHTML += `<li>${f.name}</li>`;
  });

  if (cart.length > 0) {
    viewAllBtn.classList.remove("hidden");
  } else {
    viewAllBtn.classList.add("hidden");
  }
}

function changeQty(name, delta) {
  const item = cart.find(p => p.name === name);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartList();
}

viewAllBtn.addEventListener("click", () => {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("favorites", JSON.stringify(favorites));
  window.location.href = "cart.html";
});

const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
    renderProducts(filtered);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const welcomeMsg = document.getElementById("welcomeMsg");
  const cartIcon = document.getElementById("cartIcon");
  const logoutBtn = document.getElementById("logoutBtn"); 

  if (user) {
    if (welcomeMsg) {
      welcomeMsg.textContent = `Hello, ${user.username || "User"} 👋`;
      welcomeMsg.style.display = "inline-block";
      welcomeMsg.style.color = "#fff";

    }

    if (cartIcon) {
      cartIcon.style.display = "inline-block";
    }

    if (logoutBtn) {
      logoutBtn.style.display = "inline-block";
      logoutBtn.style.cursor = "pointer";
      logoutBtn.style.color = "#000000";
      logoutBtn.style.fontWeight = "bold";
      logoutBtn.style.backgroundColor = "#D4AF37";
      logoutBtn.style.border = "none";
      logoutBtn.style.padding = "8px 16px";
      logoutBtn.style.borderRadius = "4px";
      logoutBtn.addEventListener("mouseover", () => {
        logoutBtn.style.backgroundColor = "#D4AF37";
        logoutBtn.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.15)";
        logoutBtn.style.transition = "background-color 0.3s, box-shadow 0.3s";
      });
    }

  } else {
    if (welcomeMsg) {
      welcomeMsg.style.display = "none";
    }

    if (cartIcon) {
      cartIcon.style.display = "none";
    }

    if (logoutBtn) {
      logoutBtn.style.display = "none";
    }

    if(cartCount) {
      cartCount.style.display = "none";
    }
  }
});


