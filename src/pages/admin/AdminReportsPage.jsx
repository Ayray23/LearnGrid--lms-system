import { useState } from 'react'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { adminReports } from '../../utils/mockData'

export function AdminReportsPage() {
  const [range, setRange] = useState('This semester')
  const [showExportModal, setShowExportModal] = useState(false)

  return (
    <div className="page-stack">
      <SectionCard
        title="Reports & Analytics"
        description="View platform analytics, student performance, and course outcomes."
        action={
          <button className="primary-button small" type="button" onClick={() => setShowExportModal(true)}>
            Export report
          </button>
        }
      >
        <div className="catalogue-toolbar">
          <label className="catalogue-search">
            <span>Reporting period</span>
            <select value={range} onChange={(event) => setRange(event.target.value)}>
              <option>This week</option>
              <option>This month</option>
              <option>This semester</option>
              <option>This academic year</option>
            </select>
          </label>
          <div className="lecturer-checklist">
            <span>{range}</span>
            <span>Auto-refresh ready</span>
            <span>CSV export queued</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {adminReports.map((report) => (
            <article key={report.label} className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
              <p className="text-sm text-slate-500 dark:text-slate-400">{report.label}</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{report.value}</p>
              <p className="mt-2 text-sm text-slate-500">{report.meta}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <Modal
        open={showExportModal}
        title="Export Report"
        onClose={() => setShowExportModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={() => setShowExportModal(false)}>
            Prepare export
          </button>
        }
      >
        <div className="info-banner">
          A {range.toLowerCase()} analytics export will include students, lecturers, courses, assignments, quizzes, and CodeSpace activity.
        </div>
        <label>
          <span>Format</span>
          <select defaultValue="CSV">
            <option>CSV</option>
            <option>PDF</option>
            <option>Excel</option>
          </select>
        </label>
      </Modal>
    </div>
  )
}
