import { skillGroups } from '../data/skills'
import { useReveal } from '../hooks/useReveal'

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-index">Skills</span>
            <h2 className="section-title">What I work with</h2>
          </div>
          <p className="section-sub">
            Grouped by area rather than ranked — proficiency shows up in the work, not a
            percentage bar.
          </p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="card skill-card reveal" key={group.category}>
              <h3>{group.category}</h3>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
