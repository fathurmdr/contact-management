package services

import (
	"github.com/fathurmdr/backend/go/internal/db"
	"github.com/fathurmdr/backend/go/internal/dto"
	"github.com/fathurmdr/backend/go/internal/errors"
	"github.com/fathurmdr/backend/go/internal/models"
	"gorm.io/gorm"
)


type ContactService struct{}

func (contactService *ContactService) GetContacts(user models.User) (*[]dto.Contact, *errors.ResponseError) {
	var contacts []models.Contact

	err := db.DB.Model(&models.Contact{}).
			Preload("Addresses", func(db *gorm.DB) *gorm.DB {
					return db.Select("ID", "ContactID", "Street", "City", "District", "SubDistrict", "PostalCode")
			}).
			Select("ID", "FullName", "NickName", "PhoneNumber", "Email").
			Where("user_id = ?", user.ID).
			Find(&contacts).Error

	if err != nil {
			return nil,  errors.NewApplicationError("", nil)
	}

	contactsResponse := make([]dto.Contact,0)

	for _, contact := range contacts {
		addresses := make([]dto.Address,0)
		for _, address := range contact.Addresses {
			addresses = append(addresses, dto.Address{
				ID:          address.ID,
				ContactID:   address.ContactID,
				Street:      address.Street,
				City:        address.City,
				District:    address.District,
				SubDistrict: address.SubDistrict,
				PostalCode:  address.PostalCode,
			})
		}
		contactsResponse = append(contactsResponse, dto.Contact{
			ID:          contact.ID,
			FullName:    contact.FullName,
			NickName:    contact.NickName,
			PhoneNumber: contact.PhoneNumber,
			Email:       contact.Email,
			Addresses:   addresses,
		})
	}

	return &contactsResponse, nil
}

func (contactService *ContactService) GetContact(user models.User, id uint) (*dto.Contact, *errors.ResponseError) {

	var contact models.Contact

	err := db.DB.
				Preload("Addresses", func(db *gorm.DB) *gorm.DB {
						return db.Select("ID", "ContactID", "Street", "City", "District", "SubDistrict", "PostalCode")
				}).
				Select("ID", "FullName", "NickName", "PhoneNumber", "Email").
				Where("user_id = ?", user.ID).First(&contact).Error
	if err != nil {
		return nil, errors.NewNotFoundError("Contact not found", nil)
	}


	addresses := make([]dto.Address,0)
	for _, address := range contact.Addresses {
		addresses = append(addresses, dto.Address{
			ID:          address.ID,
			ContactID:   address.ContactID,
			Street:      address.Street,
			City:        address.City,
			District:    address.District,
			SubDistrict: address.SubDistrict,
			PostalCode:  address.PostalCode,
		})
	}
	
	contactResponse := dto.Contact{
		ID:          contact.ID,
		FullName:    contact.FullName,
		NickName:    contact.NickName,
		PhoneNumber: contact.PhoneNumber,
		Email:       contact.Email,
		Addresses:   addresses,
	}

	return &contactResponse, nil
}

func (contactService *ContactService) AddContact(user models.User, contactRequest *dto.Contact) (*errors.ResponseError) {
	contact := models.Contact{
		UserID:      user.ID,
		FullName:    contactRequest.FullName,
		NickName:    contactRequest.NickName,
		PhoneNumber: contactRequest.PhoneNumber,
		Email:       contactRequest.Email,
	}

	for _, address := range contactRequest.Addresses {
		contact.Addresses = append(contact.Addresses, models.Address{
			Street: address.Street,
			City: address.City,
			District: address.District,
			SubDistrict: address.SubDistrict,
			PostalCode: address.PostalCode,
		})
	}


	err := db.DB.Create(&contact).Error
	if err != nil {
		return errors.NewApplicationError("", nil)
	}

	return nil
}

func (contactService *ContactService) UpdateContact(user models.User, contactID uint, contactRequest *dto.Contact) (*errors.ResponseError) {
	var contact models.Contact
	err := db.DB.Where("id = ? AND user_id = ?", contactID, user.ID).First(&contact).Error
	if err != nil {
		return errors.NewNotFoundError("Contact not found", nil)
	}

	contact.FullName = contactRequest.FullName
	contact.NickName = contactRequest.NickName
	contact.PhoneNumber = contactRequest.PhoneNumber
	contact.Email = contactRequest.Email

	err = db.DB.Where("contact_id = ?", contact.ID).Delete(&models.Address{}).Error
	if err != nil {
		return errors.NewApplicationError("", nil)
	}

	for _, address := range contactRequest.Addresses {
		contact.Addresses = append(contact.Addresses, models.Address{
			Street:      address.Street,
			City:        address.City,
			District:    address.District,
			SubDistrict: address.SubDistrict,
			PostalCode:  address.PostalCode,
		})
	}

	err = db.DB.Save(&contact).Error
	if err != nil {
		return errors.NewApplicationError("", nil)
	}

	return nil
}

func (contactService *ContactService) DeleteContact(user models.User, contactID uint) (*errors.ResponseError) {
	var contact models.Contact
	err := db.DB.Where("id = ? AND user_id = ?", contactID, user.ID).First(&contact).Error
	if err != nil {
		return errors.NewNotFoundError("Contact not found", nil)
	}

	err = db.DB.Where("contact_id = ?", contact.ID).Delete(&models.Address{}).Error
	if err != nil {
		return errors.NewApplicationError("Failed to delete addresses", nil)
	}

	err = db.DB.Delete(&contact).Error
	if err != nil {
		return errors.NewApplicationError("Failed to delete contact", nil)
	}

	return nil
}
