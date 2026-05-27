export default function PageHeader({ title, subtitle, action, badge }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {badge && <p className="section-eyebrow">{badge}</p>}
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
