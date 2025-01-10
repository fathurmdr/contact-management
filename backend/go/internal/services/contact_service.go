package services

import (
	"github.com/fathurmdr/backend/go/internal/db"
	"github.com/fathurmdr/backend/go/internal/dto"
	"github.com/fathurmdr/backend/go/internal/models"
	"github.com/fathurmdr/backend/go/internal/utils"
	"gorm.io/gorm"
)


type ContactService struct{}

func (contactService *ContactService) GetContacts(user models.User) (*[]dto.Contact, error) {
	var contacts []models.Contact

	err := db.DB.Model(&models.Contact{}).
			Preload("Addresses", func(db *gorm.DB) *gorm.DB {
					return db.Select("ID", "ContactID", "Street", "City", "District", "SubDistrict", "PostalCode")
			}).
			Select("ID", "FullName", "NickName", "PhoneNumber", "Email").
			Where("user_id = ?", user.ID).
			Find(&contacts).Error

	if err != nil {
			return nil,  utils.NewApplicationError("", nil)
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

func (contactService *ContactService) GetContact(user models.User, id uint) (*dto.Contact, error) {

	var contact models.Contact

	err := db.DB.
				Preload("Addresses", func(db *gorm.DB) *gorm.DB {
						return db.Select("ID", "ContactID", "Street", "City", "District", "SubDistrict", "PostalCode")
				}).
				Select("ID", "FullName", "NickName", "PhoneNumber", "Email").
				Where("user_id = ?", user.ID).First(&contact).Error
	if err != nil {
		return nil, utils.NewNotFoundError("Contact not found", nil)
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

func (contactService *ContactService) AddContact(user models.User, contactRequest *dto.Contact) (error) {
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
		return utils.NewApplicationError("", nil)
	}

	return nil
}

func (contactService *ContactService) UpdateContact(user models.User, contactID uint, contactRequest *dto.Contact) (error) {
	var contact models.Contact
	err := db.DB.Where("id = ? AND user_id = ?", contactID, user.ID).First(&contact).Error
	if err != nil {
		return utils.NewNotFoundError("Contact not found", nil)
	}

	contact.FullName = contactRequest.FullName
	contact.NickName = contactRequest.NickName
	contact.PhoneNumber = contactRequest.PhoneNumber
	contact.Email = contactRequest.Email

	err = db.DB.Where("contact_id = ?", contact.ID).Delete(&models.Address{}).Error
	if err != nil {
		return utils.NewApplicationError("", nil)
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
		return utils.NewApplicationError("", nil)
	}

	return nil
}

func (contactService *ContactService) DeleteContact(user models.User, contactID uint) (error) {

	var contact models.Contact
	err := db.DB.Where("id = ? AND user_id = ?", contactID, user.ID).First(&contact).Error
	if err != nil {
		return utils.NewNotFoundError("Contact not found", nil)
	}

	err = db.DB.Transaction(func(tx *gorm.DB) error {
		var address models.Address
		err = tx.Where("contact_id = ?", contact.ID).Delete(&address).Error
		if err != nil {
			return err
		}

		err = tx.Model(&contact).Association("Groups").Clear()
		if err != nil {
			return err
		}

		err = tx.Delete(&contact).Error
		if err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return utils.NewApplicationError("Failed to delete contact", nil)
	}

	return nil
}
