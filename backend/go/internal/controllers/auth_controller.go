package controllers

import (
	"github.com/fathurmdr/backend/go/internal/dto"
	"github.com/fathurmdr/backend/go/internal/services"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type AuthController struct{}

func (authController *AuthController) Register(ctx *fiber.Ctx) error {
	registerRequest := new(dto.RegisterRequest)
	if err := ctx.BodyParser(registerRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Invalid request body",
			"errors": err.Error(),
		})
	}

	validate := validator.New() 

	if err := validate.Struct(registerRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Validation Error",
			"errors":   err.Error(),
		})
	}

	authService := services.AuthService{}

	_, err := authService.Register(registerRequest)
	if err != nil {
		if err.Errors != nil {
			return ctx.Status(err.Status).JSON(fiber.Map{
				"errorMsg": err.Message,
				"errors": err.Errors,
			})
		}
		return ctx.Status(err.Status).JSON(fiber.Map{
			"errorMsg": err.Message,
		})
	}

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "User registered successfully",
	})
}

func (authController *AuthController) Login(ctx *fiber.Ctx) error{
	loginRequest := new(dto.LoginRequest)
	if err := ctx.BodyParser(loginRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Invalid request body",
			"errors": err.Error(),
		})
	}

	validate := validator.New() 

	if err := validate.Struct(loginRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Validation Error",
			"errors": err.Error(),
		})
	}


	authService := services.AuthService{}
	
	data, err := authService.Login(loginRequest);
	if err != nil {
		if err.Errors != nil {
			return ctx.Status(err.Status).JSON(fiber.Map{
				"errorMsg": err.Message,
				"errors": err.Errors,
			})
		}
		return ctx.Status(err.Status).JSON(fiber.Map{
			"errorMsg": err.Message,
		})
	}
	
	ctx.Status(fiber.StatusOK)
	return ctx.JSON(fiber.Map{
    "message": "User logged in successfully",
		"data": data,
  })
}