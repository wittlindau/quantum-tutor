import { useState, useEffect } from 'react'
import katex from 'katex'
import { getFlashcardsForUnit, getAllFlashcards } from '../../data/flashcards'
import './FlashcardMode.css'

function parseInline(text) {
  if (!text) return null
  const parts = text.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/)
  return parts.map((part, i) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      try {
        return <span key={i} dangerouslySetInnerHTML={{ __html: katex.renderToString(part.slice(2, -2), { displayMode: true, throwOnError: false }) }} />
      } catch { return <span key={i}>{part}</span> }
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      try {
        return <span key={i} dangerouslySetInnerHTML={{ __html: katex.renderToString(part.slice(1, -1), { throwOnError: false }) }} />
      } catch { return <span key={i}>{part}</span> }
    }
    return <span key={i}>{part}</span>
  })
}

const CAT_COLORS = { definition: '#4a9eff', theorem: '#f0b429', formula: '#00e676', concept: '#b388ff', postulate: '#00d4ff' }

export default function FlashcardMode({ unitId }) {
  const cards = unitId ? getFlashcardsForUnit(unitId) : getAllFlashcards()
  const [order, setOrder] = useState(() => cards.map((_, i) => i))
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [scores, setScores] = useState({}) // 'again' | 'good' | 'easy'

  useEffect(() => {
    const newCards = unitId ? getFlashcardsForUnit(unitId) : getAllFlashcards()
    setOrder(newCards.map((_, i) => i))
    setIdx(0); setFlipped(false); setScores({})
  }, [unitId])

  if (!cards.length) return <div className="fc-empty">No flashcards for this unit yet.</div>

  const cardIdx = order[idx % order.length]
  const card = cards[cardIdx]
  const progress = Object.keys(scores).length
  const color = CAT_COLORS[card.category] || '#4a9eff'

  const rate = (score) => {
    setScores(s => ({ ...s, [card.id]: score }))
    setFlipped(false)
    // Move 'again' cards to end of queue
    if (score === 'again') {
      setOrder(o => [...o, cardIdx])
    }
    setIdx(i => i + 1)
  }

  const reset = () => { setOrder(cards.map((_, i) => i)); setIdx(0); setFlipped(false); setScores({}) }

  const done = idx >= order.length

  return (
    <div className="flashcard-mode">
      <div className="fc-header">
        <div className="fc-progress">
          <div className="fc-progress-bar" style={{ width: `${(progress / cards.length) * 100}%` }} />
        </div>
        <div className="fc-stats">
          <span className="fc-stat good">✓ {Object.values(scores).filter(s => s !== 'again').length}</span>
          <span className="fc-stat again">↺ {Object.values(scores).filter(s => s === 'again').length}</span>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{progress}/{cards.length}</span>
          <button className="reset-btn" onClick={reset}>Reset</button>
        </div>
      </div>

      {done ? (
        <div className="fc-done">
          <div className="fc-done-icon">✓</div>
          <h2>Deck complete!</h2>
          <p>{cards.length} cards reviewed</p>
          <button className="reset-btn-lg" onClick={reset}>Study again</button>
        </div>
      ) : (
        <>
          <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
            <div className="fc-inner">
              <div className="fc-front">
                <div className="fc-cat-badge" style={{ background: color + '22', color, border: `1px solid ${color}44` }}>
                  {card.category}
                </div>
                <div className="fc-question">{parseInline(card.front)}</div>
                <div className="fc-flip-hint">tap to reveal</div>
              </div>
              <div className="fc-back">
                <div className="fc-answer">{parseInline(card.back)}</div>
              </div>
            </div>
          </div>

          {flipped && (
            <div className="fc-actions">
              <button className="fc-btn again" onClick={() => rate('again')}>Again</button>
              <button className="fc-btn good" onClick={() => rate('good')}>Good</button>
              <button className="fc-btn easy" onClick={() => rate('easy')}>Easy</button>
            </div>
          )}

          {!flipped && (
            <div className="fc-remaining">{order.length - idx} remaining</div>
          )}
        </>
      )}
    </div>
  )
}
