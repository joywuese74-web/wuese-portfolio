package models

// Project mirrors the structure used by the frontend, so the same
// data can be served from the backend as the single source of truth.
type Project struct {
	ID           string    `json:"id"`
	Featured     bool      `json:"featured"`
	Title        string    `json:"title"`
	Category     string    `json:"category"`
	Badges       []string  `json:"badges"`
	Description  string    `json:"description"`
	Technologies []string  `json:"technologies"`
	GithubURL    string    `json:"githubUrl"`
	LiveURL      string    `json:"liveUrl"`
	Status       string    `json:"status"`
	CaseStudy    CaseStudy `json:"caseStudy"`
}

type CaseStudy struct {
	Overview    string   `json:"overview"`
	Problem     string   `json:"problem"`
	Solution    string   `json:"solution"`
	Role        string   `json:"role"`
	KeyFeatures []string `json:"keyFeatures"`
	Challenges  string   `json:"challenges"`
	Solutions   string   `json:"solutions"`
	Outcome     string   `json:"outcome"`
	Lessons     string   `json:"lessons"`
}

// Projects is the canonical project list. Edit this to add, remove, or
// update projects — the API and frontend both read from a single source.
var Projects = []Project{
	{
		ID:           "laura",
		Featured:     true,
		Title:        "The L-aura",
		Category:     "Full-Stack · Marketplace",
		Badges:       []string{"Full-Stack", "Web Development"},
		Description:  "A beauty and wellness marketplace connecting customers with professional service providers — supporting multi-skill provider profiles, service discovery, and booking.",
		Technologies: []string{"PLACEHOLDER_TECH_1", "PLACEHOLDER_TECH_2", "PLACEHOLDER_TECH_3"},
		GithubURL:    "https://github.com/joywuese74-web/The-L-aura.git",
		LiveURL:      "https://joywuese74-web.github.io/The-L-aura/",
		Status:       "In development",
		CaseStudy: CaseStudy{
			Overview: "The L-aura is a marketplace built to connect customers with beauty and wellness professionals in one place — profiles, service listings, and bookings brought together in a single product.",
			Problem:  "Finding and booking a trustworthy beauty or wellness provider is fragmented — most providers rely on word of mouth or social media DMs, with no structured way to showcase services or manage bookings.",
			Solution: "The L-aura gives service providers a structured profile where they can list multiple skills and services, and gives customers a way to discover, compare, and book providers directly.",
			Role:     "Designed and built the application end-to-end, including the provider onboarding flow, multi-skill profile system, and the customer-facing discovery and booking experience.",
			KeyFeatures: []string{
				"Provider onboarding with support for multiple skills/services per provider",
				"Service-provider profiles with structured listings",
				"Service discovery for customers",
				"Booking functionality",
				"Responsive interface across devices",
			},
			Challenges: "Modeling a data structure that cleanly supports a provider offering many different services, each with its own details, while keeping the onboarding flow simple rather than overwhelming.",
			Solutions:  "Built a flexible schema that treats each service as its own record linked to a provider, so the UI can render one profile with many services without special-casing single-service providers.",
			Outcome:    "A working marketplace platform demonstrating full-stack product thinking — from data modeling through to a usable booking flow. PLACEHOLDER: update with current deployment status.",
			Lessons:    "Reinforced the value of designing data models around real-world flexibility (one provider, many services) before writing UI code.",
		},
	},
	{
		ID:           "ascii-art-web",
		Featured:     false,
		Title:        "ASCII Art Web",
		Category:     "Go · Web Application",
		Badges:       []string{"Go", "Backend"},
		Description:  "A Go-based web application that converts user text into ASCII art using banner file parsing.",
		Technologies: []string{"Go", "HTML/CSS", "Banner file parsing"},
		GithubURL:    "https://github.com/joywuese74-web/Ascii-Art-Web.git",
		LiveURL:      "",
		Status:       "Complete",
		CaseStudy: CaseStudy{
			Overview: "ASCII Art Web takes plain text input and renders it as ASCII art in the browser, using predefined banner styles parsed from text files.",
			Problem:  "Converting text into stylized ASCII art requires correctly mapping each character to its multi-line banner representation and reassembling lines in the right order — easy to get subtly wrong.",
			Solution: "A Go backend parses banner files into a character map at startup, then processes each line of user input character-by-character, building the output row by row.",
			Role:     "Built the full application — banner parsing logic, input validation, character-to-art mapping, and the web handler serving the interface.",
			KeyFeatures: []string{
				"Multiple banner/font styles to choose from",
				"Line-by-line text-to-ASCII conversion",
				"Input validation for unsupported characters",
				"Web interface for entering text and viewing output",
			},
			Challenges: "Correctly handling runes rather than bytes so multi-line banner characters align properly, and validating input without silently dropping unsupported characters.",
			Solutions:  "Processed input as runes throughout, and added explicit validation with clear error handling before any rendering happens.",
			Outcome:    "A functioning web tool that reliably converts text to ASCII art across the supported banner styles.",
			Lessons:    "Deepened understanding of string/rune handling in Go and how to structure a small but correct text-processing pipeline.",
		},
	},
	{
		ID:           "cli-calculator",
		Featured:     false,
		Title:        "CLI Calculator",
		Category:     "Go · CLI",
		Badges:       []string{"Go", "CLI"},
		Description:  "A command-line calculator built in Go, supporting core arithmetic operations with interactive input handling.",
		Technologies: []string{"Go"},
		GithubURL:    "https://github.com/joywuese74-web/PLACEHOLDER_REPO",
		LiveURL:      "",
		Status:       "Complete",
		CaseStudy: CaseStudy{
			Overview: "A terminal-based calculator that takes interactive input and performs arithmetic operations, with error handling for invalid input.",
			Problem:  "A CLI tool needs to handle arbitrary user input gracefully — malformed expressions, division by zero, and unexpected characters — without crashing.",
			Solution: "Built an interactive read-parse-evaluate loop in Go that validates input before performing operations and reports clear errors instead of failing silently.",
			Role:     "Designed and implemented the entire application, including input parsing and the control flow loop.",
			KeyFeatures: []string{
				"Addition, subtraction, multiplication, and division",
				"Interactive prompt for continuous calculations",
				"Input validation and error messages",
				"Exit/quit handling",
			},
			Challenges: "Handling invalid or malformed input (e.g. division by zero, non-numeric values) without the program exiting unexpectedly.",
			Solutions:  "Wrapped parsing and evaluation in explicit error checks, surfacing readable messages back to the user and continuing the loop.",
			Outcome:    "A stable CLI tool that handles the core arithmetic operations reliably from the terminal.",
			Lessons:    "Practiced fundamental Go control flow, input parsing, and defensive error handling patterns used throughout backend work.",
		},
	},
}