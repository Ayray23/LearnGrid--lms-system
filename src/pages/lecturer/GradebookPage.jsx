import { useState } from 'react'
import { DataTable } from '../../components/DataTable'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { gradebookRows } from '../../utils/mockData'

const columns = [
  { key: 'student', label: 'Student' },
  { key: 'course', label: 'Course' },
  { key: 'assignments', label: 'Assignments' },
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'projects', label: 'Projects' },
  { key: 'final', label: 'Final' },
  { key: 'status', label: 'Status' },
]

export function GradebookPage() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(gradebookRows[0])

  const openFeedbackModal = (student) => {
    setSelectedStudent(student)
    setShowFeedbackModal(true)
  }

  return (
    <div className="page-stack">
      <SectionCard
        title="Gradebook"
        description="Review scores, give feedback, and approve marks before publishing."
        action={
          <button className="primary-button small" type="button" onClick={() => openFeedbackModal(gradebookRows[1])}>
            Add feedback
          </button>
        }
      >
        <DataTable columns={columns} rows={gradebookRows} />
      </SectionCard>

      <section className="lecturer-course-grid">
        {gradebookRows.map((row) => (
          <article key={row.student} className="lecturer-course-card">
            <div>
              <span className="course-badge">{row.course}</span>
              <h3>{row.student}</h3>
              <p>Final score: {row.final}</p>
            </div>
            <button className="ghost-button small" type="button" onClick={() => openFeedbackModal(row)}>
              Review feedback
            </button>
          </article>
        ))}
      </section>

      <Modal
        open={showFeedbackModal}
        title={`Feedback for ${selectedStudent.student}`}
        onClose={() => setShowFeedbackModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={() => setShowFeedbackModal(false)}>
            Approve feedback
          </button>
        }
      >
        <div className="catalogue-metrics">
          <article>
            <span>Course</span>
            <strong>{selectedStudent.course}</strong>
          </article>
          <article>
            <span>Final mark</span>
            <strong>{selectedStudent.final}</strong>
          </article>
        </div>
        <label>
          <span>Lecturer feedback</span>
          <textarea
            className="code-editor"
            rows={5}
            defaultValue="Good structure and clear reasoning. Improve diagram labels before final submission."
          />
        </label>
      </Modal>
    </div>
  )
}
