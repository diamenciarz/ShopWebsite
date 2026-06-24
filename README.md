# StyleShop — Clothing Shop Web App

A full-stack internet clothing shop built with **React** (frontend) and **Express.js** (backend).

## Project Structure

```
ShopWebsite/
├── backend/          # Express.js REST API
│   ├── src/
│   │   ├── data/     # Product data
│   │   ├── routes/   # API route handlers
│   │   └── index.js  # App entry point
│   └── package.json
└── frontend/         # React + Vite SPA
    ├── src/
    │   ├── components/  # Navbar, ProductCard
    │   ├── context/     # CartContext (state management)
    │   ├── hooks/       # useCart, useProducts
    │   └── pages/       # ShopPage, ProductDetailPage, CartPage
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js 18 or newer

### 1. Start the Backend

```bash
cd backend
npm install
npm start
# Runs on http://localhost:5000
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Features

- **Product listing** — browse all items with category filters and search
- **Product detail** — view full description, select size & colour
- **Shopping cart** — add/remove items, adjust quantities, running total

## API Endpoints

| Method | Path                    | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | `/api/products`         | List products (supports `?category`, `?search`, `?minPrice`, `?maxPrice`) |
| GET    | `/api/products/:id`     | Get a single product by ID         |
| GET    | `/api/health`           | Health check                       |

## Running Tests

```bash
# Backend
cd backend && npm test
```
