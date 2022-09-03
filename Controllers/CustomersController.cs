using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Quotations.Persistance;
using Quotations.Modal;

namespace Quotations.Controllers
{
    [Route("/api/customers")]
    public class CustomersController : Controller
    {
        private QuotationDbContext _context { get; set; }

        public CustomersController(QuotationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            return Ok(await _context
                .Customers
                .SingleOrDefaultAsync(u => u.Id == Id));
        }


        [HttpPost]
        public async Task<ActionResult> post([FromBody] Customer customer)
        {
            if (!ModelState.IsValid) return BadRequest();


            await _context.Customers.AddAsync(customer);
            await _context.SaveChangesAsync();

            return Ok(customer);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> put(int Id, [FromBody] Customer customer)
        {
            if (!ModelState.IsValid) return BadRequest();

            var customerDb =
                await _context.Customers.AsNoTracking().SingleOrDefaultAsync(u => u.Id == Id);

            if (customerDb != null)
            {
                _context.Customers.Update(customer);
                await _context.SaveChangesAsync();
            }

            return Ok(customer);
        }
    }
}