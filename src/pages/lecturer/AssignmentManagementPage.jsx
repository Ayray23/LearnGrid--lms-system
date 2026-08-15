import { useMemo, useState } from 'react'
import { DataTable } from '../../components/DataTable'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { useAuth } from '../../context/AuthContext'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import { assignmentService } from '../../firebase/services'

const columns = [
  { key: 'title', label: 'Assignment' },
  { key: 'courseCode', label: 'Course' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'maxScore', label: 'Score' },
  { key: 'status', label: 'Status' },
]

const defaultForm = {
  title: '',
  description: '',
  instructions: '',
  courseId: '',
  courseCode: '',
  dueDate: '',
  maxScore: 100,
  status: 'Open',
  allowLateSubmission: false,
}

export function AssignmentManagementPage() {

  const { currentUser } = useAuth()

  const {
    records: assignments,
    loading,
    error,
    refresh,
  } = useFirestoreCollection(
    assignmentService.listAssignments
  )

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [showModal, setShowModal] = useState(false)

  const [saving, setSaving] = useState(false)

  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState(defaultForm)

  const stats = useMemo(() => {

    return {

      total: assignments.length,

      open: assignments.filter(a => a.status === 'Open').length,

      closed: assignments.filter(a => a.status === 'Closed').length,

      draft: assignments.filter(a => a.status === 'Draft').length,

    }

  }, [assignments])

  const filteredAssignments = useMemo(() => {

    return assignments.filter(item => {

      const titleMatch =
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase())

      const courseMatch =
        item.courseCode
          ?.toLowerCase()
          .includes(search.toLowerCase())

      const statusMatch =
        statusFilter === 'All'
          ? true
          : item.status === statusFilter

      return (
        (titleMatch || courseMatch) &&
        statusMatch
      )

    })

  }, [assignments, search, statusFilter])

  const resetForm = () => {

    setEditingId(null)

    setForm(defaultForm)

  }

  const openCreateModal = () => {

    resetForm()

    setShowModal(true)

  }

  const handleChange = (event) => {

    const { name, value, type, checked } = event.target

    setForm(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }))

  }

  const handleEdit = assignment => {

    setEditingId(assignment.id)

    setForm({

      title: assignment.title || '',

      description: assignment.description || '',

      instructions: assignment.instructions || '',

      courseId: assignment.courseId || '',

      courseCode: assignment.courseCode || '',

      dueDate: assignment.dueDate || '',

      maxScore: assignment.maxScore || 100,

      status: assignment.status || 'Open',

      allowLateSubmission:
        assignment.allowLateSubmission || false,

    })

    setShowModal(true)

  }

  const validateForm = () => {

    if (!form.title.trim()) {

      alert('Assignment title is required.')

      return false

    }

    if (!form.courseCode.trim()) {

      alert('Course Code is required.')

      return false

    }

    if (!form.dueDate) {

      alert('Please select a due date.')

      return false

    }

    return true

  }

  const handleSave = async () => {

    if (!validateForm()) return

    try {

      setSaving(true)

      const payload = {

        ...form,

        lecturerId: currentUser.uid,

        updatedAt: new Date().toISOString(),

      }

      if (editingId) {

        await assignmentService.updateAssignment(
          editingId,
          payload
        )

      } else {

        await assignmentService.createAssignment({

          ...payload,

          createdAt: new Date().toISOString(),

        })

      }

      await refresh()

      setShowModal(false)

      resetForm()

    } catch (err) {

      console.error(err)

      alert(err.message)

    } finally {

      setSaving(false)

    }

  }
    const handleDelete = async (assignment) => {

    const confirmed = window.confirm(
      `Delete "${assignment.title}"?`
    )

    if (!confirmed) return

    try {

      await assignmentService.updateAssignment(
        assignment.id,
        {
          status: 'Deleted',
          deletedAt: new Date().toISOString(),
        }
      )

      await refresh()

    } catch (err) {

      console.error(err)

      alert(err.message)

    }

  }

  if (loading) {

    return (
      <div className="page-stack">
        <SectionCard title="Assignments">
          <p>Loading assignments...</p>
        </SectionCard>
      </div>
    )

  }

  if (error) {

    return (
      <div className="page-stack">
        <SectionCard title="Assignments">
          <p>{error.message}</p>
        </SectionCard>
      </div>
    )

  }

  return (

    <div className="page-stack">

      <section className="dashboard-grid">

        <SectionCard
          title="Total Assignments"
          description={`${stats.total} Assignments`}
        />

        <SectionCard
          title="Open"
          description={`${stats.open} Active`}
        />

        <SectionCard
          title="Draft"
          description={`${stats.draft} Drafts`}
        />

        <SectionCard
          title="Closed"
          description={`${stats.closed} Closed`}
        />

      </section>

      <SectionCard
        title="Assignment Studio"
        description="Create and manage course assignments."
        action={

          <button
            className="primary-button"
            onClick={openCreateModal}
          >
            New Assignment
          </button>

        }
      >

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >

          <input
            placeholder="Search assignment..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >

            <option>All</option>

            <option>Open</option>

            <option>Draft</option>

            <option>Closed</option>

          </select>

        </div>

        <DataTable

          columns={columns}

          rows={filteredAssignments.map(item => ({

            ...item,

            actions: (

              <div
                style={{
                  display: 'flex',
                  gap: '.5rem',
                }}
              >

                <button
                  className="secondary-button small"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>

                <button
                  className="danger-button small"
                  onClick={() => handleDelete(item)}
                >
                  Delete
                </button>

              </div>

            ),

          }))}

        />

      </SectionCard>

      <Modal

        open={showModal}

        title={
          editingId
            ? 'Edit Assignment'
            : 'Create Assignment'
        }

        onClose={() => {

          setShowModal(false)

          resetForm()

        }}

        footer={

          <button
            className="primary-button"
            disabled={saving}
            onClick={handleSave}
          >

            {saving
              ? 'Saving...'
              : editingId
                ? 'Update Assignment'
                : 'Create Assignment'}

          </button>

        }

      >
                <label>
          <span>Assignment Title</span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Design a Use Case Diagram"
          />
        </label>

        <label>
          <span>Description</span>
          <textarea
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Brief description of the assignment"
          />
        </label>

        <label>
          <span>Instructions</span>
          <textarea
            className="code-editor"
            rows={6}
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            placeholder="Detailed instructions for students..."
          />
        </label>

        <div className="form-grid">

          <label>
            <span>Course ID</span>

            <input
              name="courseId"
              value={form.courseId}
              onChange={handleChange}
              placeholder="CSC401"
            />

          </label>

          <label>
            <span>Course Code</span>

            <input
              name="courseCode"
              value={form.courseCode}
              onChange={handleChange}
              placeholder="Software Engineering"
            />

          </label>

        </div>

        <div className="form-grid">

          <label>

            <span>Due Date</span>

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />

          </label>

          <label>

            <span>Maximum Score</span>

            <input
              type="number"
              min="1"
              max="1000"
              name="maxScore"
              value={form.maxScore}
              onChange={handleChange}
            />

          </label>

        </div>

        <div className="form-grid">

          <label>

            <span>Status</span>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >

              <option value="Draft">
                Draft
              </option>

              <option value="Open">
                Open
              </option>

              <option value="Closed">
                Closed
              </option>

            </select>

          </label>

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.75rem',
              marginTop: '1.75rem',
            }}
          >

            <input
              type="checkbox"
              name="allowLateSubmission"
              checked={form.allowLateSubmission}
              onChange={handleChange}
            />

            Allow Late Submission

          </label>

        </div>

      </Modal>

    </div>

  )

}