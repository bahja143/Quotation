using System.ComponentModel.DataAnnotations;

namespace Quotations.Modal
{
    public class QuotationDetailServices
    {
        public int Id { get; set; }
        [Required]
        public string ServiceName { get; set; }
        [Required]
        public int Amount { get; set; }
    }
}
