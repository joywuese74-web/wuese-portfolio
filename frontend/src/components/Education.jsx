import { education } from '../data/skills'
import { useReveal } from '../hooks/useReveal'

export default function Education() {
  const ref = useReveal()

  return (
    <section id="education" className="section" style={{ paddingTop: 0 }} ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-index">Education</span>
            <h2 className="section-title">Academic background</h2>
          </div>
        </div>

        <div className="card education-card reveal">
          <div>
            <h3>{education.degree}</h3>
            <p>{education.institution}</p>
          </div>
          <span className="pill">{education.year}</span>
        </div>
      </div>
    </section>
  )
}
