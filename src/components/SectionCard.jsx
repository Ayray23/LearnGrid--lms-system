export function SectionCard({ title, description, action, children, className = '' }) {
  return (
    <section className={`section-card ${className}`.trim()}>
      <div className="section-heading">
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {action}
      </div>
      <div className="section-card-body">{children}</div>
    </section>
  )
}
