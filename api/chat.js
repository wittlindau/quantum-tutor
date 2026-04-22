export const config = { runtime: 'edge' }
export const maxDuration = 60

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

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  let messages, context
  try {
    ;({ messages, context } = await req.json())
    if (!Array.isArray(messages)) throw new Error()
  } catch {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const system = context
    ? `${SYSTEM_PROMPT}\n\nThe student is currently studying: ${context}`
    : SYSTEM_PROMPT

  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system,
      messages,
    }),
  })

  const data = await anthropicRes.json()

  if (!anthropicRes.ok) {
    const msg = anthropicRes.status === 401
      ? 'Invalid API key'
      : (data.error?.message || `Anthropic error ${anthropicRes.status}`)
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ text: data.content?.[0]?.text ?? '' }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
