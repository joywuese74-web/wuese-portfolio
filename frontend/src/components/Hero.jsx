import { useEffect, useRef } from 'react'
import { contactInfo } from '../data/skills'

// A quiet orbital-particle animation: a nod to the physics background
// without being literal. Single deliberate animated moment on the page.
function OrbitCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let width, height, dpr

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const nodes = Array.from({ length: 26 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 0.15 + Math.random() * 0.42,
      speed: (0.08 + Math.random() * 0.12) * (Math.random() > 0.5 ? 1 : -1),
      size: 1 + Math.random() * 2,
    }))

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height)
      const cx = width / 2
      const cy = height / 2
      const minDim = Math.min(width, height)

      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
      const border = getComputedStyle(document.documentElement).getPropertyValue('--border').trim()

      // orbit rings
      ctx.strokeStyle = border
      ctx.lineWidth = 1
      ;[0.2, 0.32, 0.44].forEach((r) => {
        ctx.beginPath()
        ctx.arc(cx, cy, minDim * r, 0, Math.PI * 2)
        ctx.stroke()
      })

      const t = prefersReduced ? 0 : time * 0.00006

      nodes.forEach((n) => {
        const a = n.angle + t * n.speed * 20
        const x = cx + Math.cos(a) * minDim * n.radius
        const y = cy + Math.sin(a) * minDim * n.radius

        ctx.beginPath()
        ctx.arc(x, y, n.size, 0, Math.PI * 2)
        ctx.fillStyle = accent
        ctx.globalAlpha = 0.55
        ctx.fill()
        ctx.globalAlpha = 1
      })

      // center mark
      ctx.beginPath()
      ctx.arc(cx, cy, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = accent
      ctx.fill()

      if (!prefersReduced) {
        raf = requestAnimationFrame(draw)
      }
    }

    resize()
    draw(0)
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" />
}

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div>
          <span className="hero-eyebrow">Software Developer</span>
          <h1 className="hero-name">Wuese Joy Ayande</h1>
          <p className="hero-role">Full-Stack Developer · AI &amp; Technology Enthusiast</p>
          <p className="hero-intro">
            I build practical, scalable, and user-focused digital solutions — moving from a
            background in physics into backend engineering, APIs, and AI-integrated applications.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View My Work
            </button>
            <button className="btn btn-outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Let's Work Together
            </button>
          </div>

          <div className="hero-social">
            <a href={contactInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
              </svg>
            </a>
            <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.94 8.5H3.56V20.5H6.94V8.5ZM5.25 3.5A2 2 0 1 0 5.27 7.5 2 2 0 0 0 5.25 3.5ZM20.5 20.5H17.13V14.72C17.13 13.34 16.6 12.44 15.36 12.44C14.44 12.44 13.91 13.06 13.67 13.66C13.58 13.87 13.56 14.16 13.56 14.46V20.5H10.19S10.23 9.4 10.19 8.5H13.56V9.98C14.01 9.28 14.85 8.28 16.6 8.28C18.77 8.28 20.5 9.72 20.5 12.83V20.5Z" />
              </svg>
            </a>
            <a href={`mailto:${contactInfo.email}`} aria-label="Send an email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <OrbitCanvas />
        </div>
      </div>
    </section>
  )
}
