import { useState, useEffect, useRef } from 'react'
import katex from 'katex'
import { getUnitContent, getSectionContent } from '../data/content'
import { UNITS } from '../data/units'
import { useProgressContext } from '../hooks/useProgress'
import ComprehensionCheck from './ComprehensionCheck'
import WaveFunctionViz from './visualizations/WaveFunctionViz'
import BlochSphereViz from './visualizations/BlochSphereViz'
import SHOViz from './visualizations/SHOViz'
import UncertaintyViz from './visualizations/UncertaintyViz'
import HydrogenOrbitalsViz from './visualizations/HydrogenOrbitalsViz'
import TunnelingViz from './visualizations/TunnelingViz'
import SpinPrecessionViz from './visualizations/SpinPrecessionViz'
import EnergyLevelViz from './visualizations/EnergyLevelViz'
import WavePacketViz from './visualizations/WavePacketViz'
import './UnitLearn.css'

// ───────────────────────────────────────────────────────────────
// LaTeX helpers
// ───────────────────────────────────────────────────────────────
function renderLatex(tex, display = false) {
  try {
    return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: false, trust: true })
  } catch {
    return `<span class="katex-error">${tex}</span>`
  }
}

function InlineLatex({ tex }) {
  return <span dangerouslySetInnerHTML={{ __html: renderLatex(tex, false) }} />
}

function DisplayLatex({ tex }) {
  return <div className="display-eq" dangerouslySetInnerHTML={{ __html: renderLatex(tex, true) }} />
}

// Enhanced: handles $...$ math, **bold**, *italic*
function parseInline(text) {
  if (!text) return null
  const parts = text.split(/(\*\*[^*]+\*\*|\*(?!\*)[^*]+\*(?!\*)|\$[^$]+\$)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{parseInline(part.slice(2, -2))}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
      return <em key={i}>{parseInline(part.slice(1, -1))}</em>
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      return <InlineLatex key={i} tex={part.slice(1, -1)} />
    }
    return <span key={i}>{part}</span>
  })
}

// ───────────────────────────────────────────────────────────────
// Block renderers
// ───────────────────────────────────────────────────────────────
function TextBlock({ content }) {
  return <p className="content-text">{parseInline(content)}</p>
}

function HeadingBlock({ text, anchor }) {
  return <h3 className="content-heading" id={anchor}>{parseInline(text)}</h3>
}

function EquationBlock({ latex, content }) {
  return (
    <div className="eq-block">
      {content && <p className="eq-caption">{parseInline(content)}</p>}
      <DisplayLatex tex={latex} />
    </div>
  )
}

function CalloutBlock({ type, title, content, latex }) {
  return (
    <div className={`callout callout-${type}`}>
      {title && (
        <div className="callout-title">
          <span className="callout-tag">{type}</span>
          <span>{title}</span>
        </div>
      )}
      {content && <p className="callout-body">{parseInline(content)}</p>}
      {latex && <DisplayLatex tex={latex} />}
    </div>
  )
}

function SourceBlock({ type, content, latex }) {
  const label = type === 'shankar' ? 'Shankar' : 'McIntyre'
  return (
    <div className={`source-block source-${type}`}>
      <span className="source-label">{label}</span>
      <div className="source-content">
        <span>{parseInline(content)}</span>
        {latex && <DisplayLatex tex={latex} />}
      </div>
    </div>
  )
}

const VIZ_MAP = {
  'wavefunctions': WaveFunctionViz,
  'bloch-sphere': BlochSphereViz,
  'sho-wavefunctions': SHOViz,
  'uncertainty': UncertaintyViz,
  'hydrogen-orbitals': HydrogenOrbitalsViz,
  'tunneling': TunnelingViz,
  'spin-precession': SpinPrecessionViz,
  'energy-levels': EnergyLevelViz,
  'wave-packet': WavePacketViz,
  'sommerfeld-orbits': null,
  'lagrangian-path': null,
}

function VizBlock({ id }) {
  const Component = VIZ_MAP[id]
  if (!Component) return null
  return <div className="viz-embed"><Component /></div>
}

function ContentBlock({ block }) {
  if (!block) return null
  switch (block.type) {
    case 'text': return <TextBlock content={block.content} />
    case 'heading': return <HeadingBlock text={block.text} anchor={block.anchor} />
    case 'display': return <DisplayLatex tex={block.latex} />
    case 'equation': return <EquationBlock latex={block.latex} content={block.content} />
    case 'definition':
    case 'theorem':
    case 'example':
    case 'note':
    case 'warning':
      return <CalloutBlock type={block.type} title={block.title} content={block.content} latex={block.latex} />
    case 'shankar':
    case 'mcintyre':
      return <SourceBlock type={block.type} content={block.content} latex={block.latex} />
    case 'viz':
      return <VizBlock id={block.id} />
    default:
      return null
  }
}

// ───────────────────────────────────────────────────────────────
// Section overview (unit landing page)
// ───────────────────────────────────────────────────────────────
function SectionOverview({ unit, content, onSelectSection, getStatus }) {
  const unitData = UNITS.find(u => u.id === unit.id)
  const statColors = { unvisited: 'transparent', visited: 'var(--gold)', complete: 'var(--green)' }

  return (
    <div className="section-overview">
      <div className="unit-hero" style={{ '--unit-color': unitData?.color || '#4a9eff' }}>
        <div className="unit-hero-roman">{unit.roman}</div>
        <div className="unit-hero-text">
          <h1>{unit.title}</h1>
          {unit.subtitle && <div className="unit-subtitle-text">{unit.subtitle}</div>}
        </div>
      </div>
      {content?.overview && <p className="unit-overview-text">{parseInline(content.overview)}</p>}
      <div className="section-grid">
        {unit.sections.map(sec => {
          const status = getStatus ? getStatus(sec.id) : 'unvisited'
          const hasContent = !!getSectionContent(unit.id, sec.id)
          return (
            <button
              key={sec.id}
              className={`section-card ${!hasContent ? 'section-card-empty' : ''}`}
              style={{ '--unit-color': unitData?.color || '#4a9eff' }}
              onClick={() => hasContent && onSelectSection(sec.id)}
              title={!hasContent ? 'Content coming soon' : undefined}
            >
              <div className="section-card-top">
                <div className="section-card-id">{sec.id}</div>
                <div className="section-card-status" style={{ background: statColors[status] }} />
              </div>
              <div className="section-card-title">{sec.title}</div>
              {sec.subsections && (
                <div className="section-card-subs">
                  {(Array.isArray(sec.subsections) ? sec.subsections : []).map((s, i) => (
                    <span key={i} className="section-card-sub">
                      {typeof s === 'string' ? s : s.title}
                    </span>
                  ))}
                </div>
              )}
              {!hasContent && <div className="section-card-soon">content coming soon</div>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────
// Section content renderer
// ───────────────────────────────────────────────────────────────
function SectionContent({ unit, section, sectionData, onBack, onSectionComplete, sectionId }) {
  const unitData = UNITS.find(u => u.id === unit.id)
  const color = unitData?.color || '#4a9eff'
  const { getStatus, markComplete } = useProgressContext() || {}
  const status = getStatus ? getStatus(sectionId) : 'unvisited'
  const [checksDismissed, setChecksDismissed] = useState(false)
  const [checkKey, setCheckKey] = useState(0)
  const contentRef = useRef()

  const handleComplete = () => {
    markComplete?.(sectionId)
    setChecksDismissed(true)
  }

  const handleSkip = () => {
    markComplete?.(sectionId)
    setChecksDismissed(true)
  }

  const showChecks = sectionData.checks?.length > 0 && !checksDismissed

  return (
    <div className="section-content" ref={contentRef}>
      <div className="section-header" style={{ '--unit-color': color }}>
        <button className="back-btn" onClick={onBack}>
          ← {unit.roman}. {unit.title}
        </button>
        <div className="section-header-row">
          <h2>{section.id} — {sectionData.title || section.title}</h2>
          {status === 'complete' && <span className="section-complete-badge">✓ Complete</span>}
        </div>
      </div>

      {sectionData.viz && VIZ_MAP[sectionData.viz] && (
        <div className="section-viz"><VizBlock id={sectionData.viz} /></div>
      )}

      <div className="blocks-container">
        {(sectionData.blocks || []).map((block, i) => (
          <ContentBlock key={i} block={block} />
        ))}
      </div>

      {showChecks && (
        <ComprehensionCheck
          key={checkKey}
          checks={sectionData.checks}
          sectionId={sectionId}
          onComplete={handleComplete}
          onSkip={handleSkip}
        />
      )}

      {status === 'complete' && checksDismissed && (
        <div className="section-done-banner">
          ✓ You've completed this section.
          <button className="review-checks-btn" onClick={() => { setChecksDismissed(false); setCheckKey(k => k + 1) }}>
            Review questions
          </button>
        </div>
      )}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────
// Main export
// ───────────────────────────────────────────────────────────────
export default function UnitLearn({ unit, sectionId, onSectionChange }) {
  const [localSection, setLocalSection] = useState(null)
  const { markVisited, getStatus } = useProgressContext() || {}

  useEffect(() => {
    setLocalSection(sectionId || null)
  }, [sectionId, unit?.id])

  useEffect(() => {
    if (localSection) markVisited?.(localSection)
  }, [localSection])

  if (!unit) {
    return (
      <div className="unit-learn-empty">
        <div className="empty-state">
          <div className="empty-icon">ψ</div>
          <h2>Select a unit to begin</h2>
          <p>Choose a unit from the sidebar to start learning.</p>
        </div>
      </div>
    )
  }

  const unitContent = getUnitContent(unit.id)
  const activeSection = localSection ? unit.sections.find(s => s.id === localSection) : null
  const activeSectionData = localSection ? getSectionContent(unit.id, localSection) : null

  const handleSelectSection = (id) => {
    setLocalSection(id)
    onSectionChange?.(id)
  }

  const handleBack = () => {
    setLocalSection(null)
    onSectionChange?.(null)
  }

  if (activeSection && activeSectionData) {
    return (
      <SectionContent
        unit={unit}
        section={activeSection}
        sectionData={activeSectionData}
        sectionId={localSection}
        onBack={handleBack}
        onSectionComplete={() => handleBack()}
      />
    )
  }

  return (
    <SectionOverview
      unit={unit}
      content={unitContent}
      onSelectSection={handleSelectSection}
      getStatus={getStatus}
    />
  )
}
