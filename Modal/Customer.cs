using System.ComponentModel.DataAnnotations;

namespace Quotations.Modal
{
    public class Customer
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Telephone { get; set; }
        [Required]
        public string Category { get; set; }
        public string? Nationality { get; set; }
        public string? IdentityType { get; set; }
        public string? IdentityId { get; set; }
        public string? IdentityIssueDate { get; set; }
        public string? IdentityExpiryDate { get; set; }
        [Required]
        public DateTime Date { get; set; }

    }
}