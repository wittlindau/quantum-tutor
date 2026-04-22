import { useEffect, useRef, useState } from 'react'

const W = 580, H = 240

function gaussian(x, sigma) {
  return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * (x / sigma) ** 2)
}

function drawPanel(ctx, offsetX, panelW, H, PAD, label, sigma, xRange, color, hexColor) {
  const nPts = 300
  const xs = Array.from({ length: nPts }, (_, i) => -xRange / 2 + (i / (nPts - 1)) * xRange)
  const ys = xs.map(x => gaussian(x, sigma))
  const yMax = ys[Math.floor(nPts / 2)] * 1.15

  const toC = (x, y) => [
    offsetX + PAD + ((x + xRange / 2) / xRange) * (panelW - 2 * PAD),
    H - PAD - (y / yMax) * (H - 2 * PAD),
  ]

  // Baseline
  ctx.strokeStyle = '#243a5e'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(offsetX + PAD, H - PAD)
  ctx.lineTo(offsetX + panelW - PAD, H - PAD)
  ctx.stroke()

  // Center tick
  const [cx, cy] = toC(0, 0)
  ctx.strokeStyle = '#243a5e'
  ctx.beginPath(); ctx.moveTo(cx, H - PAD + 3); ctx.lineTo(cx, H - PAD - 3); ctx.stroke()

  // Fill
  ctx.fillStyle = hexColor + '14'
  ctx.beginPath()
  const [sx0] = toC(-xRange / 2, 0)
  ctx.moveTo(sx0, H - PAD)
  for (let i = 0; i < xs.length; i++) {
    const [fx, fy] = toC(xs[i], ys[i])
    ctx.lineTo(fx, fy)
  }
  const [sxN] = toC(xRange / 2, 0)
  ctx.lineTo(sxN, H - PAD)
  ctx.closePath()
  ctx.fill()

  // Curve
  ctx.strokeStyle = hexColor
  ctx.lineWidth = 2
  ctx.shadowColor = hexColor
  ctx.shadowBlur = 6
  ctx.beginPath()
  for (let i = 0; i < xs.length; i++) {
    const [fx, fy] = toC(xs[i], ys[i])
    if (i === 0) ctx.moveTo(fx, fy); else ctx.lineTo(fx, fy)
  }
  ctx.stroke()
  ctx.shadowBlur = 0

  // σ bracket
  const [sx_0] = toC(0, ys[Math.floor(nPts / 2)] / 2)
  const [sx_s] = toC(sigma, ys[Math.floor(nPts / 2)] / 2)
  const bracketY = H - PAD - ((ys[Math.floor(nPts / 2)] / 2) / yMax) * (H - 2 * PAD)
  ctx.strokeStyle = hexColor
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(sx_0, bracketY); ctx.lineTo(sx_s, bracketY); ctx.stroke()
  // tick marks
  ctx.beginPath()
  ctx.moveTo(sx_0, bracketY - 4); ctx.lineTo(sx_0, bracketY + 4); ctx.stroke()
  ctx.moveTo(sx_s, bracketY - 4); ctx.lineTo(sx_s, bracketY + 4); ctx.stroke()

  // σ label
  ctx.fillStyle = hexColor
  ctx.font = '11px ui-monospace, monospace'
  ctx.fillText(`σ = ${sigma.toFixed(2)}`, sx_s + 5, bracketY + 4)

  // Panel label
  ctx.font = 'bold 12px ui-monospace, monospace'
  ctx.fillStyle = hexColor
  ctx.fillText(label, offsetX + PAD + 4, 16)
}

export default function UncertaintyViz() {
  const canvasRef = useRef()
  const [sigmaX, setSigmaX] = useState(0.6)

  const sigmaP = 1 / (2 * sigmaX)
  const product = sigmaX * sigmaP

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#0d1225'
    ctx.fillRect(0, 0, W, H)

    const PAD = 32
    const half = W / 2 - 4
    const xRangeX = Math.max(3, sigmaX * 7)
    const xRangeP = Math.max(3, sigmaP * 7)

    drawPanel(ctx, 0, half, H, PAD, 'ψ(x)  position', sigmaX, xRangeX, 'var(--blue)', '#4a9eff')
    drawPanel(ctx, half + 8, half, H, PAD, 'φ(p)  momentum', sigmaP, xRangeP, 'var(--green)', '#00e676')

    // Divider
    ctx.strokeStyle = '#1a2842'
    ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(half + 4, 0); ctx.lineTo(half + 4, H); ctx.stroke()

    // Product label at top
    const isMin = Math.abs(product - 0.5) < 0.02
    const prodColor = isMin ? '#f0b429' : product < 0.52 ? '#f0b429' : '#4a9eff'
    ctx.fillStyle = prodColor
    ctx.font = 'bold 12px ui-monospace, monospace'
    const prodText = `σ_x · σ_p = ${product.toFixed(3)} ${isMin ? '= ℏ/2  ← minimum uncertainty!' : '≥ ℏ/2 ✓'}`
    ctx.fillText(prodText, W / 2 - ctx.measureText(prodText).width / 2, H - 8)
  }, [sigmaX, sigmaP, product])

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ color: '#7d97be', fontSize: '0.85rem' }}>Heisenberg Uncertainty Principle</span>
        <label style={{ color: '#e2e8f0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          σ<sub>x</sub> =
          <input
            type="range" min={0.18} max={1.8} step={0.02} value={sigmaX}
            onChange={e => setSigmaX(Number(e.target.value))}
            style={{ accentColor: '#f0b429', width: 130 }}
          />
          <span style={{ color: '#f0b429', fontFamily: 'monospace', minWidth: 38, fontSize: '0.85rem' }}>
            {sigmaX.toFixed(2)}
          </span>
        </label>
        <span style={{ color: '#7d97be', fontSize: '0.8rem' }}>
          σ<sub>p</sub> = 1/(2σ<sub>x</sub>) = {sigmaP.toFixed(2)}
        </span>
      </div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: '100%', borderRadius: 8 }} />
    </div>
  )
}
