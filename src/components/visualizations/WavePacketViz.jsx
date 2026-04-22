import { useRef, useEffect, useState } from 'react'

// Wave packet time evolution in infinite square well
// hbar=1, 2m=1, L=1: E_n = n²π², ψ_n = √2 sin(nπx)
// Revival time: T_rev = 2/π ≈ 0.637

const W = 650, H = 280, N_MODES = 32, GRID = 300
const PAD = 30, Y_TOP = 20, Y_BOT = H-48

function computeCoeffs(x0, sigma, p0) {
  // Gaussian initial state on [0,1]
  // ψ₀(x) = A exp(-(x-x0)²/4σ²) exp(ip₀x)
  const dx = 1/(GRID+1)
  const xs = Array.from({length:GRID}, (_,i) => (i+1)*dx)

  // Raw unnormalized values
  const psi0 = xs.map(x => {
    const dx2 = (x-x0)*(x-x0)
    const gauss = Math.exp(-dx2/(4*sigma*sigma))
    return [gauss*Math.cos(p0*x), gauss*Math.sin(p0*x)]  // [re, im]
  })

  // Normalize
  let norm2 = 0
  psi0.forEach(([re,im]) => norm2 += (re**2+im**2)*dx)
  const norm = Math.sqrt(norm2)
  const psiN = psi0.map(([re,im]) => [re/norm, im/norm])

  // Compute coefficients c_n = ∫ ψ_n(x) * ψ₀(x) dx (complex)
  const cn = []
  for (let n=1; n<=N_MODES; n++) {
    let re=0, im=0
    xs.forEach((x, i) => {
      const phi_n = Math.sqrt(2)*Math.sin(n*Math.PI*x)
      // c_n = ∫ phi_n(x) [psiN[i][0] + i*psiN[i][1]] dx
      re += phi_n * psiN[i][0] * dx
      im += phi_n * psiN[i][1] * dx
    })
    cn.push([re, im])
  }
  return { cn, xs }
}

// Evaluate |ψ(x,t)|² at array of x values
function evalProb(x, cn, t) {
  const re_arr = new Float64Array(x.length)
  const im_arr = new Float64Array(x.length)
  for (let n=1; n<=N_MODES; n++) {
    const En = n*n*Math.PI*Math.PI
    const phase = En*t
    const [cnre, cnim] = cn[n-1]
    // c_n * e^{-iE_n t} = (cnre + i cnim)(cos-isin) = (cnre cos + cnim sin) + i(cnim cos - cnre sin)
    const re_amp = cnre*Math.cos(phase) + cnim*Math.sin(phase)
    const im_amp = cnim*Math.cos(phase) - cnre*Math.sin(phase)
    for (let j=0; j<x.length; j++) {
      const phi = Math.sqrt(2)*Math.sin(n*Math.PI*x[j])
      re_arr[j] += re_amp * phi
      im_arr[j] += im_amp * phi
    }
  }
  return x.map((_,j) => re_arr[j]**2 + im_arr[j]**2)
}

// Expectation value ⟨x⟩
function expectX(xArr, prob, dx) {
  let s=0; xArr.forEach((x,i) => s+=x*prob[i]*dx); return s
}

const DISPLAY_X = Array.from({length:250}, (_,i) => (i+1)/251)
const DX_DISP = 1/251

export default function WavePacketViz() {
  const canvasRef = useRef()
  const coeffsRef = useRef(null)
  const speedRef = useRef(0.15)
  const [x0, setX0] = useState(0.25)
  const [sigma, setSigma] = useState(0.08)
  const [p0, setP0] = useState(5*Math.PI)
  const [speed, setSpeed] = useState(0.15)

  // Keep speed ref in sync so animation loop sees changes without restarting
  useEffect(() => { speedRef.current = speed }, [speed])

  // Recompute coefficients when parameters change
  useEffect(() => {
    coeffsRef.current = computeCoeffs(x0, sigma, p0)
  }, [x0, sigma, p0])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, t0

    const YH = Y_BOT - Y_TOP
    const PSCALE = YH * 0.88
    const sx = x => PAD + x*(W-2*PAD)
    const sy = p => Y_BOT - p*PSCALE

    const trail = []
    const TRAIL_LEN = 120

    function draw(ts) {
      if (!t0) t0 = ts
      const time = (ts-t0)*0.001 * speedRef.current

      const { cn } = coeffsRef.current || { cn: [] }
      if (cn.length===0) { raf=requestAnimationFrame(draw); return }

      const prob = evalProb(DISPLAY_X, cn, time)
      const xExp = expectX(DISPLAY_X, prob, DX_DISP)

      trail.push(xExp)
      if (trail.length>TRAIL_LEN) trail.shift()

      // Clear
      ctx.fillStyle='#0d1225'
      ctx.fillRect(0,0,W,H)

      // Well floor + walls
      ctx.strokeStyle='rgba(74,158,255,0.4)'; ctx.lineWidth=2
      ctx.beginPath()
      ctx.moveTo(PAD, Y_TOP); ctx.lineTo(PAD, Y_BOT)
      ctx.lineTo(W-PAD, Y_BOT); ctx.lineTo(W-PAD, Y_TOP)
      ctx.stroke()
      ctx.strokeStyle='rgba(74,158,255,0.12)'; ctx.lineWidth=1
      ctx.beginPath(); ctx.moveTo(PAD, Y_BOT); ctx.lineTo(W-PAD, Y_BOT); ctx.stroke()

      // |ψ|² filled curve
      ctx.beginPath()
      let first=true
      DISPLAY_X.forEach((x,i) => {
        const cx=sx(x), cy=sy(prob[i])
        first ? (ctx.moveTo(cx,cy), first=false) : ctx.lineTo(cx,cy)
      })
      ctx.lineTo(sx(DISPLAY_X[DISPLAY_X.length-1]), Y_BOT)
      ctx.lineTo(sx(DISPLAY_X[0]), Y_BOT)
      ctx.closePath()
      // Gradient fill based on position
      const grad = ctx.createLinearGradient(PAD, 0, W-PAD, 0)
      grad.addColorStop(0, 'rgba(74,158,255,0.5)')
      grad.addColorStop(0.5, 'rgba(0,212,255,0.5)')
      grad.addColorStop(1, 'rgba(179,136,255,0.5)')
      ctx.fillStyle=grad
      ctx.fill()

      // |ψ|² outline
      ctx.beginPath(); first=true
      DISPLAY_X.forEach((x,i) => {
        const cx=sx(x), cy=sy(prob[i])
        first ? (ctx.moveTo(cx,cy), first=false) : ctx.lineTo(cx,cy)
      })
      ctx.strokeStyle='rgba(0,212,255,0.8)'; ctx.lineWidth=2; ctx.shadowColor='#00d4ff'; ctx.shadowBlur=6
      ctx.stroke(); ctx.shadowBlur=0

      // ⟨x⟩ trail (ghost)
      if (trail.length>1) {
        ctx.beginPath()
        trail.forEach((xt,i) => {
          const cx=sx(xt), cy=Y_BOT-12
          const alpha = i/TRAIL_LEN*0.5
          if (i===0) ctx.moveTo(cx,cy)
          else {
            ctx.strokeStyle=`rgba(240,180,41,${alpha})`
            ctx.lineWidth=1.5
            ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx,cy)
          }
        })
        ctx.stroke()
      }

      // ⟨x⟩ marker
      const xcx=sx(xExp)
      ctx.strokeStyle='#f0b429'; ctx.lineWidth=2; ctx.shadowColor='#f0b429'; ctx.shadowBlur=8
      ctx.beginPath(); ctx.moveTo(xcx, Y_TOP); ctx.lineTo(xcx, Y_BOT); ctx.stroke()
      ctx.shadowBlur=0
      ctx.fillStyle='#f0b429'; ctx.font='11px ui-monospace, monospace'
      ctx.fillText('⟨x⟩', xcx-10, Y_TOP-4)

      // Labels
      ctx.fillStyle='rgba(0,212,255,0.6)'; ctx.font='11px ui-monospace, monospace'
      ctx.fillText('|ψ(x,t)|²', PAD+6, Y_TOP+16)

      // Time display
      const T_rev = 2/Math.PI
      ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.font='11px ui-monospace, monospace'
      ctx.fillText(`t = ${time.toFixed(3)}`, W-PAD-90, Y_TOP+16)
      ctx.fillText(`t/T_rev = ${(time/T_rev).toFixed(2)}`, W-PAD-90, Y_TOP+30)

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  const slider = (label, val, min, max, step, set, color, fmt=v=>v.toFixed(2)) => (
    <label style={{ color:'#e2e8f0', fontSize:'0.8rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
      {label}
      <input type="range" min={min} max={max} step={step} value={val}
        onChange={e=>set(Number(e.target.value))}
        style={{ accentColor:color, width:100 }} />
      <span style={{ color, fontFamily:'monospace', minWidth:40 }}>{fmt(val)}</span>
    </label>
  )

  return (
    <div style={{ padding:'1rem' }}>
      <div style={{ color:'#7d97be', fontSize:'0.83rem', marginBottom:'0.5rem' }}>
        Gaussian wave packet in infinite square well — N={N_MODES} modes — revival at T<sub>rev</sub> = 2/π
      </div>
      <canvas ref={canvasRef} width={W} height={H} style={{ borderRadius:8, display:'block' }} />
      <div style={{ display:'flex', gap:'1.2rem', marginTop:'0.7rem', flexWrap:'wrap', alignItems:'center' }}>
        {slider('x₀', x0, 0.15, 0.85, 0.01, setX0, '#4a9eff')}
        {slider('σ', sigma, 0.04, 0.18, 0.005, setSigma, '#00d4ff')}
        {slider('p₀/π', p0/Math.PI, 2, 12, 0.5, v=>setP0(v*Math.PI), '#b388ff', v=>v.toFixed(1))}
        {slider('speed', speed, 0.05, 0.6, 0.025, setSpeed, '#f0b429')}
      </div>
    </div>
  )
}
