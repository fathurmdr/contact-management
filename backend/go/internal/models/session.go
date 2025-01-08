package models

import "github.com/google/uuid"

type Session struct {
	ID        uuid.UUID `gorm:"primaryKey;type:uuid;default:uuid_generate_v4()" json:"id"`
	UserID    uint      `gorm:"column:user_id" json:"userId"`
	ExpiresAt int64     `gorm:"column:expires_at" json:"expiresAt"`
	CreatedAt int64     `gorm:"column:created_at" json:"createdAt"`
	UpdatedAt int64     `gorm:"column:updated_at" json:"updatedAt"`

	User User `gorm:"foreignKey:UserID"`
}
