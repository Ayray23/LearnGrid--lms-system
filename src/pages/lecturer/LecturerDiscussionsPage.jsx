import { useState } from 'react'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { discussionThreads } from '../../utils/mockData'

export function LecturerDiscussionsPage() {
  const [selectedThread, setSelectedThread] = useState(discussionThreads[0])
  const [showReplyModal, setShowReplyModal] = useState(false)

  const openReplyModal = (thread) => {
    setSelectedThread(thread)
    setShowReplyModal(true)
  }

  return (
    <div className="page-stack">
      <SectionCard title="Course Discussions" description="Answer student questions and manage course conversations.">
        <div className="stack-list">
          {discussionThreads.map((thread) => (
            <article key={thread.title} className="discussion-card">
              <div>
                <span className="course-badge">{thread.course}</span>
                <h3>{thread.title}</h3>
                <p>{thread.student} | {thread.replies} replies | {thread.latest}</p>
              </div>
              <div className="inline-actions">
                <span className="status-pill">{thread.status}</span>
                <button className="ghost-button small" type="button" onClick={() => openReplyModal(thread)}>
                  Reply
                </button>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Recommended Reply Pattern" description="Keep support specific, helpful, and connected to course materials">
        <div className="lecturer-reply-preview">
          <p>Review Week 3 materials, then retry Exercise 2 with the UML relationship checklist.</p>
          <span>Good replies point students back to exact resources and a concrete next action.</span>
        </div>
      </SectionCard>

      <Modal
        open={showReplyModal}
        title={`Reply to ${selectedThread.student}`}
        onClose={() => setShowReplyModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={() => setShowReplyModal(false)}>
            Send reply
          </button>
        }
      >
        <div className="info-banner">{selectedThread.title}</div>
        <label>
          <span>Lecturer reply</span>
          <textarea
            className="code-editor"
            rows={5}
            defaultValue="Review Week 3 materials and try Exercise 2. Bring your updated diagram to the next class for feedback."
          />
        </label>
      </Modal>
    </div>
  )
}
