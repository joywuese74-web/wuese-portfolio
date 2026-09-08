import { useState } from 'react'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import CaseStudyModal from './CaseStudyModal'
import { useReveal } from '../hooks/useReveal'

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null)
  const ref = useReveal()

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-index">Projects</span>
            <h2 className="section-title">Featured work</h2>
          </div>
          <p className="section-sub">
            A mix of full-stack product work and Go fundamentals — from a marketplace platform
            to command-line tools.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onViewCaseStudy={setActiveProject} />
          ))}
        </div>
      </div>

      {activeProject && (
        <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  )
}
