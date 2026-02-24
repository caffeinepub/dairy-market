# Specification

## Summary
**Goal:** Build a Flipkart-style clothing e-commerce application called StyleMart, replacing the existing dairy product catalog with a full clothing store experience.

**Planned changes:**
- Replace dairy product catalog with a clothing catalog seeded with at least 20 products across Men, Women, Kids, and Accessories categories; each product stores brand, sizes, category, rating, price, and original price
- Add category filter bar and search input to the catalog page; filters and search work together with an "All" reset option
- Implement a product detail modal/page showing full product info, size selection, and an "Add to Cart" button (disabled until a size is selected)
- Update the shopping cart to display selected size per item, discounted vs. original price with strike-through, quantity controls, dynamic total, and a remove button
- Redesign the UI with a Flipkart-inspired theme: white background, orange and blue accents, card-based product grid with hover effects, header with StyleMart logo, search bar, and cart icon with item count
- Replace all DairyDelight branding with StyleMart; update document title to "StyleMart"
- Make the layout fully mobile-responsive: 1-column mobile, 2-column tablet, 4-column desktop product grid; header collapses gracefully on small screens
- Serve all product images, hero banner, and StyleMart logo as static assets from `/assets/generated/`

**User-visible outcome:** Users can browse a clothing catalog, filter by category or search by name/brand, view product details and select sizes, add items to a cart, and adjust quantities — all within a professional, mobile-friendly StyleMart storefront.
