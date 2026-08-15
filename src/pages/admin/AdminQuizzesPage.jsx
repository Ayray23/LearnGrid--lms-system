import { AdminResourcePage } from './AdminResourcePage'
import { adminQuizData } from '../../utils/mockData'

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'type', label: 'Type' },
  { key: 'timeLimit', label: 'Time Limit' },
  { key: 'status', label: 'Status' },
]

const fields = [
  { name: 'title', label: 'Quiz title', placeholder: 'Software Engineering Basics' },
  { name: 'type', label: 'Question type', defaultValue: 'Multiple Choice', options: ['Multiple Choice', 'True/False', 'Short Answer', 'Code Output'] },
  { name: 'timeLimit', label: 'Time limit', defaultValue: '20 mins' },
  { name: 'status', label: 'Status', defaultValue: 'Draft', options: ['Draft', 'Published', 'Scheduled'] },
]

export function AdminQuizzesPage() {
  return (
    <AdminResourcePage
      title="Quiz Management"
      description="Build quizzes, add questions, and configure auto-grading settings."
      actionLabel="Create quiz"
      columns={columns}
      rows={adminQuizData}
      fields={fields}
      createRecord={(form) => form}
    />
  )
}
