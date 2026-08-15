import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { vi } from 'vitest'
import { ProtectedRoute } from './ProtectedRoute'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

import { useAuth } from '../context/AuthContext'

function renderProtectedRoute(initialEntries, allowedRoles) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/app" element={<div>App home</div>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={allowedRoles} />}>
          <Route index element={<div>Protected content</div>} />
        </Route>
        <Route path="/login" element={<div>Login page</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  it('renders a loading panel while auth is loading', () => {
    useAuth.mockReturnValue({ loading: true, currentUser: null })
    renderProtectedRoute(['/admin'], ['admin'])

    expect(screen.getByText(/Loading your workspace.../i)).toBeInTheDocument()
  })

  it('redirects unauthenticated users to login', () => {
    useAuth.mockReturnValue({ loading: false, currentUser: null })
    renderProtectedRoute(['/admin'], ['admin'])

    expect(screen.getByText(/Login page/i)).toBeInTheDocument()
  })

  it('redirects users without the allowed role to /app', () => {
    useAuth.mockReturnValue({ loading: false, currentUser: { role: 'student' } })
    renderProtectedRoute(['/admin'], ['admin'])

    expect(screen.getByText(/App home/i)).toBeInTheDocument()
  })

  it('renders nested content when the user is authorized', () => {
    useAuth.mockReturnValue({ loading: false, currentUser: { role: 'admin' } })
    renderProtectedRoute(['/admin'], ['admin'])

    expect(screen.getByText(/Protected content/i)).toBeInTheDocument()
  })
})
