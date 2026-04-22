import { useState, useEffect, useRef } from 'react'
import katex from 'katex'
import { getProblemsForUnit, getAllProblems } from '../../data/problems'
import './PracticeMode.css'

function renderK(tex, display = false) {
  try { return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: false }) }
  catch { return tex }
}

function parseInline(text) {
  if (!text) return null
  const parts = text.split(/(\*\*[^*]+\*\*|\*(?!\*)[^*]+\*(?!\*)|\$[^$]+\$)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{parseInline(part.slice(2,-2))}</strong>
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) return <em key={i}>{parseInline(part.slice(1,-1))}</em>
    if (part.startsWith('$') && part.endsWith('$')) {
      return <span key={i} dangerouslySetInnerHTML={{ __html: renderK(part.slice(1,-1)) }} />
    }
    return <span key={i}>{part}</span>
  })
}

const DIFF_LABELS = { 1: 'easy', 2: 'medium', 3: 'hard', 4: 'challenge' }
const DIFF_COLORS = { 1: '#00e676', 2: '#f0b429', 3: '#ff9800', 4: '#ff5252' }

function gradeAnswer(answer, keyExpressions) {
  if (!keyExpressions || !keyExpressions.length) return null
  const norm = answer.replace(/\s/g, '').toLowerCase()
  const hits = keyExpressions.filter(expr => {
    const e = expr.replace(/\s/g, '').toLowerCase()
    return norm.includes(e)
  })
  return { hits, total: keyExpressions.length, passed: hits.length >= Math.ceil(keyExpressions.length * 0.5) }
}

export default function PracticeMode({ unitId }) {
  const allProblems = unitId ? getProblemsForUnit(unitId) : getAllProblems()
  const [filtered, setFiltered] = useState(allProblems)
  const [idx, setIdx] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [hintIdx, setHintIdx] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [gradeResult, setGradeResult] = useState(null)
  const [diffFilter, setDiffFilter] = useState(0)
  const textareaRef = useRef()

  useEffect(() => {
    const p = unitId ? getProblemsForUnit(unitId) : getAllProblems()
    const f = diffFilter > 0 ? p.filter(x => x.difficulty === diffFilter) : p
    setFiltered(f.length ? f : p)
    setIdx(0)
    reset()
  }, [unitId, diffFilter])

  const reset = () => { setShowSolution(false); setShowHints(false); setHintIdx(0); setAnswer(''); setSubmitted(false); setGradeResult(null) }

  if (!filtered.length) return <div className="practice-empty">No problems for this unit yet.</div>

  const problem = filtered[idx % filtered.length]

  const next = () => { setIdx(i => (i + 1) % filtered.length); reset() }
  const prev = () => { setIdx(i => (i - 1 + filtered.length) % filtered.length); reset() }

  const handleSubmit = () => {
    if (!answer.trim()) return
    const result = gradeAnswer(answer, problem.keyExpressions)
    setGradeResult(result)
    setSubmitted(true)
    setShowSolution(true)
  }

  const answerHtml = (() => {
    if (!answer.trim()) return ''
    try { return katex.renderToString(answer, { displayMode: true, throwOnError: false, strict: false }) } catch { return '' }
  })()

  return (
    <div className="practice-mode">
      <div className="practice-header">
        <div className="practice-nav">
          <button onClick={prev} className="nav-btn">←</button>
          <span className="problem-count">{(idx % filtered.length) + 1} / {filtered.length}</span>
          <button onClick={next} className="nav-btn">→</button>
        </div>
        <span className="diff-badge" style={{ background: DIFF_COLORS[problem.difficulty] + '22', color: DIFF_COLORS[problem.difficulty], border: `1px solid ${DIFF_COLORS[problem.difficulty]}44` }}>
          {DIFF_LABELS[problem.difficulty]}
        </span>
        <span className="unit-badge">Unit {problem.unit}</span>
        <div className="diff-filter">
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Filter:</span>
          {[0,1,2,3,4].map(d => (
            <button key={d} className={`diff-filter-btn ${diffFilter === d ? 'active' : ''}`}
              onClick={() => setDiffFilter(d)}>
              {d === 0 ? 'all' : DIFF_LABELS[d]}
            </button>
          ))}
        </div>
      </div>

      <div className="problem-card">
        <h2 className="problem-title">{problem.title}</h2>
        <div className="problem-prompt">{parseInline(problem.prompt)}</div>

        {showHints && (
          <div className="hints-section">
            {problem.hints.slice(0, hintIdx + 1).map((h, i) => (
              <div key={i} className="hint-item">
                <span className="hint-num">Hint {i + 1}</span>
                {parseInline(h)}
              </div>
            ))}
            {hintIdx < problem.hints.length - 1 && (
              <button className="hint-next-btn" onClick={() => setHintIdx(hintIdx + 1)}>Next hint →</button>
            )}
          </div>
        )}

        <div className="answer-section">
          <div className="answer-header">
            <span>Your answer (LaTeX)</span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {!showHints && problem.hints?.length > 0 && (
                <button className="hint-btn" onClick={() => setShowHints(true)}>Hint</button>
              )}
              {!submitted && (
                <button className="solution-btn" onClick={() => setShowSolution(!showSolution)}>
                  {showSolution ? 'Hide solution' : 'Reveal solution'}
                </button>
              )}
            </div>
          </div>
          <textarea
            ref={textareaRef}
            className="answer-input"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder="Type your LaTeX answer here… e.g. E_n = (n + \frac{1}{2})\hbar\omega"
            rows={5}
            disabled={submitted}
          />
          {answer && !submitted && (
            <div className="answer-preview">
              <div className="answer-preview-label">Preview</div>
              <div dangerouslySetInnerHTML={{ __html: answerHtml }} />
            </div>
          )}
          {!submitted && (
            <button className="submit-btn" onClick={handleSubmit} disabled={!answer.trim()}>
              Submit answer
            </button>
          )}
        </div>

        {submitted && gradeResult && (
          <div className={`grade-result ${gradeResult.passed ? 'correct' : 'partial'}`}>
            {gradeResult.passed ? (
              <><span className="grade-icon">✓</span> Correct! Key expressions found ({gradeResult.hits.length}/{gradeResult.total})</>
            ) : (
              <><span className="grade-icon">~</span> Partially correct — {gradeResult.hits.length}/{gradeResult.total} key expressions matched. Review the solution below.</>
            )}
          </div>
        )}

        {submitted && !gradeResult && (
          <div className="grade-result manual">
            <span className="grade-icon">?</span> Compare your answer with the solution below.
          </div>
        )}

        {showSolution && (
          <div className="solution-section">
            <div className="solution-label">Solution</div>
            <div className="solution-body">{parseInline(problem.solution)}</div>
          </div>
        )}

        {submitted && (
          <button className="next-problem-btn" onClick={next}>Next problem →</button>
        )}
      </div>
    </div>
  )
}
