const express = require("express");
const router = express.Router();
const products = require("../data/products");

// GET /api/products - list all products with optional filtering
router.get("/", (req, res) => {
  const { category, minPrice, maxPrice, search } = req.query;
  let filtered = [...products];

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (minPrice) {
    filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
  }
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }

  res.json(filtered);
});

// GET /api/products/:id - get a single product
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

module.exports = router;
