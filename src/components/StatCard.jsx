export function StatCard({ label, value, meta, className = '' }) {
  return (
    <article className={`stat-card ${className}`.trim()}>
      <p className="stat-label">{label}</p>
      <h3 className="stat-value">{value}</h3>
      <p className="stat-meta">{meta}</p>
    </article>
  )
}
