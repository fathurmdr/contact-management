package routes

import (
	"github.com/fathurmdr/backend/go/internal/controllers"
	"github.com/gofiber/fiber/v2"
)

type AuthRoute struct{}

func (authRoute *AuthRoute) SetupRoutes(app *fiber.App) {
	authController := controllers.AuthController{}

	app.Post("/auth/register", authController.Register)
	app.Post("/auth/login", authController.Login)
}
