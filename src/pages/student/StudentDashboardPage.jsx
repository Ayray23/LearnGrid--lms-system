import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionCard } from '../../components/SectionCard'
import { StatCard } from '../../components/StatCard'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { announcementService, assignmentService, courseService } from '../../firebase/services'

export function StudentDashboardPage() {
  const navigate = useNavigate()

  const {
    records: studentCourses,
    loading: coursesLoading,
  } = useFirestoreCollection(courseService.listCourses)

  const {
    records: assignments,
    loading: assignmentsLoading,
  } = useFirestoreCollection(assignmentService.listAssignments)

  const {
    records: announcements,
    loading: announcementsLoading,
  } = useFirestoreCollection(announcementService.listAnnouncements)

  const stats = useMemo(
    () => [
      {
        label: 'Available Courses',
        value: studentCourses.length.toString(),
        meta: coursesLoading ? 'Loading courses…' : 'Courses ready for enrollment',
      },
      {
        label: 'Active Assignments',
        value: assignments.length.toString(),
        meta: assignmentsLoading ? 'Loading assignments…' : 'Tasks pending review',
      },
      {
        label: 'Announcements',
        value: announcements.length.toString(),
        meta: announcementsLoading ? 'Loading announcements…' : 'Recent platform updates',
      },
      {
        label: 'Live Production',
        value: 'Enabled',
        meta: 'Firestore-backed content',
      },
    ],
    [studentCourses.length, assignments.length, announcements.length, coursesLoading, assignmentsLoading, announcementsLoading]
  )

  return (
    <div className="page-stack p-6">
      <section className="page-hero">
        <div className='p-4'>
          <p className="eyebrow">Student Dashboard</p>
          <h2>Track coursework, deadlines, and coding practice from one place.</h2>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="two-column-grid">
        <SectionCard
          title="My Courses"
          description="Your current semester enrollment"
          action={
            <button className="ghost-button small" type="button" onClick={() => navigate('/app/student/courses')}>
              View courses
            </button>
          }
        >
          <div className="list-grid">
            {studentCourses.length ? (
              studentCourses.map((course) => (
                <article key={course.id || course.code} className="list-item-card">
                  <strong>{course.code || 'N/A'}</strong>
                  <h3>{course.title || 'Untitled course'}</h3>
                  <p>{course.lecturer || 'Not assigned'}</p>
                </article>
              ))
            ) : (
              <p className="text-slate-500 dark:text-slate-400">No course data available yet. Add course entries in Firestore.</p>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Recent Announcements" description="Latest class updates">
          <div className="stack-list">
            {announcements.length ? (
              announcements.map((item) => (
                <article key={item.id || item.title} className="feed-item">
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.audience}</p>
                  </div>
                  <span>{item.time || item.createdAt || 'Just now'}</span>
                </article>
              ))
            ) : (
              <p className="text-slate-500 dark:text-slate-400">No announcements available yet.</p>
            )}
          </div>
        </SectionCard>
      </section>

      <SectionCard
        title="Assignments Overview"
        description="Stay ahead of pending work"
        action={
          <button className="ghost-button small" type="button" onClick={() => navigate('/app/student/assignments')}>
            Review assignments
          </button>
        }
      >
        <div className="stack-list">
          {assignments.length ? (
            assignments.map((item) => (
              <article key={item.id || item.title} className="feed-item">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.course}</p>
                </div>
                <span>{item.deadline}</span>
              </article>
            ))
          ) : (
            <p className="text-slate-500 dark:text-slate-400">No assignments available yet.</p>
          )}
        </div>
      </SectionCard>
    </div>
  )
}
