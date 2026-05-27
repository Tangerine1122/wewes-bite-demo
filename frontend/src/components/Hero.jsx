import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Hero() {
  const { cartCount } = useCart();

  return (
    <section className="hero">
      <div className="container-page hero-inner">
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="hero-dot" aria-hidden />
            Now delivering in Cebu City
          </p>
          <h1 className="hero-title">
            Crave-worthy bites,
            <span className="hero-accent"> delivered hot.</span>
          </h1>
          <p className="hero-desc">
            Burgers, wings, fries, and more — order in seconds and we&apos;ll have
            it on the way. Free delivery on orders over ₱500.
          </p>
          <div className="hero-actions">
            <a href="#menu" className="btn-primary">
              Order now
            </a>
            {cartCount > 0 ? (
              <Link to="/cart" className="btn-ghost">
                View cart ({cartCount})
              </Link>
            ) : (
              <Link to="/orders" className="btn-ghost">
                Track orders
              </Link>
            )}
          </div>
          <dl className="hero-stats">
            <div>
              <dt>Rating</dt>
              <dd>4.9 ★</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>30–45 min</dd>
            </div>
            <div>
              <dt>Min. order</dt>
              <dd>₱99</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual" aria-hidden>
          <div className="hero-float hero-float-a">🍔</div>
          <div className="hero-float hero-float-b">🍗</div>
          <div className="hero-plate">
            <span className="text-6xl">🍟</span>
            <p className="mt-3 text-sm font-bold text-white/90">Today&apos;s picks</p>
            <p className="text-xs text-white/70">From ₱55</p>
          </div>
        </div>
      </div>
    </section>
  );
}
