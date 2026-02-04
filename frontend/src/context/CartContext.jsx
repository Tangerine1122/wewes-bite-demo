import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_KEY = "wewes_bite_cart_v2"; // new key so old duplicate cart doesn't conflict

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => String(p.id) === String(item.id));
      if (existing) {
        return prev.map((p) =>
          String(p.id) === String(item.id) ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      const found = prev.find((p) => String(p.id) === String(id));
      if (!found) return prev;

      if (found.qty <= 1) {
        return prev.filter((p) => String(p.id) !== String(id));
      }

      return prev.map((p) =>
        String(p.id) === String(id) ? { ...p, qty: p.qty - 1 } : p
      );
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => String(p.id) !== String(id)));
  };

  const clearCart = () => setCart([]);

  // Useful derived values
  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + (i.qty || 0), 0), [cart]);
  const total = useMemo(() => cart.reduce((sum, i) => sum + Number(i.price || 0) * (i.qty || 0), 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQty, removeItem, clearCart, cartCount, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
