import { useEffect } from 'react'

export default function CaseStudyModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const cs = project.caseStudy

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close case study">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
        </button>

        <span className="pill">{project.category}</span>
        <h2 id="case-study-title" style={{ marginTop: '0.9rem', fontSize: '1.9rem' }}>{project.title}</h2>

        <div className="case-section">
          <h4>Project Overview</h4>
          <p>{cs.overview}</p>
        </div>

        <div className="case-section">
          <h4>The Problem</h4>
          <p>{cs.problem}</p>
        </div>

        <div className="case-section">
          <h4>The Solution</h4>
          <p>{cs.solution}</p>
        </div>

        <div className="case-section">
          <h4>My Role</h4>
          <p>{cs.role}</p>
        </div>

        <div className="case-section">
          <h4>Technologies</h4>
          <div className="tech-row" style={{ marginTop: '0.25rem' }}>
            {project.technologies.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>

        <div className="case-section">
          <h4>Key Features</h4>
          <ul>
            {cs.keyFeatures.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>

        <div className="case-section">
          <h4>Technical Challenges</h4>
          <p>{cs.challenges}</p>
        </div>

        <div className="case-section">
          <h4>Solutions</h4>
          <p>{cs.solutions}</p>
        </div>

        <div className="case-section">
          <h4>Outcome</h4>
          <p>{cs.outcome}</p>
        </div>

        <div className="case-section">
          <h4>Lessons Learned</h4>
          <p>{cs.lessons}</p>
        </div>

        <div className="modal-links">
          <a className="btn btn-outline" href={project.githubUrl} target="_blank" rel="noreferrer">
            GitHub Repository
          </a>
          {project.liveUrl && (
            <a className="btn btn-primary" href={project.liveUrl} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
