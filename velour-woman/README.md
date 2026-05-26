# VELOUR — Soft Elegant Women's Fashion Demo Site

A luxury fashion e-commerce demo site showcasing elegant design, smooth interactions, and full shopping functionality.

## Features

**Design**
- Soft, elegant aesthetic with luxury editorial styling
- Color palette: Cream (#f5f0e8), Rose Dust (#d4a0a0), Beige (#c8b89a), Deep Rose (#b07c7c)
- Typography: Cormorant Garamond (serif headers) + Lato (body text)
- Abundant whitespace and subtle refinement throughout

**Functionality**
- Full shopping experience: Browse → Product Detail → Cart → Checkout
- LocalStorage-based cart system (persists across sessions)
- Wishlist feature with heart toggle
- Product filtering by category
- Sort by: Newest, Price (Low-High, High-High)
- Responsive design: Mobile, Tablet, Desktop
- Mobile hamburger menu
- Active navigation links

**Pages**
1. **index.html** — Hero section, category grid, Instagram feed, media logos
2. **products.html** — Product listing with filters and sorting
3. **product-detail.html** — Full product details, gallery, size/color selection, tabs, recommendations
4. **cart.html** — Shopping cart with quantity adjustment, order summary
5. **checkout.html** — Multi-step checkout form with progress indicator
6. **about.html** — Brand story, values, founder section
7. **contact.html** — Contact form + business information

## Technical Details

**Files**
- `index.html` - Main homepage
- `style.css` - All styling (24KB, responsive grid layout)
- `main.js` - Cart management, product interactions, mobile menu (17KB)
- Additional pages: products.html, product-detail.html, cart.html, checkout.html, about.html, contact.html

**No Dependencies**
- Pure vanilla JavaScript
- No frameworks or libraries
- Google Fonts (Cormorant Garamond, Lato)
- Unsplash image URLs (direct links)

**LocalStorage Keys**
- `velour_cart` — Shopping cart items
- `velour_wishlist` — Wishlist product IDs

**Responsive Breakpoints**
- Desktop: 1400px max-width
- Tablet: 1024px
- Mobile: 768px
- Small Mobile: 480px

## How to Use

1. Open `index.html` in any modern browser
2. Browse products on Shop page
3. Click product to view details
4. Select size/color and add to cart
5. View cart and proceed to checkout
6. Form submission shows success message and clears cart

## Product Database

6 sample products built into `main.js`:
- Silk Blend Midi Dress ($248)
- Cashmere Fitted Top ($178)
- Wide-Leg Trousers ($198)
- Wool Blend Coat ($358)
- Linen Slip Dress ($168)
- Ribbed Knit Sweater ($148)

Each product includes:
- Multiple images (Unsplash)
- Size range (XS-XL)
- Color options
- Detailed description, care instructions, shipping info
- "Complete the Look" recommendations

## Customization

To customize:
- **Colors**: Edit CSS variables in `:root`
- **Products**: Modify `productsData` array in `main.js`
- **Images**: Replace Unsplash URLs
- **Copy**: Edit HTML text content
- **Font**: Modify `--serif` and `--sans` in CSS

## Browser Support

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Created:** May 25, 2024
**Brand:** VELOUR — Effortless Elegance
