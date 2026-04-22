import { useRef, useEffect, useState } from 'react'

const W = 620, H = 370
const LX0 = 24, LX1 = 210   // left panel x range
const RX0 = 230, RX1 = W-16  // right panel x range
const N_LEVELS = 8

// ISW: E_n = n²π², ψ_n(x) = √2 sin(nπx), x∈[0,1]
function iswE(n) { return n*n*Math.PI*Math.PI }
function iswPsi(n, x) { return Math.sqrt(2)*Math.sin(n*Math.PI*x) }

// SHO: E_n = n+0.5, ψ_n(x) via Hermite, x dimensionless
function hermite(n, x) {
  if (n===0) return 1
  if (n===1) return 2*x
  let h0=1, h1=2*x
  for (let k=2; k<=n; k++) { const h2=2*x*h1-2*(k-1)*h0; h0=h1; h1=h2 }
  return h1
}
// SHO wavefunction (unnormalized, Gaussian × Hermite)
function shoPsiRaw(n, x) { return Math.exp(-x*x/2)*hermite(n,x) }
// Numerically normalize over [-4,4]
const SHO_NORMS = Array.from({length:N_LEVELS}, (_,n) => {
  const M=400; let s=0
  for (let i=0; i<=M; i++) { const x=-4+8*i/M; s+=shoPsiRaw(n,x)**2*(8/M) }
  return Math.sqrt(s)
})
function shoPsi(n, x) { return shoPsiRaw(n,x)/SHO_NORMS[n] }

export default function EnergyLevelViz() {
  const canvasRef = useRef()
  const [mode, setMode] = useState('isw')  // 'isw' | 'sho'
  const [selected, setSelected] = useState(1)  // 1-indexed for ISW, 0-indexed for SHO
  const levelYs = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#0d1225'
    ctx.fillRect(0, 0, W, H)

    const NLEVELS = mode==='isw' ? N_LEVELS : N_LEVELS  // both 8

    // ── LEFT PANEL: potential + levels ───────────────────────────
    const LY_BOTTOM = H-30, LY_TOP = 24
    const LH = LY_BOTTOM - LY_TOP
    const maxE = mode==='isw' ? iswE(NLEVELS)*1.05 : NLEVELS+0.3
    const eToY = e => LY_BOTTOM - (e/maxE)*LH

    // Background
    ctx.fillStyle = 'rgba(255,255,255,0.02)'
    ctx.fillRect(LX0, LY_TOP, LX1-LX0, LH)

    // Draw potential
    if (mode==='isw') {
      // Infinite square well: walls at x=LX0+20 and LX1-10
      const wx0=LX0+22, wx1=LX1-12
      ctx.strokeStyle='rgba(74,158,255,0.6)'; ctx.lineWidth=2.5
      ctx.beginPath()
      ctx.moveTo(wx0, LY_TOP); ctx.lineTo(wx0, LY_BOTTOM)
      ctx.lineTo(wx1, LY_BOTTOM); ctx.lineTo(wx1, LY_TOP)
      ctx.stroke()
      ctx.strokeStyle='rgba(74,158,255,0.2)'; ctx.lineWidth=1
      ctx.beginPath(); ctx.moveTo(wx0, LY_BOTTOM); ctx.lineTo(LX0, LY_BOTTOM); ctx.stroke()
    } else {
      // SHO parabola: V(x)=x²/2
      const xw = LX1-LX0-30, xc = (LX0+LX1)/2
      ctx.strokeStyle='rgba(74,158,255,0.5)'; ctx.lineWidth=1.5
      ctx.beginPath()
      let first=true
      for (let i=0; i<=80; i++) {
        const x = -3.5 + 7*i/80
        const V = x*x/2
        if (V > maxE) continue
        const px = xc + x*(xw/2)/3.5
        const ey = eToY(V)
        first ? (ctx.moveTo(px,ey), first=false) : ctx.lineTo(px,ey)
      }
      ctx.stroke()
    }

    // Draw energy levels + collect y positions
    levelYs.current = []
    for (let n=1; n<=NLEVELS; n++) {
      const idx = mode==='sho' ? n-1 : n
      const E = mode==='isw' ? iswE(n) : idx+0.5
      const y = eToY(E)
      if (y < LY_TOP || y > LY_BOTTOM) { levelYs.current.push(-1); continue }
      levelYs.current.push(y)
      const isSelected = n===selected
      ctx.strokeStyle = isSelected ? '#f0b429' : 'rgba(255,255,255,0.35)'
      ctx.lineWidth = isSelected ? 2.5 : 1.2
      if (isSelected) { ctx.shadowColor='#f0b429'; ctx.shadowBlur=8 }
      ctx.beginPath()
      ctx.moveTo(LX0+24, y); ctx.lineTo(LX1-14, y)
      ctx.stroke(); ctx.shadowBlur=0
      ctx.fillStyle = isSelected ? '#f0b429' : 'rgba(255,255,255,0.4)'
      ctx.font = `${isSelected?'bold ':''} 10px ui-monospace, monospace`
      const label = mode==='isw' ? `n=${n}` : `n=${n-1}`
      ctx.fillText(label, LX0+2, y+4)
      // Energy label on right
      const Estr = mode==='isw' ? `${n}²π²` : `${(idx+0.5).toFixed(1)}`
      ctx.fillStyle='rgba(255,255,255,0.25)'; ctx.font='9px ui-monospace, monospace'
      ctx.fillText(Estr, LX1-8, y+4)
    }

    // Axis label
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font='10px ui-monospace, monospace'
    ctx.save(); ctx.translate(LX0+8, (LY_TOP+LY_BOTTOM)/2); ctx.rotate(-Math.PI/2)
    ctx.fillText('Energy', -20, 0); ctx.restore()
    ctx.fillText(mode==='isw' ? 'Infinite Square Well' : 'Harmonic Oscillator',
      LX0+2, LY_TOP-6)

    // ── RIGHT PANEL: wavefunction ─────────────────────────────────
    ctx.fillStyle='rgba(255,255,255,0.02)'
    ctx.fillRect(RX0, 0, RX1-RX0, H)

    const RY_MID = H/2
    const RW = RX1-RX0
    const PSCALE = 110

    // Potential line
    ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=1
    ctx.beginPath(); ctx.moveTo(RX0, RY_MID); ctx.lineTo(RX1, RY_MID); ctx.stroke()

    // Wavefunction
    const n = selected
    const NPTS = 400
    const color = `hsl(${180+n*20},80%,65%)`

    // ψ_n
    ctx.strokeStyle=color; ctx.lineWidth=2.5; ctx.shadowColor=color; ctx.shadowBlur=8
    ctx.beginPath()
    let first=true
    for (let i=0; i<=NPTS; i++) {
      const frac = i/NPTS
      let x, psi
      if (mode==='isw') {
        x = frac
        psi = iswPsi(n, x)
        // map x∈[0,1] to canvas
      } else {
        x = -4 + 8*frac
        psi = shoPsi(n-1, x)
      }
      const cx = RX0 + frac*RW
      const cy = RY_MID - psi*PSCALE
      first ? (ctx.moveTo(cx,cy), first=false) : ctx.lineTo(cx,cy)
    }
    ctx.stroke(); ctx.shadowBlur=0

    // |ψ|² shaded
    ctx.beginPath(); first=true
    for (let i=0; i<=NPTS; i++) {
      const frac=i/NPTS
      let x, psi
      if (mode==='isw') { x=frac; psi=iswPsi(n,x) }
      else { x=-4+8*frac; psi=shoPsi(n-1,x) }
      const cx=RX0+frac*RW
      const prob=psi*psi
      const cy=RY_MID - prob*PSCALE*0.5
      first ? (ctx.moveTo(cx,cy), first=false) : ctx.lineTo(cx,cy)
    }
    ctx.lineTo(RX1, RY_MID); ctx.lineTo(RX0, RY_MID); ctx.closePath()
    ctx.fillStyle=`${color}18`; ctx.fill()

    // Classical turning points for SHO
    if (mode==='sho') {
      const E = (n-1)+0.5
      const xtp = Math.sqrt(2*E)
      for (const xt of [-xtp, xtp]) {
        const cx = RX0 + (xt+4)/8*RW
        if (cx>RX0 && cx<RX1) {
          ctx.strokeStyle='rgba(255,82,82,0.4)'; ctx.lineWidth=1; ctx.setLineDash([4,3])
          ctx.beginPath(); ctx.moveTo(cx,24); ctx.lineTo(cx,H-24); ctx.stroke()
          ctx.setLineDash([])
          ctx.fillStyle='rgba(255,82,82,0.5)'; ctx.font='10px ui-monospace, monospace'
          ctx.fillText('xₜₚ', cx+2, RY_MID+14)
        }
      }
    }

    // Labels
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='11px ui-monospace, monospace'
    const nLabel = mode==='isw' ? `n = ${n}` : `n = ${n-1}`
    const ELabel = mode==='isw' ? `E = ${n}²π²ℏ²/2mL²` : `E = (${n-1}+½)ℏω`
    ctx.fillText(nLabel, RX0+8, 18)
    ctx.fillStyle=color; ctx.font='11px ui-monospace, monospace'
    ctx.fillText(ELabel, RX0+8, 32)
    ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.font='10px ui-monospace, monospace'
    ctx.fillText('ψₙ(x)', RX0+8, 48)
    ctx.fillText('|ψₙ|² (probability density)', RX0+8, H-10)

  }, [mode, selected])

  // Click to select level
  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const cy = e.clientY - rect.top
    if (e.clientX - rect.left > LX1) return  // only in left panel
    let best=-1, bestD=20
    levelYs.current.forEach((y,i) => {
      if (y<0) return
      const d=Math.abs(cy-y)
      if (d<bestD) { bestD=d; best=i+1 }
    })
    if (best>0) setSelected(best)
  }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
        <div style={{ color: '#7d97be', fontSize: '0.83rem' }}>
          Click an energy level to see its wavefunction
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['isw','sho'].map(m => (
            <button key={m} onClick={() => { setMode(m); setSelected(1) }}
              style={{ background: mode===m ? 'rgba(74,158,255,0.2)' : 'none',
                border: `1px solid ${mode===m?'#4a9eff':'rgba(255,255,255,0.15)'}`,
                borderRadius: 4, padding: '2px 10px', color: mode===m?'#4a9eff':'#7d97be',
                cursor: 'pointer', fontSize: '0.78rem' }}>
              {m==='isw'?'Infinite Well':'Harmonic Osc.'}
            </button>
          ))}
        </div>
      </div>
      <canvas ref={canvasRef} width={W} height={H}
        style={{ borderRadius: 8, display: 'block', cursor: 'pointer' }}
        onClick={handleClick} />
    </div>
  )
}
