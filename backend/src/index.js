const express = require("express");
const cors = require("cors");
const path = require("path");
const productsRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

const clientBuildPath = path.join(__dirname, '../../frontend/dist');
if (require('fs').existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
