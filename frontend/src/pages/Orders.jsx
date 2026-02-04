import { useEffect, useState } from "react";
import { api } from "../services/api";
import TopBar from "../components/TopBar.jsx";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await api.get("/orders");
        const sorted = [...res.data].sort((a, b) => {
          const da = new Date(a.createdAt || 0).getTime();
          const db = new Date(b.createdAt || 0).getTime();
          return db - da;
        });
        setOrders(sorted);
      } catch {
        setError("Failed to load orders. Is JSON Server running?");
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen">
      <TopBar />

      <div className="container-page">
        <header className="mt-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Orders <span className="text-[rgb(var(--bite-orange))]">📦</span>
          </h1>
          <p className="mt-1 text-sm text-[rgb(var(--bite-muted))]">
            Demo order history from JSON Server
          </p>
        </header>

        {loading && (
          <p className="mt-6 text-[rgb(var(--bite-muted))]">Loading orders…</p>
        )}
        {error && (
          <p className="mt-6 font-semibold text-[rgb(var(--bite-red))]">{error}</p>
        )}

        <div className="mt-6 grid gap-4">
          {!loading && !error && orders.length === 0 && (
            <div className="card card-pad">
              <p className="text-[rgb(var(--bite-muted))]">No orders yet.</p>
            </div>
          )}

          {orders.map((o) => (
            <div key={o.id} className="card card-pad">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-extrabold">
                    Order <span className="text-[rgb(var(--bite-orange))]">#{o.id}</span>
                  </p>
                  <p className="mt-1 text-sm text-[rgb(var(--bite-muted))]">
                    {o.customer?.name || "Unknown"} • {o.customer?.address || "No address"}
                  </p>
                  {o.customer?.note ? (
                    <p className="mt-1 text-xs text-[rgb(var(--bite-muted))]">
                      Note: {o.customer.note}
                    </p>
                  ) : null}
                </div>

                <span className="pill">₱{o.total}</span>
              </div>

              {Array.isArray(o.items) && o.items.length > 0 && (
                <div className="mt-4 border-t border-black/5 pt-3 space-y-1">
                  {o.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-[rgb(var(--bite-muted))]">
                        {it.name} × {it.qty || 1}
                      </span>
                      <span className="font-semibold">
                        ₱{Number(it.price || 0) * Number(it.qty || 1)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-3 text-xs text-[rgb(var(--bite-muted))]">
                {o.createdAt ? new Date(o.createdAt).toLocaleString() : ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
