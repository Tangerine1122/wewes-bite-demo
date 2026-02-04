import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useCart } from "../context/CartContext.jsx";
import TopBar from "../components/TopBar.jsx";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
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
        customer: { name: name.trim(), address: address.trim(), note: note.trim() },
        items: cart.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          qty: i.qty,
        })),
        total,
        createdAt: new Date().toISOString(),
        status: "placed",
      };

      const res = await api.post("/orders", orderPayload);

      clearCart(); // ✅ clear after successful post
      navigate(`/success/${res.data.id}`); // json-server returns created object with id
    } catch {
      setError("Failed to place order. Is JSON Server running on http://localhost:5000 ?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <TopBar />

      <div className="container-page">
        <header className="mt-2 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Checkout <span className="text-[rgb(var(--bite-orange))]">🧾</span>
            </h1>
            <p className="mt-1 text-sm text-[rgb(var(--bite-muted))]">
              Enter delivery details (demo)
            </p>
          </div>

          <Link to="/cart" className="btn-ghost">
            ← Back
          </Link>
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
            {/* Form */}
            <form onSubmit={placeOrder} className="card card-pad lg:col-span-2">
              <h3 className="text-lg font-extrabold">Delivery Details</h3>

              <div className="mt-4 grid gap-3">
                <div>
                  <label className="text-sm font-bold">Name</label>
                  <input
                    className="input mt-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold">Address</label>
                  <input
                    className="input mt-1"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Delivery address"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold">Note (optional)</label>
                  <input
                    className="input mt-1"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="e.g. no onions, extra sauce"
                  />
                </div>

                {error && (
                  <p className="font-semibold text-[rgb(var(--bite-red))]">{error}</p>
                )}

                <button className="btn-primary w-full" disabled={loading}>
                  {loading ? "Placing Order…" : "Place Order"}
                </button>

                <p className="text-xs text-[rgb(var(--bite-muted))]">
                  This is a demo. No real payment is processed.
                </p>
              </div>
            </form>

            {/* Summary */}
            <div className="card card-pad h-fit">
              <h3 className="text-lg font-extrabold">Order Summary</h3>

              <div className="mt-4 space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs text-[rgb(var(--bite-muted))]">
                        ₱{item.price} × {item.qty}
                      </p>
                    </div>
                    <p className="font-extrabold">
                      ₱{Number(item.price || 0) * Number(item.qty || 1)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-black/5 pt-4 flex items-center justify-between">
                <span className="text-[rgb(var(--bite-muted))]">Total</span>
                <span className="text-xl font-extrabold">₱{total}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
