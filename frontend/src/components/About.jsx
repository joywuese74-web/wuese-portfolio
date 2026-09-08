import { quickFacts } from '../data/skills'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-index">About</span>
            <h2 className="section-title">From physics to production code</h2>
          </div>
        </div>

        <div className="about-grid">
          <div className="about-bio reveal">
            <p>
              My path into software started with a B.Sc. in Pure and Applied Physics — a
              background that shaped how I approach problems: break them down, test
              assumptions, and build from first principles. That habit carried directly into
              software development, where I now focus on backend engineering.
            </p>
            <p>
              I build practical software with Go and Python, from REST APIs and CLI tools to
              full applications like L'AURA, a beauty and wellness marketplace. I care about
              writing backend systems that are dependable and easy to reason about, and I'm
              increasingly drawn to integrating AI and LLMs into the applications I build.
            </p>
            <p>
              I approach every project as a problem to be understood before it's solved, and
              I treat learning as a constant part of the job — new tools, new patterns, and
              new ways to make software more reliable.
            </p>
          </div>

          <div className="quick-facts reveal">
            <dl>
              {quickFacts.map((fact) => (
                <div className="fact-row" key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
