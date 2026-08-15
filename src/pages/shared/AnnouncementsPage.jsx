import { useState } from 'react'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { announcementService } from '../../firebase/services'

export function AnnouncementsPage() {
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    title: '',
    audience: 'Entire course',
    time: 'Just now',
  })

  const {
    records: items,
    loading,
    error,
    refresh,
  } = useFirestoreCollection(announcementService.listAnnouncements)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handlePost = async () => {
    if (!form.title.trim()) return

    await announcementService.createAnnouncement({
      title: form.title.trim(),
      audience: form.audience,
      time: form.time || 'Just now',
    })

    setForm({ title: '', audience: 'Entire course', time: 'Just now' })
    setShowModal(false)
    await refresh()
  }

  return (
    <div className="page-stack">
      <SectionCard
        title="Announcements"
        description="Lecturer updates, class notices, and academic reminders."
        action={
          <button className="primary-button small" type="button" onClick={() => setShowModal(true)}>
            Post announcement
          </button>
        }
      >
        <div className="stack-list">
          {loading ? (
            <p className="text-slate-500 dark:text-slate-400">Loading announcements...</p>
          ) : error ? (
            <p className="text-slate-500 dark:text-slate-400">
              {error.message || 'Unable to load announcements right now.'}
            </p>
          ) : items.length === 0 ? (
            <p className="text-slate-500 dark:text-slate-400">No announcements yet.</p>
          ) : (
            items.map((item) => (
              <article key={`${item.title}-${item.time}`} className="feed-item align-start">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.audience}</p>
                </div>
                <span>{item.time}</span>
              </article>
            ))
          )}
        </div>
      </SectionCard>

      <Modal
        open={showModal}
        title="Post Announcement"
        onClose={() => setShowModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={handlePost}>
            Publish announcement
          </button>
        }
      >
        <label>
          <span>Announcement</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Tomorrow's class starts at 9:00 AM"
          />
        </label>
        <label>
          <span>Audience</span>
          <select name="audience" value={form.audience} onChange={handleChange}>
            <option>Entire course</option>
            <option>Selected students</option>
            <option>All lecturers</option>
            <option>All students</option>
          </select>
        </label>
      </Modal>
    </div>
  )
}
