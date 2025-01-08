package controllers

import (
	"strconv"

	"github.com/fathurmdr/backend/go/internal/dto"
	"github.com/fathurmdr/backend/go/internal/models"
	"github.com/fathurmdr/backend/go/internal/services"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type ContactController struct{}

func (contactController *ContactController) GetContacts(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)

	contactService := services.ContactService{}

	contacts, err := contactService.GetContacts(userData)
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

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Contacts fetched successfully",
		"data": contacts,
	})
}

func (contactController *ContactController) GetContact(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)

	idParam := ctx.Params("id")
	contactID,_ := strconv.ParseUint(idParam, 10, 32)

	contactService := services.ContactService{}

	contact, err := contactService.GetContact(userData, uint(contactID))
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

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Contact fetched successfully",
		"data": contact,
	})
}

func (contactController *ContactController) AddContact(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)

	contactRequest := new(dto.Contact)
	if err := ctx.BodyParser(contactRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Invalid request body",
			"errors": err.Error(),
		})
	}

	validate := validator.New() 

	if err := validate.Struct(contactRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Validation Error",
			"errors":   err.Error(),
		})
	}

	contactService := services.ContactService{}

	err := contactService.AddContact(userData, contactRequest)
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
		"message": "Contact added successfully",
	})
}

func (contactController *ContactController) UpdateContact(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)
	
	idParam := ctx.Params("id")
	contactID,_ := strconv.ParseUint(idParam, 10, 32)

	contactRequest := new(dto.Contact)
	if err := ctx.BodyParser(contactRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Invalid request body",
			"errors": err.Error(),
		})
	}

	validate := validator.New() 

	if err := validate.Struct(contactRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Validation Error",
			"errors":   err.Error(),
		})
	}

	contactService := services.ContactService{}

	err := contactService.UpdateContact(userData, uint(contactID), contactRequest)
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

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Contact updated successfully",
	})
}

func (contactController *ContactController) DeleteContact(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)

	idParam := ctx.Params("id")
	contactID,_ := strconv.ParseUint(idParam, 10, 32)

	contactService := services.ContactService{}

	err := contactService.DeleteContact(userData, uint(contactID))
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

	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Contact deleted successfully",
	})
}