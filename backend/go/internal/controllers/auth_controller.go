package controllers

import (
	"github.com/fathurmdr/backend/go/internal/dto"
	"github.com/fathurmdr/backend/go/internal/services"
	"github.com/fathurmdr/backend/go/internal/utils"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type AuthController struct{}

func (authController *AuthController) Register(ctx *fiber.Ctx) error {
	registerRequest := new(dto.RegisterRequest)
	if err := ctx.BodyParser(registerRequest); err != nil {
		panic(utils.NewValidationError("", err.Error()))
	}

	validate := validator.New() 

	if err := validate.Struct(registerRequest); err != nil {
		panic(utils.NewValidationError("", err.Error()))
	}

	authService := services.AuthService{}

	_, err := authService.Register(registerRequest)
	if err != nil {
		panic(err)
	}

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "User registered successfully",
	})
}

func (authController *AuthController) Login(ctx *fiber.Ctx) error{
	loginRequest := new(dto.LoginRequest)
	if err := ctx.BodyParser(loginRequest); err != nil {
		panic(utils.NewValidationError("", err.Error()))
	}

	validate := validator.New() 

	if err := validate.Struct(loginRequest); err != nil {
		panic(utils.NewValidationError("", err.Error()))
	}


	authService := services.AuthService{}
	
	data, err := authService.Login(loginRequest);
	if err != nil {
		panic(err)
	}
	
	ctx.Status(fiber.StatusOK)
	return ctx.JSON(fiber.Map{
    "message": "User logged in successfully",
		"data": data,
  })
}