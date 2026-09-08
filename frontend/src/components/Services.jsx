import { services } from '../data/skills'
import { useReveal } from '../hooks/useReveal'

const ICONS = {
  'Backend Development': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" /></svg>
  ),
  'REST API Development': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 4 4 12l4 8M16 4l4 8-4 8" strokeLinecap="round" strokeLinejoin="round" /></svg>
  ),
  'Web Application Development': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="14" rx="1.5" /><path d="M3 9h18" strokeLinecap="round" /></svg>
  ),
  'AI Integration': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" strokeLinecap="round" /></svg>
  ),
  'Database Integration': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" strokeLinecap="round" /></svg>
  ),
  Automation: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" strokeLinecap="round" /></svg>
  ),
}

export default function Services() {
  const ref = useReveal()

  return (
    <section id="services" className="section" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-index">Services</span>
            <h2 className="section-title">How I can help</h2>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div className="card service-card reveal" key={service.title}>
              <div className="service-icon">{ICONS[service.title] ?? null}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="tech-row">
                {service.technologies.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
