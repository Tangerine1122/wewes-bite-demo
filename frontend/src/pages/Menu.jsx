import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { useCart } from "../context/CartContext.jsx";
import TopBar from "../components/TopBar.jsx";

export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");
  const { cart, addToCart, decreaseQty } = useCart();

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

  const categories = useMemo(() => {
    const set = new Set(foods.map((f) => f.category).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [foods]);

  const filtered = useMemo(() => {
    if (category === "all") return foods;
    return foods.filter((f) => f.category === category);
  }, [foods, category]);

  function getQty(id) {
    const found = cart.find((i) => String(i.id) === String(id));
    return found ? found.qty : 0;
  }

  function labelFor(cat) {
    if (cat === "all") return "All";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
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

        {!loading && !error && categories.length > 1 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={category === cat ? "btn-primary" : "btn-ghost"}
                onClick={() => setCategory(cat)}
              >
                {labelFor(cat)}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <p className="mt-6 text-[rgb(var(--bite-muted))]">Loading menu…</p>
        )}
        {error && (
          <p className="mt-6 font-semibold text-[rgb(var(--bite-red))]">
            {error}
          </p>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((food) => {
            const qty = getQty(food.id);

            return (
              <div
                key={food.id}
                className="card overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)] transition"
              >
                {food.image ? (
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-40 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-40 w-full bg-[rgb(var(--bite-orange))/0.12] flex items-center justify-center text-4xl">
                    🍽️
                  </div>
                )}

                <div className="card-pad">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold">{food.name}</h3>
                    <span className="pill shrink-0">₱{food.price}</span>
                  </div>

                  {food.description && (
                    <p className="mt-2 text-sm text-[rgb(var(--bite-muted))] line-clamp-2">
                      {food.description}
                    </p>
                  )}

                  {qty > 0 ? (
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="btn-ghost"
                          onClick={() => decreaseQty(food.id)}
                          aria-label={`Decrease ${food.name}`}
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center font-extrabold">
                          {qty}
                        </span>
                        <button
                          type="button"
                          className="btn-ghost"
                          onClick={() => addToCart(food)}
                          aria-label={`Increase ${food.name}`}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-[rgb(var(--bite-muted))]">
                        In cart
                      </span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn-primary mt-4 w-full"
                      onClick={() => addToCart(food)}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!loading && !error && filtered.length === 0 && (
          <p className="mt-6 text-[rgb(var(--bite-muted))]">
            No items in this category.
          </p>
        )}
      </div>
    </div>
  );
}
