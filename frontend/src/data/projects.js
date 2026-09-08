// Edit this file to add, remove, or update projects.
// Each project follows the same shape so the UI never needs to change.

export const projects = [
  {
    id: 'laura',
    featured: true,
    title: "L'AURA",
    category: 'Full-Stack · Marketplace',
    badges: ['Full-Stack', 'Web Development'],
    description:
      "A beauty and wellness marketplace connecting customers with professional service providers — supporting multi-skill provider profiles, service discovery, and booking.",
    // Replace with actual stack once confirmed.
    technologies: ['PLACEHOLDER_TECH_1', 'PLACEHOLDER_TECH_2', 'PLACEHOLDER_TECH_3'],
    githubUrl: 'https://github.com/joywuese74-web/PLACEHOLDER_REPO',
    liveUrl: '', // add live URL when deployed, otherwise leave blank to hide the button
    image: null, // e.g. '/projects/laura-cover.png'
    status: 'In development',
    caseStudy: {
      overview:
        "L'AURA is a marketplace built to connect customers with beauty and wellness professionals in one place — profiles, service listings, and bookings brought together in a single product.",
      problem:
        'Finding and booking a trustworthy beauty or wellness provider is fragmented — most providers rely on word of mouth or social media DMs, with no structured way to showcase services or manage bookings.',
      solution:
        'L\'AURA gives service providers a structured profile where they can list multiple skills and services, and gives customers a way to discover, compare, and book providers directly.',
      role:
        'Designed and built the application end-to-end, including the provider onboarding flow, multi-skill profile system, and the customer-facing discovery and booking experience.',
      keyFeatures: [
        'Provider onboarding with support for multiple skills/services per provider',
        'Service-provider profiles with structured listings',
        'Service discovery for customers',
        'Booking functionality',
        'Responsive interface across devices',
      ],
      challenges:
        'Modeling a data structure that cleanly supports a provider offering many different services, each with its own details, while keeping the onboarding flow simple rather than overwhelming.',
      solutions:
        'Built a flexible schema that treats each service as its own record linked to a provider, so the UI can render one profile with many services without special-casing single-service providers.',
      outcome:
        'A working marketplace platform demonstrating full-stack product thinking — from data modeling through to a usable booking flow. PLACEHOLDER: update with current deployment status.',
      lessons:
        'Reinforced the value of designing data models around real-world flexibility (one provider, many services) before writing UI code.',
    },
  },
  {
    id: 'ascii-art-web',
    featured: false,
    title: 'ASCII Art Web',
    category: 'Go · Web Application',
    badges: ['Go', 'Backend'],
    description:
      'A Go-based web application that converts user text into ASCII art using banner file parsing.',
    technologies: ['Go', 'HTML/CSS', 'Banner file parsing'],
    githubUrl: 'https://github.com/joywuese74-web/PLACEHOLDER_REPO',
    liveUrl: '',
    image: null,
    status: 'Complete',
    caseStudy: {
      overview:
        'ASCII Art Web takes plain text input and renders it as ASCII art in the browser, using predefined banner styles parsed from text files.',
      problem:
        'Converting text into stylized ASCII art requires correctly mapping each character to its multi-line banner representation and reassembling lines in the right order — easy to get subtly wrong.',
      solution:
        'A Go backend parses banner files into a character map at startup, then processes each line of user input character-by-character, building the output row by row.',
      role:
        'Built the full application — banner parsing logic, input validation, character-to-art mapping, and the web handler serving the interface.',
      keyFeatures: [
        'Multiple banner/font styles to choose from',
        'Line-by-line text-to-ASCII conversion',
        'Input validation for unsupported characters',
        'Web interface for entering text and viewing output',
      ],
      challenges:
        'Correctly handling runes rather than bytes so multi-line banner characters align properly, and validating input without silently dropping unsupported characters.',
      solutions:
        'Processed input as runes throughout, and added explicit validation with clear error handling before any rendering happens.',
      outcome:
        'A functioning web tool that reliably converts text to ASCII art across the supported banner styles.',
      lessons:
        'Deepened understanding of string/rune handling in Go and how to structure a small but correct text-processing pipeline.',
    },
  },
  {
    id: 'cli-calculator',
    featured: false,
    title: 'CLI Calculator',
    category: 'Go · CLI',
    badges: ['Go', 'CLI'],
    description:
      'A command-line calculator built in Go, supporting core arithmetic operations with interactive input handling.',
    technologies: ['Go'],
    githubUrl: 'https://github.com/joywuese74-web/PLACEHOLDER_REPO',
    liveUrl: '',
    image: null,
    status: 'Complete',
    caseStudy: {
      overview:
        'A terminal-based calculator that takes interactive input and performs arithmetic operations, with error handling for invalid input.',
      problem:
        'A CLI tool needs to handle arbitrary user input gracefully — malformed expressions, division by zero, and unexpected characters — without crashing.',
      solution:
        'Built an interactive read-parse-evaluate loop in Go that validates input before performing operations and reports clear errors instead of failing silently.',
      role: 'Designed and implemented the entire application, including input parsing and the control flow loop.',
      keyFeatures: [
        'Addition, subtraction, multiplication, and division',
        'Interactive prompt for continuous calculations',
        'Input validation and error messages',
        'Exit/quit handling',
      ],
      challenges:
        'Handling invalid or malformed input (e.g. division by zero, non-numeric values) without the program exiting unexpectedly.',
      solutions:
        'Wrapped parsing and evaluation in explicit error checks, surfacing readable messages back to the user and continuing the loop.',
      outcome:
        'A stable CLI tool that handles the core arithmetic operations reliably from the terminal.',
      lessons:
        'Practiced fundamental Go control flow, input parsing, and defensive error handling patterns used throughout backend work.',
    },
  },
]
