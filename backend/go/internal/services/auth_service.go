package services

import (
	"time"

	"github.com/fathurmdr/backend/go/internal/db"
	"github.com/fathurmdr/backend/go/internal/dto"
	"github.com/fathurmdr/backend/go/internal/errors"
	"github.com/fathurmdr/backend/go/internal/models"
	"golang.org/x/crypto/bcrypt"
)


type AuthService struct{}

func (authService *AuthService) Register(registerRequest *dto.RegisterRequest) (*models.User, *errors.ResponseError) {
	var existingUser models.User
	err := db.DB.Where("email = ? OR phone_number = ?", registerRequest.Email, registerRequest.PhoneNumber).First(&existingUser).Error
	if err == nil {
		return nil, errors.NewValidationError("Email or phone number already used", nil)
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(registerRequest.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.NewApplicationError("", nil)
	}

	user := &models.User{
		Name:        registerRequest.Name,
		Email:       registerRequest.Email,
		PhoneNumber: registerRequest.PhoneNumber,
		Password:    string(hashedPassword),
		Bio:         registerRequest.Bio,
	}
	err = db.DB.Create(&user).Error
	if err != nil {
		return nil,  errors.NewApplicationError("", nil)
	}

	return user, nil
}

func (authService *AuthService) Login(loginRequest *dto.LoginRequest) (map[string]interface{},  *errors.ResponseError) {
	var user models.User
	err := db.DB.Where("email = ? OR phone_number = ?", loginRequest.EmailOrPhoneNumber, loginRequest.EmailOrPhoneNumber).First(&user).Error
	if err != nil {
		return nil, errors.NewAuthorizationError("Email, phone number, or password is incorrect", nil)
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginRequest.Password))
	if err != nil {
		return nil, errors.NewAuthorizationError("Email, phone number, or password is incorrect", nil)
	}

	session := models.Session{
		UserID:    user.ID,
		ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
	}
	err = db.DB.Create(&session).Error
	if err != nil {
		return nil, errors.NewApplicationError("", nil)
	}

	return map[string]interface{}{
		"sessionId": session.ID,
		"expiresAt": session.ExpiresAt,
	}, nil
}
