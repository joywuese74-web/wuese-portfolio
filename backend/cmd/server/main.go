package main

import (
	"log"
	"net/http"
	"time"

	"portfolio-backend/internal/config"
	"portfolio-backend/internal/handlers"
	"portfolio-backend/internal/mailer"
	"portfolio-backend/internal/middleware"
)

func main() {
	cfg := config.Load()

	mail := mailer.New(cfg)
	if !mail.Configured() {
		log.Println("SMTP is not configured — contact form submissions will be logged, not emailed. Set SMTP_HOST, SMTP_USERNAME, SMTP_PASSWORD, and CONTACT_TO_EMAIL to enable real email delivery.")
	}

	contactHandler := handlers.NewContactHandler(mail)
	rateLimiter := middleware.NewRateLimiter(cfg.RateLimitPerMinute)

	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/health", handlers.Health)
	mux.HandleFunc("GET /api/projects", handlers.ListProjects)
	mux.HandleFunc("GET /api/projects/{id}", handlers.GetProject)
	mux.Handle("POST /api/contact", rateLimiter.Middleware(http.HandlerFunc(contactHandler.Submit)))

	var handler http.Handler = mux
	handler = middleware.CORS(cfg.AllowedOrigins, handler)
	handler = middleware.Logger(handler)

	srv := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      handler,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Printf("portfolio backend listening on :%s", cfg.Port)
	if err := srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}