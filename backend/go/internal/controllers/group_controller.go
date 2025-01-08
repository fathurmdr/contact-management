package controllers

import (
	"strconv"

	"github.com/fathurmdr/backend/go/internal/dto"
	"github.com/fathurmdr/backend/go/internal/models"
	"github.com/fathurmdr/backend/go/internal/services"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type GroupController struct{}

func (groupController *GroupController) GetGroups(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)

	groupService := services.GroupService{}

	groups, err := groupService.GetGroups(userData)
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
		"message": "Groups fetched successfully",
		"data": groups,
	})
}

func (groupController *GroupController) GetGroup(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)

	idParam := ctx.Params("id")
	groupID,_ := strconv.ParseUint(idParam, 10, 32)

	groupService := services.GroupService{}

	group, err := groupService.GetGroup(userData, uint(groupID))
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
		"message": "Group fetched successfully",
		"data": group,
	})
}

func (groupController *GroupController) AddGroup(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)

	groupRequest := new(dto.GroupRequest)
	if err := ctx.BodyParser(groupRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Invalid request body",
			"errors": err.Error(),
		})
	}

	validate := validator.New() 

	if err := validate.Struct(groupRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Validation Error",
			"errors":   err.Error(),
		})
	}

	groupService := services.GroupService{}

	err := groupService.AddGroup(userData, groupRequest)
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
		"message": "Group added successfully",
	})
}

func (groupController *GroupController) UpdateGroup(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)
	
	idParam := ctx.Params("id")
	groupID,_ := strconv.ParseUint(idParam, 10, 32)

	groupRequest := new(dto.GroupRequest)
	if err := ctx.BodyParser(groupRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Invalid request body",
			"errors": err.Error(),
		})
	}

	validate := validator.New() 

	if err := validate.Struct(groupRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Validation Error",
			"errors":   err.Error(),
		})
	}

	groupService := services.GroupService{}

	err := groupService.UpdateGroup(userData, uint(groupID), groupRequest)
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
		"message": "Group updated successfully",
	})
}

func (groupController *GroupController) DeleteGroup(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)

	idParam := ctx.Params("id")
	groupID,_ := strconv.ParseUint(idParam, 10, 32)

	groupService := services.GroupService{}

	err := groupService.DeleteGroup(userData, uint(groupID))
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
		"message": "Group deleted successfully",
	})
}

func (groupController *GroupController) AddGroupMember(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)
	
	idParam := ctx.Params("id")
	groupID,_ := strconv.ParseUint(idParam, 10, 32)

	groupMemberRequest := new(dto.GroupMemberRequest)
	if err := ctx.BodyParser(groupMemberRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Invalid request body",
			"errors": err.Error(),
		})
	}

	validate := validator.New() 

	if err := validate.Struct(groupMemberRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Validation Error",
			"errors":   err.Error(),
		})
	}

	groupService := services.GroupService{}

	err := groupService.AddGroupMember(userData, uint(groupID), groupMemberRequest)
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
		"message": "Group member added successfully",
	})
}

func (groupController *GroupController) DeleteGroupMember(ctx *fiber.Ctx) error {
	userData := ctx.Locals("User").(models.User)
	
	idParam := ctx.Params("id")
	groupID,_ := strconv.ParseUint(idParam, 10, 32)

	groupMemberRequest := new(dto.GroupMemberRequest)
	if err := ctx.BodyParser(groupMemberRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Invalid request body",
			"errors": err.Error(),
		})
	}

	validate := validator.New() 

	if err := validate.Struct(groupMemberRequest); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errorMsg": "Validation Error",
			"errors":   err.Error(),
		})
	}

	groupService := services.GroupService{}

	err := groupService.DeleteGroupMember(userData, uint(groupID), groupMemberRequest)
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
		"message": "Group member deleted successfully",
	})
}