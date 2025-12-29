using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty; // Nu salvăm niciodată parola în clar!

        [Required]
        [StringLength(13, MinimumLength = 13)]
        public string CNP { get; set; } = string.Empty; // Important pentru verificarea vârstei (+18)

        [Required]
        public string Address { get; set; } = string.Empty;

        // Specific pentru Slot Machine
        public decimal Balance { get; set; } = 0; // Soldul jucătorului

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
