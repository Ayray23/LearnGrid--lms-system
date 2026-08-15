import { AdminResourcePage } from './AdminResourcePage'
import { usersTable } from '../../utils/mockData'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'department', label: 'Department' },
  { key: 'status', label: 'Status' },
]

const fields = [
  { name: 'name', label: 'Full name', placeholder: 'Admin Officer' },
  { name: 'role', label: 'Role', defaultValue: 'Student', options: ['Student', 'Lecturer', 'Admin'] },
  {
    name: 'department',
    label: 'Department',
    defaultValue: 'Software Engineering',
    options: ['Software Engineering', 'Computer Science', 'Information Systems', 'ICT Unit'],
  },
  { name: 'status', label: 'Status', defaultValue: 'Active', options: ['Active', 'Suspended', 'Pending'] },
]

export function UserManagementPage() {
  return (
    <AdminResourcePage
      title="User Management"
      description="Manage students, lecturers, admins, and role assignments."
      actionLabel="Add user"
      columns={columns}
      rows={usersTable}
      fields={fields}
      createRecord={(form) => form}
    />
  )
}
