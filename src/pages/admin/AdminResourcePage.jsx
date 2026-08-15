import { useEffect, useState } from 'react'
import { DataTable } from '../../components/DataTable'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'

function getInitialForm(fields) {
  return Object.fromEntries(fields.map((field) => [field.name, field.defaultValue || '']))
}

export function AdminResourcePage({
  title,
  description,
  actionLabel,
  columns,
  rows,
  fields,
  createRecord,
  loadRecords,
  children,
}) {
  const [items, setItems] = useState(rows)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState(() => getInitialForm(fields))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!loadRecords) return

    let active = true
    const fetchRecords = async () => {
      setLoading(true)
      setError(null)

      try {
        const loaded = await loadRecords()
        if (active) {
          setItems(loaded || [])
        }
      } catch (err) {
        if (active) {
          console.error('Error loading admin resources:', err)
          setError(err)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchRecords()
    return () => {
      active = false
    }
  }, [loadRecords])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreate = async () => {
    const primaryField = fields[0]?.name
    if (primaryField && !form[primaryField]?.trim()) return

    setShowModal(false)
    setError(null)

    try {
      const newItem = await Promise.resolve(createRecord(form))
      if (newItem) {
        setItems((prev) => [newItem, ...prev])
        setForm(getInitialForm(fields))
      }
    } catch (err) {
      console.error('Error creating admin resource:', err)
      setError(err)
    }
  }

  return (
    <div className="page-stack">
      <SectionCard
        title={title}
        description={description}
        action={
          <button className="primary-button small" type="button" onClick={() => setShowModal(true)}>
            {actionLabel}
          </button>
        }
      >
        {error && (
          <div className="mb-5 rounded-3xl bg-rose-500/10 p-4 text-sm text-rose-200">
            {error.message || 'Unable to load or save records.'}
          </div>
        )}
        {loading && !items.length ? (
          <div className="text-slate-500 dark:text-slate-400">Loading records...</div>
        ) : (
          <DataTable columns={columns} rows={items} />
        )}
      </SectionCard>

      {children}

      <Modal
        open={showModal}
        title={actionLabel}
        onClose={() => setShowModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={handleCreate}>
            Save
          </button>
        }
      >
        <div className="form-grid">
          {fields.map((field) => (
            <label key={field.name}>
              <span>{field.label}</span>
              {field.options ? (
                <select name={field.name} value={form[field.name]} onChange={handleChange}>
                  {field.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input
                  name={field.name}
                  type={field.type || 'text'}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                />
              )}
            </label>
          ))}
        </div>
      </Modal>
    </div>
  )
}
