// VELOUR — Main JavaScript
// Features: Cart, Wishlist, Mobile menu, Product interaction, Checkout

// ===== PRODUCTS DATABASE =====
const productsData = [
  {
    id: 1,
    name: 'Silk Blend Midi Dress',
    brand: 'VELOUR Essence',
    category: 'Dresses',
    price: 248,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    description: 'Elegant midi dress in soft silk blend fabric. Features delicate draping and a refined silhouette.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['cream', 'rose', 'beige', 'dark'],
    details: 'This timeless silk blend dress exudes effortless elegance. Perfect for both day and evening occasions.',
    care: 'Dry clean only. Do not bleach. Hang to dry.',
    shipping: 'Free shipping on orders over $150. Standard delivery 5-7 business days.'
  },
  {
    id: 2,
    name: 'Cashmere Fitted Top',
    brand: 'VELOUR Premium',
    category: 'Tops',
    price: 178,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    description: 'Luxurious cashmere top with a fitted silhouette. A wardrobe essential.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['cream', 'rose', 'beige'],
    details: 'Crafted from premium cashmere, this top offers unparalleled softness and comfort.',
    care: 'Hand wash in cold water. Lay flat to dry.',
    shipping: 'Free shipping on orders over $150. Standard delivery 5-7 business days.'
  },
  {
    id: 3,
    name: 'Wide-Leg Trousers',
    brand: 'VELOUR Studio',
    category: 'Bottoms',
    price: 198,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
    description: 'Contemporary wide-leg trousers in premium linen. Comfortable yet sophisticated.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['beige', 'dark'],
    details: 'The perfect balance of comfort and style. Ideal for creating a polished everyday look.',
    care: 'Machine wash in cold water. Tumble dry on low.',
    shipping: 'Free shipping on orders over $150. Standard delivery 5-7 business days.'
  },
  {
    id: 4,
    name: 'Wool Blend Coat',
    brand: 'VELOUR Couture',
    category: 'Outerwear',
    price: 358,
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80',
    description: 'Luxurious wool blend coat with refined tailoring. A timeless investment piece.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['dark', 'beige'],
    details: 'This season\'s must-have coat combines comfort with elegance. Perfect layering piece.',
    care: 'Dry clean only.',
    shipping: 'Free shipping on orders over $150. Standard delivery 5-7 business days.'
  },
  {
    id: 5,
    name: 'Linen Slip Dress',
    brand: 'VELOUR Essence',
    category: 'Dresses',
    price: 168,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    description: 'Breezy linen slip dress perfect for warm seasons. Minimalist and chic.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['cream', 'rose'],
    details: 'The ultimate wardrobe staple. Versatile and effortlessly elegant.',
    care: 'Machine wash in cold water. Iron on medium heat if needed.',
    shipping: 'Free shipping on orders over $150. Standard delivery 5-7 business days.'
  },
  {
    id: 6,
    name: 'Ribbed Knit Sweater',
    brand: 'VELOUR Premium',
    category: 'Tops',
    price: 148,
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80',
    description: 'Soft ribbed knit sweater with subtle texture. A versatile layering piece.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['cream', 'beige', 'rose'],
    details: 'Perfect for layering or wearing on its own. Premium soft yarn ensures comfort all day.',
    care: 'Hand wash in cold water. Lay flat to dry.',
    shipping: 'Free shipping on orders over $150. Standard delivery 5-7 business days.'
  }
];

// ===== CART & WISHLIST MANAGEMENT =====
class Storage {
  static getCart() {
    return JSON.parse(localStorage.getItem('velour_cart')) || [];
  }

  static setCart(cart) {
    localStorage.setItem('velour_cart', JSON.stringify(cart));
  }

  static getWishlist() {
    return JSON.parse(localStorage.getItem('velour_wishlist')) || [];
  }

  static setWishlist(wishlist) {
    localStorage.setItem('velour_wishlist', JSON.stringify(wishlist));
  }
}

// ===== NOTIFICATIONS =====
function showNotification(message) {
  const existing = document.querySelector('.velour-notification');
  if (existing) existing.remove();

  const notif = document.createElement('div');
  notif.className = 'velour-notification';
  notif.textContent = message;
  document.body.appendChild(notif);

  requestAnimationFrame(() => {
    notif.classList.add('show');
    setTimeout(() => {
      notif.classList.remove('show');
      setTimeout(() => notif.remove(), 350);
    }, 2200);
  });
}

// ===== MOBILE MENU =====
function setupMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }
}

// ===== ACTIVE NAV LINK =====
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ===== WISHLIST BADGE =====
function updateWishlistBadge() {
  const wishlist = Storage.getWishlist();
  const count = wishlist.length;

  // Inject wishlist nav icon once if not present
  if (!document.querySelector('.wishlist-nav-icon')) {
    const navIcons = document.querySelector('.nav-icons');
    if (navIcons) {
      const wishlistLink = document.createElement('a');
      wishlistLink.href = '#';
      wishlistLink.title = 'Wishlist';
      wishlistLink.className = 'wishlist-nav-icon';
      wishlistLink.innerHTML = `<span class="wishlist-heart">♡</span><span class="wishlist-badge" style="display:none;"></span>`;
      navIcons.insertBefore(wishlistLink, navIcons.firstChild);
    }
  }

  const badge = document.querySelector('.wishlist-badge');
  const heart = document.querySelector('.wishlist-heart');
  if (badge) {
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }
  if (heart) {
    heart.textContent = count > 0 ? '♥' : '♡';
  }
}

// ===== CART ICON BADGE =====
function updateCartBadge() {
  const cart = Storage.getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.querySelector('.cart-badge');

  if (badge) {
    if (totalItems > 0) {
      badge.textContent = totalItems;
      badge.style.display = 'inline-flex';
    } else {
      badge.style.display = 'none';
    }
  }
}

// ===== PRODUCT LISTING PAGE =====
function setupProductsPage() {
  const filterButtons = document.querySelectorAll('.filter-tabs button');
  const sortSelect = document.querySelector('.sort-select');
  const productsGrid = document.querySelector('.products-grid');

  let filteredProducts = [...productsData];

  function renderProducts(products) {
    const wishlist = Storage.getWishlist();
    productsGrid.innerHTML = products.map(product => {
      const isWishlisted = wishlist.some(id => id === product.id);
      return `
        <div class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy" width="600" height="800">
            <button class="quick-view" data-product-id="${product.id}">QUICK VIEW</button>
            <div class="wishlist-icon${isWishlisted ? ' active' : ''}" data-product-id="${product.id}">${isWishlisted ? '♥' : '♡'}</div>
          </div>
          <div class="product-info">
            <p class="product-brand">${product.brand}</p>
            <h4 class="product-name">${product.name}</h4>
            <p class="product-price">$${product.price}</p>
          </div>
        </div>
      `;
    }).join('');

    productsGrid.querySelectorAll('.quick-view').forEach(btn => {
      btn.addEventListener('click', () => goToProduct(parseInt(btn.dataset.productId)));
    });
    productsGrid.querySelectorAll('.wishlist-icon').forEach(icon => {
      icon.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(parseInt(icon.dataset.productId));
      });
    });
  }

  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const category = button.dataset.category;
        if (category === 'all') {
          filteredProducts = [...productsData];
        } else {
          filteredProducts = productsData.filter(p => p.category === category);
        }

        renderProducts(filteredProducts);
      });
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const value = sortSelect.value;
      if (value === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (value === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (value === 'newest') {
        filteredProducts = [...productsData].sort((a, b) => b.id - a.id);
      }
      renderProducts(filteredProducts);
    });
  }

  renderProducts(filteredProducts);
}

// ===== PRODUCT DETAIL PAGE =====
function setupProductDetail(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  // Gallery
  const galleryThumbs = document.querySelectorAll('.gallery-thumb');
  const galleryMain = document.querySelector('.gallery-main img');

  galleryThumbs.forEach((thumb, index) => {
    if (index === 0) thumb.classList.add('active');
    thumb.addEventListener('click', () => {
      galleryThumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (galleryMain) {
        galleryMain.src = product.image;
      }
    });
  });

  // Size & Color selectors
  const sizePills = document.querySelectorAll('.size-pill');
  const colorCircles = document.querySelectorAll('.color-circle');
  let selectedSize = null;
  let selectedColor = null;

  sizePills.forEach(pill => {
    pill.addEventListener('click', () => {
      sizePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedSize = pill.textContent;
    });
  });

  colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
      colorCircles.forEach(c => c.classList.remove('active'));
      circle.classList.add('active');
      selectedColor = circle.dataset.color || circle.className.match(/color-(\w+)/)?.[1];
    });
  });

  // Add to cart
  const addToCartBtn = document.querySelector('.add-to-cart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      if (!selectedSize) {
        alert('Please select a size');
        return;
      }
      const cart = Storage.getCart();
      const existingItem = cart.find(item => item.id === product.id && item.size === selectedSize && item.color === selectedColor);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: selectedSize,
          color: selectedColor || product.colors[0],
          quantity: 1
        });
      }

      Storage.setCart(cart);
      updateCartBadge();
      alert('Added to cart!');
    });
  }

  // Wishlist
  const wishlistBtn = document.querySelector('.wishlist-btn');
  if (wishlistBtn) {
    const wishlist = Storage.getWishlist();
    const isWishlisted = wishlist.includes(product.id);
    wishlistBtn.classList.toggle('active', isWishlisted);
    wishlistBtn.textContent = isWishlisted ? '♥  WISHLISTED' : '♡  WISHLIST';
    wishlistBtn.addEventListener('click', () => toggleWishlist(product.id));
  }

  // Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(`tab-${tabName}`).classList.add('active');
    });
  });
}

function goToProduct(productId) {
  window.location.href = `product-detail.html?id=${productId}`;
}

function toggleWishlist(productId) {
  const wishlist = Storage.getWishlist();
  const index = wishlist.indexOf(productId);
  const isAdding = index === -1;

  if (isAdding) {
    wishlist.push(productId);
  } else {
    wishlist.splice(index, 1);
  }

  Storage.setWishlist(wishlist);
  updateWishlistBadge();

  // Update product grid icons
  document.querySelectorAll(`.wishlist-icon[data-product-id="${productId}"]`).forEach(icon => {
    icon.classList.toggle('active', isAdding);
    icon.textContent = isAdding ? '♥' : '♡';
  });

  // Update detail page wishlist button
  const wishlistBtn = document.querySelector('.wishlist-btn');
  if (wishlistBtn) {
    wishlistBtn.classList.toggle('active', isAdding);
    wishlistBtn.textContent = isAdding ? '♥  WISHLISTED' : '♡  WISHLIST';
  }

  showNotification(isAdding ? 'Added to wishlist' : 'Removed from wishlist');
}

// ===== CART PAGE =====
function setupCartPage() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cart = Storage.getCart();

  function renderCart() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p><a href="products.html" class="btn">Continue Shopping</a></div>';
      updateTotals();
      return;
    }

    cartItemsContainer.innerHTML = `
      <div class="cart-header">
        <div>Product</div>
        <div>Size</div>
        <div>Quantity</div>
        <div>Price</div>
        <div></div>
      </div>
      ${cart.map((item, index) => `
        <div class="cart-item">
          <div>
            <div class="cart-item-image">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-meta">Color: ${item.color || 'N/A'}</div>
            </div>
          </div>
          <div>${item.size}</div>
          <div>
            <div class="quantity-control">
              <button onclick="updateQuantity(${index}, -1)">−</button>
              <input type="number" value="${item.quantity}" readonly>
              <button onclick="updateQuantity(${index}, 1)">+</button>
            </div>
          </div>
          <div>$${(item.price * item.quantity).toFixed(2)}</div>
          <button class="remove-btn" onclick="removeFromCart(${index})">✕</button>
        </div>
      `).join('')}
    `;
  }

  function updateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 150 ? 0 : 10;
    const total = subtotal + shipping;

    const shippingProgress = Math.min((subtotal / 150) * 100, 100);
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      progressFill.style.width = shippingProgress + '%';
    }

    const summaryRows = document.querySelectorAll('.summary-row');
    if (summaryRows.length >= 3) {
      summaryRows[0].innerHTML = `<span>Subtotal</span><span>$${subtotal.toFixed(2)}</span>`;
      summaryRows[1].innerHTML = `<span>Shipping</span><span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>`;
      summaryRows[2].innerHTML = `<span>Total</span><span>$${total.toFixed(2)}</span>`;
    }
  }

  renderCart();
  updateTotals();
}

function updateQuantity(index, change) {
  const cart = Storage.getCart();
  cart[index].quantity += change;
  if (cart[index].quantity < 1) {
    cart.splice(index, 1);
  }
  Storage.setCart(cart);
  setupCartPage();
  updateCartBadge();
}

function removeFromCart(index) {
  const cart = Storage.getCart();
  cart.splice(index, 1);
  Storage.setCart(cart);
  setupCartPage();
  updateCartBadge();
}

// ===== CHECKOUT PAGE =====
function setupCheckoutPage() {
  const cart = Storage.getCart();
  const orderItems = document.querySelector('.order-items');

  if (orderItems) {
    orderItems.innerHTML = cart.map(item => `
      <div class="order-item">
        <div class="order-item-name">${item.name} (${item.size}) × ${item.quantity}</div>
        <div>$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    `).join('');
  }

  // Update summary
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 10;
  const total = subtotal + shipping;

  const summaryRows = document.querySelectorAll('.order-summary .summary-row');
  if (summaryRows.length >= 3) {
    summaryRows[0].innerHTML = `<span>Subtotal</span><span>$${subtotal.toFixed(2)}</span>`;
    summaryRows[1].innerHTML = `<span>Shipping</span><span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>`;
    summaryRows[2].innerHTML = `<span>Total</span><span>$${total.toFixed(2)}</span>`;
  }

  // Complete order button
  const completeBtn = document.querySelector('.complete-order-btn');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      const form = document.querySelector('form');
      if (form && !form.checkValidity()) {
        alert('Please fill in all required fields');
        return;
      }
      alert('Order placed successfully!');
      Storage.setCart([]);
      updateCartBadge();
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }
}

// ===== INIT =====
function init() {
  setActiveNav();
  setupMobileMenu();
  updateCartBadge();
  updateWishlistBadge();

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (currentPage === 'products.html') {
    setupProductsPage();
  } else if (currentPage === 'product-detail.html') {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id')) || 1;
    setupProductDetail(productId);
  } else if (currentPage === 'cart.html') {
    setupCartPage();
  } else if (currentPage === 'checkout.html') {
    setupCheckoutPage();
  }
}

document.addEventListener('DOMContentLoaded', init);
