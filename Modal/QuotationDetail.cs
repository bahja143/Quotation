using System.ComponentModel.DataAnnotations;

namespace Quotations.Modal
{
    public class QuotationDetail
    {
        public int Id { get; set; }
        public Quotation? Quotation { get; set; }
        [Required]
        public int QuotationId { get; set; }
        [Required]
        public string Make { get; set; }
        [Required]
        public string Model { get; set; }
        [Required]
        public string Group { get; set; }
        [Required]
        public string CheckOutLocation { get; set; }
        [Required]
        public string CheckInLocation { get; set; }
        [Required]
        public int NumberOfVehicles { get; set; }
        public string? Remark { get; set; }
        public List<QuotationDetailServices>? Services { get; set; }
    }
}