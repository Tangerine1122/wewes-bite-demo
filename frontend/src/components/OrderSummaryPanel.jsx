import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format.js";

const DELIVERY_FEE = 49;
const FREE_DELIVERY_MIN = 500;

export default function OrderSummaryPanel({
  cart,
  total,
  showCheckout = true,
  onClear,
  sticky = true,
}) {
  const itemCount = cart.reduce((sum, i) => sum + Number(i.qty || 0), 0);
  const subtotal = total;
  const deliveryFee = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;

  return (
    <aside className={`card card-pad ${sticky ? "summary-sticky" : ""}`}>
      <h3 className="text-lg font-extrabold">Order summary</h3>

      <div className="mt-4 space-y-3 max-h-64 overflow-y-auto pr-1">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-3">
            {item.image ? (
              <img
                src={item.image}
                alt=""
                className="h-14 w-14 shrink-0 rounded-xl object-cover"
              />
            ) : (
              <div className="h-14 w-14 shrink-0 rounded-xl bg-[rgb(var(--bite-orange))/0.12] flex items-center justify-center text-xl">
                🍽️
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-bold truncate">{item.name}</p>
              <p className="text-xs text-[rgb(var(--bite-muted))]">
                {formatPrice(item.price)} × {item.qty}
              </p>
            </div>
            <p className="shrink-0 font-bold">
              {formatPrice(Number(item.price || 0) * Number(item.qty || 1))}
            </p>
          </div>
        ))}
      </div>

      <div className="summary-lines">
        <div className="summary-line">
          <span>Items ({itemCount})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="summary-line">
          <span>Delivery</span>
          <span>
            {deliveryFee === 0 ? (
              <span className="text-emerald-600 font-semibold">Free</span>
            ) : (
              formatPrice(deliveryFee)
            )}
          </span>
        </div>
        {subtotal > 0 && subtotal < FREE_DELIVERY_MIN && (
          <p className="text-xs text-[rgb(var(--bite-muted))]">
            Add {formatPrice(FREE_DELIVERY_MIN - subtotal)} more for free delivery
          </p>
        )}
        <div className="summary-total">
          <span>Total</span>
          <span>{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {showCheckout && (
        <Link to="/checkout" className="btn-primary mt-5 w-full">
          Proceed to checkout
        </Link>
      )}

      {onClear && (
        <button type="button" className="btn-danger mt-3 w-full" onClick={onClear}>
          Clear cart
        </button>
      )}

      <div className="trust-row">
        <span>🔒 Secure demo</span>
        <span>⚡ Fast checkout</span>
      </div>
    </aside>
  );
}

export function getOrderTotals(cartTotal) {
  const deliveryFee = cartTotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE;
  return { deliveryFee, grandTotal: cartTotal + deliveryFee };
}
