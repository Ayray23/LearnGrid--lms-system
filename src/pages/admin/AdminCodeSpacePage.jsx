import { AdminResourcePage } from './AdminResourcePage'
import { adminCodingChallenges } from '../../utils/mockData'

const columns = [
  { key: 'challenge', label: 'Challenge' },
  { key: 'language', label: 'Language' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'status', label: 'Status' },
]

const fields = [
  { name: 'challenge', label: 'Challenge title', placeholder: 'Student Grade Analyzer' },
  { name: 'language', label: 'Language', defaultValue: 'JavaScript', options: ['JavaScript', 'Python', 'Java', 'C++'] },
  { name: 'deadline', label: 'Deadline', type: 'date' },
  { name: 'status', label: 'Status', defaultValue: 'Draft', options: ['Draft', 'Open', 'Reviewing', 'Closed'] },
]

export function AdminCodeSpacePage() {
  return (
    <AdminResourcePage
      title="CodeSpace Management"
      description="Create challenges, set deadlines, and review coding submissions."
      actionLabel="New challenge"
      columns={columns}
      rows={adminCodingChallenges}
      fields={fields}
      createRecord={(form) => form}
    />
  )
}
