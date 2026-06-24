import { Link, NavLink } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          StyleShop
        </Link>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Shop
          </NavLink>
        </nav>
        <Link to="/cart" className={styles.cartBtn}>
          🛒
          {totalItems > 0 && (
            <span className={styles.badge}>{totalItems}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
