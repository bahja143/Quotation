using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Quotations.Persistance;
using Quotations.Modal;

namespace Quotations.Controllers
{
    [Route("/api/quotations")]
    public class QuotationsController : Controller
    {
        private QuotationDbContext _context { get; set; }

        public QuotationsController(QuotationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _context.Quotations.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            return Ok(await _context
                .Quotations
                .SingleOrDefaultAsync(u => u.Id == Id));
        }


        [HttpPost]
        public async Task<ActionResult> post([FromBody] Quotation quotation)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            await _context.Quotations.AddAsync(quotation);
            await _context.SaveChangesAsync();

            return Ok(quotation);
        }

    }
}