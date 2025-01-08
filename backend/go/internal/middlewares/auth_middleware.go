package middlewares

import (
	"github.com/gofiber/fiber/v2"
)

func AuthMiddleware(ctx *fiber.Ctx) error {
	user:= ctx.Locals("User")

	if user == nil {
		return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"errorMsg": "Unauthorized",
		})
	}

	return ctx.Next()
}