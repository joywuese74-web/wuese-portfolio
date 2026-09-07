package models

import (
	"regexp"
	"strings"
)

var emailPattern = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

// ContactRequest mirrors the fields collected by the frontend contact form.
type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

// Validate trims whitespace in place and returns a map of field -> error
// message for any invalid fields. An empty map means the request is valid.
func (c *ContactRequest) Validate() map[string]string {
	c.Name = strings.TrimSpace(c.Name)
	c.Email = strings.TrimSpace(c.Email)
	c.Subject = strings.TrimSpace(c.Subject)
	c.Message = strings.TrimSpace(c.Message)

	errs := map[string]string{}

	if c.Name == "" {
		errs["name"] = "Name is required."
	} else if len(c.Name) > 120 {
		errs["name"] = "Name is too long."
	}

	if c.Email == "" {
		errs["email"] = "Email is required."
	} else if !emailPattern.MatchString(c.Email) {
		errs["email"] = "Enter a valid email address."
	}

	if c.Subject == "" {
		errs["subject"] = "Subject is required."
	} else if len(c.Subject) > 200 {
		errs["subject"] = "Subject is too long."
	}

	if c.Message == "" {
		errs["message"] = "Message is required."
	} else if len(c.Message) > 5000 {
		errs["message"] = "Message is too long."
	}

	return errs
}