import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-white/60">
      <div className="container-page py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="font-brand text-xl font-bold text-[rgb(var(--bite-text))]">
              Wewe&apos;s Bite
            </p>
            <p className="mt-2 max-w-sm text-sm text-[rgb(var(--bite-muted))] leading-relaxed">
              Comfort food delivered fast. Burgers, wings, and more — made fresh
              for your cravings.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--bite-muted))]">
              Order
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="footer-link">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/cart" className="footer-link">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="footer-link">
                  Order history
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--bite-muted))]">
              Hours
            </p>
            <ul className="mt-3 space-y-1 text-sm text-[rgb(var(--bite-muted))]">
              <li>Mon – Sun: 10:00 AM – 10:00 PM</li>
              <li>Delivery: ~30–45 min</li>
              <li>Cebu City area</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-black/5 pt-6 text-xs text-[rgb(var(--bite-muted))]">
          <p>© {new Date().getFullYear()} Wewe&apos;s Bite. Portfolio demo — no real payments.</p>
          <p className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            Open for orders
          </p>
        </div>
      </div>
    </footer>
  );
}
