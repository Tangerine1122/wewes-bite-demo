export function formatPrice(amount) {
  return `₱${Number(amount || 0).toLocaleString("en-PH")}`;
}

export function categoryLabel(cat) {
  if (!cat || cat === "all") return "All";
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

export function shortOrderId(id) {
  if (!id) return "";
  const s = String(id);
  return s.length > 8 ? `${s.slice(0, 8)}…` : s;
}
