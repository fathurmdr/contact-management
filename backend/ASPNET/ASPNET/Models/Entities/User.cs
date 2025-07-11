using System.ComponentModel.DataAnnotations;

namespace ASPNET.Models.Entities
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [StringLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;
        
        [Required]
        [StringLength(255)]
        public string Password { get; set; } = string.Empty;
        
        public string? Bio { get; set; }
        
        [Required]
        public long CreatedAt { get; set; }
        
        [Required]
        public long UpdatedAt { get; set; }

        // Navigation properties
        public virtual ICollection<Session> Sessions { get; set; } = new List<Session>();
        public virtual ICollection<Contact> Contacts { get; set; } = new List<Contact>();
        public virtual ICollection<Group> Groups { get; set; } = new List<Group>();
    }
}