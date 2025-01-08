package models

type Group struct {
	ID          uint    `gorm:"primaryKey;column:id" json:"id"`
	UserID      uint    `gorm:"column:user_id" json:"userId"`
	Name        string  `gorm:"column:name" json:"name"`
	Description *string `gorm:"column:description" json:"description"`
	CreatedAt   int64   `gorm:"column:created_at" json:"createdAt"`
	UpdatedAt   int64   `gorm:"column:updated_at" json:"updatedAt"`

	User    User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Members []Contact `gorm:"many2many:group_members" json:"contacts"`
}
