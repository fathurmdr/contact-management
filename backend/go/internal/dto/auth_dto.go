package dto

type RegisterRequest struct {
	Name        string  `json:"name" validate:"required"`
	Email       string  `json:"email" validate:"required,email"`
	PhoneNumber string  `json:"phoneNumber" validate:"required"`
	Password    string  `json:"password" validate:"required,min=8"`
	Bio         *string `json:"bio,omitempty"`
}

type LoginRequest struct {
	EmailOrPhoneNumber string `json:"emailOrPhonenumber" validate:"required"`
	Password           string `json:"password" validate:"required"`
}