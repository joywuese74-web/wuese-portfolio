package mailer

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"portfolio-backend/internal/config"
	"portfolio-backend/internal/models"
)

const brevoAPIURL = "https://api.brevo.com/v3/smtp/email"

// Mailer sends contact-form submissions as email via Brevo's HTTP API.
// (Not raw SMTP — many free hosting platforms, including Render's free
// tier, block outbound SMTP ports like 587 entirely. The HTTP API runs
// over plain HTTPS, which is never blocked.)
type Mailer struct {
	cfg config.Config
}

func New(cfg config.Config) *Mailer {
	return &Mailer{cfg: cfg}
}

// Configured reports whether real Brevo credentials are present.
func (m *Mailer) Configured() bool {
	return m.cfg.BrevoAPIKey != "" && m.cfg.SMTPFrom != "" && m.cfg.ContactTo != ""
}

type brevoSender struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type brevoRecipient struct {
	Email string `json:"email"`
}

type brevoEmailRequest struct {
	Sender      brevoSender      `json:"sender"`
	To          []brevoRecipient `json:"to"`
	ReplyTo     *brevoSender     `json:"replyTo,omitempty"`
	Subject     string           `json:"subject"`
	TextContent string           `json:"textContent"`
}

// Send delivers the contact submission by email via Brevo's API. If Brevo
// isn't configured (e.g. local development), it logs the submission to
// stdout instead, so the contact form still "works" without credentials.
func (m *Mailer) Send(c models.ContactRequest) error {
	if !m.Configured() {
		log.Printf(
			"[contact-form] Brevo not configured — logging submission instead.\nName: %s\nEmail: %s\nSubject: %s\nMessage: %s\nReceived: %s\n",
			c.Name, c.Email, c.Subject, c.Message, time.Now().Format(time.RFC1123),
		)
		return nil
	}

	body := brevoEmailRequest{
		Sender: brevoSender{Name: "Portfolio Contact Form", Email: m.cfg.SMTPFrom},
		To:     []brevoRecipient{{Email: m.cfg.ContactTo}},
		ReplyTo: &brevoSender{
			Name:  c.Name,
			Email: c.Email,
		},
		Subject: fmt.Sprintf("Portfolio contact: %s", c.Subject),
		TextContent: fmt.Sprintf(
			"New message from your portfolio contact form.\n\nName: %s\nEmail: %s\nSubject: %s\n\nMessage:\n%s\n",
			c.Name, c.Email, c.Subject, c.Message,
		),
	}

	payload, err := json.Marshal(body)
	if err != nil {
		return fmt.Errorf("failed to build request: %w", err)
	}

	req, err := http.NewRequest(http.MethodPost, brevoAPIURL, bytes.NewReader(payload))
	if err != nil {
		return fmt.Errorf("failed to build request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")
	req.Header.Set("api-key", m.cfg.BrevoAPIKey)

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to reach Brevo: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 300 {
		respBody, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("brevo returned status %d: %s", resp.StatusCode, string(respBody))
	}

	return nil
}