import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { dashboardStats, roleNavigation } from '../utils/mockData'
import { ThemeToggle } from '../components/ThemeToggle'

export function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { currentUser, logout, isFirebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const navItems = roleNavigation[currentUser?.role] || []
  const stats = dashboardStats[currentUser?.role] || []
  const quickActions = {
    student: [
      { label: 'Review assignments', path: '/app/student/assignments' },
      { label: 'Open course catalogue', path: '/app/student/courses' },
      { label: 'Launch CodeSpace', path: '/app/student/codespace' },
    ],
    lecturer: [
      { label: 'Upload course material', path: '/app/lecturer/courses' },
      { label: 'Create assignment', path: '/app/lecturer/assignments' },
      { label: 'Review gradebook', path: '/app/lecturer/gradebook' },
    ],
    admin: [
      { label: 'Add student record', path: '/app/admin/students' },
      { label: 'Assign lecturer', path: '/app/admin/lecturers' },
      { label: 'Open reports', path: '/app/admin/reports' },
    ],
  }
  const activeQuickActions = quickActions[currentUser?.role] || quickActions.student

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside
          className={`border-b border-slate-200 dark:border-slate-800 bg-slate-100/95 dark:bg-slate-950/95 px-6 py-6 shadow-[0_0_60px_rgba(0,0,0,0.35)] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r lg:py-8 ${
            mobileNavOpen
              ? 'fixed inset-0 z-50 overflow-y-auto bg-slate-100/95 dark:bg-slate-950/95 backdrop-blur-xl'
              : 'hidden'
          } lg:block lg:static lg:inset-auto lg:overflow-visible`}
        >
          <div className="space-y-4 lg:space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.2)]">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">SE-LMS</p>
                <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Learning Workspace</h1>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100/90 dark:bg-slate-950/90 text-slate-600 dark:text-slate-300 transition hover:bg-slate-200 dark:hover:bg-slate-800 lg:hidden"
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l12 12" />
                  <path d="M16 4L4 16" />
                </svg>
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Navigation</p>
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Mobile</span>
              </div>
              <nav className="mt-4 grid gap-2 lg:grid-cols-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileNavOpen(false)}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 text-sm transition ${
                        isActive
                          ? 'bg-slate-100 text-slate-950 shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          <div className=" pt-4 mt-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 text-slate-600 dark:text-slate-300 shadow-inner shadow-black/20">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Signed in as</p>
            <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{currentUser?.name || 'Guest User'}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{currentUser?.role || 'Visitor'}</p>
          </div>
        </aside>

        <div className="flex flex-col">
          <header className="flex flex-col gap-5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-950/80 px-6 py-5 backdrop-blur xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Dashboard</p>
              <h2 className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">
                Welcome back, {currentUser?.name?.split(' ')[0] || 'Learner'}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Review your latest activity, discover your next task, and keep your learning on track.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <label className="flex w-full max-w-sm items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-4 py-3 text-slate-600 dark:text-slate-300 shadow-inner shadow-black/10 focus-within:border-slate-500 sm:w-auto">
                  <span className="text-slate-500 dark:text-slate-400">Search</span>
                  <input
                    type="search"
                    className="min-w-0 bg-transparent text-sm text-slate-900 dark:text-slate-100 outline-none placeholder:text-slate-500"
                    placeholder="Search courses, assignments, or users"
                  />
                </label>
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 shadow-sm transition hover:bg-slate-200 dark:hover:bg-slate-800 lg:hidden"
                  onClick={() => setMobileNavOpen(true)}
                  aria-label="Open navigation menu"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7h14" />
                    <path d="M3 10h14" />
                    <path d="M3 13h14" />
                  </svg>
                </button>
                <ThemeToggle />
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
            <section className="mb-6 grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
              <article className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Platform summary</p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Your role overview</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      The key metrics below keep you ahead of every deadline and course update.
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-100/80 dark:bg-slate-950/80 px-4 py-3 text-sm text-slate-800 dark:text-slate-200 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    {currentUser?.role ? `${currentUser.role} workspace` : 'Role not assigned'}
                  </div>
                </div>
              </article>

              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
                  >
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
                    <p className="mt-2 text-sm text-slate-500">{item.meta}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
              <section className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Workspace content</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  This area loads the selected section from the sidebar so you can work seamlessly without leaving the dashboard.
                </p>
                <div className="mt-6 pt-6  border-t border-slate-200 dark:border-slate-800">
                  <Outlet />
                </div>
              </section>

              <aside className="space-y-6">
                <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Quick actions</p>
                    <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs text-slate-600 dark:text-slate-300">Live</span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {activeQuickActions.map((action) => (
                      <button
                        key={action.path}
                        className="w-full rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white transition hover:bg-slate-200 dark:hover:bg-slate-800"
                        type="button"
                        onClick={() => navigate(action.path)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Status</p>
                  <div className="mt-4 rounded-3xl bg-slate-100/80 dark:bg-slate-950/80 p-4 text-sm text-slate-600 dark:text-slate-300">
                    <p className="font-medium text-slate-900 dark:text-white">{isFirebaseConfigured ? 'Live data enabled' : 'Live services unavailable'}</p>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {isFirebaseConfigured
                        ? 'Your workspace is connected to platform services and live data is available.'
                        : 'Live services are not configured. Provide environment variables to enable live features.'}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
