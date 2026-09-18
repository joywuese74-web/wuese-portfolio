import Projects from '../components/Projects'
import GitHubSection from '../components/GitHubSection'
import PageWrapper from '../components/PageWrapper'

export default function ProjectsPage() {
  return (
    <PageWrapper>
      <Projects />
      <GitHubSection />
    </PageWrapper>
  )
}