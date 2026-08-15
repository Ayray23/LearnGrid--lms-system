import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="screen-center">
      <div className="empty-state">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you requested does not exist in this SE-LMS workspace.</p>
        <Link to="/" className="primary-button">
          Go home
        </Link>
      </div>
    </main>
  )
}
