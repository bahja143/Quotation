using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Quotations.Persistance;
using Quotations.Modal;

namespace Quotations.Controllers
{
    [Route("/api/companies")]
    public class CompaniesController : Controller
    {
        private QuotationDbContext _context { get; set; }

        public CompaniesController(QuotationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _context.Companies.Include(c => c.Customer).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            return Ok(await _context
                .Companies
                .SingleOrDefaultAsync(u => u.Id == Id));
        }


        [HttpPost]
        public async Task<ActionResult> post([FromBody] Company company)
        {
            if (!ModelState.IsValid) return BadRequest();


            await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();

            return Ok(company);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> put(int Id, [FromBody] Company company)
        {
            if (!ModelState.IsValid) return BadRequest();

            var companyDb =
                await _context.Companies.Include(c => c.Customer).AsNoTracking().SingleOrDefaultAsync(u => u.Id == Id);
            company.Customer = await _context.Customers.SingleOrDefaultAsync(c => c.Id == company.CustomerId);

            if (companyDb != null)
            {
                _context.Companies.Update(company);
                await _context.SaveChangesAsync();
            }

            return Ok(company);
        }
    }
}