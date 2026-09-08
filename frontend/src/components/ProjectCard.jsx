export default function ProjectCard({ project, onViewCaseStudy }) {
  return (
    <article className={`card project-card reveal ${project.featured ? 'featured' : ''}`}>
      <div className="project-media">
        {project.image ? (
          <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
        ) : (
          <span className="placeholder-mark">Add screenshot: {project.title.toLowerCase().replace(/\s+/g, '-')}.png</span>
        )}
      </div>

      <div className="project-body">
        <div className="project-badges">
          {project.badges.map((b) => <span className="pill" key={b}>{b}</span>)}
        </div>

        <h3>{project.title}</h3>
        <p className="desc">{project.description}</p>

        <div className="tech-row">
          {project.technologies.map((t) => <span key={t}>{t}</span>)}
        </div>

        <div className="project-links">
          <button className="btn btn-outline" onClick={() => onViewCaseStudy(project)}>
            View Case Study
          </button>
          {project.liveUrl ? (
            <a className="btn btn-ghost" href={project.liveUrl} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          ) : null}
          <a className="btn btn-ghost" href={project.githubUrl} target="_blank" rel="noreferrer">
            {project.liveUrl ? 'GitHub' : 'View on GitHub'}
          </a>
        </div>
      </div>
    </article>
  )
}
