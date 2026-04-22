import { useRef, useEffect, useState } from 'react'

const W = 660, H = 290

// Complex arithmetic
const cmul = (a,b) => [a[0]*b[0]-a[1]*b[1], a[0]*b[1]+a[1]*b[0]]
const cadd = (a,b) => [a[0]+b[0], a[1]+b[1]]
const cdiv = (a,b) => { const d=b[0]**2+b[1]**2; return [(a[0]*b[0]+a[1]*b[1])/d, (a[1]*b[0]-a[0]*b[1])/d] }
const cscale = (a,s) => [a[0]*s, a[1]*s]
const expI = (p) => [Math.cos(p), Math.sin(p)]
const cexp = (a) => { const r=Math.exp(a[0]); return [r*Math.cos(a[1]), r*Math.sin(a[1])] }
const ccosh = (z) => [Math.cosh(z[0])*Math.cos(z[1]), Math.sinh(z[0])*Math.sin(z[1])]
const csinh = (z) => [Math.sinh(z[0])*Math.cos(z[1]), Math.cosh(z[0])*Math.sin(z[1])]
const cabs2 = (a) => a[0]**2+a[1]**2

// hbar=1, 2m=1: k=sqrt(E), alpha=sqrt(|E-V0|) (real) or i*sqrt(E-V0) (imag)
function computeAmplitudes(E, V0, d) {
  const k = Math.sqrt(Math.max(E, 1e-8))
  const alpha = E < V0
    ? [Math.sqrt(V0 - E), 0]        // evanescent: real
    : [0, Math.sqrt(E - V0 + 1e-9)] // propagating: imaginary
  const alphad = cscale(alpha, d)
  const coshAd = ccosh(alphad)
  const sinhAd = csinh(alphad)
  const ak = cscale(alpha, 1/k)
  const ka = cdiv([k, 0], alpha)
  const diff = [ak[0]-ka[0], ak[1]-ka[1]]
  const iHalfDiff = [-diff[1]/2, diff[0]/2]
  const denom = cadd(coshAd, cmul(iHalfDiff, sinhAd))
  const t = cmul(expI(-k*d), cdiv([1,0], denom))
  const sumAkKa = [ak[0]+ka[0], ak[1]+ka[1]]
  const negIHalfSum = [sumAkKa[1]/2, -sumAkKa[0]/2]
  const r = cdiv(cmul(negIHalfSum, sinhAd), denom)
  const teikd = cmul(t, expI(k*d))
  const halfT = cscale(teikd, 0.5)
  const ika = cdiv([0, k], alpha)
  const A = cmul(cmul(halfT, cexp(cscale(alpha, -d))), cadd([1,0], ika))
  const B = cmul(cmul(halfT, cexp(alphad)), [1-ika[0], -ika[1]])
  return { k, alpha, t, r, A, B, T: cabs2(t), R: cabs2(r) }
}

function evalPsi(x, d, k, alpha, A, B, t, r) {
  if (x < 0) return cadd(expI(k*x), cmul(r, expI(-k*x)))
  if (x <= d) return cadd(cmul(A, cexp(cscale(alpha, x))), cmul(B, cexp(cscale(alpha, -x))))
  return cmul(t, expI(k*x))
}

const X_MIN = -5.5, X_MAX = 8.5, PAD = 32

export default function TunnelingViz() {
  const canvasRef = useRef()
  const animRef = useRef()
  const [EV, setEV] = useState(0.4)
  const [bw, setBw] = useState(2.0)
  const V0 = 1.0

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { k, alpha, t, r, A, B, T, R } = computeAmplitudes(EV * V0, V0, bw)
    const omega = EV * V0
    let raf, t0
    const SCALE = 52, Y_MID = 128, Y_POT = 218, POT_H = 42

    // Screen x coordinate
    const sx = x => PAD + (x - X_MIN) / (X_MAX - X_MIN) * (W - 2*PAD)
    const bx0 = sx(0), bx1 = sx(bw)

    function draw(ts) {
      if (!t0) t0 = ts
      const time = (ts - t0) * 0.0012

      ctx.fillStyle = '#0d1225'
      ctx.fillRect(0, 0, W, H)

      // Grid lines at y_mid
      ctx.strokeStyle = 'rgba(255,255,255,0.07)'
      ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(PAD, Y_MID); ctx.lineTo(W-PAD, Y_MID); ctx.stroke()

      // Barrier fill
      const barrierTop = Y_POT - POT_H
      ctx.fillStyle = 'rgba(255,171,64,0.10)'
      ctx.fillRect(bx0, barrierTop, bx1-bx0, POT_H)

      // Potential V(x) diagram
      ctx.strokeStyle = 'rgba(255,171,64,0.5)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(PAD, Y_POT)
      ctx.lineTo(bx0, Y_POT)
      ctx.lineTo(bx0, barrierTop)
      ctx.lineTo(bx1, barrierTop)
      ctx.lineTo(bx1, Y_POT)
      ctx.lineTo(W-PAD, Y_POT)
      ctx.stroke()

      // Energy dashed line
      const yE = Y_POT - EV * POT_H
      ctx.setLineDash([5,4])
      ctx.strokeStyle = 'rgba(0,212,255,0.45)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(PAD, yE); ctx.lineTo(bx0-2, yE)
      ctx.moveTo(bx1+2, yE); ctx.lineTo(W-PAD, yE)
      ctx.stroke()
      ctx.setLineDash([])

      // |ψ|² shaded
      const NX = 500
      ctx.beginPath()
      let f = true
      for (let i=0; i<=NX; i++) {
        const x = X_MIN + (X_MAX-X_MIN)*i/NX
        const psi = evalPsi(x, bw, k, alpha, A, B, t, r)
        const py = cabs2(psi)
        const sx_ = sx(x), sy_ = Y_MID - py*SCALE*0.75
        f ? (ctx.moveTo(sx_,sy_), f=false) : ctx.lineTo(sx_,sy_)
      }
      ctx.lineTo(W-PAD, Y_MID); ctx.lineTo(PAD, Y_MID); ctx.closePath()
      ctx.fillStyle = 'rgba(0,212,255,0.06)'
      ctx.fill()

      // Animated Re[ψ e^{-iωt}] — colored by region
      const drawSeg = (x0, x1, color, n) => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 2.4
        ctx.shadowColor = color
        ctx.shadowBlur = 5
        let first = true
        for (let i=0; i<=n; i++) {
          const x = x0 + (x1-x0)*i/n
          const psi = evalPsi(x, bw, k, alpha, A, B, t, r)
          const re = cmul(psi, expI(-omega*time))[0]
          const sx_ = sx(x), sy_ = Y_MID - re*SCALE
          first ? (ctx.moveTo(sx_,sy_), first=false) : ctx.lineTo(sx_,sy_)
        }
        ctx.stroke()
        ctx.shadowBlur = 0
      }
      drawSeg(X_MIN, -0.03, '#4a9eff', 200)
      drawSeg(0.01, bw-0.01, '#ffab40', 80)
      drawSeg(bw+0.03, X_MAX, '#00e676', 130)

      // Barrier edge lines
      ctx.setLineDash([3,3])
      ctx.strokeStyle = 'rgba(255,171,64,0.5)'
      ctx.lineWidth = 1
      for (const bx of [bx0, bx1]) {
        ctx.beginPath(); ctx.moveTo(bx, PAD+4); ctx.lineTo(bx, Y_POT); ctx.stroke()
      }
      ctx.setLineDash([])

      // Labels
      ctx.font = '11px ui-monospace, monospace'
      ctx.fillStyle = 'rgba(74,158,255,0.8)'
      ctx.fillText('incident + reflected', PAD+2, PAD+12)
      ctx.fillStyle = 'rgba(0,230,118,0.8)'
      ctx.fillText('transmitted', sx(bw+0.5), PAD+12)
      ctx.fillStyle = 'rgba(255,171,64,0.7)'
      ctx.fillText('V₀', (bx0+bx1)/2 - 6, barrierTop - 4)
      ctx.fillStyle = 'rgba(0,212,255,0.7)'
      ctx.fillText('E', PAD+4, yE-4)

      // T / R readout
      ctx.font = 'bold 13px ui-monospace, monospace'
      ctx.fillStyle = '#00e676'
      ctx.fillText(`T = ${T.toFixed(4)}`, W-PAD-120, PAD+14)
      ctx.fillStyle = '#ff5252'
      ctx.fillText(`R = ${R.toFixed(4)}`, W-PAD-120, PAD+30)

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [EV, bw])

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ color: '#7d97be', fontSize: '0.83rem', marginBottom: '0.5rem' }}>
        Quantum tunneling — Re[ψ(x)e<sup>-iEt/ℏ</sup>] animated · |ψ|² shaded · adjust E/V₀ and barrier width
      </div>
      <canvas ref={canvasRef} width={W} height={H} style={{ borderRadius: 8, display: 'block' }} />
      <div style={{ display: 'flex', gap: '2.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
        <label style={{ color: '#e2e8f0', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          E/V₀
          <input type="range" min={0.05} max={1.95} step={0.01} value={EV}
            onChange={e => setEV(Number(e.target.value))}
            style={{ accentColor: '#00d4ff', width: 140 }} />
          <span style={{ color: '#00d4ff', fontFamily: 'monospace', minWidth: 34 }}>{EV.toFixed(2)}</span>
        </label>
        <label style={{ color: '#e2e8f0', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Barrier width
          <input type="range" min={0.3} max={4.0} step={0.1} value={bw}
            onChange={e => setBw(Number(e.target.value))}
            style={{ accentColor: '#ffab40', width: 140 }} />
          <span style={{ color: '#ffab40', fontFamily: 'monospace', minWidth: 34 }}>{bw.toFixed(1)}</span>
        </label>
      </div>
    </div>
  )
}
