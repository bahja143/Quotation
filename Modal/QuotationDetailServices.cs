using System.ComponentModel.DataAnnotations;

namespace Quotations.Modal
{
    public class QuotationDetailServices
    {
        public int Id { get; set; }
        [Required]
        public string ServiceName { get; set; }
        public int Amount { get; set; }
        public int Quantity { get; set; }
        public int Total { get; set; }
    }
}
