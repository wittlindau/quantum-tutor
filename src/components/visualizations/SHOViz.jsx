import { useEffect, useRef, useState } from 'react'

const W = 600, H = 300, PAD = 40

function hermite(n, x) {
  if (n === 0) return 1
  if (n === 1) return 2 * x
  let h0 = 1, h1 = 2 * x
  for (let k = 2; k <= n; k++) {
    const h2 = 2 * x * h1 - 2 * (k - 1) * h0
    h0 = h1; h1 = h2
  }
  return h1
}

function factorial(n) {
  let f = 1; for (let i = 2; i <= n; i++) f *= i; return f
}

function psiSHO(n, x) {
  const Nn = Math.pow(2, -n / 2) / Math.sqrt(factorial(n)) * Math.pow(Math.PI, -0.25)
  return Nn * Math.exp(-x * x / 2) * hermite(n, x)
}

export default function SHOViz() {
  const canvasRef = useRef()
  const [n, setN] = useState(0)
  const [showPotential, setShowPotential] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#0d1225'
    ctx.fillRect(0, 0, W, H)

    const xMin = -4, xMax = 4
    const nPts = 600
    const xs = Array.from({ length: nPts }, (_, i) => xMin + (i / (nPts - 1)) * (xMax - xMin))
    const psi = xs.map(x => psiSHO(n, x))
    const En = n + 0.5

    // Convert coords
    const xRange = xMax - xMin
    const yRange = 1.4
    const toC = (x, y) => [
      PAD + ((x - xMin) / xRange) * (W - 2 * PAD),
      H / 2 - (y / yRange) * (H / 2 - PAD),
    ]

    // Grid
    ctx.strokeStyle = '#1a2842'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(PAD, H / 2); ctx.lineTo(W - PAD, H / 2); ctx.stroke()

    // Potential V = x²/2 (scaled)
    if (showPotential) {
      ctx.strokeStyle = 'rgba(74,158,255,0.25)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      for (let i = 0; i < xs.length; i++) {
        const v = xs[i] * xs[i] / 2 * 0.35
        const [cx, cy] = toC(xs[i], v - 0.5)
        if (i === 0) ctx.moveTo(cx, cy)
        else ctx.lineTo(cx, cy)
      }
      ctx.stroke()
    }

    // Energy level
    const [e0x, e0y] = toC(xMin + 0.1, En * 0.35 - 0.5)
    const [e1x] = toC(xMax - 0.1, 0)
    ctx.strokeStyle = 'rgba(240,180,41,0.25)'
    ctx.setLineDash([4, 4])
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(e0x, e0y); ctx.lineTo(e1x, e0y); ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = 'rgba(240,180,41,0.6)'
    ctx.font = '11px ui-monospace, monospace'
    ctx.fillText(`E${n} = ${En}ℏω`, e0x - 2, e0y - 4)

    // Wavefunction
    const offset = En * 0.35 - 0.5
    ctx.strokeStyle = '#4a9eff'
    ctx.lineWidth = 2.5
    ctx.shadowColor = '#4a9eff'
    ctx.shadowBlur = 8
    ctx.beginPath()
    for (let i = 0; i < xs.length; i++) {
      const [cx, cy] = toC(xs[i], psi[i] * 0.5 + offset)
      if (i === 0) ctx.moveTo(cx, cy)
      else ctx.lineTo(cx, cy)
    }
    ctx.stroke()
    ctx.shadowBlur = 0

    // |ψ|² fill
    ctx.fillStyle = 'rgba(74,158,255,0.07)'
    ctx.beginPath()
    const [sx0, sy0] = toC(xs[0], offset)
    ctx.moveTo(sx0, sy0)
    for (let i = 0; i < xs.length; i++) {
      const [cx, cy] = toC(xs[i], psi[i] * 0.5 + offset)
      ctx.lineTo(cx, cy)
    }
    const [sxN, syN] = toC(xs[xs.length - 1], offset)
    ctx.lineTo(sxN, syN)
    ctx.closePath()
    ctx.fill()

    // Axis labels
    ctx.fillStyle = '#7d97be'
    ctx.font = '12px ui-monospace, monospace'
    ctx.fillText('x', W - PAD + 6, H / 2 + 4)
    ctx.fillText('n=' + n, PAD, PAD + 12)
  }, [n, showPotential])

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ color: '#7d97be', fontSize: '0.85rem' }}>SHO Energy Eigenstates</span>
        <label style={{ color: '#e2e8f0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          n =
          <input type="range" min={0} max={7} value={n}
            onChange={e => setN(Number(e.target.value))}
            style={{ accentColor: '#f0b429', width: 100 }} />
          <span style={{ color: '#f0b429', fontFamily: 'monospace', minWidth: 12 }}>{n}</span>
        </label>
        <label style={{ color: '#e2e8f0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={showPotential}
            onChange={e => setShowPotential(e.target.checked)}
            style={{ accentColor: '#4a9eff' }} />
          V(x)
        </label>
      </div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 8 }} />
    </div>
  )
}
