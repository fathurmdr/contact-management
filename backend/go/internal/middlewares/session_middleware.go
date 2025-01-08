package middlewares

import (
	"errors"
	"time"

	"github.com/fathurmdr/backend/go/internal/db"
	"github.com/fathurmdr/backend/go/internal/models"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func SessionMiddleware(ctx *fiber.Ctx) error {
	sessionID := ctx.Get("x-session-id")
	if sessionID == "" {
		return ctx.Next()
	}

	var session models.Session

	err := db.DB.Preload("User").First(&session, "id = ?", sessionID).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return ctx.Next()
	}


	if session.ExpiresAt < time.Now().Unix() {
		return ctx.Status(fiber.StatusForbidden).JSON(fiber.Map{
			"error": "Session expired",
		})
	}

	ctx.Locals("User", session.User)

	return ctx.Next()
}