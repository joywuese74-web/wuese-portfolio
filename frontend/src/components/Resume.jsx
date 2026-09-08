import { useReveal } from '../hooks/useReveal'

// Replace with the actual path once the resume PDF is added, e.g. '/resume.pdf'
const RESUME_URL = '/resume-placeholder.pdf'

export default function Resume() {
  const ref = useReveal()

  return (
    <section id="resume" className="section" ref={ref}>
      <div className="container">
        <div className="card resume-panel reveal">
          <div>
            <h2>Resume</h2>
            <p>A one-page summary of my background, skills, and project experience.</p>
          </div>
          <div className="resume-actions">
            <a className="btn btn-outline" href={RESUME_URL} target="_blank" rel="noreferrer">
              View Resume
            </a>
            <a className="btn btn-primary" href={RESUME_URL} download>
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
