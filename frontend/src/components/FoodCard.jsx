import { formatPrice } from "../utils/format.js";

export default function FoodCard({ food, qty, onAdd, onDecrease }) {
  const inCart = qty > 0;

  return (
    <article className="food-card group">
      <div className="food-card-media">
        {food.image ? (
          <img
            src={food.image}
            alt={food.name}
            className="food-card-img"
            loading="lazy"
          />
        ) : (
          <div className="food-card-placeholder">🍽️</div>
        )}
        {food.badge && <span className="food-card-badge">{food.badge}</span>}
        {food.rating && (
          <span className="food-card-rating">★ {food.rating}</span>
        )}
      </div>

      <div className="food-card-body">
        <div className="flex items-start justify-between gap-2">
          <h3 className="food-card-title">{food.name}</h3>
          <span className="price-tag">{formatPrice(food.price)}</span>
        </div>

        {food.description && (
          <p className="food-card-desc">{food.description}</p>
        )}

        {food.prepTime && (
          <p className="food-card-meta">🕐 {food.prepTime}</p>
        )}

        {inCart ? (
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="qty-stepper">
              <button
                type="button"
                className="qty-btn"
                onClick={onDecrease}
                aria-label={`Decrease ${food.name}`}
              >
                −
              </button>
              <span className="qty-value">{qty}</span>
              <button
                type="button"
                className="qty-btn"
                onClick={onAdd}
                aria-label={`Increase ${food.name}`}
              >
                +
              </button>
            </div>
            <span className="text-xs font-semibold text-[rgb(var(--bite-orange))]">
              In cart
            </span>
          </div>
        ) : (
          <button type="button" className="btn-primary mt-4 w-full" onClick={onAdd}>
            Add to cart
          </button>
        )}
      </div>
    </article>
  );
}
