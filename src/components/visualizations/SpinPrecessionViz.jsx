import { useRef, useEffect, useState } from 'react'

// Bloch sphere + animated spin precession + live ⟨Sx⟩ ⟨Sy⟩ time traces
const BS = 300, CX = BS/2, CY = BS/2, R = 108
const TW = 280, TH = 300
const W = BS + TW, H = BS

function project(x, y, z, rx, ry) {
  const cy = Math.cos(ry), sy = Math.sin(ry)
  const x1 = x*cy - y*sy, y1 = x*sy + y*cy
  const cx = Math.cos(rx), sx = Math.sin(rx)
  return { sx: CX + x1*R, sy: CY - (y1*sx + z*cx)*R, depth: y1*cx - z*sx }
}

function drawSphere(ctx, rx, ry) {
  ctx.fillStyle = '#0d1225'
  ctx.fillRect(0, 0, BS, H)
  const circle = (axis, col) => {
    ctx.beginPath(); ctx.strokeStyle = col; ctx.lineWidth = 1
    for (let i=0; i<=60; i++) {
      const a = i/60*Math.PI*2
      let px,py,pz
      if (axis==='xy') { px=Math.cos(a); py=Math.sin(a); pz=0 }
      else if (axis==='xz') { px=Math.cos(a); py=0; pz=Math.sin(a) }
      else { px=0; py=Math.cos(a); pz=Math.sin(a) }
      const p = project(px,py,pz,rx,ry)
      i===0 ? ctx.moveTo(p.sx,p.sy) : ctx.lineTo(p.sx,p.sy)
    }
    ctx.stroke()
  }
  circle('xy','#1a2842'); circle('xz','#1a2842'); circle('yz','#1a2842')

  // Axes
  const axis = (ax,ay,az,lbl,col) => {
    const p0=project(0,0,0,rx,ry), p1=project(ax*1.35,ay*1.35,az*1.35,rx,ry)
    const pn=project(-ax*1.2,-ay*1.2,-az*1.2,rx,ry)
    ctx.strokeStyle=col; ctx.lineWidth=1
    ctx.setLineDash([3,3]); ctx.beginPath(); ctx.moveTo(p0.sx,p0.sy); ctx.lineTo(pn.sx,pn.sy); ctx.stroke()
    ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(p0.sx,p0.sy); ctx.lineTo(p1.sx,p1.sy); ctx.stroke()
    ctx.fillStyle=col; ctx.font='bold 12px ui-monospace, monospace'
    ctx.fillText(lbl, p1.sx+3, p1.sy+5)
  }
  axis(1,0,0,'x','#4a9eff'); axis(0,1,0,'y','#4a9eff')
  // B along z
  const pz1 = project(0,0,1.35,rx,ry), pz0 = project(0,0,0,rx,ry)
  ctx.strokeStyle='#ff5252'; ctx.lineWidth=2
  ctx.beginPath(); ctx.moveTo(pz0.sx,pz0.sy); ctx.lineTo(pz1.sx,pz1.sy); ctx.stroke()
  ctx.fillStyle='#ff5252'; ctx.font='bold 12px ui-monospace, monospace'
  ctx.fillText('B', pz1.sx+4, pz1.sy-2)
  const pzN=project(0,0,-1.2,rx,ry)
  ctx.strokeStyle='rgba(255,82,82,0.4)'; ctx.lineWidth=1; ctx.setLineDash([3,3])
  ctx.beginPath(); ctx.moveTo(pz0.sx,pz0.sy); ctx.lineTo(pzN.sx,pzN.sy); ctx.stroke()
  ctx.setLineDash([])
  // |+⟩ |−⟩
  const pN=project(0,0,1.5,rx,ry), pS=project(0,0,-1.5,rx,ry)
  ctx.fillStyle='rgba(74,158,255,0.7)'; ctx.font='11px ui-monospace, monospace'
  ctx.fillText('|+⟩', pN.sx+4, pN.sy); ctx.fillText('|−⟩', pS.sx+4, pS.sy)
}

export default function SpinPrecessionViz() {
  const canvasRef = useRef()
  const animRef = useRef()
  const [theta, setTheta] = useState(Math.PI/3)
  const RX = 0.35, RY = 0.5
  const HIST = 180  // history points
  const history = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const omegaL = 2.0  // display Larmor frequency (rad/s visual)
    let raf, t0
    history.current = []

    function draw(ts) {
      if (!t0) t0 = ts
      const time = (ts - t0) * 0.0015
      const phi = -omegaL * time

      const bx = Math.sin(theta)*Math.cos(phi)
      const by = Math.sin(theta)*Math.sin(phi)
      const bz = Math.cos(theta)
      const Sx = 0.5*Math.sin(theta)*Math.cos(phi)  // in units of hbar
      const Sy = 0.5*Math.sin(theta)*Math.sin(phi)
      const Sz = 0.5*Math.cos(theta)

      history.current.push({ Sx, Sy, t: time })
      if (history.current.length > HIST) history.current.shift()

      // ── Bloch sphere ──────────────────────────────────────────
      drawSphere(ctx, RX, RY)

      // Precession circle (great circle at fixed theta)
      if (Math.sin(theta) > 0.05) {
        ctx.beginPath(); ctx.strokeStyle = 'rgba(240,180,41,0.25)'; ctx.lineWidth = 1
        for (let i=0; i<=60; i++) {
          const a = i/60*Math.PI*2
          const p = project(Math.sin(theta)*Math.cos(a), Math.sin(theta)*Math.sin(a), bz, RX, RY)
          i===0 ? ctx.moveTo(p.sx,p.sy) : ctx.lineTo(p.sx,p.sy)
        }
        ctx.stroke()
      }

      // Projection to equatorial plane
      const pp = project(bx, by, 0, RX, RY)
      const p0 = project(0,0,0,RX,RY)
      const pv = project(bx, by, bz, RX, RY)
      ctx.strokeStyle='rgba(240,180,41,0.3)'; ctx.lineWidth=1; ctx.setLineDash([3,3])
      ctx.beginPath(); ctx.moveTo(p0.sx,p0.sy); ctx.lineTo(pp.sx,pp.sy); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(pp.sx,pp.sy); ctx.lineTo(pv.sx,pv.sy); ctx.stroke()
      ctx.setLineDash([])

      // State vector
      ctx.strokeStyle='#f0b429'; ctx.lineWidth=2.5; ctx.shadowColor='#f0b429'; ctx.shadowBlur=10
      ctx.beginPath(); ctx.moveTo(p0.sx,p0.sy); ctx.lineTo(pv.sx,pv.sy); ctx.stroke()
      ctx.shadowBlur=0
      const dx=pv.sx-p0.sx, dy=pv.sy-p0.sy, len=Math.sqrt(dx*dx+dy*dy)
      if (len>0) {
        const nx=dx/len, ny=dy/len
        ctx.fillStyle='#f0b429'; ctx.beginPath()
        ctx.moveTo(pv.sx,pv.sy)
        ctx.lineTo(pv.sx-nx*9+ny*4, pv.sy-ny*9-nx*4)
        ctx.lineTo(pv.sx-nx*9-ny*4, pv.sy-ny*9+nx*4)
        ctx.closePath(); ctx.fill()
      }
      ctx.fillStyle='#f0b429'; ctx.beginPath(); ctx.arc(pv.sx,pv.sy,3,0,Math.PI*2); ctx.fill()

      // ── Time trace panel ──────────────────────────────────────
      const tx0 = BS + 12, ty0 = 12
      const tw = TW - 20, th2 = (TH - 36) / 2

      ctx.fillStyle = '#0d1225'
      ctx.fillRect(BS, 0, TW, H)
      ctx.strokeStyle = '#1a2842'; ctx.lineWidth = 1
      ctx.strokeRect(tx0, ty0, tw, H-24)
      ctx.setLineDash([2,2])
      ctx.beginPath(); ctx.moveTo(tx0, ty0+th2+6); ctx.lineTo(tx0+tw, ty0+th2+6); ctx.stroke()
      ctx.setLineDash([])

      const drawTrace = (data, yOff, yScale, color, label) => {
        const yc = ty0 + yOff + th2/2
        // Zero line
        ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=1
        ctx.beginPath(); ctx.moveTo(tx0,yc); ctx.lineTo(tx0+tw,yc); ctx.stroke()
        // Trace
        ctx.beginPath(); ctx.strokeStyle=color; ctx.lineWidth=2; ctx.shadowColor=color; ctx.shadowBlur=4
        let first=true
        for (let i=0; i<data.length; i++) {
          const xi = tx0 + tw * i / HIST
          const yi = yc - data[i] * yScale
          first ? (ctx.moveTo(xi,yi), first=false) : ctx.lineTo(xi,yi)
        }
        ctx.stroke(); ctx.shadowBlur=0
        ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.font='10px ui-monospace, monospace'
        ctx.fillText(label, tx0+3, ty0+yOff+10)
        // Current value
        if (data.length>0) {
          ctx.fillStyle=color; ctx.font='11px ui-monospace, monospace'
          ctx.fillText(data[data.length-1].toFixed(3), tx0+tw-55, ty0+yOff+12)
        }
      }

      drawTrace(history.current.map(h=>h.Sx), 0, th2*0.8*2, '#4a9eff', '⟨Sx⟩/ℏ')
      drawTrace(history.current.map(h=>h.Sy), th2+12, th2*0.8*2, '#b388ff', '⟨Sy⟩/ℏ')

      // ⟨Sz⟩ label
      ctx.fillStyle='rgba(74,158,255,0.5)'; ctx.font='11px ui-monospace, monospace'
      ctx.fillText(`⟨Sz⟩/ℏ = ${Sz.toFixed(3)} (const)`, tx0+3, H-10)

      ctx.fillStyle='rgba(255,82,82,0.6)'; ctx.font='10px ui-monospace, monospace'
      ctx.fillText('Larmor precession: φ(t) = −ω₀t', tx0+3, H-24)

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [theta])

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ color: '#7d97be', fontSize: '0.83rem', marginBottom: '0.5rem' }}>
        Spin precession in magnetic field B∥ẑ — Larmor frequency ω₀ = eB/mₑ
      </div>
      <canvas ref={canvasRef} width={W} height={H} style={{ borderRadius: 8, display: 'block' }} />
      <label style={{ color: '#e2e8f0', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.7rem' }}>
        θ (polar angle from |+⟩)
        <input type="range" min={0.02} max={Math.PI-0.02} step={0.01} value={theta}
          onChange={e => setTheta(Number(e.target.value))}
          style={{ accentColor: '#f0b429', width: 160 }} />
        <span style={{ color: '#f0b429', fontFamily: 'monospace', minWidth: 38 }}>{(theta*180/Math.PI).toFixed(0)}°</span>
        <span style={{ color: '#7d97be', fontSize: '0.78rem' }}>
          (θ=90° → equator, pure transverse oscillation)
        </span>
      </label>
    </div>
  )
}
