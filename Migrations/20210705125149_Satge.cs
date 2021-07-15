using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BackboneData.Migrations
{
    public partial class Satge : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "EmployeeId",
                table: "Companies",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Companies_EmployeeId",
                table: "Companies",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Employees_EmployeeId",
                table: "Companies",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Employees_EmployeeId",
                table: "Companies");

            migrationBuilder.DropIndex(
                name: "IX_Companies_EmployeeId",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "Companies");
        }
    }
}
