using System.ComponentModel.DataAnnotations;

namespace Quotations.Modal
{
    public class Branch
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public Company? Company { get; set; }
        [Required]
        public int CompanyId { get; set; }
    }
}