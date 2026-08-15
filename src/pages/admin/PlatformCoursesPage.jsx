import { useCallback, useEffect, useMemo, useState } from 'react'
import { AdminResourcePage } from './AdminResourcePage'
import { courseService, userService } from '../../firebase/services'

const columns = [
  { key: 'course', label: 'Course' },
  { key: 'owner', label: 'Assigned Lecturer' },
  { key: 'materials', label: 'Materials' },
  { key: 'students', label: 'Enrollment' },
]

const fieldDefaults = [
  { name: 'courseCode', label: 'Course code', placeholder: 'SEN 409' },
  { name: 'courseTitle', label: 'Course title', placeholder: 'Software Project Management' },
  { name: 'students', label: 'Expected enrollment', defaultValue: '0' },
]

export function PlatformCoursesPage() {
  const [lecturerOptions, setLecturerOptions] = useState(['Unassigned'])

  const loadCourses = useCallback(async () => {
    const courses = await courseService.listCourses()
    return courses.map((course) => ({
      id: course.id,
      course: `${course.code} - ${course.title}`,
      owner: course.lecturer || 'Unassigned',
      materials: course.materials ? `${course.materials} files` : '0 files',
      students: String(course.students || 0),
    }))
  }, [])

  useEffect(() => {
    let active = true

    const fetchLecturers = async () => {
      const users = await userService.listUsers()
      const lecturers = users.filter((user) => user.role === 'lecturer')

      if (!active) return

      setLecturerOptions([
        'Unassigned',
        ...lecturers.map((lecturer) => `${lecturer.name} (${lecturer.email})`),
      ])
    }

    fetchLecturers()
    return () => {
      active = false
    }
  }, [])

  const fields = useMemo(
    () => [
      ...fieldDefaults,
      {
        name: 'owner',
        label: 'Assigned lecturer',
        options: lecturerOptions,
        defaultValue: 'Unassigned',
      },
    ],
    [lecturerOptions],
  )

  return (
    <AdminResourcePage
      title="Course Management"
      description="Assign lecturers, review catalogue coverage, and monitor course content."
      actionLabel="Create course"
      columns={columns}
      rows={[]}
      loadRecords={loadCourses}
      fields={fields}
      createRecord={async (form) => {
        const savedCourse = await courseService.createCourse({
          code: form.courseCode,
          title: form.courseTitle,
          lecturer: form.owner,
          students: Number(form.students),
          status: 'Active',
          summary: '',
          department: 'Software Engineering',
          format: 'Lecture',
          lessons: 0,
        })

        return {
          id: savedCourse.id,
          course: `${savedCourse.code} - ${savedCourse.title}`,
          owner: savedCourse.lecturer,
          materials: '0 files',
          students: String(savedCourse.students || 0),
        }
      }}
    />
  )
}
