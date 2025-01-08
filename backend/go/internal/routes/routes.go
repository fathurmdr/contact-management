package routes

import (
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	authRoute := AuthRoute{}
	contactRoute := ContactRoute{}
	groupRoute := GroupRoute{}
	
	authRoute.SetupRoutes(app)
	contactRoute.SetupRoutes(app)
	groupRoute.SetupRoutes(app)
}
