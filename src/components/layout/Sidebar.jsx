import { useState } from 'react'
import { UNITS } from '../../data/units'
import { getSectionContent } from '../../data/content'
import './Sidebar.css'

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function Sidebar({ activeUnit, activeSection, onSelectUnit, onSelectSection, open, onToggle, getStatus }) {
  const [expanded, setExpanded] = useState({ [activeUnit]: true })

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  const handleUnitClick = (unit) => {
    toggle(unit.id)
    onSelectUnit(unit.id)
    onSelectSection(null)
  }

  const statusDot = (sectionId) => {
    const s = getStatus?.(sectionId) || 'unvisited'
    return <span className={`progress-dot dot-${s}`} title={s} />
  }

  if (!open) {
    return (
      <div className="sidebar sidebar-collapsed">
        <div className="sidebar-units-mini">
          {UNITS.map(u => (
            <button
              key={u.id}
              className={`unit-mini-btn ${activeUnit === u.id ? 'active' : ''}`}
              style={{ '--unit-color': u.color }}
              onClick={() => { onSelectUnit(u.id); onSelectSection(null) }}
              title={`Unit ${u.roman}: ${u.title}`}
            >
              {u.roman}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="sidebar-psi">ψ</span>
          <span className="sidebar-brand">Quantum Tutor</span>
        </div>
        <div className="sidebar-memory-note">Progress saved locally</div>
      </div>
      <nav className="sidebar-nav">
        {UNITS.map(unit => (
          <div key={unit.id} className="sidebar-unit">
            <button
              className={`unit-btn ${activeUnit === unit.id ? 'active' : ''}`}
              style={{ '--unit-color': unit.color }}
              onClick={() => handleUnitClick(unit)}
            >
              <span className="unit-roman">{unit.roman}</span>
              <span className="unit-info">
                <span className="unit-title">{unit.title}</span>
                <span className="unit-subtitle">{unit.subtitle}</span>
              </span>
              <span className={`unit-chevron ${expanded[unit.id] ? 'open' : ''}`}>›</span>
            </button>
            {expanded[unit.id] && (
              <div className="section-list">
                {unit.sections.map(sec => {
                  const hasContent = !!getSectionContent(unit.id, sec.id)
                  const isActive = activeSection === sec.id
                  return (
                    <div key={sec.id}>
                      <button
                        className={`section-btn ${isActive ? 'active' : ''} ${!hasContent ? 'section-btn-empty' : ''}`}
                        onClick={() => {
                          onSelectUnit(unit.id)
                          if (hasContent) onSelectSection(sec.id)
                        }}
                        title={!hasContent ? 'Content coming soon' : sec.title}
                      >
                        <span className="section-dot" style={{ background: unit.color }} />
                        <span className="section-btn-text">{sec.title}</span>
                        {statusDot(sec.id)}
                      </button>
                      {sec.subsections && isActive && (
                        <div className="subsection-list">
                          {(Array.isArray(sec.subsections) ? sec.subsections : []).map((sub, i) => {
                            const subTitle = typeof sub === 'string' ? sub : sub.title
                            const anchor = typeof sub === 'object' && sub.anchor
                              ? sub.anchor
                              : slugify(subTitle)
                            return (
                              <button
                                key={i}
                                className="subsection-btn"
                                onClick={() => {
                                  const headings = document.querySelectorAll('.content-heading')
                                  const needle = subTitle.toLowerCase().slice(0, 20)
                                  const el = Array.from(headings).find(h => h.textContent.toLowerCase().includes(needle))
                                    || document.getElementById(anchor)
                                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }}
                              >
                                {subTitle}
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-refs">
          <div className="ref-item ref-primary">📘 Lecture Notes <span>(primary)</span></div>
          <div className="ref-item">📗 Shankar</div>
          <div className="ref-item">📙 McIntyre</div>
        </div>
      </div>
    </aside>
  )
}
