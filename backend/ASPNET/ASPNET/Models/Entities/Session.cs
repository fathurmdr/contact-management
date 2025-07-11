using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPNET.Models.Entities
{
    public class Session
    {
        [Key]
        [StringLength(255)]
        public string Id { get; set; } = string.Empty;
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public long ExpiresAt { get; set; }
        
        [Required]
        public long CreatedAt { get; set; }
        
        [Required]
        public long UpdatedAt { get; set; }

        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!;
    }
}