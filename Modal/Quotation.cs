using System.ComponentModel.DataAnnotations;

namespace Quotations.Modal
{
    public class Quotation
    {
        public int Id { get; set; }
        public Company? Company { get; set; }
        [Required]
        public int CompanyId { get; set; }
        [Required]
        public int RentSum { get; set; }
        [Required]
        public DateTime RentStartDate { get; set; }
        [Required]
        public DateTime RentEndDate { get; set; }
        [Required]
        public DateTime ExpiryDate { get; set; }
        [Required]
        public DateTime Date { get; set; }
        public Boolean Status { get; set; }
        [Required]
        public List<QuotationDetail> Details { get; set; }

    }
}