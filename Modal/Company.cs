using System.ComponentModel.DataAnnotations;

namespace Quotations.Modal
{
    public class Company
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public Customer? Customer { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public DateTime Date { get; set; }

    }
}