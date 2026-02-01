import { useEffect, useState } from "react";
import { api } from "./services/api";

export default function App() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFoods() {
      try {
        const res = await api.get("/foods");
        setFoods(res.data);
      } catch (err) {
        setError("Failed to load menu. Is JSON Server running?");
      } finally {
        setLoading(false);
      }
    }

    loadFoods();
  }, []);

  return (
    <div style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>Wewe’s Bite 🍔</h1>
      <p>React + JSON Server Demo</p>

      {loading && <p>Loading menu...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
          marginTop: 16,
        }}
      >
        {foods.map((food) => (
          <div
            key={food.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <h3>{food.name}</h3>
            <p>₱{food.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
