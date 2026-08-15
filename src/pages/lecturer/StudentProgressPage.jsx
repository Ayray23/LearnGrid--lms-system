import { DataTable } from '../../components/DataTable'
import { SectionCard } from '../../components/SectionCard'
import { studentProgressRows } from '../../utils/mockData'

const columns = [
  { key: 'student', label: 'Student' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'assignments', label: 'Assignments' },
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'progress', label: 'Progress' },
  { key: 'risk', label: 'Risk' },
]

export function StudentProgressPage() {
  return (
    <div className="page-stack">
      <SectionCard title="Student Progress Monitor" description="Track attendance, completion, quiz performance, and course risk.">
        <DataTable columns={columns} rows={studentProgressRows} />
      </SectionCard>

      <section className="two-column-grid">
        <SectionCard title="Intervention List" description="Students who need extra lecturer attention">
          <div className="stack-list">
            {studentProgressRows
              .filter((row) => row.risk !== 'Low')
              .map((row) => (
                <article key={row.student} className="feed-item align-start">
                  <div>
                    <strong>{row.student}</strong>
                    <p>{row.progress} | Attendance {row.attendance}</p>
                  </div>
                  <span>{row.risk} risk</span>
                </article>
              ))}
          </div>
        </SectionCard>

        <SectionCard title="Progress Signals" description="What the lecturer should watch weekly">
          <div className="lecturer-checklist">
            <span>Attendance below 75%</span>
            <span>Missed assignment deadline</span>
            <span>Quiz score decline</span>
            <span>Low course content activity</span>
          </div>
        </SectionCard>
      </section>
    </div>
  )
}
