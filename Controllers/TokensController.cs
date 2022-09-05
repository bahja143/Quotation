using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Quotations.Persistance;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Quotations.ViewModel;
using Microsoft.AspNetCore.Authorization;

namespace Quotations.Controllers
{
    [Route("/api/token")]
    public class TokenController : Controller
    {
        private readonly QuotationDbContext _context;

        public TokenController(QuotationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Login user)
        {
            if (await IsValidUser(user.Username, user.Password))
            {
                return new ObjectResult(await GenerateToken(user.Username));
            }
            else
            {
                return BadRequest("Invalid username or password");
            }
        }

        public async Task<bool> IsValidUser(string username, string password)
        {
            var user =
                await _context
                    .Users
                    .SingleOrDefaultAsync(u =>
                        u.Username == username &&
                        u.Password == password);

            return user == null ? false : true;
        }

        public async Task<dynamic> GenerateToken(string username)
        {
            var user =
                await _context
                    .Users
                    .SingleOrDefaultAsync(u => u.Username == username);
            var claims =
                new List<Claim> {
                    new Claim("name", user.Name),
                    new Claim("username", username),
                    new Claim("role", user.Role),
                    new Claim("id", user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Nbf,
                        new DateTimeOffset(DateTime.Now)
                            .ToUnixTimeSeconds()
                            .ToString()),
                    new Claim(JwtRegisteredClaimNames.Exp,
                        new DateTimeOffset(DateTime.Now.AddYears(5))
                            .ToUnixTimeSeconds()
                            .ToString())
                };

            var token =
                new JwtSecurityToken(new JwtHeader(new SigningCredentials(new SymmetricSecurityKey(Encoding
                                    .UTF8
                                    .GetBytes("14916F529E457B82EF438A51DB064B31ACDBD2505725FCA42606B428B2DBB7C9")),
                            SecurityAlgorithms.HmacSha256)),
                    new JwtPayload(claims));

            var output =
                new { token = new JwtSecurityTokenHandler().WriteToken(token) };

            return output;
        }
    }
}