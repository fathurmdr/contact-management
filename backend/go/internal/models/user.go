package models

type User struct {
	ID          uint    `gorm:"primaryKey;column:id" json:"id"`
	Name        string  `gorm:"column:name" json:"name"`
	Email       string  `gorm:"column:email" json:"email"`
	PhoneNumber string  `gorm:"column:phone_number" json:"phoneNumber"`
	Password    string  `gorm:"column:password" json:"password"`
	Bio         *string `gorm:"column:bio" json:"bio"`
	CreatedAt   int64   `gorm:"column:created_at" json:"createdAt"`
	UpdatedAt   int64   `gorm:"column:updated_at" json:"updatedAt"`

	Sessions []Session `gorm:"foreignKey:UserID" json:"sessions"`
	Contacts []Contact `gorm:"foreignKey:UserID" json:"contacts"`
	Groups   []Group   `gorm:"foreignKey:UserID" json:"groups"`
}
