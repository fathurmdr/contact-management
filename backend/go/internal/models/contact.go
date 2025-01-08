package models

type Contact struct {
	ID          uint    `gorm:"primaryKey;column:id" json:"id"`
	UserID      uint    `gorm:"column:user_id" json:"userId"`
	FullName    string  `gorm:"column:full_name" json:"fullName"`
	NickName    *string `gorm:"column:nick_name" json:"nickName"`
	PhoneNumber string  `gorm:"column:phone_number" json:"phoneNumber"`
	Email       *string `gorm:"column:email" json:"email"`
	CreatedAt   int64   `gorm:"column:created_at" json:"createdAt"`
	UpdatedAt   int64   `gorm:"column:updated_at" json:"updatedAt"`

	User      User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Addresses []Address `gorm:"foreignKey:ContactID" json:"addresses"`
	Groups    []Group   `gorm:"many2many:group_members" json:"groups"`
}
