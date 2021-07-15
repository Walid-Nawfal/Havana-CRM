using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BackboneData.Migrations
{
    public partial class SatgesV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CompanyId",
                table: "Satges",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Satges_CompanyId",
                table: "Satges",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Satges_Companies_CompanyId",
                table: "Satges",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Satges_Companies_CompanyId",
                table: "Satges");

            migrationBuilder.DropIndex(
                name: "IX_Satges_CompanyId",
                table: "Satges");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Satges");
        }
    }
}
