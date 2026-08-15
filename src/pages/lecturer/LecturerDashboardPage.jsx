import { useNavigate } from 'react-router-dom'
import { SectionCard } from '../../components/SectionCard'
import { StatCard } from '../../components/StatCard'
import {
  dashboardStats,
  discussionThreads,
  lecturerAssignments,
  lecturerCodingChallenges,
  lecturerCourses,
  quizzes,
  submissionQueue,
} from '../../utils/mockData'

export function LecturerDashboardPage() {
  const navigate = useNavigate()
  const priorityActions = [
    { label: 'Upload course material', path: '/app/lecturer/courses' },
    { label: 'Create assignment', path: '/app/lecturer/assignments' },
    { label: 'Review gradebook', path: '/app/lecturer/gradebook' },
    { label: 'Answer discussions', path: '/app/lecturer/discussions' },
  ]

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="eyebrow">Lecturer Dashboard</p>
          <h2>Manage course delivery, assessment, grading, and student support from one teaching command center.</h2>
        </div>
      </section>

      <section className="stats-grid">
        {dashboardStats.lecturer.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="two-column-grid">
        <SectionCard title="Assigned Courses" description="Teaching load, review pressure, and class schedule">
          <div className="stack-list">
            {lecturerCourses.map((course) => (
              <article key={course.code} className="feed-item align-start">
                <div>
                  <strong>{course.code} - {course.title}</strong>
                  <p>{course.students} students | {course.completion} course progress | {course.nextClass}</p>
                </div>
                <span>{course.pendingReviews} reviews</span>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Priority Actions" description="Fast access to the work lecturers repeat daily">
          <div className="lecturer-action-grid">
            {priorityActions.map((action) => (
              <button
                key={action.label}
                type="button"
                className="lecturer-action-card"
                onClick={() => navigate(action.path)}
              >
                {action.label}
              </button>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="lecturer-ops-grid">
        <SectionCard title="Assessment Pipeline" description="Assignments, quizzes, and coding challenges in motion">
          <div className="stack-list">
            {[...lecturerAssignments.slice(0, 2), ...quizzes.slice(0, 1), ...lecturerCodingChallenges.slice(0, 1)].map((item) => (
              <article key={`${item.title}-${item.course}`} className="feed-item align-start">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.course}</p>
                </div>
                <span>{item.status || item.reviewStatus}</span>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Submission Queue" description="Students waiting for review or feedback">
          <div className="stack-list">
            {submissionQueue.map((submission) => (
              <article key={`${submission.student}-${submission.item}`} className="feed-item align-start">
                <div>
                  <strong>{submission.student}</strong>
                  <p>{submission.item} | {submission.course}</p>
                </div>
                <span>{submission.score}</span>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Discussion Watch" description="Questions that need lecturer attention">
          <div className="stack-list">
            {discussionThreads.map((thread) => (
              <article key={thread.title} className="feed-item align-start">
                <div>
                  <strong>{thread.title}</strong>
                  <p>{thread.course} | {thread.student}</p>
                </div>
                <span>{thread.status}</span>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  )
}
