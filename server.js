import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const client = new Anthropic()  // reads ANTHROPIC_API_KEY from env

const SYSTEM_PROMPT = `You are a quantum mechanics teaching assistant for PHYS 50 (Introductory Quantum Mechanics) at Dartmouth College. Your role is to help students understand quantum mechanics clearly and rigorously.

Primary text: Shankar "Principles of Quantum Mechanics" (2nd ed.)
Secondary text: McIntyre "Quantum Mechanics: A Paradigms Approach"

Course topics: Classical mechanics review & Wilson-Sommerfeld quantization, mathematical formalism (Dirac notation, Hilbert spaces, operators), postulates of QM (Born rule, Schrödinger equation), 1D potentials (ISW, finite well, tunneling, delta function), time dependence (evolution operator, Heisenberg picture, Ehrenfest's theorem, uncertainty principle), Frobenius-Fuchs method, simple harmonic oscillator (analytic and algebraic), 3D QM and hydrogen atom (angular momentum, spherical harmonics), angular momentum theory (spin, rotations, addition, Clebsch-Gordan), path integrals, and relativistic QM (Klein-Gordon, Dirac equation).

When writing mathematics, always use LaTeX. Use $...$ for inline math and $$...$$ on its own line for display equations.

Guidelines:
- Be rigorous but pedagogical — derive results step by step when helpful
- When a student seems confused, offer physical intuition or a concrete example
- Reference Shankar chapters when relevant
- Keep answers focused; don't write walls of text unless asked for a full derivation
- If a question is outside quantum mechanics, gently redirect to the course material`

app.post('/api/chat', async (req, res) => {
  const { messages, context } = req.body

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' })
  }

  const system = context
    ? `${SYSTEM_PROMPT}\n\nThe student is currently studying: ${context}`
    : SYSTEM_PROMPT

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  try {
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      system,
      messages,
    })

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        res.write(`data: ${JSON.stringify({ text: chunk.delta.text })}\n\n`)
      }
    }

    res.write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    const msg = err.status === 401
      ? 'Invalid API key. Check your ANTHROPIC_API_KEY in .env'
      : err.message
    res.write(`data: ${JSON.stringify({ error: msg })}\n\n`)
    res.end()
  }
})

const PORT = 3001
app.listen(PORT, () => console.log(`[quantum-tutor api] listening on :${PORT}`))
