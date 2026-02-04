import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function TopBar() {
  const { cartCount } = useCart();
  const location = useLocation();

  const tab = (path) =>
    location.pathname === path
      ? "bg-white shadow-sm"
      : "hover:bg-white/70";

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-[rgb(var(--bite-bg))/0.85] border-b border-black/5">
      <div className="container-page py-4 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-2xl bg-[rgb(var(--bite-orange))/0.15] flex items-center justify-center text-lg">
            🍔
          </div>
          <div className="leading-tight">
            <p className="font-extrabold tracking-tight text-lg">Wewe’s Bite</p>
            <p className="text-xs text-[rgb(var(--bite-muted))]">food ordering demo</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/" className={`btn-ghost ${tab("/")}`}>Menu</Link>
          <Link to="/orders" className={`btn-ghost ${tab("/orders")}`}>Orders</Link>

          <Link to="/cart" className="btn-primary">
            🛒 Cart <span className="pill">{cartCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
