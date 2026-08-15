import { AdminResourcePage } from './AdminResourcePage'
import { adminStudents } from '../../utils/mockData'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'matricNo', label: 'Matric No' },
  { key: 'department', label: 'Department' },
  { key: 'level', label: 'Level' },
  { key: 'status', label: 'Status' },
]

const fields = [
  { name: 'name', label: 'Full name', placeholder: 'Jane Doe' },
  { name: 'matricNo', label: 'Matric number', placeholder: 'CSC042' },
  {
    name: 'department',
    label: 'Department',
    defaultValue: 'Software Engineering',
    options: ['Software Engineering', 'Computer Science', 'Information Systems', 'IT Management'],
  },
  { name: 'level', label: 'Level', defaultValue: '300', options: ['100', '200', '300', '400', '500'] },
  { name: 'status', label: 'Status', defaultValue: 'Active', options: ['Active', 'Suspended', 'Pending'] },
]

export function AdminStudentsPage() {
  return (
    <AdminResourcePage
      title="Student Management"
      description="Add, edit, suspend, and review student profiles across the platform."
      actionLabel="Add student"
      columns={columns}
      rows={adminStudents}
      fields={fields}
      createRecord={(form) => form}
    />
  )
}
