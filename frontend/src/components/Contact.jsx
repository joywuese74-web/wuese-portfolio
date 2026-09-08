import { useState } from 'react'
import { contactInfo } from '../data/skills'
import { useReveal } from '../hooks/useReveal'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const ref = useReveal()
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
  }

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Enter your name.'
    if (!values.email.trim()) next.email = 'Enter your email.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'Enter a valid email address.'
    if (!values.subject.trim()) next.subject = 'Enter a subject.'
    if (!values.message.trim()) next.message = 'Enter a message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'

    try {
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json()

      if (!res.ok) {
        if (data.errors) setErrors(data.errors)
        setStatus('error')
        return
      }

      setStatus('success')
      setValues({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="section-index">Contact</span>
            <h2 className="section-title">Let's build something great together</h2>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-info reveal">
            <p className="lead">
              Open to freelance work, collaborations, and full-time roles. The fastest way to
              reach me is email.
            </p>

            <a className="contact-channel" href={`mailto:${contactInfo.email}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {contactInfo.email}
            </a>
            <a className="contact-channel" href={contactInfo.github} target="_blank" rel="noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" /></svg>
              {contactInfo.githubHandle}
            </a>
            <a className="contact-channel" href={contactInfo.linkedin} target="_blank" rel="noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 8.5H3.56V20.5H6.94V8.5ZM5.25 3.5A2 2 0 1 0 5.27 7.5 2 2 0 0 0 5.25 3.5ZM20.5 20.5H17.13V14.72C17.13 13.34 16.6 12.44 15.36 12.44C14.44 12.44 13.91 13.06 13.67 13.66C13.58 13.87 13.56 14.16 13.56 14.46V20.5H10.19S10.23 9.4 10.19 8.5H13.56V9.98C14.01 9.28 14.85 8.28 16.6 8.28C18.77 8.28 20.5 9.72 20.5 12.83V20.5Z" /></svg>
              LinkedIn
            </a>
          </div>

          <form className="reveal" onSubmit={handleSubmit} noValidate>
            <div className={`form-field ${errors.name ? 'error' : ''}`}>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" value={values.name} onChange={handleChange('name')} />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className={`form-field ${errors.email ? 'error' : ''}`}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={values.email} onChange={handleChange('email')} />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className={`form-field ${errors.subject ? 'error' : ''}`}>
              <label htmlFor="subject">Subject</label>
              <input id="subject" type="text" value={values.subject} onChange={handleChange('subject')} />
              {errors.subject && <span className="field-error">{errors.subject}</span>}
            </div>

            <div className={`form-field ${errors.message ? 'error' : ''}`}>
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} value={values.message} onChange={handleChange('message')} />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>

            {status === 'success' && (
              <div className="form-status success">Message sent — thank you. I'll reply soon.</div>
            )}
            {status === 'error' && (
              <div className="form-status error-status">Something went wrong. Please try again or email directly.</div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
