import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

vi.mock('../../context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'dark', toggleTheme: vi.fn() }),
}))

import { useAuth } from '../../context/AuthContext'
import { RegisterPage } from './RegisterPage'

describe('RegisterPage', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ register: vi.fn(), isFirebaseConfigured: true })
  })

  it('advances to the password step when Continue is clicked', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Full name/i)).toBeInTheDocument()
    const continueButton = screen.getByRole('button', { name: /Continue/i })
    fireEvent.submit(continueButton.closest('form'))

    await waitFor(() => {
      expect(screen.getByText(/Create account/i)).toBeInTheDocument()
      expect(screen.queryByText(/Continue/i)).not.toBeInTheDocument()
    })
  })

  it('requires terms acceptance before submitting registration', async () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>,
    )

    const continueButton = screen.getByRole('button', { name: /Continue/i })
    fireEvent.submit(continueButton.closest('form'))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Create account/i })).toBeInTheDocument()
    })

    const form = screen.getByRole('button', { name: /Create account/i }).closest('form')
    const passwordField = form.querySelector('input[name="password"]')
    const confirmPasswordField = form.querySelector('input[name="confirmPassword"]')

    await userEvent.type(passwordField, 'password123')
    await userEvent.type(confirmPasswordField, 'password123')
    await userEvent.click(screen.getByRole('button', { name: /Create account/i }))

    await waitFor(() => {
      expect(screen.getByText(/You must accept the terms to continue/i)).toBeInTheDocument()
    })
  })
})
