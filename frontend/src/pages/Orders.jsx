import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import Layout from "../components/Layout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { formatPrice, shortOrderId } from "../utils/format.js";

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
    <Layout>
      <div className="container-page py-10">
        <PageHeader
          badge="Order history"
          title="Your orders"
          subtitle="Track past deliveries from Wewe's Bite"
        />

        {loading && (
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card h-32 animate-pulse bg-stone-100/50" />
            ))}
          </div>
        )}

        {error && (
          <div className="empty-state">
            <div className="empty-icon">⚠️</div>
            <p className="mt-4 font-semibold text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <p className="mt-4 text-lg font-bold">No orders yet</p>
            <p className="mt-2 text-sm text-[rgb(var(--bite-muted))]">
              Place your first order from the menu.
            </p>
            <Link to="/" className="btn-primary mt-6 inline-flex">
              Start ordering
            </Link>
          </div>
        )}

        <div className="mt-8 grid gap-4">
          {orders.map((o) => {
            const note = o.customer?.note || o.customer?.notes;
            const firstImage = o.items?.find((it) => it.image)?.image;

            return (
              <article key={o.id} className="card card-pad overflow-hidden">
                <div className="flex gap-4">
                  {firstImage ? (
                    <img
                      src={firstImage}
                      alt=""
                      className="hidden sm:block h-24 w-24 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="hidden sm:flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-3xl">
                      🍽️
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-extrabold text-stone-900">
                          Order #{shortOrderId(o.id)}
                        </p>
                        <p className="mt-1 text-sm text-[rgb(var(--bite-muted))]">
                          {o.customer?.name || "Guest"}
                          {o.customer?.address ? ` · ${o.customer.address}` : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="status-pill">{o.status || "placed"}</span>
                        <p className="mt-2 text-lg font-extrabold">
                          {formatPrice(o.total)}
                        </p>
                      </div>
                    </div>

                    {note && (
                      <p className="mt-2 text-xs text-[rgb(var(--bite-muted))]">
                        Note: {note}
                      </p>
                    )}

                    {Array.isArray(o.items) && o.items.length > 0 && (
                      <ul className="mt-4 space-y-1 border-t border-stone-100 pt-3">
                        {o.items.map((it, idx) => (
                          <li
                            key={idx}
                            className="flex justify-between text-sm text-[rgb(var(--bite-muted))]"
                          >
                            <span>
                              {it.name} × {it.qty || 1}
                            </span>
                            <span className="font-semibold text-stone-800">
                              {formatPrice(
                                Number(it.price || 0) * Number(it.qty || 1)
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <p className="mt-3 text-xs text-stone-400">
                      {o.createdAt
                        ? new Date(o.createdAt).toLocaleString("en-PH", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : ""}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
