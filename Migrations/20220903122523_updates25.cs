using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Quotations.Migrations
{
    public partial class updates25 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuotationDetails_Quotations_QuotationId",
                table: "QuotationDetails");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "QuotationDetailServices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Total",
                table: "QuotationDetailServices",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "QuotationId",
                table: "QuotationDetails",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_QuotationDetails_Quotations_QuotationId",
                table: "QuotationDetails",
                column: "QuotationId",
                principalTable: "Quotations",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuotationDetails_Quotations_QuotationId",
                table: "QuotationDetails");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "QuotationDetailServices");

            migrationBuilder.DropColumn(
                name: "Total",
                table: "QuotationDetailServices");

            migrationBuilder.AlterColumn<int>(
                name: "QuotationId",
                table: "QuotationDetails",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_QuotationDetails_Quotations_QuotationId",
                table: "QuotationDetails",
                column: "QuotationId",
                principalTable: "Quotations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
