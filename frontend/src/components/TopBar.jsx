import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function TopBar() {
  const { cartCount } = useCart();
  const { pathname } = useLocation();

  const navClass = (path) =>
    pathname === path ? "nav-link nav-link-active" : "nav-link";

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-xl shadow-md shadow-orange-500/25 transition group-hover:scale-105">
            🍔
          </div>
          <div className="leading-tight hidden sm:block">
            <p className="font-brand text-lg font-bold text-stone-900">
              Wewe&apos;s Bite
            </p>
            <p className="text-[11px] font-medium text-[rgb(var(--bite-muted))]">
              Fresh · Fast · Cebu
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          <Link to="/" className={navClass("/")}>
            Menu
          </Link>
          <Link to="/orders" className={navClass("/orders")}>
            Orders
          </Link>
          <Link to="/cart" className="btn-primary !py-2 !px-4 ml-1 sm:ml-2">
            <span aria-hidden>🛒</span>
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="min-w-[1.25rem] rounded-full bg-stone-900 px-1.5 py-0.5 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
