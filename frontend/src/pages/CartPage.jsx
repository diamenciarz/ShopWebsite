import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import styles from "./CartPage.module.css";

export default function CartPage() {
  const { items, totalItems, totalPrice, dispatch } = useCart();

  if (totalItems === 0) {
    return (
      <main className={styles.page}>
        <h1 className={styles.title}>Your Cart</h1>
        <div className={styles.empty}>
          <p>Your cart is empty.</p>
          <Link to="/" className={styles.shopLink}>
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Your Cart ({totalItems})</h1>
      <div className={styles.layout}>
        <ul className={styles.items}>
          {items.map((item) => (
            <li key={item.key} className={styles.item}>
              <div className={styles.itemImage}>
                <img src={item.product.image} alt={item.product.name} />
              </div>
              <div className={styles.itemInfo}>
                <Link
                  to={`/products/${item.product.id}`}
                  className={styles.itemName}
                >
                  {item.product.name}
                </Link>
                <p className={styles.itemMeta}>
                  Size: {item.size} · Colour: {item.color}
                </p>
                <p className={styles.itemPrice}>
                  ${item.product.price.toFixed(2)}
                </p>
              </div>
              <div className={styles.itemQty}>
                <button
                  className={styles.qtyBtn}
                  onClick={() =>
                    dispatch({
                      type: "UPDATE_QUANTITY",
                      payload: { key: item.key, quantity: item.quantity - 1 },
                    })
                  }
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() =>
                    dispatch({
                      type: "UPDATE_QUANTITY",
                      payload: { key: item.key, quantity: item.quantity + 1 },
                    })
                  }
                >
                  +
                </button>
              </div>
              <p className={styles.lineTotal}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
              <button
                className={styles.removeBtn}
                onClick={() =>
                  dispatch({ type: "REMOVE_ITEM", payload: { key: item.key } })
                }
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <aside className={styles.summary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button className={styles.checkoutBtn}>Proceed to Checkout</button>
          <Link to="/" className={styles.continueLink}>
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}
