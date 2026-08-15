import { useMemo } from 'react'
import { SectionCard } from '../../components/SectionCard'
import { StatCard } from '../../components/StatCard'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { announcementService, courseService, userService } from '../../firebase/services'

export function AdminDashboardPage() {
  const {
    records: announcements,
    loading: announcementsLoading,
  } = useFirestoreCollection(announcementService.listAnnouncements)

  const { records: users, loading: usersLoading } = useFirestoreCollection(userService.listUsers)
  const { records: courses, loading: coursesLoading } = useFirestoreCollection(courseService.listCourses)

  const dashboardStats = useMemo(
    () => [
      {
        label: 'Users',
        value: users.length.toString(),
        meta: usersLoading ? 'Loading users…' : 'Active accounts in the system',
      },
      {
        label: 'Courses',
        value: courses.length.toString(),
        meta: coursesLoading ? 'Loading courses…' : 'Courses available for enrollment',
      },
      {
        label: 'Announcements',
        value: announcements.length.toString(),
        meta: announcementsLoading ? 'Loading announcements…' : 'Recent news and updates',
      },
      {
        label: 'Production Status',
        value: 'Live',
        meta: 'Firestore data source connected',
      },
    ],
    [users.length, courses.length, announcements.length, usersLoading, coursesLoading, announcementsLoading]
  )

  return (
    <div className="page-stack">
      <section className="page-hero ">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h2>Monitor users, courses, and platform-wide academic operations.</h2>
        </div>
      </section>

      <section className="stats-grid">
        {dashboardStats.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </section>

      <section className="two-column-grid">
        <SectionCard title="Platform Activity" description="Recent operational signals">
          <div className="stack-list p-12">
            {announcements.map((item) => (
              <article key={item.id || item.title} className="feed-item">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.audience}</p>
                </div>
                <span>{item.time || item.createdAt || 'Just now'}</span>
              </article>
            ))}
            {!announcements.length && (
              <p className="text-slate-500 dark:text-slate-400">No announcements found. Use the announcements page to add new updates.</p>
            )}
          </div>
        </SectionCard>

        <SectionCard title="User Snapshot" description="Key accounts on the platform">
          <div className="stack-list">
            {users.map((user) => (
              <article key={user.id || user.email || user.name} className="feed-item">
                <div>
                  <strong>{user.name || user.email || 'Unknown user'}</strong>
                  <p>{user.department || 'No department set'}</p>
                </div>
                <span>{user.role || 'Student'}</span>
              </article>
            ))}
            {!users.length && (
              <p className="text-slate-500 dark:text-slate-400">No users available yet. New signups will appear here.</p>
            )}
          </div>
        </SectionCard>
      </section>
    </div>
  )
}
