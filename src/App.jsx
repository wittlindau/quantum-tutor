import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import MainContent from './components/layout/MainContent'
import ErrorBoundary from './components/ErrorBoundary'
import Chatbot from './components/Chatbot'
import { useProgress, ProgressContext } from './hooks/useProgress'
import './App.css'

export default function App() {
  const [activeUnit, setActiveUnit] = useState('I')
  const [activeSection, setActiveSection] = useState(null)
  const [mode, setMode] = useState('learn')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const progress = useProgress()

  return (
    <ProgressContext.Provider value={progress}>
      <div className="app-shell">
        <Sidebar
          activeUnit={activeUnit}
          activeSection={activeSection}
          onSelectUnit={(id) => { setActiveUnit(id); setActiveSection(null) }}
          onSelectSection={(id) => { setActiveSection(id) }}
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(v => !v)}
          getStatus={progress.getStatus}
        />
        <div className="app-main">
          <TopBar mode={mode} setMode={setMode} onToggleSidebar={() => setSidebarOpen(v => !v)} />
          <ErrorBoundary>
            <MainContent
              activeUnit={activeUnit}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              mode={mode}
            />
          </ErrorBoundary>
        </div>
      </div>
      <Chatbot activeUnit={activeUnit} activeSection={activeSection} />
    </ProgressContext.Provider>
  )
}

function TopBar({ mode, setMode, onToggleSidebar }) {
  return (
    <header className="topbar">
      <button className="sidebar-toggle" onClick={onToggleSidebar} title="Toggle sidebar">
        <span /><span /><span />
      </button>
      <div className="topbar-title">
        <span className="topbar-course">PHYS 50</span>
        <span className="topbar-sep">·</span>
        <span className="topbar-subtitle">Introductory Quantum Mechanics</span>
      </div>
      <nav className="mode-tabs">
        {[
          { key: 'learn', label: 'Learn' },
          { key: 'practice', label: 'Practice' },
          { key: 'flashcard', label: 'Flashcards' },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`mode-tab ${mode === key ? 'active' : ''}`}
            onClick={() => setMode(key)}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  )
}
