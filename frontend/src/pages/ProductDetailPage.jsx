import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import styles from "./ProductDetailPage.module.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!selectedSize || !selectedColor) return;
    dispatch({
      type: "ADD_ITEM",
      payload: { product, size: selectedSize, color: selectedColor },
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) return <div className={styles.state}>Loading…</div>;
  if (error) return <div className={styles.stateError}>Error: {error}</div>;
  if (!product) return null;

  const canAdd = selectedSize && selectedColor;

  return (
    <main className={styles.page}>
      <Link to="/" className={styles.back}>
        ← Back to Shop
      </Link>
      <div className={styles.layout}>
        <div className={styles.imageWrap}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className={styles.details}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.section}>
            <p className={styles.label}>Size</p>
            <div className={styles.options}>
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`${styles.optionBtn} ${
                    selectedSize === s ? styles.optionBtnActive : ""
                  }`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <p className={styles.label}>Color</p>
            <div className={styles.options}>
              {product.colors.map((c) => (
                <button
                  key={c}
                  className={`${styles.optionBtn} ${
                    selectedColor === c ? styles.optionBtnActive : ""
                  }`}
                  onClick={() => setSelectedColor(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <p className={styles.stock}>
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Out of stock"}
          </p>

          <button
            className={styles.addBtn}
            onClick={handleAddToCart}
            disabled={!canAdd || product.stock === 0}
          >
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>

          {!canAdd && (
            <p className={styles.hint}>Please select a size and colour.</p>
          )}
        </div>
      </div>
    </main>
  );
}
