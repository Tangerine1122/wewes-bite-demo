import TopBar from "../components/TopBar.jsx";
import { Link, useParams } from "react-router-dom";

export default function Success() {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen">
      <TopBar />

      <div className="container-page">
        <div className="card card-pad">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Order Placed! <span className="text-[rgb(var(--bite-orange))]">✅</span>
          </h1>

          <p className="mt-3 text-[rgb(var(--bite-muted))]">
            Thanks for ordering from <span className="font-bold">Wewe’s Bite</span>.
          </p>

          <div className="mt-4">
            <p className="text-sm text-[rgb(var(--bite-muted))]">Your order ID:</p>
            <p className="text-lg font-extrabold break-all">{orderId}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/" className="btn-primary">Back to Menu</Link>
            <Link to="/orders" className="btn-ghost">View Orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
