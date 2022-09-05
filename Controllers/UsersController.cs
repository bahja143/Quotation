using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Quotations.Persistance;
using Quotations.Modal;
using Microsoft.AspNetCore.Authorization;

namespace Quotations.Controllers
{
    [Authorize]
    [Route("/api/users")]
    public class UsersController : Controller
    {
        private QuotationDbContext _context { get; set; }

        public UsersController(QuotationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getAll()
        {
            return Ok(await _context.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> getById(int Id)
        {
            return Ok(await _context
                .Users
                .SingleOrDefaultAsync(u => u.Id == Id));
        }


        [HttpPost]
        public async Task<ActionResult> post([FromBody] User user)
        {
            if (!ModelState.IsValid) return BadRequest();

            var userDb =
                await _context
                    .Users
                    .SingleOrDefaultAsync(u => u.Username == user.Username);

            if (userDb == null)
            {
                user.Date = DateTime.Now;
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();

                return Ok(user);
            }
            else
            {
                return BadRequest("Username already exist");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> put(int Id, [FromBody] User user)
        {
            if (!ModelState.IsValid) return BadRequest();

            var userDb =
                await _context.Users.AsNoTracking().SingleOrDefaultAsync(u => u.Id == Id);

            if (userDb != null)
            {
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }

            return Ok(user);
        }
    }
}