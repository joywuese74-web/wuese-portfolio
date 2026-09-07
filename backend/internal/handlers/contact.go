package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"portfolio-backend/internal/mailer"
	"portfolio-backend/internal/models"
)

type ContactHandler struct {
	Mailer *mailer.Mailer
}

func NewContactHandler(m *mailer.Mailer) *ContactHandler {
	return &ContactHandler{Mailer: m}
}

func (h *ContactHandler) Submit(w http.ResponseWriter, r *http.Request) {
	var req models.ContactRequest

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(&req); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]any{
			"success": false,
			"message": "Malformed request body.",
		})
		return
	}

	if errs := req.Validate(); len(errs) > 0 {
		writeJSON(w, http.StatusUnprocessableEntity, map[string]any{
			"success": false,
			"errors":  errs,
		})
		return
	}

	if err := h.Mailer.Send(req); err != nil {
		log.Printf("failed to send contact email: %v", err)
		writeJSON(w, http.StatusInternalServerError, map[string]any{
			"success": false,
			"message": "Something went wrong sending your message. Please try again later.",
		})
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{
		"success": true,
		"message": "Message sent — thank you. I'll reply soon.",
	})
}