import { Link } from 'react-router-dom'
import { ThemeToggle } from '../../components/ThemeToggle'

const features = [
  'Interactive Coding Space',
  'Assignment Submission',
  'Real-time Collaboration',
  'Video Lessons',
  'Student Dashboard',
  'Progress Tracking',
  'AI Learning Assistant',
  'Dark Mode Coding Environment',
]

const testimonials = [
  {
    quote: 'SE-LMS helped me stay on top of every deadline while keeping coding practice fun and efficient.',
    name: 'Mia Chen',
    role: 'Computer Science Student',
  },
  {
    quote: 'The collaborative editor and live feedback features transformed how our team learns together.',
    name: 'Noah Patel',
    role: 'Software Engineering Student',
  },
  {
    quote: 'I love the polished dashboard and progress analytics—it feels like an engineer-first experience.',
    name: 'Sophia Garcia',
    role: 'Student Mentor',
  },
]

const stats = [
  { value: '24K+', label: 'Active Students' },
  { value: '320+', label: 'Courses Available' },
  { value: '18K+', label: 'Projects Completed' },
  { value: '54K+', label: 'Challenges Solved' },
]

export function HomePage() {
  return (
    <main className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 sm:px-8 lg:px-12">
        <nav className="mb-10 flex flex-col gap-6 rounded-[32px] border border-slate-900/10 dark:border-white/10 bg-white/60 dark:bg-slate-900/60 px-6 py-5 shadow-[0_40px_120px_rgba(14,165,233,0.12)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20">
              <span className="text-lg font-semibold">SE</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">SE-LMS</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Futuristic learning hub</p>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-slate-600 dark:text-slate-300 sm:flex">
            <Link to="#home" className="transition hover:text-cyan-200">Home</Link>
            <Link to="#courses" className="transition hover:text-cyan-200">Courses</Link>
            <Link to="#features" className="transition hover:text-cyan-200">Features</Link>
            <Link to="#community" className="transition hover:text-cyan-200">Community</Link>
            <Link to="#about" className="transition hover:text-cyan-200">About</Link>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <ThemeToggle />
            <Link
              to="/login"
              className="rounded-full border border-slate-900/10 dark:border-white/10 px-5 py-2 text-sm text-slate-900 dark:text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(56,189,248,0.24)] transition hover:opacity-90"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        <section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur-lg">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.5)]" />
              Premium experience for software engineering students
            </div>

            <div className="space-y-6">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
                Learn, Code, and Collaborate in One Smart LMS Platform
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
                SE-LMS combines modern coursework, live coding rooms, AI learning support,
                and team collaboration into a premium platform designed for software engineering success.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-8 py-3 text-base font-semibold text-slate-950 shadow-[0_20px_70px_rgba(56,189,248,0.25)] transition hover:-translate-y-0.5"
              >
                Get Started
              </Link>
              <Link
                to="#courses"
                className="inline-flex items-center justify-center rounded-full border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 px-8 py-3 text-base font-semibold text-slate-900 dark:text-slate-100 transition hover:border-cyan-300/30"
              >
                Explore Courses
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.4)] backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/70">Collaboration</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Live rooms</p>
              </div>
              <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.4)] backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/70">AI coach</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Instant guidance</p>
              </div>
              <div className="rounded-3xl border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.4)] backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/70">Progress</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Goal tracking</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute -right-10 top-20 h-16 w-16 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="rounded-[40px] border border-slate-900/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.3)] backdrop-blur-xl">
              <div className="flex items-center justify-between rounded-3xl bg-slate-100/90 dark:bg-slate-950/90 px-5 py-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">SE-LMS Dashboard</p>
                  <p className="text-xl font-semibold text-slate-900 dark:text-white">Course analytics</p>
                </div>
                <div className="rounded-2xl bg-cyan-400/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-cyan-200">
                  Realtime
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-slate-100/90 dark:bg-slate-950/90 p-5 ring-1 ring-slate-900/5 dark:ring-white/5">
                  <div className="mb-4 flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span>Live code review</span>
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">Active</span>
                  </div>
                  <div className="rounded-3xl bg-white/95 dark:bg-slate-900/95 p-4">
                    <div className="h-2 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <div className="mt-4 space-y-3">
                      <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800" />
                      <div className="h-3 w-5/6 rounded-full bg-slate-100 dark:bg-slate-800" />
                      <div className="h-3 w-3/4 rounded-full bg-slate-100 dark:bg-slate-800" />
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl bg-slate-100/90 dark:bg-slate-950/90 p-5 ring-1 ring-slate-900/5 dark:ring-white/5">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span>Assignments</span>
                    <span className="text-sm text-slate-800 dark:text-slate-200">3 pending</span>
                  </div>
                  <div className="mt-4 grid gap-3">
                    <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800" />
                    <div className="h-3 rounded-full bg-slate-100/80 dark:bg-slate-800/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-20 space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Features</p>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">Everything modern software engineering students need in one platform</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature}
                className="group rounded-[32px] border border-slate-900/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.25)] transition hover:-translate-y-1 hover:border-cyan-400/20"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 shadow-[0_20px_60px_rgba(56,189,248,0.15)]">
                  <span className="text-xl font-semibold">•</span>
                </div>
                <p className="mt-6 text-lg font-semibold text-slate-900 dark:text-white">{feature}</p>
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Designed to help the next generation of software engineers build, collaborate, and deliver fast.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="coding" className="mt-20 grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/80 dark:bg-slate-900/80 px-4 py-2 text-sm text-cyan-200 ring-1 ring-slate-900/10 dark:ring-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.4)]" />
              Coding space preview
            </div>
            <h3 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
              Real code, terminal, and collaboration in one responsive editor.
            </h3>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Build with syntax highlighting, see terminal outputs instantly, and invite classmates into the same coding session.
            </p>
          </div>

          <div className="rounded-[40px] border border-slate-900/10 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.3)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between rounded-3xl bg-slate-100/90 dark:bg-slate-950/90 px-5 py-4 text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div className="rounded-2xl bg-slate-900/5 dark:bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">Live Editor</div>
            </div>
            <div className="rounded-3xl bg-slate-100/95 dark:bg-slate-950/95 p-5">
              <div className="mb-5 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1">main.js</span>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1">react</span>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1">tailwind</span>
              </div>
              <div className="space-y-3 text-sm font-mono text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400">const</span>
                  <span className="text-slate-900 dark:text-white">handleSubmit</span>
                  <span className="text-slate-500">= async (event) =&gt;</span>
                </div>
                <div className="ml-6 text-slate-500 dark:text-slate-400">console.log('Learn in flow')</div>
                <div className="flex items-center gap-3">
                  <span className="text-violet-400">return</span>
                  <span className="text-slate-900 dark:text-slate-100">(</span>
                </div>
                <div className="ml-6 text-slate-500 dark:text-slate-400">&lt;section className=&#34;editor&#34; /&gt;</div>
                <div className="text-slate-900 dark:text-slate-100">);</div>
              </div>
            </div>
            <div className="mt-6 rounded-[28px] border border-cyan-500/10 bg-slate-100/90 dark:bg-slate-950/90 p-5">
              <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span>Terminal</span>
                <span className="text-slate-800 dark:text-slate-200">node run.sh</span>
              </div>
              <div className="mt-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 p-4 font-mono text-sm text-slate-800 dark:text-slate-200">
                <p className="text-cyan-400">$ npm run dev</p>
                <p>Compiled successfully in 0.8s.</p>
                <p className="text-slate-500 dark:text-slate-400">Listening on http://localhost:5173</p>
              </div>
            </div>
          </div>
        </section>

        <section id="stats" className="mt-20 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[32px] border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl"
            >
              <p className="text-4xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{item.label}</p>
            </div>
          ))}
        </section>

        <section id="community" className="mt-20 space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Student voices</p>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">Trusted by learners building the next wave of engineering products</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-[32px] border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.25)] backdrop-blur-xl">
                <p className="text-slate-600 dark:text-slate-300">“{item.quote}”</p>
                <div className="mt-6">
                  <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer id="about" className="mt-24 rounded-[40px] border border-slate-900/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 p-10 shadow-[0_40px_120px_rgba(15,23,42,0.2)] backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr_1fr]">
            <div className="space-y-4">
              <p className="text-xl font-semibold text-slate-900 dark:text-white">SE-LMS</p>
              <p className="text-slate-500 dark:text-slate-400">A next-generation learning platform for software engineering students, built with premium UI and collaborative workflows in mind.</p>
            </div>
            <div className="space-y-3 space-x-3 text-sm text-slate-600 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white px-2">Quick Links</p>
              <Link to="#home" className="transition hover:text-cyan-200">Home</Link>
              <Link to="#features" className="transition hover:text-cyan-200">Features</Link>
              <Link to="#coding" className="transition hover:text-cyan-200">Coding Space</Link>
              <Link to="#community" className="transition hover:text-cyan-200">Testimonials</Link>
            </div>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">Contact</p>
              <p>hello@se-lms.com</p>
              <p>+1 (555) 012-3456</p>
              <div className="flex items-center gap-3 pt-2 text-cyan-300">
                <span className="rounded-full border border-cyan-300/20 bg-slate-900/5 dark:bg-white/5 px-3 py-2">Twitter</span>
                <span className="rounded-full border border-cyan-300/20 bg-slate-900/5 dark:bg-white/5 px-3 py-2">LinkedIn</span>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-900/10 dark:border-white/10 pt-6 text-sm text-slate-500">© 2026 SE-LMS. Built for modern software engineering learning.</div>
        </footer>
      </div>
    </main>
  )
}
