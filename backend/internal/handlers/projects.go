package handlers

import (
	"net/http"

	"portfolio-backend/internal/models"
)

// ListProjects returns every project. GET /api/projects
func ListProjects(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, models.Projects)
}

// GetProject returns a single project by id. GET /api/projects/{id}
func GetProject(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")

	for _, p := range models.Projects {
		if p.ID == id {
			writeJSON(w, http.StatusOK, p)
			return
		}
	}

	writeJSON(w, http.StatusNotFound, map[string]string{"message": "Project not found."})
}