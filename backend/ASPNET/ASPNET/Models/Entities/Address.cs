using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ASPNET.Models.Entities
{
    public class Address
    {
        public int Id { get; set; }
        
        [Required]
        public int ContactId { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Street { get; set; } = string.Empty;
        
        [StringLength(100)]
        public string? City { get; set; }
        
        [StringLength(100)]
        public string? District { get; set; }
        
        [StringLength(100)]
        public string? SubDistrict { get; set; }
        
        [StringLength(10)]
        public string? PostalCode { get; set; }
        
        [Required]
        public long CreatedAt { get; set; }
        
        [Required]
        public long UpdatedAt { get; set; }

        // Navigation properties
        [ForeignKey("ContactId")]
        public virtual Contact Contact { get; set; } = null!;
    }
}