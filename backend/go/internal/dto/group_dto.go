package dto

type GroupRequest struct {
	Name        string  `json:"name" validate:"required"`
	Description *string `json:"description,omitempty"`
}

type GroupMemberRequest struct {
	ContactID uint `json:"contactId"`
}

type GroupWithMember struct {
	ID          uint      `json:"id"`
	Name        string    `json:"name"`
	Description *string   `json:"description"`
	Members     []Contact `json:"members"`
}
