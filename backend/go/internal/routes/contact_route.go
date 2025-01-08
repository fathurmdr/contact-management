package routes

import (
	"github.com/fathurmdr/backend/go/internal/controllers"
	"github.com/fathurmdr/backend/go/internal/middlewares"
	"github.com/gofiber/fiber/v2"
)

type ContactRoute struct{}

func (contactRoute *ContactRoute) SetupRoutes(app *fiber.App) {
	contactController := controllers.ContactController{}
	
	contactGroup := app.Group("/contact", middlewares.AuthMiddleware)
	contactGroup.Get("/", contactController.GetContacts)
	contactGroup.Get("/:id", contactController.GetContact)
	contactGroup.Post("/", contactController.AddContact)
	contactGroup.Put("/:id", contactController.UpdateContact)
	contactGroup.Delete("/:id", contactController.DeleteContact)
}
