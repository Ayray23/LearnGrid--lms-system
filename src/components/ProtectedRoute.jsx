import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ allowedRoles }) {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return (
      <div className="screen-center">
        <div className="loading-panel">
          <span className="loader" />
          <p>Loading your workspace...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/app" replace />
  }

  return <Outlet />
}
