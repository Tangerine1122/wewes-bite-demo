import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useCart } from "../context/CartContext.jsx";
import TopBar from "../components/TopBar.jsx";

export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { cart, addToCart } = useCart();

  useEffect(() => {
    async function loadFoods() {
      try {
        const res = await api.get("/foods");
        setFoods(res.data);
      } catch {
        setError("Failed to load menu. Is JSON Server running?");
      } finally {
        setLoading(false);
      }
    }
    loadFoods();
  }, []);

  function getQty(id) {
    const found = cart.find((i) => String(i.id) === String(id));
    return found ? found.qty : 0;
  }

  return (
    <div className="min-h-screen">
      <TopBar />

      <div className="container-page">
        <header className="mt-2">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Menu <span className="text-[rgb(var(--bite-orange))]">🍔</span>
          </h1>
          <p className="mt-1 text-sm text-[rgb(var(--bite-muted))]">
            Pick something yummy — add to cart
          </p>
        </header>

        {loading && (
          <p className="mt-6 text-[rgb(var(--bite-muted))]">Loading menu…</p>
        )}
        {error && (
          <p className="mt-6 font-semibold text-[rgb(var(--bite-red))]">
            {error}
          </p>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => {
            const qty = getQty(food.id);

            return (
              <div
                key={food.id}
                className="card card-pad hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)] transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold">{food.name}</h3>
                  <span className="pill">₱{food.price}</span>
                </div>

                {qty > 0 && (
                  <p className="mt-2 text-sm text-[rgb(var(--bite-muted))]">
                    In cart:{" "}
                    <span className="font-extrabold text-[rgb(var(--bite-text))]">
                      {qty}
                    </span>
                  </p>
                )}

                <button
                  className="btn-primary mt-4 w-full"
                  onClick={() => addToCart(food)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
