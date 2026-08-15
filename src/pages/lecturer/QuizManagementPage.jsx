import { useState } from 'react'
import { DataTable } from '../../components/DataTable'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { lecturerCourses, quizzes } from '../../utils/mockData'

const columns = [
  { key: 'title', label: 'Quiz' },
  { key: 'course', label: 'Course' },
  { key: 'questions', label: 'Questions' },
  { key: 'duration', label: 'Time Limit' },
  { key: 'status', label: 'Status' },
  { key: 'averageScore', label: 'Average' },
]

export function QuizManagementPage() {
  const [quizRows, setQuizRows] = useState(quizzes)
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [form, setForm] = useState({
    title: '',
    course: lecturerCourses[0].code,
    questions: '10',
    duration: '20 mins',
    status: 'Draft',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateQuiz = () => {
    if (!form.title.trim()) return

    setQuizRows((prev) => [
      {
        ...form,
        title: form.title.trim(),
        averageScore: '-',
      },
      ...prev,
    ])
    setForm((prev) => ({ ...prev, title: '', questions: '10', duration: '20 mins', status: 'Draft' }))
    setShowQuizModal(false)
  }

  return (
    <div className="page-stack">
      <SectionCard
        title="Quiz Builder"
        description="Create quizzes, set time limits, publish assessments, and track class results."
        action={
          <button className="primary-button small" type="button" onClick={() => setShowQuizModal(true)}>
            Create quiz
          </button>
        }
      >
        <DataTable columns={columns} rows={quizRows} />
      </SectionCard>

      <section className="two-column-grid">
        <SectionCard title="Question Bank" description="Reusable prompts for quick quiz creation">
          <div className="stack-list">
            <article className="feed-item align-start">
              <div>
                <strong>Multiple choice</strong>
                <p>Best for definitions, diagrams, and concept checks.</p>
              </div>
              <span>42 saved</span>
            </article>
            <article className="feed-item align-start">
              <div>
                <strong>Short answer</strong>
                <p>Useful for requirements analysis and design justification.</p>
              </div>
              <span>18 saved</span>
            </article>
            <article className="feed-item align-start">
              <div>
                <strong>Code output</strong>
                <p>Students inspect a snippet and predict runtime behavior.</p>
              </div>
              <span>11 saved</span>
            </article>
          </div>
        </SectionCard>

        <SectionCard title="Publishing Rules" description="Quiz controls before students can start">
          <div className="lecturer-checklist">
            <span>Questions reviewed</span>
            <span>Time limit set</span>
            <span>Availability window selected</span>
            <span>Results visibility configured</span>
          </div>
        </SectionCard>
      </section>

      <Modal
        open={showQuizModal}
        title="Create Quiz"
        onClose={() => setShowQuizModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={handleCreateQuiz}>
            Save quiz
          </button>
        }
      >
        <label>
          <span>Quiz title</span>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Quiz 1" />
        </label>
        <label>
          <span>Course</span>
          <select name="course" value={form.course} onChange={handleChange}>
            {lecturerCourses.map((course) => (
              <option key={course.code} value={course.code}>
                {course.code} - {course.title}
              </option>
            ))}
          </select>
        </label>
        <div className="form-grid">
          <label>
            <span>Questions</span>
            <input name="questions" value={form.questions} onChange={handleChange} />
          </label>
          <label>
            <span>Time limit</span>
            <input name="duration" value={form.duration} onChange={handleChange} />
          </label>
        </div>
        <label>
          <span>Status</span>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Draft</option>
            <option>Scheduled</option>
            <option>Published</option>
          </select>
        </label>
      </Modal>
    </div>
  )
}
