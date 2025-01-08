package routes

import (
	"github.com/fathurmdr/backend/go/internal/controllers"
	"github.com/fathurmdr/backend/go/internal/middlewares"
	"github.com/gofiber/fiber/v2"
)

type GroupRoute struct{}

func (groupRoute *GroupRoute) SetupRoutes(app *fiber.App) {
	groupController := controllers.GroupController{}
	
	groupGroup := app.Group("/group", middlewares.AuthMiddleware)
	groupGroup.Get("/", groupController.GetGroups)
	groupGroup.Get("/:id", groupController.GetGroup)
	groupGroup.Post("/", groupController.AddGroup)
	groupGroup.Put("/:id", groupController.UpdateGroup)
	groupGroup.Delete("/:id", groupController.DeleteGroup)
	groupGroup.Post("/:id/member", groupController.AddGroupMember)
	groupGroup.Delete("/:id/member", groupController.DeleteGroupMember)
}
