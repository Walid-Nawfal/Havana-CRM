using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackboneData.Data;
using BackboneData.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackboneData.Controllers
{
    public class CompaniesController : BaseApiController
    {
        private readonly DataContext _context;

        public CompaniesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompanies()
        {
            return await _context.Companies.Include(c => c.Stages).ToListAsync();
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<Company>> GetCompany(Guid id)
        {
            var @company = await _context.Companies.FirstOrDefaultAsync(x => x.Id == id);

            if (@company == null)
            {
                return NotFound();
            }

            return @company;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany(Guid id, Company @company)
        {
            @company.UpdatedAt = DateTime.Now.ToString("MM/dd/yyyy H:mm");
            if (id != @company.Id)
            {
                return BadRequest();
            }

            _context.Entry(@company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany(Company @company)
        {
            @company.UpdatedAt = DateTime.Now.ToString("MM/dd/yyyy H:mm");
            _context.Companies.Add(@company);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompany", new { id = @company.Id }, @company);
        }

        [HttpPost("{id}/stages")]
        public async Task<Company> PostStage(Guid id, [FromBody] Stage @stage)
        {
            @stage.UpdatedAt = DateTime.Now.ToString("MM/dd/yyyy H:mm");
            // _context.Satges.Add(stage);
            var company = await _context.Companies.Include(c => c.Stages).FirstOrDefaultAsync(x => x.Id == id);
            company.Stages.Add(@stage);
            await _context.SaveChangesAsync();
            return company;
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(Guid id)
        {
            var @company = await _context.Companies.FindAsync(id);
            if (@company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(@company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}/stages")]
        public async Task<IActionResult> RemoveStage(Guid id, [FromBody] Stage @stage)
        {
            var company = await _context.Companies.Include(c => c.Stages).FirstOrDefaultAsync(x => x.Id == id);
            company.Stages.Remove(@stage);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool CompanyExists(Guid id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }
    }
}