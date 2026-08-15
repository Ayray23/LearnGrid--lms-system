import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { roleLandingPath } from '../../utils/mockData'
import { ThemeToggle } from '../../components/ThemeToggle'

const initialState = {
  email: '',
  password: '',
  role: 'student',
}

const highlights = [
  'Secure campus authentication',
  'Instant dashboard access',
  'Realtime collaboration rooms',
]

export function LoginPage() {
  const [form, setForm] = useState(initialState)
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { login, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = location.state?.from?.pathname

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const profile = await login(form)
      navigate(redirectTo || roleLandingPath[profile.role] || '/app', { replace: true })
    } 
    catch (submitError) {
  let message = 'Unable to sign in. Please try again.'

  switch (submitError.code) {
    case 'auth/invalid-email':
      message = 'Please enter a valid email address.'
      break

    case 'auth/user-not-found':
      message = 'No account exists with this email.'
      break

    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      message = 'Incorrect email or password.'
      break

    case 'auth/too-many-requests':
      message =
        'Too many failed login attempts. Please wait a few minutes before trying again.'
      break

    case 'auth/network-request-failed':
      message =
        'Network error. Please check your internet connection and try again.'
      break

    case 'auth/user-disabled':
      message = 'This account has been disabled. Please contact the administrator.'
      break

    default:
      message = submitError.message || 'Unable to sign in.'
  }

  setError(message)

    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <ThemeToggle className="fixed right-5 top-5 z-50" />
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative overflow-hidden border-r border-slate-900/10 dark:border-white/10 bg-gradient-to-br from-slate-100 dark:from-slate-950 via-white dark:via-slate-900 to-slate-100 dark:to-slate-950 px-8 py-10 text-slate-900 dark:text-slate-100 sm:px-12 lg:px-16">
          <div className="absolute -left-16 top-24 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="relative z-10 mx-auto flex max-w-xl flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/15 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.4)]" />
                Premium developer-first LMS
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  Sign in to your futuristic learning workspace.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  Access your courses, live coding rooms, AI study assistant, and project roadmap with one secure login.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-xl"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Feature</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{highlight}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[32px] border border-slate-900/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-6 text-slate-600 dark:text-slate-300 shadow-[0_30px_80px_rgba(15,23,42,0.2)] backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">On desktop</p>
              <p className="mt-3 text-lg leading-7">
                For larger screens the sign in page stays sleek and focused with a smooth navigation flow to sign up if you are new.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="w-full max-w-md rounded-[40px] border border-slate-900/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-8 shadow-[0_40px_120px_rgba(14,165,233,0.15)] backdrop-blur-xl">
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">Welcome back</p>
                  <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Login to SE-LMS</h2>
                </div>
                <span className="rounded-3xl bg-slate-100/70 dark:bg-slate-950/70 px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">
                  secure
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                Enter your credentials to continue your learning journey and join the next generation of engineers.
              </p>
            </div>

            {!isFirebaseConfigured && (
              <div className="mb-5 rounded-3xl border border-rose-400/10 bg-rose-500/10 p-4 text-sm text-rose-100">
                Authentication is not configured. Live authentication is unavailable until required environment variables are provided.
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@school.edu"
                  required
                  className="w-full rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100/80 dark:bg-slate-950/80 px-4 py-3 text-slate-900 dark:text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100/80 dark:bg-slate-950/80 px-4 py-3 pr-28 text-slate-900 dark:text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-900/10 dark:border-white/10 bg-slate-100/70 dark:bg-slate-950/70 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-600 dark:text-slate-300 transition hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-900/10 dark:border-white/10 bg-white dark:bg-slate-900 text-cyan-400 focus:ring-cyan-400"
                  />
                  Remember me
                </label>
                <Link className="text-sm font-medium text-cyan-300 transition hover:text-cyan-100" to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              {error && <p className="text-sm text-rose-400">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-3xl bg-cyan-400 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-6 rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100/80 dark:bg-slate-950/80 p-5 text-center text-sm text-slate-500 dark:text-slate-400 shadow-[0_20px_60px_rgba(15,23,42,0.2)]">
              New to SE-LMS?{' '}
              <Link className="font-medium text-cyan-300 transition hover:text-cyan-100" to="/register">
                Create an account
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
