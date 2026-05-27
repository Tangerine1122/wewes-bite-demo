import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";
import Layout from "../components/Layout.jsx";
import CheckoutSteps from "../components/CheckoutSteps.jsx";
import { formatPrice, shortOrderId } from "../utils/format.js";

export default function Success() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await api.get(`/orders/${orderId}`);
        setOrder(res.data);
      } catch {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    }
    if (orderId) loadOrder();
  }, [orderId]);

  const note = order?.customer?.note || order?.customer?.notes;

  return (
    <Layout>
      <div className="container-page py-10 max-w-2xl mx-auto">
        <CheckoutSteps current={3} />

        <div className="card card-pad text-center">
          <div className="success-icon">✓</div>

          <h1 className="mt-6 font-brand text-3xl font-bold text-stone-900">
            Order confirmed!
          </h1>
          <p className="mt-3 text-[rgb(var(--bite-muted))]">
            Thanks for ordering from{" "}
            <span className="font-bold text-stone-800">Wewe&apos;s Bite</span>.
            We&apos;re preparing your food now.
          </p>

          <div className="mt-6 inline-flex flex-col items-center rounded-2xl bg-stone-50 px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--bite-muted))]">
              Order number
            </p>
            <p className="mt-1 font-mono text-lg font-bold text-stone-900">
              #{shortOrderId(orderId)}
            </p>
            <span className="status-pill mt-3">Preparing · Est. 30–45 min</span>
          </div>

          {loading && (
            <p className="mt-6 text-sm text-[rgb(var(--bite-muted))]">Loading receipt…</p>
          )}

          {!loading && order && (
            <div className="mt-8 text-left rounded-xl border border-stone-100 bg-white p-5 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase text-[rgb(var(--bite-muted))]">
                  Deliver to
                </p>
                <p className="mt-1 font-bold">{order.customer?.name}</p>
                <p className="text-sm text-[rgb(var(--bite-muted))]">
                  {order.customer?.address}
                </p>
                {order.customer?.phone && (
                  <p className="text-sm text-[rgb(var(--bite-muted))]">
                    {order.customer.phone}
                  </p>
                )}
              </div>

              {note && (
                <p className="text-sm text-[rgb(var(--bite-muted))]">
                  <span className="font-semibold text-stone-700">Note:</span> {note}
                </p>
              )}

              <ul className="space-y-2 border-t border-stone-100 pt-4">
                {order.items?.map((it, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span>
                      {it.name} × {it.qty || 1}
                    </span>
                    <span className="font-semibold">
                      {formatPrice(Number(it.price || 0) * Number(it.qty || 1))}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="flex justify-between border-t border-stone-100 pt-3 text-lg font-extrabold">
                <span>Total paid (COD)</span>
                <span>{formatPrice(order.total)}</span>
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary">
              Order again
            </Link>
            <Link to="/orders" className="btn-ghost">
              View all orders
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
