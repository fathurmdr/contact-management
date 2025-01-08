package models

type Address struct {
	ID          uint    `gorm:"primaryKey;column:id" json:"id"`
	ContactID   uint    `gorm:"column:contact_id" json:"contactId"`
	Street      string  `gorm:"column:street" json:"street"`
	City        *string `gorm:"column:city" json:"city"`
	District    *string `gorm:"column:district" json:"district"`
	SubDistrict *string `gorm:"column:sub_district" json:"subDistrict"`
	PostalCode  *string `gorm:"column:postal_code" json:"postalCode"`
	CreatedAt   int64   `gorm:"column:created_at" json:"createdAt"`
	UpdatedAt   int64   `gorm:"column:updated_at" json:"updatedAt"`

	Contact Contact `gorm:"foreignKey:ContactID" json:"contact,omitempty"`
}
