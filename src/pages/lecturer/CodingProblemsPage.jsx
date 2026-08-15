import { useState } from 'react'
import { DataTable } from '../../components/DataTable'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { lecturerCodingChallenges, lecturerCourses, submissionQueue } from '../../utils/mockData'

const challengeColumns = [
  { key: 'title', label: 'Challenge' },
  { key: 'course', label: 'Course' },
  { key: 'language', label: 'Language' },
  { key: 'difficulty', label: 'Difficulty' },
  { key: 'submissions', label: 'Submissions' },
  { key: 'reviewStatus', label: 'Review Status' },
]

export function CodingProblemsPage() {
  const [challenges, setChallenges] = useState(lecturerCodingChallenges)
  const [showChallengeModal, setShowChallengeModal] = useState(false)
  const [form, setForm] = useState({
    title: '',
    course: lecturerCourses[0].code,
    language: 'Java',
    difficulty: 'Medium',
    instructions: '',
    starterCode: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateChallenge = () => {
    if (!form.title.trim()) return

    setChallenges((prev) => [
      {
        title: form.title.trim(),
        course: form.course,
        language: form.language,
        difficulty: form.difficulty,
        submissions: '0',
        reviewStatus: 'Draft tests',
      },
      ...prev,
    ])
    setForm((prev) => ({ ...prev, title: '', instructions: '', starterCode: '' }))
    setShowChallengeModal(false)
  }

  return (
    <div className="page-stack">
      <SectionCard
        title="Coding Challenge Studio"
        description="Create practical programming tasks with language targets, instructions, starter code, and review status."
        action={
          <button className="primary-button small" type="button" onClick={() => setShowChallengeModal(true)}>
            Create coding task
          </button>
        }
      >
        <DataTable columns={challengeColumns} rows={challenges} />
      </SectionCard>

      <section className="two-column-grid">
        <SectionCard title="Code Review Queue" description="Coding submissions that need lecturer review">
          <div className="stack-list">
            {submissionQueue.slice(0, 2).map((submission) => (
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

        <SectionCard title="Challenge Quality Checks" description="What makes each coding task ready for students">
          <div className="lecturer-checklist">
            <span>Clear problem statement</span>
            <span>Starter code added</span>
            <span>Expected output defined</span>
            <span>Review rubric attached</span>
          </div>
        </SectionCard>
      </section>

      <Modal
        open={showChallengeModal}
        title="Create Coding Challenge"
        onClose={() => setShowChallengeModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={handleCreateChallenge}>
            Save challenge
          </button>
        }
      >
        <label>
          <span>Challenge title</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Build a Student Registration System"
          />
        </label>
        <div className="form-grid">
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
          <label>
            <span>Language</span>
            <select name="language" value={form.language} onChange={handleChange}>
              <option>Java</option>
              <option>JavaScript</option>
              <option>Python</option>
              <option>C++</option>
            </select>
          </label>
        </div>
        <label>
          <span>Difficulty</span>
          <select name="difficulty" value={form.difficulty} onChange={handleChange}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </label>
        <label>
          <span>Instructions</span>
          <textarea
            className="code-editor"
            rows={4}
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            placeholder="Describe the task, constraints, inputs, and expected output."
          />
        </label>
        <label>
          <span>Starter code</span>
          <textarea
            className="code-editor"
            rows={5}
            name="starterCode"
            value={form.starterCode}
            onChange={handleChange}
            placeholder="public class Main { }"
          />
        </label>
      </Modal>
    </div>
  )
}
