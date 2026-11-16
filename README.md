# ZAYRO Storefront

A responsive React + Vite storefront for ZAYRO, a Kenya-focused fashion, footwear and lifestyle retailer.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## What's included

- Responsive storefront homepage and navigation
- ZAYRO brand mark and wordmark as editable SVG
- Product catalogue with search and category filtering
- Product quick view, sizes, colour selection and wishlist
- Shopping bag with quantity controls and KES totals
- Checkout UI placeholder
- Kenyan currency formatting and sample delivery messaging
- API service layer ready for a Flask backend

## Backend integration status

This ZIP is the **frontend**. It currently uses sample product data so the storefront can run immediately. It does not process real orders or payments yet.

When the Flask backend is ready:
1. Set `VITE_API_BASE_URL` in your deployment environment.
2. Update `src/services/api.js` to match the backend routes.
3. Connect authentication, inventory, order creation and delivery APIs.
4. Implement Daraja STK Push on the backend only. Never put Daraja consumer secrets or passkeys in frontend code.
5. Only show an order as paid after the backend verifies the Safaricom callback.

## Deploying on Render

Create a **Static Site**:
- Build command: `npm install && npm run build`
- Publish directory: `dist`

Add `VITE_API_BASE_URL` as an environment variable when the backend API is deployed.

## Brand direction

- Ink: `#17232D`
- Tangerine: `#FF7048`
- Citrus: `#D9EF68`
- Sky: `#B9DDF2`
- Warm background: `#FFFAF5`

The product photography URLs are remote Unsplash image URLs and require an internet connection.
