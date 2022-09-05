using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Quotations.Persistance;
using Quotations.Modal;
using Microsoft.AspNetCore.Authorization;

namespace Quotations.Controllers
{
    [Authorize]
    [Route("/api/branches")]
    public class BranchesController : Controller
    {
        private QuotationDbContext _context { get; set; }

        public BranchesController(QuotationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _context.Branches.Include(b => b.Company).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            return Ok(await _context
                .Branches
                .SingleOrDefaultAsync(u => u.Id == Id));
        }


        [HttpPost]
        public async Task<ActionResult> post([FromBody] Branch branch)
        {
            if (!ModelState.IsValid) return BadRequest();


            await _context.Branches.AddAsync(branch);
            await _context.SaveChangesAsync();

            return Ok(branch);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> put(int Id, [FromBody] Branch branch)
        {
            if (!ModelState.IsValid) return BadRequest();

            var branchDb =
                await _context.Branches.AsNoTracking().SingleOrDefaultAsync(u => u.Id == Id);
            branch.Company = await _context.Companies.SingleOrDefaultAsync(b => b.Id == branch.CompanyId);

            if (branchDb != null)
            {
                _context.Branches.Update(branch);
                await _context.SaveChangesAsync();
            }

            return Ok(branch);
        }
    }
}