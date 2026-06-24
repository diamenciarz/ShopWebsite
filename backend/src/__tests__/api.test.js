const { test, describe } = require("node:test");
const assert = require("node:assert/strict");

// Lightweight test using the app module directly
const app = require("../index");
const http = require("node:http");

function request(path) {
  return new Promise((resolve, reject) => {
    const server = http.createServer(app);
    server.listen(0, () => {
      const { port } = server.address();
      http.get(`http://localhost:${port}${path}`, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          server.close();
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        });
      }).on("error", (err) => {
        server.close();
        reject(err);
      });
    });
  });
}

describe("GET /api/health", () => {
  test("returns ok status", async () => {
    const { status, body } = await request("/api/health");
    assert.equal(status, 200);
    assert.equal(body.status, "ok");
  });
});

describe("GET /api/products", () => {
  test("returns an array of products", async () => {
    const { status, body } = await request("/api/products");
    assert.equal(status, 200);
    assert.ok(Array.isArray(body));
    assert.ok(body.length > 0);
  });

  test("filters by category", async () => {
    const { status, body } = await request("/api/products?category=tops");
    assert.equal(status, 200);
    assert.ok(body.every((p) => p.category === "tops"));
  });

  test("filters by search term", async () => {
    const { status, body } = await request("/api/products?search=jeans");
    assert.equal(status, 200);
    assert.ok(body.length > 0);
  });
});

describe("GET /api/products/:id", () => {
  test("returns a single product", async () => {
    const { status, body } = await request("/api/products/1");
    assert.equal(status, 200);
    assert.equal(body.id, 1);
  });

  test("returns 404 for unknown product", async () => {
    const { status } = await request("/api/products/9999");
    assert.equal(status, 404);
  });
});
