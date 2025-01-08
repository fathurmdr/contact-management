package errors

import "github.com/gofiber/fiber/v2"

type ResponseError struct {
	Status int        
	Message string     
	Errors *interface{}
}



func NewAuthorizationError(message string, errors *interface{}) *ResponseError {
	if message == "" {
		message = "Not Authorized!"
	}
	return &ResponseError{
		Status: fiber.StatusUnauthorized,
		Message: message,
		Errors: errors,
	}
}


func NewForbiddenError(message string, errors *interface{}) *ResponseError {
	if message == "" {
		message = "Forbidden!"
	}
	return &ResponseError{
		Status: fiber.StatusForbidden,
		Message: message,
		Errors: errors,
	}
}


func NewNotFoundError(message string, errors *interface{}) *ResponseError {
	if message == "" {
		message = "Not Found!"
	}
	return &ResponseError{
		Status: fiber.StatusNotFound,
		Message: message,
		Errors: errors,
	}
}

func NewValidationError(message string, errors *interface{}) *ResponseError {
	if message == "" {
		message = "Request Not Valid!"
	}
	return &ResponseError{
		Status: fiber.StatusBadRequest,
		Message: message,
		Errors: errors,
	}
}


func NewApplicationError(message string, errors *interface{}) *ResponseError {
	if message == "" {
		message = "Something went wrong. Check logs for detail errors!"
	}
	return &ResponseError{
		Status: fiber.StatusInternalServerError,
		Message: message,
		Errors: errors,
	}
}
