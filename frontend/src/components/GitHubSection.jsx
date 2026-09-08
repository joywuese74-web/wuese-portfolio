import { useEffect, useState } from 'react'
import { contactInfo } from '../data/skills'
import { useReveal } from '../hooks/useReveal'

const USERNAME = 'joywuese74-web'

export default function GitHubSection() {
  const ref = useReveal()
  const [state, setState] = useState('loading') // loading | success | error | empty
  const [repos, setRepos] = useState([])

  useEffect(() => {
    let cancelled = false

    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6`
        )
        if (!res.ok) throw new Error('GitHub API request failed')
        const data = await res.json()
        if (cancelled) return

        if (!data.length) {
          setState('empty')
        } else {
          setRepos(data)
          setState('success')
        }
      } catch (err) {
        if (!cancelled) setState('error')
      }
    }

    fetchRepos()
    return () => { cancelled = true }
  }, [])

  return (
    <section id="github" className="section" ref={ref}>
      <div className="container">
        <div className="card github-panel reveal">
          <h2>Explore My Code</h2>
          <a className="github-handle" href={contactInfo.github} target="_blank" rel="noreferrer">
            {contactInfo.githubHandle}
          </a>
          <a className="btn btn-primary" href={contactInfo.github} target="_blank" rel="noreferrer">
            View GitHub
          </a>

          {state === 'loading' && (
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>Loading repositories…</p>
          )}

          {state === 'error' && (
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
              Couldn't load repositories right now — visit the profile directly above.
            </p>
          )}

          {state === 'empty' && (
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
              No public repositories found yet.
            </p>
          )}

          {state === 'success' && (
            <div className="repo-list">
              {repos.map((repo) => (
                <a
                  className="card repo-card"
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h4>{repo.name}</h4>
                  <p>{repo.description || 'No description provided.'}</p>
                  <div className="repo-meta">
                    {repo.language && <span>{repo.language}</span>}
                    <span>★ {repo.stargazers_count}</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
