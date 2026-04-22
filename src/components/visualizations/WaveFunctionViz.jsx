import { useEffect, useRef, useState } from 'react'

const W = 600, H = 300
const PADDING = 40

function computeWavefunction(n, L, nPoints = 500) {
  const xs = []
  const psi = []
  const psi2 = []
  for (let i = 0; i <= nPoints; i++) {
    const x = (i / nPoints) * L
    xs.push(x)
    const y = Math.sqrt(2 / L) * Math.sin((n * Math.PI * x) / L)
    psi.push(y)
    psi2.push(y * y)
  }
  return { xs, psi, psi2 }
}

function toCanvas(x, y, xMax, yRange, w, h) {
  const cx = PADDING + (x / xMax) * (w - 2 * PADDING)
  const cy = h / 2 - (y / yRange) * (h / 2 - PADDING)
  return [cx, cy]
}

export default function WaveFunctionViz() {
  const canvasRef = useRef()
  const [n, setN] = useState(1)
  const [showPsi2, setShowPsi2] = useState(false)
  const L = 1

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { xs, psi, psi2 } = computeWavefunction(n, L)
    const data = showPsi2 ? psi2 : psi
    const yMax = Math.max(...data.map(Math.abs)) * 1.3

    ctx.clearRect(0, 0, W, H)

    // Background
    ctx.fillStyle = '#0d1225'
    ctx.fillRect(0, 0, W, H)

    // Grid lines
    ctx.strokeStyle = '#1a2842'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(PADDING, H / 2)
    ctx.lineTo(W - PADDING, H / 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(PADDING, PADDING)
    ctx.lineTo(PADDING, H - PADDING)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(W - PADDING, PADDING)
    ctx.lineTo(W - PADDING, H - PADDING)
    ctx.stroke()

    // Energy level line
    const En = (n * n * Math.PI * Math.PI) / 2
    const Emax = (6 * 6 * Math.PI * Math.PI) / 2
    const eyCanvas = PADDING + (1 - En / Emax) * (H - 2 * PADDING) * 0.4 + PADDING * 0.5
    ctx.strokeStyle = 'rgba(240,180,41,0.2)'
    ctx.setLineDash([4, 4])
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(PADDING, eyCanvas)
    ctx.lineTo(W - PADDING, eyCanvas)
    ctx.stroke()
    ctx.setLineDash([])

    // Wavefunction
    const color = showPsi2 ? '#00e676' : '#4a9eff'
    ctx.strokeStyle = color
    ctx.lineWidth = 2.5
    ctx.shadowColor = color
    ctx.shadowBlur = 8
    ctx.beginPath()
    for (let i = 0; i < xs.length; i++) {
      const [cx, cy] = toCanvas(xs[i], data[i], L, yMax, W, H)
      if (i === 0) ctx.moveTo(cx, cy)
      else ctx.lineTo(cx, cy)
    }
    ctx.stroke()
    ctx.shadowBlur = 0

    // Fill under |ψ|²
    if (showPsi2) {
      ctx.fillStyle = 'rgba(0,230,118,0.08)'
      ctx.beginPath()
      const [cx0, cy0] = toCanvas(xs[0], 0, L, yMax, W, H)
      ctx.moveTo(cx0, cy0)
      for (let i = 0; i < xs.length; i++) {
        const [cx, cy] = toCanvas(xs[i], data[i], L, yMax, W, H)
        ctx.lineTo(cx, cy)
      }
      const [cxN, cyN] = toCanvas(xs[xs.length - 1], 0, L, yMax, W, H)
      ctx.lineTo(cxN, cyN)
      ctx.closePath()
      ctx.fill()
    }

    // Labels
    ctx.fillStyle = '#7d97be'
    ctx.font = '13px ui-monospace, monospace'
    ctx.fillText('x=0', PADDING - 14, H - 16)
    ctx.fillText('x=L', W - PADDING - 14, H - 16)
    ctx.fillStyle = '#f0b429'
    ctx.font = 'bold 13px ui-monospace, monospace'
    const label = showPsi2 ? `|ψ${n}(x)|²` : `ψ${n}(x)`
    ctx.fillText(label, PADDING + 8, PADDING + 16)
    const En_label = `E${n} = ${n}²π²ℏ²/2mL²`
    ctx.fillStyle = 'rgba(240,180,41,0.6)'
    ctx.font = '11px ui-monospace, monospace'
    ctx.fillText(En_label, W / 2 - 70, PADDING + 16)
  }, [n, showPsi2])

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ color: '#7d97be', fontSize: '0.85rem' }}>Infinite Square Well</span>
        <label style={{ color: '#e2e8f0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          n =
          <input
            type="range" min={1} max={6} value={n}
            onChange={e => setN(Number(e.target.value))}
            style={{ accentColor: '#f0b429', width: 100 }}
          />
          <span style={{ color: '#f0b429', fontFamily: 'monospace', minWidth: 16 }}>{n}</span>
        </label>
        <label style={{ color: '#e2e8f0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
          <input
            type="checkbox" checked={showPsi2}
            onChange={e => setShowPsi2(e.target.checked)}
            style={{ accentColor: '#00e676' }}
          />
          Show |ψ|²
        </label>
      </div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 8 }} />
    </div>
  )
}
