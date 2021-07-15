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
    public class EmployeesController : BaseApiController
    {
        private readonly DataContext _context;
        public EmployeesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.Include(e => e.Opportunities).ToListAsync();
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<Employee>> GetEmployee(Guid id)
        {
            var @Employee = await _context.Employees.Include(e => e.Opportunities).FirstOrDefaultAsync(x => x.Id == id);

            if (@Employee == null)
            {
                return NotFound();
            }

            return @Employee;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(Guid id, Employee @Employee)
        {
            if (id != @Employee.Id)
            {
                return BadRequest();
            }

            _context.Entry(@Employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
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
        public async Task<ActionResult<Employee>> PostEmployee(Employee @employee)
        {
            _context.Employees.Add(@employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = @employee.Id }, @employee);
        }

        [HttpPost("{id}/opportunities")]
        public async Task<ActionResult<Employee>> AssignOpportunity(Guid id, [FromBody] Company companyParam)
        {
            var @employee = await _context.Employees.Include(e => e.Opportunities).FirstOrDefaultAsync(x => x.Id == id);
            var @company = await _context.Companies.FirstOrDefaultAsync(x => x.Id == companyParam.Id);
            employee.Opportunities.Add(@company);
            company.Agent = employee.Name;
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = @company.Id }, @company);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            var @employee = await _context.Employees.FindAsync(id);
            if (@employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(@employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}/opportunities")]
        public async Task<ActionResult<Employee>> UnAssignOpportunity(Guid id, [FromBody] Company companyParam)
        {
            var @employee = await _context.Employees.Include(e => e.Opportunities).FirstOrDefaultAsync(x => x.Id == id);
            var @company = await _context.Companies.FirstOrDefaultAsync(x => x.Id == companyParam.Id);
            employee.Opportunities.Remove(@company);
            company.Agent = "";
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = @company.Id }, @company);
        }
        
        private bool EmployeeExists(Guid id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }  
    }
}