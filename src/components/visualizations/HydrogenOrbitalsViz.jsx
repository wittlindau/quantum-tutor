import { useEffect, useRef, useState } from 'react'

const W = 400, H = 400

// Radial wavefunction R_nl (simplified, in units of a0)
function laguerre(n, alpha, x) {
  if (n === 0) return 1
  if (n === 1) return 1 + alpha - x
  let L0 = 1, L1 = 1 + alpha - x
  for (let k = 2; k <= n; k++) {
    const L2 = ((2 * k - 1 + alpha - x) * L1 - (k - 1 + alpha) * L0) / k
    L0 = L1; L1 = L2
  }
  return L1
}

function factorial(n) {
  let f = 1; for (let i = 2; i <= n; i++) f *= i; return f
}

function R_nl(n, l, r) {
  const rho = (2 * r) / n
  const norm = Math.sqrt(
    (2 / n) ** 3 * factorial(n - l - 1) / (2 * n * Math.pow(factorial(n + l), 3))
  )
  return norm * Math.exp(-rho / 2) * Math.pow(rho, l) * laguerre(n - l - 1, 2 * l + 1, rho)
}

// Spherical harmonic |Y_lm|² (phi-integrated)
function Y2_lm(l, m, cosTheta) {
  const sinTheta = Math.sqrt(Math.max(0, 1 - cosTheta * cosTheta))
  if (l === 0) return 1 / (4 * Math.PI)
  if (l === 1 && m === 0) return (3 / (4 * Math.PI)) * cosTheta * cosTheta
  if (l === 1 && Math.abs(m) === 1) return (3 / (8 * Math.PI)) * sinTheta * sinTheta
  if (l === 2 && m === 0) return (5 / (16 * Math.PI)) * (3 * cosTheta * cosTheta - 1) ** 2
  if (l === 2 && Math.abs(m) === 1) return (15 / (8 * Math.PI)) * cosTheta * cosTheta * sinTheta * sinTheta
  if (l === 2 && Math.abs(m) === 2) return (15 / (32 * Math.PI)) * sinTheta ** 4
  return 1 / (4 * Math.PI)
}

const ORBITALS = [
  { n: 1, l: 0, m: 0, label: '1s' },
  { n: 2, l: 0, m: 0, label: '2s' },
  { n: 2, l: 1, m: 0, label: '2p₀' },
  { n: 2, l: 1, m: 1, label: '2p±1' },
  { n: 3, l: 0, m: 0, label: '3s' },
  { n: 3, l: 1, m: 0, label: '3p₀' },
  { n: 3, l: 2, m: 0, label: '3d₀' },
  { n: 3, l: 2, m: 2, label: '3d±2' },
]

export default function HydrogenOrbitalsViz() {
  const canvasRef = useRef()
  const [orbIdx, setOrbIdx] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const { n, l, m } = ORBITALS[orbIdx]
    const imageData = ctx.createImageData(W, H)
    const data = imageData.data

    const scale = n * n * 4.5
    let maxVal = 0
    const vals = new Float32Array(W * H)

    for (let py = 0; py < H; py++) {
      for (let px = 0; px < W; px++) {
        const x = ((px - W / 2) / (W / 2)) * scale
        const z = ((H / 2 - py) / (H / 2)) * scale
        const r = Math.sqrt(x * x + z * z)
        const cosTheta = r > 0 ? z / r : 1
        if (r === 0) { vals[py * W + px] = 0; continue }
        const Rnl = R_nl(n, l, r)
        const Y2 = Y2_lm(l, m, cosTheta)
        const psi2 = Rnl * Rnl * Y2
        vals[py * W + px] = psi2
        if (psi2 > maxVal) maxVal = psi2
      }
    }

    if (maxVal === 0) maxVal = 1

    for (let i = 0; i < W * H; i++) {
      const t = Math.min(1, vals[i] / maxVal)
      const bright = Math.pow(t, 0.35)
      const idx = i * 4
      // Gold-to-blue gradient based on intensity
      const r = Math.round(bright * 240 + (1 - bright) * 13)
      const g = Math.round(bright * 180 + (1 - bright) * 18)
      const b = Math.round(bright * 80 + (1 - bright) * 37)
      data[idx] = r; data[idx + 1] = g; data[idx + 2] = b
      data[idx + 3] = Math.round(bright * 255 + (1 - bright) * 255)
    }

    ctx.putImageData(imageData, 0, 0)

    // Labels
    ctx.fillStyle = 'rgba(240,180,41,0.9)'
    ctx.font = 'bold 16px ui-monospace, monospace'
    ctx.fillText(ORBITALS[orbIdx].label, 12, 28)
    ctx.fillStyle = 'rgba(125,151,190,0.8)'
    ctx.font = '11px ui-monospace, monospace'
    ctx.fillText(`n=${n} l=${l} m=${m}   E=${(-13.6 / (n * n)).toFixed(2)} eV`, 12, 46)
  }, [orbIdx])

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ color: '#7d97be', fontSize: '0.85rem' }}>Hydrogen |ψ|² — cross section (xz plane)</span>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {ORBITALS.map((orb, i) => (
            <button key={i} onClick={() => setOrbIdx(i)}
              style={{
                background: orbIdx === i ? 'rgba(240,180,41,0.15)' : 'var(--bg-card)',
                border: `1px solid ${orbIdx === i ? '#f0b429' : '#1a2842'}`,
                color: orbIdx === i ? '#f0b429' : '#7d97be',
                borderRadius: 5, padding: '0.2em 0.6em', cursor: 'pointer',
                fontSize: '0.8rem', fontFamily: 'monospace',
              }}>
              {orb.label}
            </button>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} width={W} height={H} style={{ width: 340, height: 340, borderRadius: 8 }} />
    </div>
  )
}
