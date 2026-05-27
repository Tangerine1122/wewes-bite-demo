export default function CheckoutSteps({ current }) {
  const steps = [
    { id: 1, label: "Cart" },
    { id: 2, label: "Details" },
    { id: 3, label: "Done" },
  ];

  return (
    <ol className="checkout-steps" aria-label="Checkout progress">
      {steps.map((step, i) => {
        const done = step.id < current;
        const active = step.id === current;
        return (
          <li
            key={step.id}
            className={`checkout-step flex items-center gap-2 ${
              done ? "checkout-step-done" : active ? "checkout-step-active" : ""
            }`}
          >
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                done
                  ? "bg-emerald-100 text-emerald-700"
                  : active
                    ? "bg-[rgb(var(--bite-orange))/0.15] text-[rgb(var(--bite-orange))]"
                    : "bg-stone-100 text-stone-500"
              }`}
            >
              {done ? "✓" : step.id}
            </span>
            <span className="hidden sm:inline">{step.label}</span>
            {i < steps.length - 1 && (
              <span className="mx-1 text-stone-300" aria-hidden>
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
