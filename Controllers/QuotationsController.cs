using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Quotations.Persistance;
using Quotations.Modal;
using Microsoft.AspNetCore.Authorization;

namespace Quotations.Controllers
{
    [Authorize]
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
            return Ok(await _context.Quotations.Where(q => !q.Status).Include(q => q.Company).Include(d => d.Details).Select(q => new
            {
                q.Id,
                q.ExpiryDate,
                q.Status,
                q.Date,
                CompanyName = q.Company.Name,
                BranchName = _context.Branches.SingleOrDefault(b => b.CompanyId == q.CompanyId).Name,
                NumberOfVehicles = q.Details.Sum(d => d.NumberOfVehicles),
                TotalAmount = q.RentSum * q.Details.Sum(d => d.NumberOfVehicles) + q.Details.Select(d => d.Services).Select(s => s.Select(se => new
                {
                    Amount = se.Total == 0 ? se.Amount : se.Quantity * se.Total
                })).Select(s => s.Sum(se => se.Amount)).First(),
            }).ToListAsync());
        }

        [HttpGet("/api/quotations/report")]
        public async Task<ActionResult> getAllReport()
        {
            return Ok(await _context.Quotations.Include(q => q.Company).Include(d => d.Details).Select(q => new
            {
                q.Id,
                q.ExpiryDate,
                q.Status,
                q.Date,
                CompanyName = q.Company.Name,
                BranchName = _context.Branches.SingleOrDefault(b => b.CompanyId == q.CompanyId).Name,
                NumberOfVehicles = q.Details.Sum(d => d.NumberOfVehicles),
                TotalAmount = q.RentSum * q.Details.Sum(d => d.NumberOfVehicles) + q.Details.Select(d => d.Services).Select(s => s.Select(se => new
                {
                    Amount = se.Total == 0 ? se.Amount : se.Quantity * se.Total
                })).Select(s => s.Sum(se => se.Amount)).First(),
            }).ToListAsync());
        }


        [HttpGet("/api/quotations/dashboard")]
        public async Task<ActionResult> getDashboardData()
        {
            var NumberOfUsers = await _context.Users.CountAsync();
            var NumberOfBranches = await _context.Branches.CountAsync();
            var NumberOfCompanies = await _context.Companies.CountAsync();
            var NumberOfAccepted = await _context.Quotations.Where(q => q.Status).CountAsync();
            var NumberOfRejected = await _context.Quotations.Where(q => q.Status == false).CountAsync();
            var Top7Quotations = await _context.Quotations.Take(7).Include(q => q.Company).Include(d => d.Details).Select(q => new
            {
                q.Id,
                q.ExpiryDate,
                q.Status,
                q.Date,
                CompanyName = q.Company.Name,
                BranchName = _context.Branches.SingleOrDefault(b => b.CompanyId == q.CompanyId).Name,
                NumberOfVehicles = q.Details.Sum(d => d.NumberOfVehicles),
                TotalAmount = q.RentSum * q.Details.Sum(d => d.NumberOfVehicles) + q.Details.Select(d => d.Services).Select(s => s.Select(se => new
                {
                    Amount = se.Total == 0 ? se.Amount : se.Quantity * se.Total
                })).Select(s => s.Sum(se => se.Amount)).First(),
            }).ToListAsync();

            return Ok(new { NumberOfUsers, NumberOfBranches, NumberOfCompanies, NumberOfAccepted, NumberOfRejected, Top7Quotations });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            var quotationDb = await _context
                .Quotations
                .SingleOrDefaultAsync(u => u.Id == Id);
            quotationDb.Status = true;

            await _context.SaveChangesAsync();

            return Ok(quotationDb);
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