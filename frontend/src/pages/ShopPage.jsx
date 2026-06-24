import { useState, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import styles from "./ShopPage.module.css";

const CATEGORIES = ["all", "tops", "bottoms", "dresses", "outerwear"];

export default function ShopPage() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const filters = useMemo(
    () => ({ category: category || undefined, search: search || undefined }),
    [category, search]
  );

  const { products, loading, error } = useProducts(filters);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearch(searchInput.trim());
  }

  function handleCategoryClick(cat) {
    setCategory(cat === "all" ? "" : cat);
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1>New Arrivals</h1>
        <p>Discover the latest styles for every occasion</p>
      </section>

      <div className={styles.controls}>
        <div className={styles.categories}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.catBtn} ${
                (cat === "all" ? !category : category === cat)
                  ? styles.catBtnActive
                  : ""
              }`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <input
            type="search"
            placeholder="Search products…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>
            Search
          </button>
        </form>
      </div>

      {error && <p className={styles.error}>Error: {error}</p>}

      {loading ? (
        <div className={styles.loading}>Loading products…</div>
      ) : (
        <>
          <p className={styles.count}>
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>
          {products.length === 0 ? (
            <p className={styles.empty}>No products match your search.</p>
          ) : (
            <div className={styles.grid}>
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
