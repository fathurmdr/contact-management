package middlewares

import (
	"errors"

	"github.com/fathurmdr/backend/go/internal/utils"
	"github.com/gofiber/fiber/v2"
)


func ErrorMiddleware(ctx *fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError

	var responseError *utils.ResponseError
	if errors.As(err, &responseError) {
		ctx.Status(responseError.Status)

		if(responseError.Errors != nil) {
			return ctx.JSON(fiber.Map{
				"errorMsg": responseError.Message,
				"errors": responseError.Errors,
			})
		}
		
		return ctx.JSON(fiber.Map{
			"errorMsg": responseError.Message,
		})
	}

	var e *fiber.Error
	if errors.As(err, &e) {
			code = e.Code
	}

	return ctx.Status(code).SendString(err.Error())
}