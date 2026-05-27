export default function MenuSkeleton() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="food-card animate-pulse">
          <div className="h-44 bg-black/5" />
          <div className="card-pad space-y-3">
            <div className="h-5 w-2/3 rounded-lg bg-black/5" />
            <div className="h-4 w-full rounded-lg bg-black/5" />
            <div className="h-10 w-full rounded-xl bg-black/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
