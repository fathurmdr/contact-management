package services

import (
	"github.com/fathurmdr/backend/go/internal/db"
	"github.com/fathurmdr/backend/go/internal/dto"
	"github.com/fathurmdr/backend/go/internal/errors"
	"github.com/fathurmdr/backend/go/internal/models"
	"gorm.io/gorm"
)


type GroupService struct{}

func (groupService *GroupService) GetGroups(user models.User) (*[]dto.GroupWithMember, *errors.ResponseError) {
	var groups []models.Group

	err := db.DB.Model(&models.Group{}).
			Preload("Members", func(db *gorm.DB) *gorm.DB {
					return db.Preload("Addresses")
			}).
			Where("user_id = ?", user.ID).
			Find(&groups).Error

	if err != nil {
			return nil,  errors.NewApplicationError("", nil)
	}

	groupsResponse := make([]dto.GroupWithMember, 0)

	for _, group := range groups {
		members := make([]dto.Contact, 0)
		for _, member := range group.Members {
			addresses := make([]dto.Address, 0)
			for _, address := range member.Addresses {
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
			members = append(members, dto.Contact{
				ID:          member.ID,
				FullName:    member.FullName,
				NickName:    member.NickName,
				PhoneNumber: member.PhoneNumber,
				Email:       member.Email,
				Addresses:   addresses,
			})
		}
		groupsResponse = append(groupsResponse, dto.GroupWithMember{
			ID:          group.ID,
			Name:        group.Name,
			Description: group.Description,
			Members:     members,
		})
	}

	return &groupsResponse, nil
}

func (groupService *GroupService) GetGroup(user models.User, id uint) (*dto.GroupWithMember, *errors.ResponseError) {

	var group models.Group

	err := db.DB.Model(&models.Group{}).
			Preload("Members", func(db *gorm.DB) *gorm.DB {
					return db.Preload("Addresses")
			}).
			Where("user_id = ?", user.ID).Where("id = ?", id).First(&group).Error
	if err != nil {
		return nil, errors.NewNotFoundError("Group not found", nil)
	}


	members := make([]dto.Contact, 0)
	for _, member := range group.Members {
		addresses := make([]dto.Address, 0)
		for _, address := range member.Addresses {
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
		members = append(members, dto.Contact{
			ID:          member.ID,
			FullName:    member.FullName,
			NickName:    member.NickName,
			PhoneNumber: member.PhoneNumber,
			Email:       member.Email,
			Addresses:   addresses,
		})
	}

	groupResponse := dto.GroupWithMember{
		ID:          group.ID,
		Name:        group.Name,
		Description: group.Description,
		Members:     members,
	}

	return &groupResponse, nil
}

func (groupService *GroupService) AddGroup(user models.User, groupRequest *dto.GroupRequest) (*errors.ResponseError) {
	group := models.Group{
		UserID:      user.ID,
		Name:    groupRequest.Name,
		Description:    groupRequest.Description,
	}

	err := db.DB.Create(&group).Error
	if err != nil {
		return errors.NewApplicationError("", nil)
	}

	return nil
}

func (groupService *GroupService) UpdateGroup(user models.User, groupID uint, groupRequest *dto.GroupRequest) (*errors.ResponseError) {
	var group models.Group
	err := db.DB.Where("id = ? AND user_id = ?", groupID, user.ID).First(&group).Error
	if err != nil {
		return errors.NewNotFoundError("Group not found", nil)
	}

	group.Name = groupRequest.Name
	group.Description = groupRequest.Description

	err = db.DB.Save(&group).Error
	if err != nil {
		return errors.NewApplicationError("", nil)
	}

	return nil
}

func (groupService *GroupService) DeleteGroup(user models.User, groupID uint) (*errors.ResponseError) {
	var group models.Group
	err := db.DB.Where("id = ? AND user_id = ?", groupID, user.ID).First(&group).Error
	if err != nil {
		return errors.NewNotFoundError("Group not found", nil)
	}

	err = db.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Model(&group).Association("Members").Clear(); err != nil {
			return err
		}

		if err := tx.Delete(&group).Error; err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		return errors.NewApplicationError("Failed to delete group", nil)
	}

	return nil
}

func (groupService *GroupService) AddGroupMember( user models.User, groupID uint, groupMemberRequest *dto.GroupMemberRequest) (*errors.ResponseError) {
	var group models.Group
	
	err := db.DB.Preload("Members").Where("id = ? AND user_id = ?", groupID, user.ID).First(&group).Error
	if err != nil {
		return errors.NewValidationError("Group not found", nil)
	}
	
	for _, member := range group.Members {
		if member.ID == groupMemberRequest.ContactID {
			return errors.NewValidationError("Group member already exists", nil)
		}
	}

	var contact models.Contact
	
	err = db.DB.Where("id = ? AND user_id = ?", groupMemberRequest.ContactID, user.ID).First(&contact).Error
	if err != nil {
		return errors.NewValidationError("Contact not found", nil)
	}

	newMember := models.Contact{ID: groupMemberRequest.ContactID}
	if err := db.DB.Model(&group).Association("Members").Append(&newMember); err != nil {
		return  errors.NewApplicationError("Failed to add group member", nil)
	}

	return nil
}

func (groupService *GroupService) DeleteGroupMember( user models.User, groupID uint, groupMemberRequest *dto.GroupMemberRequest) (*errors.ResponseError) {
	var group models.Group

	err := db.DB.Preload("Members").Where("id = ? AND user_id = ?", groupID, user.ID).First(&group).Error
	if err != nil {
		return errors.NewValidationError("Group not found", nil)
	}

	isMemberExist := false
	for _, member := range group.Members {
		if member.ID == groupMemberRequest.ContactID {
			isMemberExist = true
			break
		}
	}

	if !isMemberExist {
		return errors.NewValidationError("Group member not found", nil)
	}


	existingMember := models.Contact{ID: groupMemberRequest.ContactID}
	if err := db.DB.Model(&group).Association("Members").Delete(&existingMember); err != nil {
		return  errors.NewApplicationError("Failed to delete group member", nil)
	}

	return nil
}
