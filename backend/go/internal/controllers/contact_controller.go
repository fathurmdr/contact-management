package controllers

import (
	"strconv"

	"github.com/fathurmdr/backend/go/internal/dto"
	"github.com/fathurmdr/backend/go/internal/models"
	"github.com/fathurmdr/backend/go/internal/services"
	"github.com/fathurmdr/backend/go/internal/utils"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type ContactController struct{}

func (contactController *ContactController) GetContacts(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)

	contactService := services.ContactService{}

	contacts, err := contactService.GetContacts(userData)
	if err != nil {
		panic(err)
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Contacts fetched successfully",
		"data": contacts,
	})
}

func (contactController *ContactController) GetContact(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)

	idParam := ctx.Params("id")
	contactID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		panic(utils.NewValidationError("", err.Error()))
	}

	contactService := services.ContactService{}

	contact, err := contactService.GetContact(userData, uint(contactID))
	if err != nil {
		panic(err)
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Contact fetched successfully",
		"data": contact,
	})
}

func (contactController *ContactController) AddContact(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)

	contactRequest := new(dto.Contact)
	if err := ctx.BodyParser(contactRequest); err != nil {
		panic(utils.NewValidationError("", err.Error()))
	}

	validate := validator.New() 

	if err := validate.Struct(contactRequest); err != nil {
		panic(utils.NewValidationError("", err.Error()))
	}

	contactService := services.ContactService{}

	err := contactService.AddContact(userData, contactRequest)
	if err != nil {
		panic(err)
	}

	return ctx.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "Contact added successfully",
	})
}

func (contactController *ContactController) UpdateContact(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)
	
	idParam := ctx.Params("id")
	contactID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		panic(utils.NewValidationError("", err.Error()))
	}

	contactRequest := new(dto.Contact)
	if err := ctx.BodyParser(contactRequest); err != nil {
		panic(utils.NewValidationError("", err.Error()))
	}

	validate := validator.New() 

	if err := validate.Struct(contactRequest); err != nil {
		panic(utils.NewValidationError("", err.Error()))
	}

	contactService := services.ContactService{}

	err = contactService.UpdateContact(userData, uint(contactID), contactRequest)
	if err != nil {
		panic(err)
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Contact updated successfully",
	})
}

func (contactController *ContactController) DeleteContact(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)

	idParam := ctx.Params("id")
	contactID, err := strconv.ParseUint(idParam, 10, 32)
	if err != nil {
		panic(utils.NewValidationError("", err.Error()))
	}

	contactService := services.ContactService{}

	err = contactService.DeleteContact(userData, uint(contactID))
	if err != nil {
		panic(err)
	}

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Contact deleted successfully",
	})
}