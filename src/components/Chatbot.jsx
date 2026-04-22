import { useState, useRef, useEffect, useCallback } from 'react'
import katex from 'katex'
import { UNITS } from '../data/units'
import './Chatbot.css'

// ── LaTeX / markdown renderer ────────────────────────────────────
function renderMath(tex, display) {
  try {
    return katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: false, trust: true })
  } catch {
    return tex
  }
}

function MessageContent({ text }) {
  const parts = []
  // Split on $$...$$ first (display blocks may span lines)
  const blocks = text.split(/(\$\$[\s\S]+?\$\$)/g)

  blocks.forEach((block, bi) => {
    if (block.startsWith('$$') && block.endsWith('$$')) {
      const tex = block.slice(2, -2).trim()
      parts.push(
        <div key={bi} className="chat-display-eq"
          dangerouslySetInnerHTML={{ __html: renderMath(tex, true) }} />
      )
      return
    }

    // Split into paragraphs, then handle inline math + markdown
    block.split(/\n\n+/).forEach((para, pi) => {
      if (!para.trim()) return
      const inlineParts = para.split(/(\$[^$\n]+?\$)/g)
      const rendered = inlineParts.map((p, i) => {
        if (i % 2 === 1) {
          return <span key={i} dangerouslySetInnerHTML={{ __html: renderMath(p.slice(1,-1), false) }} />
        }
        return p.split(/(\*\*[^*]+\*\*|\*(?!\*)[^*]+\*(?!\*))/g).map((sp, si) => {
          if (sp.startsWith('**') && sp.endsWith('**')) return <strong key={si}>{sp.slice(2,-2)}</strong>
          if (sp.startsWith('*') && sp.endsWith('*')) return <em key={si}>{sp.slice(1,-1)}</em>
          return sp.split('\n').map((line, li, arr) => (
            <span key={li}>{line}{li < arr.length - 1 ? <br /> : null}</span>
          ))
        })
      })
      parts.push(<p key={`${bi}-${pi}`} className="chat-para">{rendered}</p>)
    })
  })

  return <div className="chat-message-content">{parts}</div>
}

function Message({ msg }) {
  return (
    <div className={`chat-msg chat-msg-${msg.role}`}>
      {msg.role === 'assistant' && <div className="chat-avatar">ψ</div>}
      <div className="chat-bubble">
        <MessageContent text={msg.content} />
        {msg.streaming && <span className="chat-cursor" />}
        {msg.error && <div className="chat-error">{msg.error}</div>}
      </div>
    </div>
  )
}

// Context-aware suggested questions keyed by section prefix
const SUGGESTIONS = {
  'I':   ['What is the action functional?', 'How does Wilson-Sommerfeld quantization work?'],
  'II':  ['What is the resolution of identity?', 'Why must observables be Hermitian?'],
  'III': ['Explain the Born rule intuitively', 'What does wavefunction collapse mean?'],
  'IV':  ['Why is there zero-point energy in the ISW?', 'Derive the tunneling coefficient'],
  'V':   ['What is the Heisenberg picture?', "Prove Ehrenfest's theorem"],
  'VI':  ['How does the Frobenius method work?', 'Apply it to the SHO'],
  'VII': ['Derive the SHO spectrum algebraically', 'What is a coherent state?'],
  'VIII':['What are spherical harmonics?', 'Why is hydrogen energy independent of l?'],
  'IX':  ['How is spin different from orbital angular momentum?', 'What are CG coefficients?'],
  'X':   ['How does the path integral give classical mechanics?', 'Derive the free propagator'],
  'XI':  ['Why did Dirac need a 4-component spinor?', 'What predicts g = 2?'],
}

// ── Main chatbot ─────────────────────────────────────────────────
export default function Chatbot({ activeUnit, activeSection }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef()
  const inputRef = useRef()
  const abortRef = useRef()

  // Resolve human-readable context label
  const unitData = UNITS.find(u => u.id === activeUnit)
  const sectionData = unitData?.sections.find(s => s.id === activeSection)
  const contextLabel = [
    unitData && `${unitData.roman}. ${unitData.title}`,
    sectionData && sectionData.title,
  ].filter(Boolean).join(' › ')

  const suggestions = SUGGESTIONS[activeUnit] || SUGGESTIONS['III']

  const welcomeMsg = {
    role: 'assistant',
    content: `Hi! I'm your PHYS 50 tutor. Ask me anything — derivations, intuition, problem help, or concept clarification.\n\n${contextLabel ? `I see you're studying **${contextLabel}**. ` : ''}What would you like to work through?`,
  }

  useEffect(() => {
    if (open && messages.length === 0) setMessages([welcomeMsg])
  }, [open])

  // Reset welcome message when unit changes (only if chat is empty or just welcome)
  useEffect(() => {
    if (messages.length <= 1) setMessages([welcomeMsg])
  }, [activeUnit, activeSection])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Auto-resize textarea
  const handleInputChange = (e) => {
    setInput(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  const send = useCallback(async (overrideText) => {
    const text = (overrideText ?? input).trim()
    if (!text || loading) return
    setInput('')
    if (inputRef.current) { inputRef.current.style.height = 'auto' }

    const userMsg = { role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages([...history, { role: 'assistant', content: '', streaming: true }])
    setLoading(true)

    const apiMessages = history
      .filter(m => m.role === 'user' || (m.role === 'assistant' && m.content))
      .map(m => ({ role: m.role, content: m.content }))

    try {
      const controller = new AbortController()
      abortRef.current = controller

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, context: contextLabel }),
        signal: controller.signal,
      })

      if (!res.ok) throw new Error(`Server error ${res.status}`)

      const reader = res.body.getReader()
      const dec = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const lines = dec.decode(value).split('\n')
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') break
          try {
            const parsed = JSON.parse(data)
            if (parsed.error) throw new Error(parsed.error)
            if (parsed.text) {
              accumulated += parsed.text
              setMessages(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = { role: 'assistant', content: accumulated, streaming: true }
                return updated
              })
            }
          } catch (e) {
            if (!e.message.includes('JSON')) throw e
          }
        }
      }

      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content: accumulated, streaming: false }
        return updated
      })
    } catch (err) {
      if (err.name === 'AbortError') return
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant', content: '', streaming: false,
          error: err.message.includes('Failed to fetch') || err.message.includes('Server error')
            ? 'Cannot reach API server — make sure you ran `npm run dev` (not just `npm run dev:ui`) and added your key to .env'
            : err.message,
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }, [input, messages, loading, contextLabel])

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const clear = () => {
    abortRef.current?.abort()
    setMessages([welcomeMsg])
    setLoading(false)
    setInput('')
  }

  const showSuggestions = messages.length <= 1 && !loading

  return (
    <>
      <button
        className={`chat-fab ${open ? 'chat-fab-open' : ''}`}
        onClick={() => setOpen(v => !v)}
        title="Ask the AI tutor"
      >
        {open ? '×' : 'ψ'}
      </button>

      <div className={`chat-panel ${open ? 'chat-panel-open' : ''}`} aria-hidden={!open}>
        <div className="chat-header">
          <div className="chat-header-left">
            <span className="chat-header-icon">ψ</span>
            <div>
              <div className="chat-header-title">PHYS 50 Tutor</div>
              {contextLabel && <div className="chat-header-context">{contextLabel}</div>}
            </div>
          </div>
          <button className="chat-clear-btn" onClick={clear} title="New conversation">↺</button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => <Message key={i} msg={msg} />)}

          {showSuggestions && (
            <div className="chat-suggestions">
              {suggestions.map((s, i) => (
                <button key={i} className="chat-suggestion" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="chat-input-row">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKey}
            placeholder="Ask anything… (Enter to send, Shift+Enter for newline)"
            rows={1}
            disabled={loading}
          />
          <button
            className="chat-send-btn"
            onClick={() => send()}
            disabled={!input.trim() || loading}
          >
            {loading ? '…' : '↑'}
          </button>
        </div>
      </div>
    </>
  )
}
