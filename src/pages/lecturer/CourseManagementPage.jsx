import { useCallback, useMemo, useState } from 'react'
import { DataTable } from '../../components/DataTable'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { courseService, materialService, storageService } from '../../firebase/services'

const columns = [
  { key: 'courseCode', label: 'Course' },
  { key: 'title', label: 'Material' },
  { key: 'type', label: 'Type' },
  { key: 'format', label: 'Format' },
  { key: 'visibility', label: 'Visibility' },
  { key: 'updatedAt', label: 'Updated' },
]

export function CourseManagementPage() {
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [form, setForm] = useState({
    courseId: '',
    title: '',
    type: 'Lecture Notes',
    format: 'PDF',
    visibility: 'Draft',
  })
  const [saveError, setSaveError] = useState('')
  const [materialFile, setMaterialFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  const {
    records: courses,
  } = useFirestoreCollection(courseService.listCourses)

  const activeCourseId = form.courseId || courses[0]?.id || ''

  const selectedCourse = useMemo(
    () => courses.find((course) => course.id === activeCourseId) || null,
    [courses, activeCourseId]
  )

  const {
    records: materials,
    loading: materialsLoading,
    refresh: refreshMaterials,
  } = useFirestoreCollection(
    useCallback(async () => {
      if (!activeCourseId) return []
      return materialService.listCourseMaterials(activeCourseId)
    }, [activeCourseId]),
    [activeCourseId]
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (event) => {
    setMaterialFile(event.target.files[0] || null)
  }

  const handleAddMaterial = async () => {
    if (!form.title.trim() || !activeCourseId) return

    setSaveError('')
    setUploading(true)
    try {
      let uploadedFile = null

      if (materialFile) {
        uploadedFile = await storageService.uploadCourseMaterial({
          file: materialFile,
          courseId: activeCourseId,
        })
      }

      await materialService.createMaterial({
        courseId: activeCourseId,
        courseCode: selectedCourse?.code || '',
        title: form.title.trim(),
        type: form.type,
        format: form.format,
        visibility: form.visibility,
        fileUrl: uploadedFile?.fileUrl || '',
        fileName: uploadedFile?.fileName || '',
        filePath: uploadedFile?.filePath || '',
        fileType: uploadedFile?.contentType || '',
        fileSize: uploadedFile?.size || 0,
        updatedAt: new Date().toISOString(),
      })

      setForm((prev) => ({ ...prev, title: '', visibility: 'Draft' }))
      setMaterialFile(null)
      setShowUploadModal(false)
      await refreshMaterials()
    } catch (error) {
      console.error('Failed to save course material:', error)
      setSaveError(error.message || 'Unable to save material. Check console for details.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="page-stack">
      <section className="lecturer-course-grid">
        {courses.length ? (
          courses.map((course) => (
            <article key={course.id} className="lecturer-course-card">
              <div>
                <span className="course-badge">{course.code}</span>
                <h3>{course.title}</h3>
                <p>{course.students || 'No enrollment data yet'} students enrolled</p>
              </div>
              <div className="lecturer-metric-row">
                <span>{course.completion || 'No progress data'}</span>
                <span>{course.contentHealth || 'Content status unavailable'}</span>
              </div>
            </article>
          ))
        ) : (
          <div className="text-slate-500 dark:text-slate-400">Loading courses or no assigned courses available.</div>
        )}
      </section>

      <SectionCard
        title="Course Content Library"
        description="Upload notes, PDFs, slides, videos, and external resources for assigned courses."
        action={
          <button className="primary-button small" type="button" onClick={() => setShowUploadModal(true)}>
            Upload material
          </button>
        }
      >
        <DataTable columns={columns} rows={materials} loading={materialsLoading} />
      </SectionCard>

      <SectionCard title="Publishing Checklist" description="Keep every course ready before class">
        <div className="lecturer-checklist">
          <span>Weekly notes uploaded</span>
          <span>Slides attached</span>
          <span>Video resources reviewed</span>
          <span>External links verified</span>
        </div>
      </SectionCard>

      <Modal
        open={showUploadModal}
        title="Upload Course Material"
        onClose={() => {
          if (uploading) return
          setShowUploadModal(false)
          setMaterialFile(null)
          setSaveError('')
        }}
        footer={
          <button className="primary-button" type="button" disabled={uploading} onClick={handleAddMaterial}>
            {uploading ? 'Uploading...' : 'Add material'}
          </button>
        }
      >
        <label>
          <span>Course</span>
          <select name="courseId" value={activeCourseId} onChange={handleChange}>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Material title</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Week 3 UML Diagrams"
          />
        </label>
        <div className="form-grid">
          <label>
            <span>Type</span>
            <select name="type" value={form.type} onChange={handleChange}>
              <option>Lecture Notes</option>
              <option>Slides</option>
              <option>Video</option>
              <option>External Resource</option>
              <option>Reading</option>
            </select>
          </label>
          <label>
            <span>Format</span>
            <select name="format" value={form.format} onChange={handleChange}>
              <option>PDF</option>
              <option>PPTX</option>
              <option>MP4</option>
              <option>Link</option>
              <option>DOCX</option>
            </select>
          </label>
        </div>
        <label>
          <span>Visibility</span>
          <select name="visibility" value={form.visibility} onChange={handleChange}>
            <option>Draft</option>
            <option>Published</option>
            <option>Scheduled</option>
          </select>
        </label>
        <label className="assignment-upload">
          <span>File (optional for link-only resources)</span>
          <input type="file" onChange={handleFileChange} disabled={uploading} />
          {materialFile && <span className="assignment-upload-help">{materialFile.name}</span>}
        </label>
        {saveError && <p className="mt-4 text-sm text-rose-300">{saveError}</p>}
      </Modal>
    </div>
  )
}
