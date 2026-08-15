import { useCallback } from 'react'
import { AdminResourcePage } from './AdminResourcePage'
import { userService } from '../../firebase/services'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'department', label: 'Department' },
  { key: 'courses', label: 'Courses Assigned' },
  { key: 'status', label: 'Status' },
]

const fields = [
  { name: 'name', label: 'Full name', placeholder: 'Dr. New Lecturer' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'lecturer@selms.dev' },
  {
    name: 'department',
    label: 'Department',
    defaultValue: 'Software Engineering',
    options: ['Software Engineering', 'Computer Science', 'Information Systems', 'IT Management'],
  },
  { name: 'courses', label: 'Courses assigned', defaultValue: '0' },
  { name: 'status', label: 'Status', defaultValue: 'Active', options: ['Active', 'Pending', 'Inactive'] },
]

export function LecturerManagementPage() {
  const loadLecturers = useCallback(async () => {
    const users = await userService.listUsers()
    return users
      .filter((user) => user.role === 'lecturer')
      .map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department || 'Unassigned',
        courses: user.courses || '0',
        status: user.status || 'Active',
      }))
  }, [])

  return (
    <AdminResourcePage
      title="Lecturer Management"
      description="Manage lecturers, assign courses, and review teaching assignments."
      actionLabel="Add lecturer"
      columns={columns}
      rows={[]}
      loadRecords={loadLecturers}
      fields={fields}
      createRecord={async (form) => {
        const savedLecturer = await userService.createProfile({
          name: form.name,
          email: form.email,
          department: form.department,
          courses: form.courses,
          status: form.status,
          role: 'lecturer',
        })

        return {
          id: savedLecturer.id,
          name: savedLecturer.name,
          email: savedLecturer.email,
          department: savedLecturer.department,
          courses: savedLecturer.courses,
          status: savedLecturer.status,
        }
      }}
    />
  )
}
