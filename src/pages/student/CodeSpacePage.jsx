import { useState } from 'react'
import { Modal } from '../../components/Modal'
import { SectionCard } from '../../components/SectionCard'
import { codingProblems } from '../../utils/mockData'

const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
]

export function CodeSpacePage() {
  const [code, setCode] = useState(
    `function solve(input) {
  // Write your solution here
  return input;
}`
  )
  const [language, setLanguage] = useState('javascript')
  const [output, setOutput] = useState('>> Ready for code execution integration.')
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [loadingRuntime, setLoadingRuntime] = useState(false)

  const handleSave = () => {
    setOutput('>> Code saved successfully.')
  }

  const loadPythonRuntime = async () => {
    if (window.pyodide) return window.pyodide

    setLoadingRuntime(true)
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js'
    script.async = true
    document.body.appendChild(script)

    await new Promise((resolve, reject) => {
      script.onload = resolve
      script.onerror = () => reject(new Error('Unable to load Python runtime'))
    })

    const pyodide = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/' })
    window.pyodide = pyodide
    setLoadingRuntime(false)
    return pyodide
  }

  const handleRun = async () => {
    if (!code.trim()) {
      setOutput('>> Please add code before running.')
      return
    }

    if (language === 'javascript') {
      setOutput('>> Running JavaScript...')
      const logs = []
      const capture = (...args) => logs.push(args.map((value) => (typeof value === 'object' ? JSON.stringify(value) : String(value))).join(' '))

      try {
        const runner = new Function('console', code)
        const result = runner({ log: capture, warn: capture, error: capture })
        const logOutput = logs.length ? logs.join('\n') : ''
        const returnOutput = result !== undefined ? String(result) : ''
        setOutput(
          `>> Execution result:${returnOutput ? `\n${returnOutput}` : ''}${logOutput ? `\n${logOutput}` : ''}`.trim() || '>> Execution completed with no output.'
        )
      } catch (error) {
        setOutput(`>> JavaScript error:\n${error.message}`)
      }
      return
    }

    if (language === 'python') {
      setOutput('>> Loading Python runtime...')
      try {
        const pyodide = await loadPythonRuntime()
        const result = await pyodide.runPythonAsync(code)
        setOutput(`>> Python output:\n${result === undefined ? 'None' : String(result)}`)
      } catch (error) {
        setOutput(`>> Python error:\n${error.message}`)
      }
      return
    }

    setOutput(`>> Runtime support is available for JavaScript and Python only. ${language.toUpperCase()} execution is not connected yet.`)
  }

  const handleConfirmSubmit = () => {
    setSubmitMessage('Submission received. Your code has been queued for review.')
    setShowSubmitModal(false)
    setOutput('>> Submission sent successfully.')
  }

  return (
    <div className="page-stack">
      <section className="codespace-layout">
        <SectionCard title="Problem Description" description="Selected coding exercise">
          <div className="stack-list">
            {codingProblems.map((problem) => (
              <article key={problem.title} className="feed-item align-start">
                <div>
                  <strong>{problem.title}</strong>
                  <p>{problem.topic}</p>
                </div>
                <span>{problem.difficulty}</span>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Editor Workspace"
          description="Run simple code snippets in the browser. JavaScript executes locally; Python loads a browser runtime for snippets."
          action={
            <div className="inline-actions">
              <select
                name="language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="rounded-2xl border border-slate-900/10 dark:border-white/10 bg-slate-100/80 dark:bg-slate-950/80 px-4 py-3 text-sm text-slate-900 dark:text-slate-100 outline-none"
              >
                {languageOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
                    {option.label}
                  </option>
                ))}
              </select>
              <button className="ghost-button" type="button" onClick={handleSave}>
                Save
              </button>
              <button className="ghost-button" type="button" onClick={handleRun} disabled={loadingRuntime}>
                {loadingRuntime ? 'Loading...' : 'Run'}
              </button>
              <button className="primary-button small" type="button" onClick={() => setShowSubmitModal(true)}>
                Submit
              </button>
            </div>
          }
        >
          <textarea
            className="code-editor"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            rows={16}
          />
        </SectionCard>
      </section>

      <SectionCard title="Output Console" description="Compilation output, logs, and runtime messages">
        <div className="console-panel">{output}</div>
      </SectionCard>

      <Modal
        open={showSubmitModal}
        title="Confirm Code Submission"
        onClose={() => setShowSubmitModal(false)}
        footer={
          <button className="primary-button" type="button" onClick={handleConfirmSubmit}>
            Confirm submit
          </button>
        }
      >
        <p className="text-slate-600 dark:text-slate-300">You are about to submit your solution for review.</p>
        <p className="text-slate-500 dark:text-slate-400">Once submitted, your code will be recorded and marked in the assignment workflow.</p>
        {submitMessage && (
          <div className="rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-200">{submitMessage}</div>
        )}
      </Modal>
    </div>
  )
}
