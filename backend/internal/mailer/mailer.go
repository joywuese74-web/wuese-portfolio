package mailer

import (
	"fmt"
	"log"
	"net/smtp"
	"strings"
	"time"

	"portfolio-backend/internal/config"
	"portfolio-backend/internal/models"
)

// Mailer sends contact-form submissions as email.
type Mailer struct {
	cfg config.Config
}

func New(cfg config.Config) *Mailer {
	return &Mailer{cfg: cfg}
}

// Configured reports whether real SMTP credentials are present.
func (m *Mailer) Configured() bool {
	return m.cfg.SMTPHost != "" && m.cfg.SMTPUsername != "" && m.cfg.SMTPPassword != "" && m.cfg.ContactTo != ""
}

// Send delivers the contact submission by email. If SMTP isn't configured
// (e.g. local development), it logs the submission to stdout instead of
// failing, so the contact form still "works" without real credentials.
func (m *Mailer) Send(c models.ContactRequest) error {
	if !m.Configured() {
		log.Printf(
			"[contact-form] SMTP not configured — logging submission instead.\nName: %s\nEmail: %s\nSubject: %s\nMessage: %s\nReceived: %s\n",
			c.Name, c.Email, c.Subject, c.Message, time.Now().Format(time.RFC1123),
		)
		return nil
	}

	from := m.cfg.SMTPFrom
	if from == "" {
		from = m.cfg.SMTPUsername
	}

	subject := fmt.Sprintf("Portfolio contact: %s", c.Subject)
	body := fmt.Sprintf(
		"New message from your portfolio contact form.\n\nName: %s\nEmail: %s\nSubject: %s\n\nMessage:\n%s\n",
		c.Name, c.Email, c.Subject, c.Message,
	)

	msg := buildMessage(from, m.cfg.ContactTo, c.Email, subject, body)

	addr := fmt.Sprintf("%s:%d", m.cfg.SMTPHost, m.cfg.SMTPPort)
	auth := smtp.PlainAuth("", m.cfg.SMTPUsername, m.cfg.SMTPPassword, m.cfg.SMTPHost)

	return smtp.SendMail(addr, auth, from, []string{m.cfg.ContactTo}, msg)
}

func buildMessage(from, to, replyTo, subject, body string) []byte {
	headers := map[string]string{
		"From":         from,
		"To":           to,
		"Reply-To":     replyTo,
		"Subject":      subject,
		"MIME-Version": "1.0",
		"Content-Type": "text/plain; charset=\"utf-8\"",
	}

	var sb strings.Builder
	for k, v := range headers {
		sb.WriteString(fmt.Sprintf("%s: %s\r\n", k, v))
	}
	sb.WriteString("\r\n")
	sb.WriteString(body)

	return []byte(sb.String())
}