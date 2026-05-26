import { useEffect, useState } from "react";
import TopBar from "../components/TopBar.jsx";
import { Link, useParams } from "react-router-dom";
import { api } from "../services/api";

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
    <div className="min-h-screen">
      <TopBar />

      <div className="container-page">
        <div className="card card-pad">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Order Placed! <span className="text-[rgb(var(--bite-orange))]">✅</span>
          </h1>

          <p className="mt-3 text-[rgb(var(--bite-muted))]">
            Thanks for ordering from <span className="font-bold">Wewe's Bite</span>.
          </p>

          <div className="mt-4">
            <p className="text-sm text-[rgb(var(--bite-muted))]">Your order ID:</p>
            <p className="text-lg font-extrabold break-all">{orderId}</p>
          </div>

          {loading && (
            <p className="mt-4 text-sm text-[rgb(var(--bite-muted))]">Loading order…</p>
          )}

          {!loading && order && (
            <div className="mt-6 border-t border-black/5 pt-4 space-y-3">
              <p className="text-sm">
                <span className="text-[rgb(var(--bite-muted))]">Deliver to: </span>
                <span className="font-bold">{order.customer?.name}</span>
                {" · "}
                {order.customer?.address}
              </p>
              {note ? (
                <p className="text-sm text-[rgb(var(--bite-muted))]">Note: {note}</p>
              ) : null}

              <div className="space-y-1">
                {order.items?.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>
                      {it.name} × {it.qty || 1}
                    </span>
                    <span className="font-semibold">
                      ₱{Number(it.price || 0) * Number(it.qty || 1)}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-lg font-extrabold">Total: ₱{order.total}</p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/" className="btn-primary">
              Back to Menu
            </Link>
            <Link to="/orders" className="btn-ghost">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
