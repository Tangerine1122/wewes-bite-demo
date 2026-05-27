import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { useCart } from "../context/CartContext.jsx";
import Layout from "../components/Layout.jsx";
import Hero from "../components/Hero.jsx";
import FoodCard from "../components/FoodCard.jsx";
import MenuSkeleton from "../components/MenuSkeleton.jsx";
import { categoryLabel } from "../utils/format.js";

const CATEGORY_ICONS = {
  all: "✨",
  burgers: "🍔",
  wings: "🍗",
  sides: "🍟",
  drinks: "🥤",
  desserts: "🍰",
};

export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
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
    let list = foods;
    if (category !== "all") {
      list = list.filter((f) => f.category === category);
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (f) =>
          f.name?.toLowerCase().includes(q) ||
          f.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [foods, category, search]);

  function getQty(id) {
    const found = cart.find((i) => String(i.id) === String(id));
    return found ? found.qty : 0;
  }

  return (
    <Layout hero={<Hero />}>
      <div className="container-page py-10" id="menu">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-eyebrow">Our menu</p>
            <h2 className="font-brand text-2xl md:text-3xl font-bold text-stone-900">
              What are you craving?
            </h2>
            <p className="mt-1 text-sm text-[rgb(var(--bite-muted))]">
              {foods.length} items · Freshly prepared to order
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">
              🔍
            </span>
            <input
              type="search"
              className="search-input"
              placeholder="Search dishes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search menu"
            />
          </div>
        </div>

        {!loading && !error && categories.length > 1 && (
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`chip shrink-0 ${
                  category === cat ? "chip-active" : "chip-inactive"
                }`}
                onClick={() => setCategory(cat)}
              >
                {CATEGORY_ICONS[cat] || "•"} {categoryLabel(cat)}
              </button>
            ))}
          </div>
        )}

        {loading && <MenuSkeleton />}

        {error && (
          <div className="empty-state">
            <div className="empty-icon">⚠️</div>
            <p className="mt-4 font-semibold text-red-600">{error}</p>
            <p className="mt-2 text-sm text-[rgb(var(--bite-muted))]">
              Run <code className="rounded bg-stone-100 px-1.5 py-0.5">npm run dev</code> from the project root.
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                qty={getQty(food.id)}
                onAdd={() => addToCart(food)}
                onDecrease={() => decreaseQty(food.id)}
              />
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🔎</div>
            <p className="mt-4 font-bold text-stone-900">No dishes found</p>
            <p className="mt-2 text-sm text-[rgb(var(--bite-muted))]">
              Try another category or search term.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
