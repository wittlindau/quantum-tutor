import { useEffect, useRef, useState } from 'react'

const W = 340, H = 340, CX = W / 2, CY = H / 2, R = 120

// Project 3D → 2D. World convention: z is UP.
// rotY = rotate around world Z (yaw), rotX = tilt (elevation angle, positive = look down from above)
function project(x, y, z, rotX, rotY) {
  // Rotate around Z by rotY (yaw)
  const cy = Math.cos(rotY), sy = Math.sin(rotY)
  const x1 = x * cy - y * sy
  const y1 = x * sy + y * cy

  // Rotate around X by rotX (tilt down)
  const cx = Math.cos(rotX), sx = Math.sin(rotX)
  const y2 = y1 * cx - z * sx
  const z2 = y1 * sx + z * cx

  // Orthographic: x1 → screen x, z2 → screen y (up)
  return { sx: CX + x1 * R, sy: CY - z2 * R, depth: y2 }
}

export default function BlochSphereViz() {
  const canvasRef = useRef()
  const [theta, setTheta] = useState(Math.PI / 3)
  const [phi, setPhi] = useState(Math.PI / 4)
  const [rotX, setRotX] = useState(0.35)  // slight tilt so we see the sphere from above
  const [rotY, setRotY] = useState(0.5)
  const dragging = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#0d1225'
    ctx.fillRect(0, 0, W, H)

    // Wireframe circles
    const drawCircle = (axis, col, steps = 60) => {
      ctx.beginPath()
      ctx.strokeStyle = col
      ctx.lineWidth = 1
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * 2 * Math.PI
        let px, py, pz
        if (axis === 'xy') { px = Math.cos(a); py = Math.sin(a); pz = 0 }
        else if (axis === 'xz') { px = Math.cos(a); py = 0; pz = Math.sin(a) }
        else { px = 0; py = Math.cos(a); pz = Math.sin(a) }
        const p = project(px, py, pz, rotX, rotY)
        if (i === 0) ctx.moveTo(p.sx, p.sy)
        else ctx.lineTo(p.sx, p.sy)
      }
      ctx.stroke()
    }

    drawCircle('xy', '#1a2842')
    drawCircle('xz', '#1a2842')
    drawCircle('yz', '#1a2842')

    // Axes — use world x,y,z with z=up
    const drawAxis = (ax, ay, az, label, col) => {
      const p0 = project(0, 0, 0, rotX, rotY)
      const p1 = project(ax * 1.35, ay * 1.35, az * 1.35, rotX, rotY)
      const pn = project(-ax * 1.3, -ay * 1.3, -az * 1.3, rotX, rotY)
      ctx.strokeStyle = col
      ctx.lineWidth = 1
      ctx.setLineDash([3, 3])
      ctx.beginPath(); ctx.moveTo(p0.sx, p0.sy); ctx.lineTo(pn.sx, pn.sy); ctx.stroke()
      ctx.setLineDash([])
      ctx.beginPath(); ctx.moveTo(p0.sx, p0.sy); ctx.lineTo(p1.sx, p1.sy); ctx.stroke()
      ctx.fillStyle = col
      ctx.font = 'bold 13px ui-monospace, monospace'
      ctx.fillText(label, p1.sx + 4, p1.sy + 5)
    }

    drawAxis(1, 0, 0, 'x', '#4a9eff')
    drawAxis(0, 1, 0, 'y', '#4a9eff')
    drawAxis(0, 0, 1, 'z', '#4a9eff')  // z is UP — north pole label

    // |+⟩ / |−⟩ labels
    const pN = project(0, 0, 1.5, rotX, rotY)
    const pS = project(0, 0, -1.5, rotX, rotY)
    ctx.fillStyle = 'rgba(74,158,255,0.7)'
    ctx.font = '11px ui-monospace, monospace'
    ctx.fillText('|+⟩', pN.sx + 4, pN.sy)
    ctx.fillText('|−⟩', pS.sx + 4, pS.sy)

    // Bloch vector: (sinθ cosφ, sinθ sinφ, cosθ)
    const bx = Math.sin(theta) * Math.cos(phi)
    const by = Math.sin(theta) * Math.sin(phi)
    const bz = Math.cos(theta)
    const p0 = project(0, 0, 0, rotX, rotY)
    const pv = project(bx, by, bz, rotX, rotY)

    // Equatorial projection line
    const pp = project(bx, by, 0, rotX, rotY)
    ctx.strokeStyle = 'rgba(240,180,41,0.3)'
    ctx.lineWidth = 1
    ctx.setLineDash([3, 3])
    ctx.beginPath(); ctx.moveTo(p0.sx, p0.sy); ctx.lineTo(pp.sx, pp.sy); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(pp.sx, pp.sy); ctx.lineTo(pv.sx, pv.sy); ctx.stroke()
    ctx.setLineDash([])

    // Phi arc on equator
    if (phi > 0.05) {
      ctx.strokeStyle = 'rgba(240,180,41,0.25)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let i = 0; i <= 20; i++) {
        const a = (i / 20) * phi
        const ep = project(0.35 * Math.cos(a), 0.35 * Math.sin(a), 0, rotX, rotY)
        if (i === 0) ctx.moveTo(ep.sx, ep.sy); else ctx.lineTo(ep.sx, ep.sy)
      }
      ctx.stroke()
    }

    // State vector arrow
    ctx.strokeStyle = '#f0b429'
    ctx.lineWidth = 2.5
    ctx.shadowColor = '#f0b429'
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.moveTo(p0.sx, p0.sy)
    ctx.lineTo(pv.sx, pv.sy)
    ctx.stroke()
    ctx.shadowBlur = 0

    // Arrowhead
    const dx = pv.sx - p0.sx, dy = pv.sy - p0.sy
    const len = Math.sqrt(dx * dx + dy * dy)
    if (len > 0) {
      const nx = dx / len, ny = dy / len
      ctx.fillStyle = '#f0b429'
      ctx.beginPath()
      ctx.moveTo(pv.sx, pv.sy)
      ctx.lineTo(pv.sx - nx * 10 + ny * 5, pv.sy - ny * 10 - nx * 5)
      ctx.lineTo(pv.sx - nx * 10 - ny * 5, pv.sy - ny * 10 + nx * 5)
      ctx.closePath()
      ctx.fill()
    }

    ctx.fillStyle = '#f0b429'
    ctx.beginPath()
    ctx.arc(pv.sx, pv.sy, 4, 0, 2 * Math.PI)
    ctx.fill()

    // State label
    const cosH = Math.cos(theta / 2).toFixed(3)
    const sinH = Math.sin(theta / 2).toFixed(3)
    ctx.fillStyle = 'rgba(125,151,190,0.8)'
    ctx.font = '11px ui-monospace, monospace'
    ctx.fillText(`|ψ⟩ = ${cosH}|+⟩ + e^{iφ}${sinH}|−⟩`, 8, 20)
    ctx.fillStyle = 'rgba(240,180,41,0.8)'
    const thDeg = (theta * 180 / Math.PI).toFixed(0)
    const phDeg = (phi * 180 / Math.PI).toFixed(0)
    ctx.fillText(`θ = ${thDeg}°   φ = ${phDeg}°`, 8, H - 10)
  }, [theta, phi, rotX, rotY])

  const handleMouseDown = (e) => { dragging.current = { x: e.clientX, y: e.clientY, rotX, rotY } }
  const handleMouseMove = (e) => {
    if (!dragging.current) return
    const dx = e.clientX - dragging.current.x
    const dy = e.clientY - dragging.current.y
    setRotY(dragging.current.rotY + dx * 0.012)
    setRotX(Math.max(-Math.PI / 2, Math.min(Math.PI / 2, dragging.current.rotX + dy * 0.012)))
  }
  const handleMouseUp = () => { dragging.current = null }

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ color: '#7d97be', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
        Bloch sphere — drag to rotate | z-axis is spin-up direction |+⟩
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <canvas
          ref={canvasRef} width={W} height={H}
          style={{ borderRadius: 8, cursor: 'grab', flexShrink: 0 }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem' }}>
          <label style={{ color: '#e2e8f0', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            θ — polar angle (from |+⟩)
            <input type="range" min={0} max={Math.PI} step={0.01} value={theta}
              onChange={e => setTheta(Number(e.target.value))}
              style={{ accentColor: '#f0b429', width: 140 }} />
            <span style={{ color: '#f0b429', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {(theta * 180 / Math.PI).toFixed(0)}°
            </span>
          </label>
          <label style={{ color: '#e2e8f0', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            φ — azimuthal angle
            <input type="range" min={0} max={2 * Math.PI} step={0.01} value={phi}
              onChange={e => setPhi(Number(e.target.value))}
              style={{ accentColor: '#f0b429', width: 140 }} />
            <span style={{ color: '#f0b429', fontFamily: 'monospace', fontSize: '0.8rem' }}>
              {(phi * 180 / Math.PI).toFixed(0)}°
            </span>
          </label>
          <div style={{ marginTop: '0.5rem', color: '#7d97be', fontSize: '0.78rem', lineHeight: 1.7, borderLeft: '2px solid #1a2842', paddingLeft: '0.6rem' }}>
            <div>North pole (θ=0) → |+⟩ = spin up</div>
            <div>South pole (θ=π) → |−⟩ = spin down</div>
            <div>Equator → equal superposition</div>
            <div>φ → relative phase</div>
          </div>
        </div>
      </div>
    </div>
  )
}
