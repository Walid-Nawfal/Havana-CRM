using Microsoft.EntityFrameworkCore.Migrations;

namespace BackboneData.Migrations
{
    public partial class CompaniesEdit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OpertaingRegion",
                table: "Companies",
                newName: "OperatingRegion");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OperatingRegion",
                table: "Companies",
                newName: "OpertaingRegion");
        }
    }
}
