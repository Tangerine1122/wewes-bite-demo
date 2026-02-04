import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import TopBar from "../components/TopBar.jsx";

export default function Cart() {
  const { cart, total, addToCart, decreaseQty, removeItem, clearCart } = useCart();

  return (
    <div className="min-h-screen">
      <TopBar />

      <div className="container-page">
        <header className="mt-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Your Cart <span className="text-[rgb(var(--bite-orange))]">🛒</span>
          </h1>
          <p className="mt-1 text-sm text-[rgb(var(--bite-muted))]">
            Review items before checkout
          </p>
        </header>

        {cart.length === 0 ? (
          <div className="card card-pad mt-6">
            <p className="text-[rgb(var(--bite-muted))]">Your cart is empty.</p>
            <Link to="/" className="btn-primary mt-4 w-fit">
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="card card-pad">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="mt-1 text-sm text-[rgb(var(--bite-muted))]">
                        ₱{item.price} each
                      </p>
                    </div>

                    <button
                      className="btn-ghost"
                      onClick={() => removeItem(item.id)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <button className="btn-ghost" onClick={() => decreaseQty(item.id)}>
                        −
                      </button>

                      <span className="min-w-10 text-center font-extrabold">
                        {item.qty}
                      </span>

                      <button className="btn-ghost" onClick={() => addToCart(item)}>
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-[rgb(var(--bite-muted))]">Subtotal</p>
                      <p className="text-lg font-extrabold">
                        ₱{Number(item.price || 0) * Number(item.qty || 1)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="card card-pad h-fit">
              <h3 className="text-lg font-extrabold">Order Summary</h3>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-[rgb(var(--bite-muted))]">Items</span>
                <span className="font-bold">
                  {cart.reduce((sum, i) => sum + Number(i.qty || 0), 0)}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[rgb(var(--bite-muted))]">Total</span>
                <span className="text-xl font-extrabold">₱{total}</span>
              </div>

              <Link to="/checkout" className="btn-primary mt-5 w-full">
                Proceed to Checkout
              </Link>

              <button className="btn-danger mt-3 w-full" onClick={clearCart}>
                Clear Cart
              </button>

              <p className="mt-4 text-xs text-[rgb(var(--bite-muted))]">
                Demo only — no real payment.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
