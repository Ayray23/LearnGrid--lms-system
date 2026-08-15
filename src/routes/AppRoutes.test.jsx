import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'dark', toggleTheme: vi.fn() }),
}))

import { useAuth } from '../context/AuthContext'
import { AppRoutes } from './AppRoutes'

describe('AppRoutes routing', () => {
  it('sends unauthenticated users to the login page', async () => {
    useAuth.mockReturnValue({ currentUser: null, loading: false })
    render(
      <MemoryRouter initialEntries={['/app']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(await screen.findByText(/Sign in to your futuristic learning workspace/i)).toBeInTheDocument()
  })

  it('renders the login page on /login route', async () => {
    useAuth.mockReturnValue({ currentUser: null, loading: false })
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(await screen.findByText(/Sign in to your futuristic learning workspace/i)).toBeInTheDocument()
  })

  it('renders not found text for unknown routes', async () => {
    useAuth.mockReturnValue({ currentUser: null, loading: false })
    render(
      <MemoryRouter initialEntries={['/dead-end']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(await screen.findByText(/Page not found/i)).toBeInTheDocument()
  })
})
