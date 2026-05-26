// VELOUR — Main JavaScript
// Features: Cart, Wishlist, Mobile menu, Product interaction, Checkout

// ===== PRODUCTS DATABASE =====
const productsData = [
  {
    id: 1,
    name: 'The Charmeuse Slip Dress',
    brand: 'VELOUR Atelier',
    category: 'Dresses',
    price: 1890,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    description: 'Cut on the bias from pure charmeuse silk, this slip dress moves with the body in a way that no other fabric allows. Ivory and deep sand tones. Hand-finished hem.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['ivory', 'sand', 'stone'],
    details: 'Pure charmeuse silk, bias-cut for natural drape. Adjustable spaghetti straps, side seam zip. The cut whispers — the fabric speaks. Worn alone or layered under the Belted Coat.',
    care: 'Dry clean only. Store flat in the garment bag provided.',
    shipping: 'Complimentary worldwide shipping. Delivered in 3–5 business days in signature packaging.'
  },
  {
    id: 2,
    name: 'Cashmere Long-Sleeve Tee',
    brand: 'VELOUR Essentials',
    category: 'Tops',
    price: 1195,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    description: 'Grade-A cashmere from Inner Mongolia, knitted to a precise 16-gauge. The kind of top that makes everything else feel unnecessary. Available in chalk, camel, and deep ecru.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['chalk', 'camel', 'ecru'],
    details: '100% Grade-A Mongolian cashmere. 16-gauge fine knit. Relaxed through the body, slightly cropped. The ribbed cuffs and hem finish with quiet precision.',
    care: 'Hand wash in cold water with cashmere shampoo. Lay flat to dry.',
    shipping: 'Complimentary worldwide shipping. Delivered in 3–5 business days in signature packaging.'
  },
  {
    id: 3,
    name: 'Tailored Trousers — Bone Wool',
    brand: 'VELOUR Studio',
    category: 'Bottoms',
    price: 1590,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
    description: 'High-rise, wide through the thigh, tapered at the ankle. Woven from superfine merino in bone white. The trouser that justifies owning nothing else.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['bone', 'dark navy', 'charcoal'],
    details: 'Superfine merino wool, 130s weight. High-rise waist with concealed hook-and-bar closure. Wide-leg silhouette — press crease front. Lined to the knee.',
    care: 'Dry clean recommended. Steam to refresh between wears.',
    shipping: 'Complimentary worldwide shipping. Delivered in 3–5 business days in signature packaging.'
  },
  {
    id: 4,
    name: 'The Belted Coat — Camel',
    brand: 'VELOUR Atelier',
    category: 'Outerwear',
    price: 3290,
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80',
    description: 'Oversized camel coat in a wool-cashmere blend sourced from Biella. Drop shoulders, single-button closure, self-tie belt. The coat that builds a wardrobe around itself.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['camel', 'ecru', 'dark'],
    details: '70% wool, 30% cashmere. Biella-woven cloth. Drop-shoulder construction, structured enough to hold its shape after a decade. Fully lined in silk twill. Made in Italy.',
    care: 'Dry clean only. Brush gently between wears. Store on a padded hanger.',
    shipping: 'Complimentary worldwide shipping. Delivered in 3–5 business days in signature packaging.'
  },
  {
    id: 5,
    name: 'The Merino Crewneck — Sage',
    brand: 'VELOUR Essentials',
    category: 'Tops',
    price: 895,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
    description: 'Extra-fine merino in a muted sage. Relaxed fit, ribbed trim, minimalist in every way. The sweater that disappears into an outfit and makes the whole thing work.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['sage', 'stone', 'ivory'],
    details: '100% extra-fine merino, 18.5 micron. Garment-dyed for colour depth. Relaxed, boxy fit. Ribbed collar, cuffs and hem. A wardrobe constant.',
    care: 'Machine wash gentle cycle, cold. Lay flat to dry.',
    shipping: 'Complimentary worldwide shipping. Delivered in 3–5 business days in signature packaging.'
  },
  {
    id: 6,
    name: 'Fluid Trousers — Linen Taupe',
    brand: 'VELOUR Studio',
    category: 'Bottoms',
    price: 1125,
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&q=80',
    description: 'Wide-leg linen trousers in a warm taupe. The linen is washed three times before cutting — for softness without weight. Elastic waistband hidden by a wide sash tie.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['taupe', 'ecru', 'navy'],
    details: 'Triple-washed linen, 100% pure. Wide-leg silhouette, mid-rise. Elasticated waist with a self-fabric sash tie that can be worn front or back. Side seam pockets.',
    care: 'Machine wash cold. Tumble dry low. Iron while slightly damp.',
    shipping: 'Complimentary worldwide shipping. Delivered in 3–5 business days in signature packaging.'
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

// ===== COLOR PALETTE & BADGE DISTRIBUTION =====
const colorPalette = {
  'blush': '#e8d5c4',
  'ivory': '#f5f0e8',
  'sage': '#c8cca6',
  'terracotta': '#cc7755',
  'dusty-rose': '#c9a0a0',
  'cream': '#f0e6d3'
};

function getBadgeForProduct(index, totalProducts) {
  const firstThird = Math.ceil(totalProducts / 3);
  const middleThird = firstThird * 2;

  if (index < 2) return 'badge-new';
  if (index < middleThird && index >= 2) return index % 2 === 0 ? 'badge-sale' : null;
  if (index >= middleThird) return index % 3 === 0 ? 'badge-limited' : null;
  return null;
}

function getProductColors(productId) {
  const colorOptions = [
    ['blush', 'ivory', 'sage'],
    ['terracotta', 'cream', 'dusty-rose'],
    ['ivory', 'sage', 'cream'],
    ['dusty-rose', 'terracotta', 'ivory'],
    ['sage', 'blush', 'cream'],
    ['cream', 'ivory', 'dusty-rose']
  ];
  return colorOptions[(productId - 1) % colorOptions.length];
}

// ===== PRODUCT LISTING PAGE =====
function setupProductsPage() {
  const filterButtons = document.querySelectorAll('.filter-tabs button');
  const sortSelect = document.querySelector('.sort-select');
  const productsGrid = document.querySelector('.products-grid');

  let filteredProducts = [...productsData];

  function renderProducts(products) {
    const wishlist = Storage.getWishlist();
    productsGrid.innerHTML = products.map((product, index) => {
      const isWishlisted = wishlist.some(id => id === product.id);
      const badge = getBadgeForProduct(index, products.length);
      const colors = getProductColors(product.id);
      const maxSwatches = 3;
      const displayColors = colors.slice(0, maxSwatches);
      const extraCount = colors.length > maxSwatches ? colors.length - maxSwatches : 0;

      let badgeHtml = '';
      if (badge === 'badge-new') {
        badgeHtml = '<span class="badge badge-new">NEW</span>';
      } else if (badge === 'badge-sale') {
        badgeHtml = '<span class="badge badge-sale">SALE</span>';
      } else if (badge === 'badge-limited') {
        badgeHtml = '<span class="badge badge-limited">LIMITED</span>';
      }

      const swatchesHtml = displayColors.map(color => {
        return `<button class="color-swatch" style="background:${colorPalette[color]}" title="${color.charAt(0).toUpperCase() + color.slice(1)}"></button>`;
      }).join('');

      const swatchMoreHtml = extraCount > 0 ? `<span class="swatch-more">+${extraCount}</span>` : '';

      return `
        <div class="product-card" data-id="${product.id}" data-colors="${colors.join(',')}" data-sizes="${product.sizes.join(',')}">
          <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-image product-image-primary" loading="lazy" width="600" height="800">
            <img src="${product.image}?w=601" alt="${product.name} detail" class="product-image product-image-secondary" loading="lazy" width="600" height="800">

            ${badgeHtml ? `<div class="product-badges">${badgeHtml}</div>` : ''}

            <button class="btn-quick-add" data-id="${product.id}">Quick Add</button>
          </div>
          <div class="product-info">
            <div class="product-swatches">
              ${swatchesHtml}
              ${swatchMoreHtml}
            </div>
            <p class="product-brand">${product.brand}</p>
            <h4 class="product-name">${product.name}</h4>
            <p class="product-price">$${product.price}</p>
          </div>
        </div>
      `;
    }).join('');

    productsGrid.querySelectorAll('.btn-quick-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const original = btn.textContent;
        btn.textContent = 'Added ✓';
        btn.style.background = 'rgba(200,204,166,0.95)';
        btn.style.color = '#2D2926';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.style.color = '';
        }, 1500);
      });
    });

    productsGrid.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = swatch.closest('.product-card');
        card.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
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

// ===== FEATURED SECTION SETUP =====
function setupFeaturedSection() {
  // Add click handlers to featured items
  document.querySelectorAll('.featured-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const productId = item.dataset.id;
      if (productId) {
        window.location.href = `product-detail.html?id=${productId}`;
      }
    });
  });

  // Add color swatch handlers for featured section
  document.querySelectorAll('.featured-item .color-swatch').forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = swatch.closest('.featured-item');
      item.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
    });
  });
}

// ===== INIT =====
function init() {
  setActiveNav();
  setupMobileMenu();
  updateCartBadge();
  updateWishlistBadge();
  setupFeaturedSection();

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

// ── Announcement Bar ──
(function() {
  const BAR_KEY = 'velour_announcement_dismissed_until';
  const bar = document.getElementById('announcementBar');
  if (!bar) return;

  const dismissed = localStorage.getItem(BAR_KEY);
  if (dismissed && Date.now() < parseInt(dismissed)) {
    bar.style.display = 'none';
    return;
  }

  document.body.classList.add('has-announcement');

  const items = bar.querySelectorAll('.announcement-item');
  let current = 0;

  setInterval(function() {
    items[current].classList.remove('active');
    current = (current + 1) % items.length;
    items[current].classList.add('active');
  }, 4000);
})();

function dismissAnnouncement() {
  const bar = document.getElementById('announcementBar');
  if (bar) {
    bar.style.display = 'none';
    document.body.classList.remove('has-announcement');
  }
  localStorage.setItem('velour_announcement_dismissed_until', Date.now() + 86400000);
}

// ===== FAZ 3 — SIDEBAR FILTERS =====
(function() {
  var activeFilters = { color: [], size: [], price: null };

  function applyFilters() {
    var cards = document.querySelectorAll('.product-card');
    var visible = 0;
    cards.forEach(function(card) {
      var show = true;
      if (activeFilters.color.length > 0) {
        var cardColors = (card.dataset.colors || '').split(',').map(function(c){ return c.trim(); });
        var hasColor = activeFilters.color.some(function(c) { return cardColors.indexOf(c) !== -1; });
        if (!hasColor) show = false;
      }
      if (activeFilters.size.length > 0) {
        var cardSizes = (card.dataset.sizes || '').split(',').map(function(s){ return s.trim(); });
        var hasSize = activeFilters.size.some(function(s) { return cardSizes.indexOf(s) !== -1; });
        if (!hasSize) show = false;
      }
      if (activeFilters.price) {
        var priceEl = card.querySelector('.product-price, .price');
        if (priceEl) {
          var priceText = priceEl.textContent.replace(/[^0-9.]/g, '');
          var price = parseFloat(priceText);
          if (price < activeFilters.price.min || price > activeFilters.price.max) show = false;
        }
      }
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    var countEl = document.querySelector('.filter-results-count');
    if (countEl) countEl.textContent = visible + ' products';
  }

  document.querySelectorAll('.filter-swatch').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var val = this.dataset.value;
      var idx = activeFilters.color.indexOf(val);
      if (idx === -1) { activeFilters.color.push(val); this.classList.add('active'); }
      else { activeFilters.color.splice(idx, 1); this.classList.remove('active'); }
      applyFilters();
    });
  });

  document.querySelectorAll('.filter-size').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var val = this.dataset.value;
      var idx = activeFilters.size.indexOf(val);
      if (idx === -1) { activeFilters.size.push(val); this.classList.add('active'); }
      else { activeFilters.size.splice(idx, 1); this.classList.remove('active'); }
      applyFilters();
    });
  });

  document.querySelectorAll('.filter-price').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var isActive = this.classList.contains('active');
      document.querySelectorAll('.filter-price').forEach(function(b) { b.classList.remove('active'); });
      if (isActive) { activeFilters.price = null; }
      else {
        this.classList.add('active');
        activeFilters.price = { min: parseFloat(this.dataset.min), max: parseFloat(this.dataset.max) };
      }
      applyFilters();
    });
  });

  var clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      activeFilters = { color: [], size: [], price: null };
      document.querySelectorAll('.filter-swatch,.filter-size,.filter-price').forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.product-card').forEach(function(c) { c.classList.remove('hidden'); });
      var countEl = document.querySelector('.filter-results-count');
      if (countEl) countEl.textContent = document.querySelectorAll('.product-card').length + ' products';
    });
  }

  var grid = document.querySelector('.products-grid, .product-grid');
  if (grid) {
    var countEl = document.createElement('div');
    countEl.className = 'filter-results-count';
    countEl.textContent = document.querySelectorAll('.product-card').length + ' products';
    grid.parentNode.insertBefore(countEl, grid);
  }
})();
