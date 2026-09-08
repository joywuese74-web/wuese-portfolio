import { experience } from '../data/skills'
import { useReveal } from '../hooks/useReveal'

export default function Experience() {
  const ref = useReveal()

  if (!experience.length) return null

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-index">Experience</span>
            <h2 className="section-title">Where I've worked</h2>
          </div>
        </div>

        <div className="timeline reveal">
          {experience.map((item, i) => (
            <div className="timeline-item" key={i}>
              <span className="timeline-date">{item.dates}</span>
              <h3>{item.role}</h3>
              <p className="timeline-org">{item.org}</p>
              <ul>
                {item.responsibilities.map((r, j) => <li key={j}>{r}</li>)}
              </ul>
              {item.technologies?.length ? (
                <div className="tech-row timeline-tech">
                  {item.technologies.map((t) => <span key={t}>{t}</span>)}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
