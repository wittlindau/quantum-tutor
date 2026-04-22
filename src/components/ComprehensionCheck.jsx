import { useState } from 'react'
import katex from 'katex'
import './ComprehensionCheck.css'

function renderInline(text) {
  if (!text) return text
  const parts = text.split(/(\$[^$]+\$)/)
  return parts.map((p, i) => {
    if (p.startsWith('$') && p.endsWith('$')) {
      try {
        const html = katex.renderToString(p.slice(1, -1), { throwOnError: false })
        return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
      } catch { return <span key={i}>{p}</span> }
    }
    return <span key={i}>{p}</span>
  })
}

function SingleCheck({ check, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const submit = () => {
    if (selected === null) return
    setSubmitted(true)
    if (selected === check.answer) onAnswer(true)
    else onAnswer(false)
  }

  const correct = submitted && selected === check.answer
  const wrong = submitted && selected !== check.answer

  return (
    <div className="single-check">
      <p className="check-question">{renderInline(check.question)}</p>
      <div className="check-options">
        {check.options.map((opt, i) => (
          <button
            key={i}
            className={`check-option ${selected === i ? 'selected' : ''} ${submitted && i === check.answer ? 'correct' : ''} ${submitted && selected === i && i !== check.answer ? 'wrong' : ''}`}
            onClick={() => !submitted && setSelected(i)}
            disabled={submitted}
          >
            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
            {renderInline(opt)}
          </button>
        ))}
      </div>
      {!submitted && (
        <button className="check-submit-btn" onClick={submit} disabled={selected === null}>
          Check answer
        </button>
      )}
      {submitted && (
        <div className={`check-feedback ${correct ? 'correct' : 'wrong'}`}>
          {correct ? '✓ Correct! ' : '✗ Not quite. '}
          {check.explanation && renderInline(check.explanation)}
        </div>
      )}
    </div>
  )
}

export default function ComprehensionCheck({ checks, sectionId, onComplete, onSkip }) {
  const [idx, setIdx] = useState(0)
  const [results, setResults] = useState([])
  const [done, setDone] = useState(false)

  const handleAnswer = (correct) => {
    const newResults = [...results, correct]
    setResults(newResults)
    if (idx + 1 < checks.length) {
      setTimeout(() => setIdx(idx + 1), 800)
    } else {
      setTimeout(() => {
        setDone(true)
        const passed = newResults.filter(Boolean).length >= Math.ceil(checks.length * 0.6)
        if (passed) onComplete()
      }, 800)
    }
  }

  const score = results.filter(Boolean).length

  return (
    <div className="comprehension-check">
      <div className="check-header">
        <div className="check-title">
          <span className="check-icon">◈</span>
          Comprehension Check
        </div>
        <button className="check-skip-btn" onClick={onSkip}>Skip →</button>
      </div>

      {!done ? (
        <>
          <div className="check-progress-row">
            {checks.map((_, i) => (
              <div key={i} className={`check-pip ${i < results.length ? (results[i] ? 'pass' : 'fail') : i === idx ? 'current' : 'pending'}`} />
            ))}
          </div>
          <SingleCheck key={idx} check={checks[idx]} onAnswer={handleAnswer} />
        </>
      ) : (
        <div className="check-result">
          {score >= Math.ceil(checks.length * 0.6) ? (
            <>
              <div className="result-icon pass">✓</div>
              <div className="result-text">Section complete! {score}/{checks.length} correct</div>
            </>
          ) : (
            <>
              <div className="result-icon fail">✗</div>
              <div className="result-text">{score}/{checks.length} correct — review the material and try again?</div>
              <button className="retry-btn" onClick={() => { setIdx(0); setResults([]); setDone(false) }}>
                Retry
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
