import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SectionCard } from '../../components/SectionCard'
import { useAuth } from '../../context/AuthContext'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { assignmentService, courseService, materialService, studentMaterialService } from '../../firebase/services'

export function CourseDetailPage() {
  const { courseCode } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [enrolled, setEnrolled] = useState(false)
  const [selectionMessage, setSelectionMessage] = useState('')
  const [selectionError, setSelectionError] = useState('')

  const {
    records: courses,
    loading: coursesLoading,
  } = useFirestoreCollection(courseService.listCourses)

  const course = useMemo(() => {
    const code = decodeURIComponent(courseCode || '').toLowerCase()
    return courses.find((item) => String(item.code || '').toLowerCase() === code)
  }, [courseCode, courses])

  const {
    records: courseAssignments,
    loading: assignmentsLoading,
  } = useFirestoreCollection(
    useCallback(async () => {
      if (!course) return []
      return assignmentService.listCourseAssignments(course.id)
    }, [course]),
    [course]
  )

  const {
    records: materials,
    loading: materialsLoading,
  } = useFirestoreCollection(
    useCallback(async () => {
      if (!course) return []
      return materialService.listCourseMaterials(course.id)
    }, [course]),
    [course]
  )

  const {
    records: selectedMaterials,
    loading: selectedLoading,
    refresh: refreshSelections,
  } = useFirestoreCollection(
    useCallback(async () => {
      if (!currentUser) return []
      return studentMaterialService.listSelectedMaterials(currentUser.uid)
    }, [currentUser]),
    [currentUser]
  )

  const selectedMaterialIds = useMemo(
    () => selectedMaterials.map((item) => item.materialId),
    [selectedMaterials]
  )

  useEffect(() => {
    if (selectionMessage) {
      const timeout = window.setTimeout(() => setSelectionMessage(''), 3500)
      return () => window.clearTimeout(timeout)
    }
    return undefined
  }, [selectionMessage])

  const handleSelectMaterial = async (material) => {
    if (!currentUser || !course) return

    setSelectionError('')
    try {
      await studentMaterialService.selectMaterial({
        studentId: currentUser.uid,
        courseId: course.id,
        materialId: material.id,
        title: material.title,
        type: material.type,
        pickedAt: new Date().toISOString(),
      })

      setSelectionMessage(`Added "${material.title}" to your material list.`)
      await refreshSelections()
    } catch (error) {
      console.error('Failed to save material selection:', error)
      setSelectionError('Unable to save your selection to Firestore. Check console for details.')
    }
  }

  if (!course && !coursesLoading) {
    return (
      <div className="page-stack p-6">
        <SectionCard title="Course not found" description="The course code does not match any available course.">
          <p className="text-slate-500 dark:text-slate-400">Please return to the course catalogue and select a valid course.</p>
          <div className="mt-6 flex gap-3">
            <button className="ghost-button" type="button" onClick={() => navigate('/app/student/courses')}>
              Back to courses
            </button>
          </div>
        </SectionCard>
      </div>
    )
  }

  return (
    <div className="page-stack p-6">
      <SectionCard
        title={`${course?.code || 'Course'} — ${course?.title || 'Loading...'}`}
        description={`In-depth course page for ${course?.department || 'your selected course'}`}
        action={
          <button className="primary-button small" type="button" onClick={() => setEnrolled(true)}>
            {enrolled ? 'Enrolled' : 'Enroll now'}
          </button>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-slate-600 dark:text-slate-300">{course?.summary || 'This course page pulls suggested course materials from Firestore.'}</p>
            <div className="rounded-3xl bg-slate-100/80 dark:bg-slate-950/80 p-6 text-sm text-slate-600 dark:text-slate-300">
              <div className="grid gap-4 sm:grid-cols-2">
                <article>
                  <span className="text-slate-500 dark:text-slate-400">Lecturer</span>
                  <p className="mt-2 text-slate-900 dark:text-white">{course?.lecturer || 'TBD'}</p>
                </article>
                <article>
                  <span className="text-slate-500 dark:text-slate-400">Format</span>
                  <p className="mt-2 text-slate-900 dark:text-white">{course?.format || 'TBD'}</p>
                </article>
                <article>
                  <span className="text-slate-500 dark:text-slate-400">Credits</span>
                  <p className="mt-2 text-slate-900 dark:text-white">{course?.credits || 'TBD'}</p>
                </article>
                <article>
                  <span className="text-slate-500 dark:text-slate-400">Lessons</span>
                  <p className="mt-2 text-slate-900 dark:text-white">{course?.lessons || 'TBD'}</p>
                </article>
              </div>
            </div>
            <div className="rounded-3xl bg-slate-100/80 dark:bg-slate-950/80 p-6 text-sm text-slate-600 dark:text-slate-300">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Suggested course materials</h3>
              <p className="mt-3 text-slate-500 dark:text-slate-400">Pick materials curated for your software engineering course.</p>
              <div className="mt-4 space-y-3">
                {materialsLoading ? (
                  <p className="text-slate-500 dark:text-slate-400">Loading suggested materials...</p>
                ) : materials.length ? (
                  materials.map((material) => (
                    <div key={material.id} className="rounded-3xl bg-slate-100/70 dark:bg-slate-950/70 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{material.title}</p>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">{material.type || 'Material'} · {material.format || 'File'}</p>
                        </div>
                        <button
                          className="ghost-button small"
                          type="button"
                          disabled={selectedMaterialIds.includes(material.id)}
                          onClick={() => handleSelectMaterial(material)}
                        >
                          {selectedMaterialIds.includes(material.id) ? 'Selected' : 'Select'}
                        </button>
                      </div>
                      <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">{material.description || 'No description available.'}</p>
                      {material.fileUrl && (
                        <a
                          className="ghost-button small mt-3 inline-block"
                          href={material.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download file
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 dark:text-slate-400">No suggested materials are available for this course yet.</p>
                )}
              </div>
              {selectionMessage && <p className="mt-4 text-emerald-300">{selectionMessage}</p>}
              {selectionError && <p className="mt-4 text-rose-300">{selectionError}</p>}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Course details</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <p>
                  <span className="block text-slate-500 dark:text-slate-400">Level</span>
                  {course?.level || 'TBD'}
                </p>
                <p>
                  <span className="block text-slate-500 dark:text-slate-400">Department</span>
                  {course?.department || 'TBD'}
                </p>
                <p>
                  <span className="block text-slate-500 dark:text-slate-400">Status</span>
                  {course?.status || 'TBD'}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Assignments</p>
                <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs text-slate-600 dark:text-slate-300">
                  {courseAssignments.length}
                </span>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {assignmentsLoading ? (
                  <p className="text-slate-500 dark:text-slate-400">Loading assignments...</p>
                ) : courseAssignments.length ? (
                  courseAssignments.map((assignment) => (
                    <div key={assignment.id} className="rounded-3xl bg-slate-100/70 dark:bg-slate-950/70 p-3">
                      <p className="font-medium text-slate-900 dark:text-white">{assignment.title}</p>
                      <p className="text-slate-500 dark:text-slate-400">Due {assignment.deadline || 'TBD'}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 dark:text-slate-400">No active assignments for this course yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-5 text-sm text-slate-600 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white">Next step</p>
              <p className="mt-3 text-slate-500 dark:text-slate-400">Use the catalogue or assignments page to continue working on this course.</p>
              <button className="mt-4 w-full rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white transition hover:bg-slate-200 dark:hover:bg-slate-800" type="button" onClick={() => navigate('/app/student/assignments')}>
                Open related assignments
              </button>
            </div>
          </aside>
        </div>

        {enrolled && (
          <div className="mt-6 rounded-3xl bg-emerald-500/10 p-5 text-sm text-emerald-200">
            You are enrolled in this course and it will appear in your course list.
          </div>
        )}
      </SectionCard>

      <div className="two-column-grid">
        <SectionCard title="Course metrics" description="Progress indicators and assignments for this course">
          <div className="stack-list">
            <article className="feed-item">
              <div>
                <strong>Status</strong>
                <p>{course?.status || 'TBD'}</p>
              </div>
              <span>{course?.lessons || 'TBD'} lessons</span>
            </article>
            <article className="feed-item">
              <div>
                <strong>Peer review</strong>
                <p>Team evaluation, architecture critique, and project feedback.</p>
              </div>
              <span>Live</span>
            </article>
            <article className="feed-item">
              <div>
                <strong>Grading</strong>
                <p>Continuous assessment with final presentation scoring.</p>
              </div>
              <span>Updated weekly</span>
            </article>
          </div>
        </SectionCard>

        <SectionCard title="Selected course materials" description="Your saved materials for this course">
          {selectedLoading ? (
            <p className="text-slate-500 dark:text-slate-400">Loading selected materials...</p>
          ) : selectedMaterials.length ? (
            <div className="stack-list">
              {selectedMaterials.map((item) => (
                <article key={item.id} className="feed-item">
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.type || 'Material'}</p>
                  </div>
                  <span>{new Date(item.pickedAt).toLocaleDateString()}</span>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-slate-100/80 dark:bg-slate-950/80 p-6 text-slate-500 dark:text-slate-400">
              Select materials from the list above to add them to your personal study library.
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  )
}
