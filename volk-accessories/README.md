# VOLK Accessories — Industrial Streetwear Demo Site

A production-grade e-commerce demo site for VOLK, a luxury industrial streetwear accessories brand. Built with vanilla JavaScript, CSS Grid, and a dark amber aesthetic.

## Project Overview

**Brand:** VOLK · Industrial Streetwear Accessories  
**Target Audience:** Modern men seeking premium, engineered accessories  
**Aesthetic:** Raw industrial, minimalist brutalism, dark + amber accent  
**Technology:** Vanilla JS, HTML5, CSS3 (no frameworks)

## Features

✓ Full e-commerce functionality (product catalog, cart, checkout)  
✓ Responsive mobile design (hamburger menu, mobile-first layout)  
✓ Product filtering by category, price, material  
✓ Cart persistence via localStorage  
✓ Product detail pages with image gallery & accordions  
✓ Running marquee text (CSS animation)  
✓ Smooth navigation with amber underline highlights  
✓ Notification toast system  
✓ Form validation on checkout  

## File Structure

```
volk-accessories/
├── index.html           # Hero page, categories, featured product
├── products.html        # Shop with filters & product grid
├── product-detail.html  # Individual product detail with gallery
├── cart.html           # Shopping cart management
├── checkout.html       # Checkout form
├── about.html          # Brand story, team, sustainability
├── contact.html        # Contact form & FAQ accordion
├── style.css           # 1200+ lines of dark theme CSS
└── main.js            # Cart logic, navigation, interactions
```

## Design System

### Color Palette
- **Background:** #111111 (nigh black)
- **Primary Dark:** #1a1a1a
- **Secondary Dark:** #2d2d2d
- **Text:** #f5f5f5 (off white)
- **Muted Text:** #a0a0a0
- **Accent:** #e8891a (warm amber)
- **Border:** #333333 (dark gray)

### Typography
- **Display:** Space Grotesk (900 weight) — bold, uppercase headers
- **Body:** Space Grotesk (400-700) — clean sans-serif text
- **Monospace:** JetBrains Mono — product codes, prices, technical specs

### Key Aesthetic Choices
- Thick 1px borders on cards (industrial edge)
- Uppercase text transform throughout
- Generous letter-spacing on headings
- No rounded corners (sharp, geometric)
- Hover effects with amber glows
- Marquee scrolling text on homepage
- Vertical rotated text accent on hero

## Usage

### Local Setup
1. Open any HTML file in a modern browser
2. No build process needed — pure vanilla stack
3. All images use Unsplash direct URLs (no downloads required)

### Product Management
Products are hardcoded in `main.js` PRODUCTS array. To modify:
```javascript
const PRODUCTS = [
  {
    id: 1,
    code: 'VOLK-WATCH-001',
    name: 'CHRONOGRAPH ELITE',
    price: 1299,
    category: 'watches',
    image: 'https://...',
    specs: { ... }
  },
  // Add more products...
];
```

### Cart Storage
Cart data persists in `localStorage` under key `volk-cart`. Clear via:
```javascript
localStorage.removeItem('volk-cart');
```

### Navigation
Sticky header with:
- Logo with amber dot
- Nav links (Home, Shop, About, Contact)
- Cart icon with count badge
- Mobile hamburger menu

## Mobile Responsive Breakpoints

- **Desktop:** 1400px max-width container
- **Tablet:** 768px breakpoint (sidebar → row layout, 2-col grid)
- **Mobile:** 480px breakpoint (full-width, 1-col grid)

## JavaScript Features

### Cart Class
```javascript
cart.addItem(product, quantity)
cart.removeItem(id)
cart.updateQuantity(id, quantity)
cart.getTotal()
cart.getCount()
cart.clear()
```

### Page Detection
Automatically runs page-specific setup based on `window.location.pathname`:
- `index.html` → hero + marquee
- `products.html` → filter + grid
- `product-detail.html` → gallery + accordion
- `cart.html` → table + summary
- `checkout.html` → form validation

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge 2020+). 
Requires ES6+ JavaScript support.

## Performance Notes

- All CSS is inlined (single file, ~26KB)
- Images use Unsplash CDN (no local assets)
- No external JavaScript libraries
- Smooth animations use CSS (GPU accelerated)
- Marquee uses CSS keyframes, not JS

## Customization

### Colors
Edit CSS variables in `:root`:
```css
:root {
  --accent: #e8891a;  /* Change amber here */
  --dark-bg: #111111;
  /* ... */
}
```

### Fonts
Update Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font..." rel="stylesheet">
```

### Products
Edit PRODUCTS array in `main.js` or connect to external API.

## Features Not Implemented (For Production)

- Real payment processing (uses form validation only)
- Backend inventory system
- User authentication
- Order tracking
- Email confirmations
- Real search/analytics
- SEO optimization
- CMS integration

These would require backend infrastructure (Node.js, database, payment gateway).

---

**Built with attention to industrial design philosophy.**  
*VOLK · 2024*
