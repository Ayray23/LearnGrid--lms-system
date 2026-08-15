import { useMemo, useState } from 'react'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { useAuth } from '../../context/AuthContext'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { assignmentService, submissionService } from '../../firebase/services'
import {
  Search,
  FileText,
  Paperclip,
  BookOpen,
} from 'lucide-react'

const defaultSubmission = {
  notes: '',
  file: null,
}

export function StudentAssignmentsPage() {

  const { currentUser } = useAuth()

  const {
    records: assignments,
    loading,
    error,
    refresh,

  } = useFirestoreCollection(
    assignmentService.listAssignments
  )

  const [search,setSearch]=useState('')

  const [selectedAssignment,setSelectedAssignment]=useState(null)

  const [showModal,setShowModal]=useState(false)

  const [submitting,setSubmitting]=useState(false)

  const [submission,setSubmission]=useState(defaultSubmission)

  const filteredAssignments=useMemo(()=>{

      return assignments.filter(item=>{
          if(!search)return true
          return (
              item.title
                  ?.toLowerCase()
                  .includes(search.toLowerCase())
              ||
              item.courseCode
                  ?.toLowerCase()
                  .includes(search.toLowerCase())
          )
      })
  },[assignments,search])
  const openAssignment=(assignment)=>{
      setSelectedAssignment(assignment)
      setSubmission(defaultSubmission)
      setShowModal(true)
  }

  const handleChange=(event)=>{

      const {name,value}=event.target
      setSubmission(prev=>({
          ...prev,
          [name]:value,
      }))
  }

  const handleFile=(event)=>{
      setSubmission(prev=>({
          ...prev,
          file:event.target.files[0],
      }))

  }  
  const handleSubmit = async () => {
      if (!selectedAssignment || !currentUser) {
        return
      }

      if (!submission.file && !submission.notes.trim()) {
        alert('Please attach a file or add submission notes.')
        return
      }

      try {
        setSubmitting(true)

        await submissionService.submitAssignment({
          assignmentId: selectedAssignment.id,
          studentId: currentUser.uid,
          studentName:
            currentUser.displayName ||
            currentUser.email ||
            'Student',
          file: submission.file,
          notes: submission.notes,
        })

        setShowModal(false)
        setSelectedAssignment(null)
        setSubmission(defaultSubmission)

        await refresh()

        alert('Assignment submitted successfully.')
      } catch (err) {
        console.error(
          'Assignment submission failed:',
          err
        )

        alert(
          err.message ||
          'Unable to submit assignment.'
        )
      } finally {
        setSubmitting(false)
      }
  }

  const formatDate = (date) => {
    if (!date) return 'No deadline'

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) {
      return date
    }

    return parsedDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const getDueStatus = (assignment) => {
    if (!assignment.dueDate) {
      return {
        label: 'No deadline',
        className: 'assignment-status neutral',
      }
    }

    const deadline = new Date(assignment.dueDate)
    const now = new Date()

    if (deadline < now) {
      return {
        label: 'Overdue',
        className: 'assignment-status danger',
      }
    }

    if (assignment.status === 'Closed') {
      return {
        label: 'Closed',
        className: 'assignment-status danger',
      }
    }

    if (assignment.status === 'Draft') {
      return {
        label: 'Draft',
        className: 'assignment-status warning',
      }
    }

    return {
      label: 'Open',
      className: 'assignment-status success',
    }
  }

  if (loading) {
    return (
      <div className="page-stack">
        <SectionCard
          title="Assignments"
          description="Your course assignments and submission tasks."
        >
          <div className="assignment-empty-state">
            <div className="assignment-loading-spinner" />
            <p>Loading assignments...</p>
          </div>
        </SectionCard>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-stack">
        <SectionCard
          title="Assignments"
          description="Your course assignments and submission tasks."
        >
          <div className="assignment-empty-state">
            <h3>Unable to load assignments</h3>
            <p>
              {error.message || 'Something went wrong while loading assignments.'}
            </p>

            <button
              className="primary-button small"
              type="button"
              onClick={refresh}
            >
              Try again
            </button>
          </div>
        </SectionCard>
      </div>
    )
  }

  return (
    <div className="page-stack">

      <SectionCard
        title="Assignments"
        description="View your assignments, read instructions, and submit your work."
      >

        <div className="assignment-toolbar">

          <div className="assignment-search flex items-center align-middle">

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search assignments or courses..."
            />

            <Search size={22} />

          </div>

          <div className="assignment-count">
            {filteredAssignments.length}{' '}
            {filteredAssignments.length === 1
              ? 'assignment'
              : 'assignments'}
          </div>

        </div>

        {filteredAssignments.length === 0 ? (

          <div className="assignment-empty-state">

          <div className="assignment-empty-icon">
              <BookOpen size={48} />
          </div>

            <h3>
              {search
                ? 'No assignments found'
                : 'No assignments available'}
            </h3>

            <p>
              {search
                ? 'Try a different assignment or course name.'
                : 'Your lecturers have not published any assignments yet.'}
            </p>

          </div>

        ) : (

          <div className="assignment-card-grid">

            {filteredAssignments.map((assignment) => {

              const dueStatus = getDueStatus(assignment)

              const isClosed =
                assignment.status === 'Closed'

              const isDraft =
                assignment.status === 'Draft'

              return (

                <article
                  className="assignment-card"
                  key={assignment.id}
                >

                  <div className="assignment-card-top">

                  <div className="assignment-file-icon">
                      <FileText size={22} />
                  </div>

                    <span className={dueStatus.className}>
                      {dueStatus.label}
                    </span>

                  </div>

                  <div className="assignment-card-body">

                    <span className="assignment-course">
                      {assignment.courseCode || 'Course'}
                    </span>

                    <h3>
                      {assignment.title}
                    </h3>

                    <p className="assignment-description">

                      {assignment.description
                        ? assignment.description
                        : 'No description was provided for this assignment.'}

                    </p>

                  </div>

                  <div className="assignment-card-meta">

                    <div className="assignment-meta-item">

                      <span className="assignment-meta-label">
                        Due date
                      </span>

                      <strong>
                        {formatDate(assignment.dueDate)}
                      </strong>

                    </div>

                    <div className="assignment-meta-item">

                      <span className="assignment-meta-label">
                        Maximum score
                      </span>

                      <strong>
                        {assignment.maxScore || 100}
                      </strong>

                    </div>

                  </div>

                  <div className="assignment-card-footer">

                    <button
                      className="primary-button small"
                      type="button"
                      disabled={isClosed || isDraft}
                      onClick={() => openAssignment(assignment)}
                    >
                      {isClosed
                        ? 'Closed'
                        : isDraft
                          ? 'Not available'
                          : 'View assignment'}
                    </button>

                  </div>

                </article>

              )
            })}

          </div>

        )}

      </SectionCard>
            <Modal
        open={showModal}
        title={selectedAssignment?.title || 'Assignment Details'}
        onClose={() => {
          if (submitting) return

          setShowModal(false)
          setSelectedAssignment(null)
          setSubmission(defaultSubmission)
        }}
        footer={
          <div className="assignment-modal-actions">

            <button
              className="secondary-button"
              type="button"
              disabled={submitting}
              onClick={() => {
                setShowModal(false)
                setSelectedAssignment(null)
                setSubmission(defaultSubmission)
              }}
            >
              Cancel
            </button>

            <button
              className="primary-button"
              type="button"
              disabled={
                submitting ||
                !selectedAssignment ||
                selectedAssignment.status === 'Closed'
              }
              onClick={handleSubmit}
            >
              {submitting
                ? 'Submitting...'
                : 'Submit Assignment'}
            </button>

          </div>
        }
      >

        {selectedAssignment && (

          <div className="assignment-details">

            <div className="assignment-detail-header">

              <div>

                <span className="assignment-course">
                  {selectedAssignment.courseCode || 'Course'}
                </span>

                <h3>
                  {selectedAssignment.title}
                </h3>

              </div>

              <span
                className={
                  getDueStatus(selectedAssignment).className
                }
              >
                {getDueStatus(selectedAssignment).label}
              </span>

            </div>

            <div className="assignment-detail-grid">

              <div className="assignment-detail-item">

                <span>
                  Due date
                </span>

                <strong>
                  {formatDate(selectedAssignment.dueDate)}
                </strong>

              </div>

              <div className="assignment-detail-item">

                <span>
                  Maximum score
                </span>

                <strong>
                  {selectedAssignment.maxScore || 100}
                </strong>

              </div>

            </div>

            <div className="assignment-detail-section">

              <h4>
                Description
              </h4>

              <p>
                {selectedAssignment.description ||
                  'No description was provided.'}
              </p>

            </div>

            <div className="assignment-detail-section">

              <h4>
                Instructions
              </h4>

              <div className="assignment-instructions">

                {selectedAssignment.instructions ||
                  'No additional instructions were provided.'}

              </div>

            </div>

            <div className="assignment-submit-section">

              <h4>
                Submit your work
              </h4>

              <p>
                Upload your completed assignment and add
                any notes your lecturer should see.
              </p>

              <label className="assignment-upload">

                <span>
                    <Paperclip size={18} className="assignment-upload-icon" />
                </span>

                <span className="assignment-upload-title">
                  {submission.file
                    ? submission.file.name
                    : 'Choose your assignment file'}
                </span>

                <span className="assignment-upload-help">
                  PDF, DOCX, ZIP, source code, images and
                  other supported files
                </span>

                <input
                  type="file"
                  onChange={handleFile}
                  disabled={submitting}
                />

              </label>

              <label>

                <span>
                  Submission notes
                </span>

                <textarea
                  className="code-editor"
                  rows={5}
                  name="notes"
                  value={submission.notes}
                  onChange={handleChange}
                  disabled={submitting}
                  placeholder="Add any notes for your lecturer..."
                />

              </label>

            </div>

            {!selectedAssignment.allowLateSubmission &&
              selectedAssignment.dueDate &&
              new Date(selectedAssignment.dueDate) < new Date() && (

                <div className="assignment-warning">

                  <strong>
                    This assignment is past its deadline.
                  </strong>

                  <p>
                    Late submissions are not enabled for
                    this assignment.
                  </p>

                </div>

              )}

          </div>

        )}

      </Modal>

    </div>
  )
}