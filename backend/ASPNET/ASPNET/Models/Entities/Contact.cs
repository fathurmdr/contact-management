using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPNET.Models.Entities
{
    public class Contact
    {
        public int Id { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        [StringLength(255)]
        public string FullName { get; set; } = string.Empty;
        
        [StringLength(255)]
        public string? NickName { get; set; }
        
        [Required]
        [StringLength(20)]
        public string PhoneNumber { get; set; } = string.Empty;
        
        [EmailAddress]
        [StringLength(255)]
        public string? Email { get; set; }
        
        [Required]
        public long CreatedAt { get; set; }
        
        [Required]
        public long UpdatedAt { get; set; }

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
        
        public virtual ICollection<Address> Addresses { get; set; } = new List<Address>();
        public virtual ICollection<Group> Groups { get; set; } = new List<Group>();
    }
}