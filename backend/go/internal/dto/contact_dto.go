package dto

type Address struct {
	ID          uint    `json:"id"`
	ContactID   uint    `json:"contactId"`
	Street      string  `json:"street" validate:"required"`
	City        *string `json:"city"`
	District    *string `json:"district"`
	SubDistrict *string `json:"subDistrict"`
	PostalCode  *string `json:"postalCode"`
}

type Contact struct {
	ID          uint      `json:"id"`
	FullName    string    `json:"fullName" validate:"required"`
	NickName    *string   `json:"nickName"`
	PhoneNumber string    `json:"phoneNumber" validate:"required"`
	Email       *string   `json:"email"`
	Addresses   []Address `json:"addresses" validate:"dive"`
}