package config

import (
	"os"
	"strconv"
	"strings"
)

// Config holds all runtime configuration, sourced entirely from
// environment variables. Never hard-code secrets here.
type Config struct {
	Port string

	// Allowed CORS origins, e.g. the deployed frontend URL(s).
	AllowedOrigins []string

	// SMTP settings used to email contact-form submissions.
	// If SMTPHost is empty, the mailer falls back to logging
	// submissions to stdout instead of sending email.
	SMTPHost     string
	SMTPPort     int
	SMTPUsername string
	SMTPPassword string
	SMTPFrom     string
	ContactTo    string
	BrevoAPIKey  string

	// Simple per-IP rate limit for the contact endpoint.
	RateLimitPerMinute int
}

func Load() Config {
	return Config{
		Port:               getEnv("PORT", "8080"),
		AllowedOrigins:     splitAndTrim(getEnv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000")),
		SMTPHost:           getEnv("SMTP_HOST", ""),
		SMTPPort:           getEnvInt("SMTP_PORT", 587),
		SMTPUsername:       getEnv("SMTP_USERNAME", ""),
		SMTPPassword:       getEnv("SMTP_PASSWORD", ""),
		SMTPFrom:           getEnv("SMTP_FROM", ""),
		ContactTo:          getEnv("CONTACT_TO_EMAIL", ""),
		BrevoAPIKey:        getEnv("BREVO_API_KEY", ""),
		RateLimitPerMinute: getEnvInt("RATE_LIMIT_PER_MINUTE", 5),
	}
}

func getEnv(key, fallback string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return fallback
}

func getEnvInt(key string, fallback int) int {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		if n, err := strconv.Atoi(v); err == nil {
			return n
		}
	}
	return fallback
}

func splitAndTrim(s string) []string {
	parts := strings.Split(s, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p != "" {
			out = append(out, p)
		}
	}
	return out
}