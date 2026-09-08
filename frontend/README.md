# Wuese Joy Ayande — Portfolio

A React + Vite portfolio site. Dark/light mode, scroll-spy navigation, live GitHub
repo feed, and a case-study modal for each project.

## Run it (in GitHub Codespaces or locally)

```bash
npm install
npm run dev
```

Then open the forwarded port (Codespaces will prompt you), or visit
`http://localhost:5173` locally.

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## File structure

```
portfolio/
├── index.html                  # HTML shell, SEO meta tags, fonts
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                 # React entry point
    ├── App.jsx                  # Assembles all sections
    ├── index.css                # All design tokens + styles
    ├── data/
    │   ├── projects.js          # Edit project content here
    │   └── skills.js             # Skills, quick facts, experience, services, contact info
    ├── hooks/
    │   ├── useTheme.js           # Dark/light mode
    │   ├── useActiveSection.js   # Scroll-spy for nav
    │   └── useReveal.js          # Fade-in-on-scroll
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Projects.jsx
        ├── ProjectCard.jsx
        ├── CaseStudyModal.jsx
        ├── Experience.jsx
        ├── Education.jsx
        ├── Services.jsx
        ├── GitHubSection.jsx
        ├── Resume.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## Things you need to replace before launch

All of these are marked `PLACEHOLDER` in the code so they're easy to find
(`grep -r PLACEHOLDER src`).

1. **Contact info** — `src/data/skills.js` → `contactInfo`:
   - Real email address
   - Real LinkedIn URL

2. **Project details** — `src/data/projects.js`:
   - `technologies` arrays for L'AURA (currently placeholder tech names)
   - `githubUrl` for each project — replace `PLACEHOLDER_REPO` with the real repo name
   - `liveUrl` — add if a project is deployed; leave `''` to hide the Live Demo button
   - `image` — add a screenshot path (e.g. `/projects/laura-cover.png`) once you have one;
     drop the file into `public/projects/` and it'll render automatically

3. **Experience** — `src/data/skills.js` → `experience` array. Currently one
   placeholder entry. Replace with real roles, or set `experience` to `[]` to hide
   the section entirely until you have content.

4. **Resume** — `src/components/Resume.jsx`:
   - Drop your resume PDF into `public/` (e.g. `public/resume.pdf`)
   - Update `RESUME_URL` at the top of the file to match

5. **Contact form backend** — the form now calls a real Go API (see the sibling
   `backend/` project). Copy `.env.example` to `.env` here and set `VITE_API_URL`
   to wherever that backend is running (defaults to `http://localhost:8080` for
   local dev). Run the backend alongside this frontend and the form will work
   end-to-end, including live validation errors and rate-limit handling.

6. **Project screenshots** — replace the placeholder media blocks in each project
   card once you have real screenshots (`public/projects/`).

## Notes

- The GitHub section pulls live repo data from the public GitHub API
  (`https://api.github.com/users/joywuese74-web/repos`) — no API key needed, but
  it's rate-limited for unauthenticated requests (60/hour), which is fine for a
  personal site.
- Dark/light mode preference is saved to `localStorage`.
- Animations respect `prefers-reduced-motion`.
