import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { roleLandingPath } from '../../utils/mockData'
import { ThemeToggle } from '../../components/ThemeToggle'

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'student',
  department: 'Software Engineering',
}

const departments = ['Software Engineering', 'Computer Science', 'Information Systems', 'IT Management']
const roles = ['student', 'lecturer', 'admin']

export function RegisterPage() {
  const [form, setForm] = useState(initialState)
  const [step, setStep] = useState(1)
  const [agree, setAgree] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const fieldValue = type === 'checkbox' ? checked : value
    setForm((prev) => ({ ...prev, [name]: fieldValue }))
  }

  const handleContinue = (event) => {
    event.preventDefault()
    setError('')
    setStep(2)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!agree) {
      setError('You must accept the terms to continue.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)

    try {
      const profile = await register(form)
      navigate(roleLandingPath[profile.role] || '/app', { replace: true })
    } catch (submitError) {
      setError(submitError.message || 'Unable to create account.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <ThemeToggle className="fixed right-5 top-5 z-50" />
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="relative overflow-hidden border-r border-slate-900/10 dark:border-white/10 bg-gradient-to-br from-slate-100 dark:from-slate-950 via-white dark:via-slate-900 to-slate-100 dark:to-slate-950 px-8 py-10 text-slate-900 dark:text-slate-100 sm:px-12 lg:px-16">
          <div className="absolute -left-16 top-16 h-36 w-36 rounded-full bg-purple-500/15 blur-3xl" />
          <div className="absolute right-8 top-24 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="relative z-10 mx-auto flex max-w-xl flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/15 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.4)]" />
                Multi-step sign-up with AI-ready onboarding
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  Create your SE-LMS account today.
                </h1>
                <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  Join a premium learning platform built for software engineering students, lecturers, and platform admins.
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-900/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-6 text-slate-600 dark:text-slate-300 shadow-[0_30px_80px_rgba(15,23,42,0.2)] backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Why register?</p>
              <ul className="mt-5 space-y-3 text-sm leading-7">
                <li>Personalized learning pathways for every role.</li>
                <li>Instant access to live coding rooms and collaborative labs.</li>
                <li>Dashboard insights for performance, assignments, and progress.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="w-full max-w-md rounded-[40px] border border-slate-900/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-8 shadow-[0_40px_120px_rgba(14,165,233,0.15)] backdrop-blur-xl">
            <div className="mb-8 space-y-4">
              <div className="rounded-3xl bg-slate-100/80 dark:bg-slate-950/80 px-4 py-3 text-xs uppercase tracking-[0.3em] text-slate-600 dark:text-slate-300">
                Step {step} of 2
              </div>
              <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Register your account</h2>
              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                Complete the quick onboarding flow and join your premium SE-LMS workspace.
              </p>
            </div>

            <form className="space-y-5" onSubmit={step === 1 ? handleContinue : handleSubmit}>
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">Full name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      required
                      className="w-full rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100/80 dark:bg-slate-950/80 px-4 py-3 text-slate-900 dark:text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>

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

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">Role</label>
                      <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100/80 dark:bg-slate-950/80 px-4 py-3 text-slate-900 dark:text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      >
                        {roles.map((roleOption) => (
                          <option key={roleOption} value={roleOption} className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
                            {roleOption}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">Department</label>
                      <select
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        className="w-full rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100/80 dark:bg-slate-950/80 px-4 py-3 text-slate-900 dark:text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                      >
                        {departments.map((dept) => (
                          <option key={dept} value={dept} className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <>
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
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">Confirm password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100/80 dark:bg-slate-950/80 px-4 py-3 text-slate-900 dark:text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>

                  <label className="inline-flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={agree}
                      onChange={(event) => setAgree(event.target.checked)}
                      className="h-4 w-4 rounded border-slate-900/10 dark:border-white/10 bg-white dark:bg-slate-900 text-cyan-400 focus:ring-cyan-400"
                    />
                    I agree to the terms and privacy policy.
                  </label>
                </>
              )}

              {error && <p className="text-sm text-rose-400">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-3xl bg-cyan-400 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {step === 1 ? 'Continue' : submitting ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <div className="mt-6 rounded-3xl border border-slate-900/10 dark:border-white/10 bg-slate-100/80 dark:bg-slate-950/80 p-5 text-center text-sm text-slate-500 dark:text-slate-400 shadow-[0_20px_60px_rgba(15,23,42,0.2)]">
              Already have an account?{' '}
              <Link className="font-medium text-cyan-300 transition hover:text-cyan-100" to="/login">
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
