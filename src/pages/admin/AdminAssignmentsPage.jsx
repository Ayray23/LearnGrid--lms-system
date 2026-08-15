import { AdminResourcePage } from './AdminResourcePage'
import { adminAssignments } from '../../utils/mockData'

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'course', label: 'Course' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'status', label: 'Status' },
]

const fields = [
  { name: 'title', label: 'Assignment title', placeholder: 'Design a UML Diagram' },
  { name: 'course', label: 'Course', placeholder: 'SEN 301' },
  { name: 'dueDate', label: 'Due date', type: 'date' },
  { name: 'status', label: 'Status', defaultValue: 'Draft', options: ['Draft', 'Open', 'Submitted', 'Closed'] },
]

export function AdminAssignmentsPage() {
  return (
    <AdminResourcePage
      title="Assignment Management"
      description="Create, update, grade, and manage assignments across your courses."
      actionLabel="Create assignment"
      columns={columns}
      rows={adminAssignments}
      fields={fields}
      createRecord={(form) => form}
    />
  )
}
