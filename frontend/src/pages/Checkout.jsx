import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useCart } from "../context/CartContext.jsx";
import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import OrderSummaryPanel, { getOrderTotals } from "../components/OrderSummaryPanel.jsx";
import { formatPrice } from "../utils/format.js";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const { grandTotal } = getOrderTotals(total);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function placeOrder(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !address.trim()) {
      setError("Please enter your name and delivery address.");
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const orderPayload = {
        customer: {
          name: name.trim(),
          address: address.trim(),
          phone: phone.trim(),
          note: note.trim(),
        },
        items: cart.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          image: i.image,
          qty: i.qty,
        })),
        total: grandTotal,
        subtotal: total,
        createdAt: new Date().toISOString(),
        status: "placed",
      };

      const res = await api.post("/orders", orderPayload);
      clearCart();
      navigate(`/success/${res.data.id}`);
    } catch {
      setError(
        `Failed to place order. Is the API running at ${api.defaults.baseURL}?`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="container-page py-10">
        <CheckoutSteps current={2} />

        <PageHeader
          badge="Almost there"
          title="Checkout"
          subtitle="Where should we deliver your order?"
          action={
            <Link to="/cart" className="btn-ghost">
              ← Back to cart
            </Link>
          }
        />

        {cart.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <p className="mt-4 font-bold">Nothing to checkout</p>
            <Link to="/" className="btn-primary mt-4 inline-flex">
              Browse menu
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <form onSubmit={placeOrder} className="card card-pad lg:col-span-2">
              <h3 className="text-lg font-extrabold">Delivery details</h3>
              <p className="mt-1 text-sm text-[rgb(var(--bite-muted))]">
                Cash on delivery · Demo only
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-bold" htmlFor="checkout-name">
                    Full name
                  </label>
                  <input
                    id="checkout-name"
                    className="input mt-1.5"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Juan Dela Cruz"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold" htmlFor="checkout-phone">
                    Phone
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    className="input mt-1.5"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09XX XXX XXXX"
                    autoComplete="tel"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-bold" htmlFor="checkout-address">
                    Delivery address
                  </label>
                  <input
                    id="checkout-address"
                    className="input mt-1.5"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, barangay, city"
                    autoComplete="street-address"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-bold" htmlFor="checkout-note">
                    Special instructions <span className="font-normal text-stone-400">(optional)</span>
                  </label>
                  <textarea
                    id="checkout-note"
                    className="input mt-1.5 min-h-[88px] resize-y"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Gate code, extra sauce, no onions…"
                  />
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50/80 p-4 text-sm">
                <p className="font-bold text-stone-800">Payment method</p>
                <p className="mt-1 text-[rgb(var(--bite-muted))]">
                  Cash on delivery (COD) — pay when your order arrives.
                </p>
              </div>

              {error && (
                <p className="mt-4 font-semibold text-red-600" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary mt-6 w-full !py-3 text-base"
                disabled={loading}
              >
                {loading ? "Placing order…" : `Place order · ${formatPrice(grandTotal)}`}
              </button>

              <p className="mt-3 text-center text-xs text-[rgb(var(--bite-muted))]">
                By placing this order you agree this is a portfolio demo.
              </p>
            </form>

            <OrderSummaryPanel
              cart={cart}
              total={total}
              showCheckout={false}
              sticky
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
