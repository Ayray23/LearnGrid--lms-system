import { useState } from 'react'
import { SectionCard } from '../../components/SectionCard'

const initialSettings = [
  { key: 'institution', label: 'Institution Name', value: 'SE-LMS Academy', group: 'General' },
  { key: 'email', label: 'Email Settings', value: 'smtp@selms.dev', group: 'Notifications' },
  { key: 'session', label: 'Academic Session', value: '2025/2026 - Second Semester', group: 'Scheduling' },
  { key: 'security', label: 'Security Policies', value: 'Two-factor authentication enabled for admin accounts.', group: 'Security' },
]

export function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialSettings)
  const [selectedKey, setSelectedKey] = useState(initialSettings[0].key)
  const selectedSetting = settings.find((setting) => setting.key === selectedKey) || settings[0]

  const handleChange = (event) => {
    const { value } = event.target
    setSettings((prev) =>
      prev.map((setting) => (setting.key === selectedKey ? { ...setting, value } : setting)),
    )
  }

  return (
    <div className="page-stack">
      <section className="two-column-grid">
        <SectionCard
          title="Platform Settings"
          description="Manage institution branding, academic session settings, and security controls."
        >
          <div className="stack-list">
            {settings.map((setting) => (
              <button
                key={setting.key}
                type="button"
                className={`settings-row ${setting.key === selectedKey ? 'active' : ''}`}
                onClick={() => setSelectedKey(setting.key)}
              >
                <div>
                  <strong>{setting.label}</strong>
                  <p>{setting.value}</p>
                </div>
                <span>{setting.group}</span>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Edit Setting" description="Preview how admin controls will work before persistence">
          <label>
            <span>{selectedSetting.label}</span>
            <textarea className="code-editor" rows={6} value={selectedSetting.value} onChange={handleChange} />
          </label>
          <div className="success-text">Local preview saved for {selectedSetting.group} settings.</div>
        </SectionCard>
      </section>
    </div>
  )
}
