package main

import (
	"fmt"
	"log"

	"github.com/fathurmdr/backend/go/config"
	"github.com/fathurmdr/backend/go/internal/db"
	"github.com/fathurmdr/backend/go/internal/middlewares"
	"github.com/fathurmdr/backend/go/internal/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	cfg := config.LoadConfig()

	address := fmt.Sprintf("%s:%s", cfg.Host, cfg.Port)

	db.Init()
	defer db.Close()

	app := fiber.New(fiber.Config{
		ErrorHandler: middlewares.ErrorMiddleware,
	})

	app.Use(recover.New())

	app.Use(middlewares.SessionMiddleware)

	routes.SetupRoutes(app)


	log.Printf("Server is running on http://%s", address)
	log.Fatal(app.Listen(address))
}