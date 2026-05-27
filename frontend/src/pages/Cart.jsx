import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import OrderSummaryPanel from "../components/OrderSummaryPanel.jsx";
import { formatPrice } from "../utils/format.js";

export default function Cart() {
  const { cart, total, addToCart, decreaseQty, removeItem, clearCart } = useCart();

  return (
    <Layout>
      <div className="container-page py-10">
        <PageHeader
          badge="Your bag"
          title="Shopping cart"
          subtitle="Review your items before checkout"
          action={
            cart.length > 0 ? (
              <Link to="/" className="btn-ghost">
                ← Add more
              </Link>
            ) : null
          }
        />

        {cart.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <p className="mt-4 text-lg font-bold text-stone-900">Your cart is empty</p>
            <p className="mt-2 text-sm text-[rgb(var(--bite-muted))]">
              Hungry? Browse our menu and add something delicious.
            </p>
            <Link to="/" className="btn-primary mt-6 inline-flex">
              Browse menu
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <article key={item.id} className="cart-line">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="cart-line-img"
                    />
                  ) : (
                    <div className="cart-line-img flex items-center justify-center text-2xl">
                      🍽️
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <button
                        type="button"
                        className="btn-ghost !p-2 !min-w-0 text-stone-400 hover:text-red-500"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        ✕
                      </button>
                    </div>
                    <p className="mt-0.5 text-sm text-[rgb(var(--bite-muted))]">
                      {formatPrice(item.price)} each
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="qty-stepper">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => decreaseQty(item.id)}
                        >
                          −
                        </button>
                        <span className="qty-value">{item.qty}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => addToCart(item)}
                        >
                          +
                        </button>
                      </div>
                      <p className="text-lg font-extrabold">
                        {formatPrice(Number(item.price || 0) * Number(item.qty || 1))}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <OrderSummaryPanel
              cart={cart}
              total={total}
              onClear={clearCart}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
